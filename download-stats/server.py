#!/usr/bin/env python3
"""Tiny download counter: count /dl/<id> clicks, 302 to the real file, expose /stats.

Counts only this tracker path so the following 302 (to GitHub or /downloads/...)
is not counted twice. HEAD is ignored. Persistent SQLite.
"""
from __future__ import annotations

import json
import os
import sqlite3
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

DATA = Path(os.environ.get("STATS_DB", "/data/counts.db"))
MANIFEST = Path(os.environ.get("LATEST_JSON", "/data/latest.json"))
# Allowlisted ids — must match landing DOWNLOADS / sync-downloads.sh
ALLOWED = {
    "windows",
    "windows-cert",
    "mac-arm64",
    "mac-x64",
    "mac-arm64-zip",
    "mac-x64-zip",
    "linux-x64",
    "linux-arm64",
}
INSTALLERS = {
    "windows",
    "mac-arm64",
    "mac-x64",
    "mac-arm64-zip",
    "mac-x64-zip",
    "linux-x64",
    "linux-arm64",
}
LOCK = threading.Lock()


def db() -> sqlite3.Connection:
    DATA.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DATA, check_same_thread=False)
    conn.execute(
        "CREATE TABLE IF NOT EXISTS downloads (id TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)"
    )
    conn.commit()
    return conn


CONN = db()


def load_targets() -> dict[str, str]:
    targets = {i: f"/downloads/{i}" for i in ALLOWED}
    try:
        data = json.loads(MANIFEST.read_text())
        for f in data.get("files") or []:
            fid = f.get("id")
            if fid in ALLOWED:
                targets[fid] = f.get("href") or f.get("alias") or targets[fid]
    except FileNotFoundError:
        pass
    except Exception:
        pass
    return targets


def bump(fid: str) -> None:
    with LOCK:
        CONN.execute(
            "INSERT INTO downloads(id, count) VALUES(?, 1) ON CONFLICT(id) DO UPDATE SET count = count + 1",
            (fid,),
        )
        CONN.commit()


def snapshot() -> dict:
    with LOCK:
        rows = list(CONN.execute("SELECT id, count FROM downloads"))
    by_id = {fid: 0 for fid in ALLOWED}
    for fid, count in rows:
        if fid in by_id:
            by_id[fid] = int(count)
    by_platform: dict[str, int] = {"windows": 0, "macos": 0, "linux": 0, "cert": 0}
    for fid, count in by_id.items():
        if fid == "windows-cert":
            by_platform["cert"] += count
        elif fid.startswith("mac"):
            by_platform["macos"] += count
        elif fid.startswith("linux"):
            by_platform["linux"] += count
        elif fid == "windows":
            by_platform["windows"] += count
    total = sum(by_id[i] for i in INSTALLERS)
    return {"total": total, "byId": by_id, "byPlatform": by_platform}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:
        # keep logs short; never print query strings that might be sensitive
        sys_stderr = self.sys_stderr if hasattr(self, "sys_stderr") else None
        print(f"stats {self.command} {urlparse(self.path).path} {self.request_version}")

    def _send(self, code: int, body: bytes, content_type: str, extra: list[tuple[str, str]] | None = None) -> None:
        self.send_response(code)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Access-Control-Allow-Origin", "*")
        for k, v in extra or []:
            self.send_header(k, v)
        self.end_headers()
        if body:
            self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self._send(204, b"", "text/plain", [("Access-Control-Allow-Methods", "GET, OPTIONS")])

    def do_HEAD(self) -> None:
        # Do not count HEAD (prefetches / probes).
        parsed = urlparse(self.path)
        if parsed.path in ("/stats", "/api/download-stats") or parsed.path.rstrip("/") in (
            "/stats",
            "/api/download-stats",
        ):
            body = json.dumps(snapshot()).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            return
        self.send_response(405)
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"
        if path in ("/stats", "/api/download-stats"):
            body = json.dumps(snapshot(), ensure_ascii=False).encode()
            self._send(200, body, "application/json; charset=utf-8")
            return
        if path.startswith("/dl/"):
            fid = path[len("/dl/") :]
            if fid not in ALLOWED:
                self._send(404, b'{"error":"unknown download"}', "application/json")
                return
            bump(fid)
            dest = load_targets()[fid]
            self.send_response(302)
            self.send_header("Location", dest)
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        if path in ("/health", "/"):
            self._send(200, b"ok", "text/plain")
            return
        self._send(404, b"not found", "text/plain")


def main() -> None:
    host = os.environ.get("STATS_HOST", "0.0.0.0")
    port = int(os.environ.get("STATS_PORT", "8080"))
    httpd = ThreadingHTTPServer((host, port), Handler)
    print(f"download-stats listening on {host}:{port} db={DATA}")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
