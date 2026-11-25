#!/usr/bin/env python3
"""Write downloads/latest.json + nginx-aliases.conf from a PUBLIC GitHub release.

No installer is downloaded or copied to the VPS: every href is the release
asset's direct GitHub URL and every sha256 comes from GitHub's asset digest.
The desktop app's auto-update reads this exact file
(https://viberbot.viber.vn/downloads/latest.json), so publish it only after
the release assets are uploaded.

Usage:
  scripts/publish-release-feed.py               # latest release of the public repo
  TAG=v0.9.4 scripts/publish-release-feed.py    # a specific tag
Env:
  REPO   public repo (default nthuy2810/viberbot-landing)
  DEST   output dir (default <repo>/downloads)
  GITHUB_TOKEN  optional, only to lift the anonymous API rate limit
"""
from __future__ import annotations

import json
import os
import re
import sys
import urllib.request
from pathlib import Path

REPO = os.environ.get("REPO", "nthuy2810/viberbot-landing")
TAG = os.environ.get("TAG", "").strip()
DEST = Path(os.environ.get("DEST", Path(__file__).resolve().parent.parent / "downloads"))

# id, label, pattern, kind, platform, arch — first match wins; ids must match
# download-stats/server.py ALLOWED and the landing DOWNLOADS list.
RULES = [
    ("windows-cert", "Chứng chỉ ViberVN-signing.cer", r"^ViberVN-signing\.cer$", "cert", "windows", ""),
    ("windows", "Windows 11 (x64) .msix", r"win-x64\.msix$", "installer", "windows", "x64"),
    ("mac-arm64", "macOS Apple Silicon .dmg", r"mac-arm64\.dmg$", "installer", "macos", "arm64"),
    ("mac-x64", "macOS Intel .dmg", r"mac-x64\.dmg$", "installer", "macos", "x64"),
    ("mac-arm64-zip", "macOS Apple Silicon .zip", r"mac-arm64\.zip$", "archive", "macos", "arm64"),
    ("mac-x64-zip", "macOS Intel .zip", r"mac-x64\.zip$", "archive", "macos", "x64"),
    ("linux-x64", "Linux x86_64 .AppImage", r"linux-x86_64\.AppImage$", "installer", "linux", "x86_64"),
    ("linux-arm64", "Linux arm64 .AppImage", r"linux-arm64\.AppImage$", "installer", "linux", "arm64"),
]


def fetch_release() -> dict:
    path = f"tags/{TAG}" if TAG else "latest"
    req = urllib.request.Request(
        f"https://api.github.com/repos/{REPO}/releases/{path}",
        headers={"Accept": "application/vnd.github+json", "User-Agent": "viberbot-landing-feed"},
    )
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def build(release: dict) -> dict:
    tag = release["tag_name"]
    if not re.match(r"^v?\d+\.\d+\.\d+", tag):
        raise SystemExit(f"release tag {tag!r} is not a version")
    files = []
    for asset in release.get("assets") or []:
        name = asset.get("name", "")
        rule = next((r for r in RULES if re.search(r[2], name, re.I)), None)
        if not rule:
            print(f"skip: {name}", file=sys.stderr)
            continue
        rid, label, _pat, kind, platform, arch = rule
        digest = asset.get("digest") or ""
        sha = digest[7:] if digest.startswith("sha256:") else ""
        if not sha:
            raise SystemExit(f"{name} has no sha256 digest on GitHub; refusing to publish an unverifiable feed")
        files.append({
            "id": rid,
            "label": label,
            "file": name,
            "size": asset.get("size"),
            "sha256": sha,
            "platform": platform,
            "arch": arch,
            "kind": kind,
            "href": asset["browser_download_url"],
            "alias": f"/downloads/{rid}",
        })
    if not any(f["kind"] == "installer" for f in files):
        raise SystemExit("no installer assets in the release")
    order = {r[0]: i for i, r in enumerate(RULES)}
    files.sort(key=lambda f: order[f["id"]])
    return {"version": tag.lstrip("v"), "tag": tag, "files": files}


def main() -> None:
    manifest = build(fetch_release())
    DEST.mkdir(parents=True, exist_ok=True)
    (DEST / "latest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
                                      encoding="utf-8", newline="\n")
    lines = [
        "# Generated for the public GitHub release — do not copy installer binaries to the VPS.",
        "# Stable aliases 302 to GitHub release assets.",
    ] + [f"location = {f['alias']} {{ return 302 {f['href']}; }}" for f in manifest["files"]]
    (DEST / "nginx-aliases.conf").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(f"wrote {DEST / 'latest.json'} for {manifest['tag']} ({len(manifest['files'])} files)")


if __name__ == "__main__":
    main()
