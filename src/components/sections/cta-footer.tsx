import { ArrowRight, BookOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { LatestVersion } from "@/components/latest-version";
import { DOCS_URL, RELEASES } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="px-4 pb-24 pt-8 sm:px-6">
      <div className="relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-[32px] border border-white/10 px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(52,211,153,0.25),transparent),radial-gradient(500px_300px_at_80%_100%,rgba(34,211,238,0.15),transparent)]" aria-hidden />
        <div className="grid-bg absolute inset-0 -z-10 opacity-60" aria-hidden />
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
          Giao việc đầu tiên cho bot ngay hôm nay
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">
          Miễn phí trên máy bạn. Cài trong vài phút, không cần biết lập trình.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#download" className={cn(buttonVariants({ size: "lg" }), "btn-brand h-12 rounded-full border-0 px-7 font-semibold")}>
            Tải miễn phí <ArrowRight className="size-4" />
          </a>
          <a
            href={DOCS_URL}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full border-white/12 bg-white/[0.03] px-7")}
          >
            <BookOpen className="size-4" /> Xem hướng dẫn
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ version }: { version: string }) {
  const cols = [
    {
      t: "Sản phẩm",
      l: [
        ["Tính năng", "#features"],
        ["Nhắn tin", "#channels"],
        ["Bảng giá", "#pricing"],
        ["Tải về", "#download"],
      ],
    },
    {
      t: "Hỗ trợ",
      l: [
        ["Hướng dẫn sử dụng", DOCS_URL],
        ["Câu hỏi thường gặp", "#faq"],
        ["Ghi chú phát hành", RELEASES],
      ],
    },
  ];
  return (
    <footer className="relative z-10 border-t border-white/[0.06]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Trợ lý AI cá nhân chạy trên máy tính của bạn, làm việc thay bạn mỗi ngày.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <div className="mb-3 text-sm font-semibold">{c.t}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.l.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition hover:text-foreground">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} ViberVN Bot</span>
          <span>
            Phiên bản <LatestVersion initial={version} />
          </span>
        </div>
      </div>
    </footer>
  );
}
