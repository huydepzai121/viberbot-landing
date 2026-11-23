# ViberVN Bot Landing + User Guide

- **Landing page** (repo root): Next.js (App Router) + Tailwind + shadcn/ui, static export.
- **User guide** (`docs/`): [Mintlify](https://mintlify.com) docs in Vietnamese for end users.

## Landing page

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

Download buttons use relative paths under `/downloads/…`. The page also reads
`/downloads/latest.json` (written by `scripts/sync-downloads.sh`) for the current
version and file sizes. Installer binaries are **not** in git.

## Docker (VPS)

Build the static export, then copy the repo (including `out/`, excluding `node_modules`) to `/opt/viberbot-landing` on the VPS:

```bash
npm ci && npm run build
docker compose up -d --build
```

The site listens on host port **8083** (change with `HOST_PORT`). The `downloads/`
directory is a bind mount, so a new release can be dropped in without rebuilding
the image. nginx serves those files with `Content-Disposition: attachment`, and
stable aliases such as `/downloads/windows` 302 to the current filename.

Do not put a GitHub token on the VPS. Sync installers from a machine where `gh`
is already logged in:

```bash
# write into ./downloads
scripts/sync-downloads.sh

# or copy straight to the VPS after a local sync
REMOTE=root@167.104.100.64:/opt/viberbot-landing/downloads scripts/sync-downloads.sh
```

`REPO` (default `huydepzai121/vibervn-bot`) and `TAG` (default: latest release)
can be overridden.

### Release feed (desktop auto-update)

The desktop app (from the first build that ships auto-update, v0.9.4+) checks
`https://viberbot.viber.vn/downloads/latest.json` at launch and every 6 hours,
then downloads its installer **directly from the GitHub asset `href`** (not
through `/dl/<id>`, so updates don't inflate install counts) and verifies the
`sha256`. If the site is down it falls back to this repo's latest GitHub
release. So the feed must only ever name a release whose assets are already
uploaded to the public `huydepzai121/viberbot-landing` release.

After uploading the assets of a new tag to the public release:

```bash
TAG=v0.9.4 scripts/publish-release-feed.py   # no downloads; hrefs + sha256 from GitHub
# then put downloads/latest.json and downloads/nginx-aliases.conf on the VPS
# (/opt/viberbot-landing/downloads) and reload nginx
```

The script refuses a release whose assets lack a GitHub sha256 digest.

## User guide (Mintlify)

```bash
cd docs
npx mint dev       # http://localhost:3000 (needs internet the first time)
npx mint broken-links
```

Publish: connect this repo in the Mintlify dashboard and set the docs path to `docs/`,
or serve it under `/docs` of the landing domain. Set `NEXT_PUBLIC_DOCS_URL` at build
time if the guide is on another host.

Screenshots used in the guide live in `docs/images/` and are taken from the real app.

The previous plain HTML version is kept under `legacy/` and is not served.
