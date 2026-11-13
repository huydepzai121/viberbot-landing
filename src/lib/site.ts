export const VERSION = "0.3.0";
export const RELEASES = "https://github.com/nullmastermind/vibervn-bot-releases/releases";
export const TAG = `${RELEASES}/tag/v${VERSION}`;
export const DL = `${RELEASES}/download/v${VERSION}`;

/** Where the Mintlify user guide is served. Set NEXT_PUBLIC_DOCS_URL at build time
 *  once the docs are deployed (e.g. a Mintlify domain or a reverse-proxied /docs). */
export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "/docs";
