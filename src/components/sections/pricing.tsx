import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHead } from "./section-head";

const plans = [
  {
    name: "Free",
    price: "0đ",
    soon: false,
    featured: true,
    desc: "Chạy trên máy tính của bạn.",
    feats: [
      "Không giới hạn số bot trên máy bạn",
      "Mọi mô hình AI với khóa của bạn",
      "macOS, Windows và Linux",
      "Bot hoạt động khi máy đang bật",
    ],
    cta: "Tải miễn phí",
  },
  {
    name: "Starter",
    soon: true,
    desc: "Bot vẫn chạy khi laptop tắt.",
    feats: ["Luôn bật 24/7", "Máy cloud riêng cho bot", "Tài nguyên mức cơ bản"],
  },
  {
    name: "Pro",
    soon: true,
    desc: "Nhiều tài nguyên hơn cho việc nặng.",
    feats: ["Luôn bật 24/7", "Máy cloud riêng cho bot", "Tài nguyên cao hơn Starter"],
  },
  {
    name: "Max",
    soon: true,
    desc: "Máy cloud lớn nhất.",
    feats: ["Luôn bật 24/7", "Máy cloud riêng cho bot", "Tài nguyên cao nhất"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHead
          kicker="Bảng giá"
          title="Miễn phí trên máy bạn. Cloud sắp ra mắt."
          desc="Các gói cloud giúp bot luôn chạy kể cả khi bạn gập laptop."
          center
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={cn("glass relative flex flex-col rounded-3xl p-6", p.featured && "price-featured")}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{p.name}</span>
                {p.soon ? (
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    Sắp ra mắt
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                    Dùng ngay
                  </span>
                )}
              </div>
              <div className="mt-4 text-4xl font-bold tracking-tight">{p.soon ? "—" : p.price}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.feats.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                    {f}
                  </li>
                ))}
              </ul>
              {p.soon ? (
                <span className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-white/10 text-sm text-muted-foreground">
                  Sắp ra mắt
                </span>
              ) : (
                <a
                  href="#download"
                  className={cn(buttonVariants({ size: "lg" }), "btn-brand mt-6 h-10 rounded-full border-0 font-semibold")}
                >
                  {p.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
