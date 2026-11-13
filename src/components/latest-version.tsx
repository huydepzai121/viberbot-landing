"use client";

import { useEffect, useState } from "react";
import { fetchLatestVersion } from "@/lib/release";

const CACHE_KEY = "vibervn-latest-version";
const CACHE_MS = 60 * 60 * 1000;

let pending: Promise<string | null> | null = null;

function cached(): string | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { v, at } = JSON.parse(raw) as { v: string; at: number };
    return Date.now() - at < CACHE_MS ? v : null;
  } catch {
    return null;
  }
}

/** One GitHub read per page view (and per hour per tab), shared by every badge. */
function latest(): Promise<string | null> {
  const hit = cached();
  if (hit) return Promise.resolve(hit);
  pending ??= fetchLatestVersion()
    .then((v) => {
      if (v) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ v, at: Date.now() }));
        } catch {}
      }
      return v;
    })
    .catch(() => null);
  return pending;
}

/** Renders the version baked in at build time, then swaps in a newer release if one exists. */
export function LatestVersion({ initial }: { initial: string }) {
  const [version, setVersion] = useState(initial);
  useEffect(() => {
    let live = true;
    latest().then((v) => {
      if (live && v) setVersion(v);
    });
    return () => {
      live = false;
    };
  }, []);
  return <>{version}</>;
}
