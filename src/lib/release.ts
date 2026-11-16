import { FALLBACK_VERSION, LATEST_RELEASE_API } from "./site";

/** "v0.6.0" -> "0.6.0"; anything that is not a plain version yields null. */
export function parseTag(tag: unknown): string | null {
  if (typeof tag !== "string") return null;
  const m = /^v?(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)$/.exec(tag.trim());
  return m ? m[1] : null;
}

/** The higher of two versions (pre-release suffixes ignored); null loses. */
export function newest(a: string | null, b: string | null): string | null {
  if (!a || !b) return a ?? b;
  const nums = (v: string) => v.split(/[-+]/)[0].split(".").map(Number);
  const [x, y] = [nums(a), nums(b)];
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i] ? a : b;
  return a;
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

/** Build-time read: the static export bakes in the newest version, never older than the fallback
 *  (the public releases mirror can lag behind a release). */
export async function buildTimeVersion(): Promise<string> {
  try {
    return newest(await fetchLatestVersion(AbortSignal.timeout(8000)), FALLBACK_VERSION) ?? FALLBACK_VERSION;
  } catch {
    return FALLBACK_VERSION;
  }
}
