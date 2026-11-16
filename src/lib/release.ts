import { FALLBACK_VERSION, MANIFEST_URL } from "./site";

export type DownloadFile = {
  id: string;
  label: string;
  file: string;
  href: string;
  alias?: string;
  size: number;
  sha256?: string;
  platform?: string;
  arch?: string;
  kind?: string;
};

export type DownloadManifest = {
  version: string;
  tag?: string;
  publishedAt?: string;
  files: DownloadFile[];
};

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

export async function fetchLatestManifest(signal?: AbortSignal): Promise<DownloadManifest | null> {
  const res = await fetch(MANIFEST_URL, { signal, cache: "no-store" });
  if (!res.ok) return null;
  const data = (await res.json()) as Partial<DownloadManifest>;
  const version = parseTag(data.version) ?? parseTag(data.tag);
  if (!version || !Array.isArray(data.files)) return null;
  return {
    version,
    tag: typeof data.tag === "string" ? data.tag : `v${version}`,
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : undefined,
    files: data.files.filter((f): f is DownloadFile => !!f && typeof f.href === "string" && typeof f.file === "string"),
  };
}

export async function fetchLatestVersion(signal?: AbortSignal): Promise<string | null> {
  const manifest = await fetchLatestManifest(signal);
  return manifest?.version ?? null;
}

/** Build-time version baked into the static export. The live manifest can still
 *  raise it in the browser after a new release is dropped into the volume. */
export async function buildTimeVersion(): Promise<string> {
  return FALLBACK_VERSION;
}

export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "";
  if (n < 1024) return `${n} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let v = n / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  const digits = v >= 100 || i === 0 ? 0 : v >= 10 ? 1 : 2;
  return `${v.toFixed(digits)} ${units[i]}`;
}
