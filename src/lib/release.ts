import { FALLBACK_VERSION, LATEST_RELEASE_API } from "./site";

/** "v0.6.0" -> "0.6.0"; anything that is not a plain version yields null. */
export function parseTag(tag: unknown): string | null {
  if (typeof tag !== "string") return null;
  const m = /^v?(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)$/.exec(tag.trim());
  return m ? m[1] : null;
}

export async function fetchLatestVersion(signal?: AbortSignal): Promise<string | null> {
  const res = await fetch(LATEST_RELEASE_API, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });
  if (!res.ok) return null;
  const data: { tag_name?: unknown } = await res.json();
  return parseTag(data.tag_name);
}

/** Build-time read: the static export bakes in the newest version, or the fallback offline. */
export async function buildTimeVersion(): Promise<string> {
  try {
    return (await fetchLatestVersion(AbortSignal.timeout(8000))) ?? FALLBACK_VERSION;
  } catch {
    return FALLBACK_VERSION;
  }
}
