/** Shown until /downloads/latest.json is known. Bump when shipping a new release
 *  so a stale or missing manifest never shows an older version. */
export const FALLBACK_VERSION = "0.9.2";

/** Manifest written by scripts/sync-downloads.sh and served from the data volume. */
export const MANIFEST_URL = "/downloads/latest.json";

/**
 * Stable download aliases. nginx 302s each one to the current filename
 * listed in the manifest (so a version bump does not require a rebuild).
 */
/** Tracker paths: the stats service increments then 302s to the real file. */
export const DOWNLOAD_CLICK = {
  windows: "/dl/windows",
  windowsCert: "/dl/windows-cert",
  macArm64: "/dl/mac-arm64",
  macX64: "/dl/mac-x64",
  macArm64Zip: "/dl/mac-arm64-zip",
  macX64Zip: "/dl/mac-x64-zip",
  linuxX64: "/dl/linux-x64",
  linuxArm64: "/dl/linux-arm64",
} as const;

export const DOWNLOAD_STATS_URL = "/api/download-stats";

export const DOWNLOADS = {
  windows: "/downloads/windows",
  windowsCert: "/downloads/windows-cert",
  macArm64: "/downloads/mac-arm64",
  macX64: "/downloads/mac-x64",
  macArm64Zip: "/downloads/mac-arm64-zip",
  macX64Zip: "/downloads/mac-x64-zip",
  linuxX64: "/downloads/linux-x64",
  linuxArm64: "/downloads/linux-arm64",
} as const;

/** Where the Mintlify user guide is served. Set NEXT_PUBLIC_DOCS_URL at build time
 *  once the docs are deployed (e.g. a Mintlify domain or a reverse-proxied /docs). */
export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "/docs";
