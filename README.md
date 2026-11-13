# ViberVN Bot Landing + User Guide

- **Landing page** (repo root): Next.js (App Router) + Tailwind + shadcn/ui, static export.
- **User guide** (`docs/`): [Mintlify](https://mintlify.com) docs in Vietnamese for end users.

## Landing page

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

Serve `out/` with any static host (nginx on the VPS uses port 8082).

- Version and download links: `src/lib/site.ts`.
- The "Tài liệu" links go to `NEXT_PUBLIC_DOCS_URL` (default `/docs`). Set it at build time to where the
  Mintlify guide is published, e.g. `NEXT_PUBLIC_DOCS_URL=https://<your-docs-domain> npm run build`.
- Previous plain HTML version kept under `legacy/`.

## User guide (Mintlify)

```bash
cd docs
npx mint dev       # http://localhost:3000 (needs internet the first time)
npx mint broken-links
```

Publish: connect this repo in the Mintlify dashboard and set the docs path to `docs/`, or serve it under
`/docs` of the landing domain with a reverse proxy (see Mintlify's "docs subpath" guide).

Screenshots used in the guide live in `docs/images/` and are taken from the real app.
