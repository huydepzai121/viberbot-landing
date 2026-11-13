import { Apple, Download as DownloadIcon, Monitor, Terminal } from "lucide-react";
import { InstallTabs } from "@/components/install-tabs";
import { LatestVersion } from "@/components/latest-version";
import { DOWNLOADS, RELEASES } from "@/lib/site";
import { SectionHead } from "./section-head";

const platforms = [
  {
    icon: Monitor,
    title: "Windows 11",
    note: "x64 · 22H2 trở lên",
    links: [
      { label: "Bộ cài .msix", badge: "x64", href: DOWNLOADS.windows },
      { label: "Chứng chỉ ViberVN-signing.cer", badge: "cert", href: DOWNLOADS.windowsCert },
    ],
  },
  {
    icon: Apple,
    title: "macOS 13+",
    note: "Apple Silicon hoặc Intel",
    links: [
      { label: "Bộ cài .dmg", badge: "Apple Silicon", href: DOWNLOADS.macArm64 },
      { label: "Bộ cài .dmg", badge: "Intel", href: DOWNLOADS.macX64 },
    ],
  },
  {
    icon: Terminal,
    title: "Linux",
    note: "AppImage, chạy không cần cài",
    links: [
      { label: ".AppImage", badge: "x86_64", href: DOWNLOADS.linuxX64 },
      { label: ".AppImage", badge: "arm64", href: DOWNLOADS.linuxArm64 },
    ],
  },
];

export function DownloadSection({ version }: { version: string }) {
  return (
    <section id="download" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHead
          kicker="Tải về"
          title={
            <>
              Tải ViberVN Bot v<LatestVersion initial={version} />
            </>
          }
          desc="Chọn bản cho hệ điều hành của bạn. Lần đầu mở, hệ điều hành có thể cảnh báo một lần; làm theo hướng dẫn ngay bên dưới."
          center
        />
        <div className="grid gap-4 md:grid-cols-3">
          {platforms.map((p) => (
            <div key={p.title} className="glass card-hover rounded-3xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <p.icon className="size-5 text-emerald-300" />
                </span>
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.note}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-3 text-sm transition hover:border-emerald-400/40 hover:bg-emerald-400/[0.06]"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <DownloadIcon className="size-4 text-muted-foreground transition group-hover:text-emerald-300" />
                      {l.label}
                    </span>
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-muted-foreground">{l.badge}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Các phiên bản trước và ghi chú phát hành:{" "}
          <a href={RELEASES} className="text-emerald-300 underline-offset-4 hover:underline">
            trang phát hành
          </a>
        </p>

        <div className="mx-auto mt-14 max-w-3xl">
          <h3 className="mb-4 text-center text-lg font-semibold">Hướng dẫn cài nhanh</h3>
          <InstallTabs />
        </div>
      </div>
    </section>
  );
}
