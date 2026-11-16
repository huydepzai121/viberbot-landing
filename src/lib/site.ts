/** Shown until the live release is known: at build time it is replaced by the version
 *  read from GitHub, and in the browser by a fresh read, so a new release shows up
 *  without editing this file. It is also the floor: a lagging releases mirror never shows
 *  an older version, so bump it with each release. */
export const FALLBACK_VERSION = "0.8.0";
export const RELEASES = "https://github.com/nullmastermind/vibervn-bot-releases/releases";
export const LATEST_RELEASE_API =
  "https://api.github.com/repos/nullmastermind/vibervn-bot-releases/releases/latest";

/** get.viber.vn keeps these pointing at the newest installer for each platform. */
const GET = "https://get.viber.vn/download";
export const DOWNLOADS = {
  windows: `${GET}/windows`,
  windowsCert: `${GET}/windows-cert`,
  macArm64: `${GET}/mac-arm64`,
  macX64: `${GET}/mac-x64`,
  linuxX64: `${GET}/linux-x64`,
  linuxArm64: `${GET}/linux-arm64`,
} as const;

/** Where the Mintlify user guide is served. Set NEXT_PUBLIC_DOCS_URL at build time
 *  once the docs are deployed (e.g. a Mintlify domain or a reverse-proxied /docs). */
export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "/docs";
