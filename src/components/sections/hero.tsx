import Image from "next/image";
import { ArrowRight, BookOpen, CalendarClock, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DOCS_URL, VERSION } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Hero({ shot }: { shot: string }) {
  return (
    <section className="relative overflow-hidden px-4 pt-14 sm:px-6 sm:pt-20">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-0" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <a
          href="#features"
          className="group mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-xs text-muted-foreground backdrop-blur transition hover:border-emerald-400/30"
        >
          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-semibold text-emerald-300">
            v{VERSION}
          </span>
          Dạy bot một việc bằng cách làm mẫu
          <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
        </a>

        <h1 className="max-w-5xl text-balance text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
          Trợ lý AI <span className="text-gradient">làm việc thay bạn</span>,<br className="hidden sm:block" /> kể cả khi bạn ngủ
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          ViberVN Bot chạy ngay trên máy tính của bạn. Giao việc bằng tiếng Việt, bot tự mở trình duyệt,
          làm theo lịch hằng ngày và báo lại qua Telegram hoặc Zalo.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#download"
            className={cn(buttonVariants({ size: "lg" }), "btn-brand h-12 rounded-full border-0 px-7 text-[15px] font-semibold")}
          >
            Tải miễn phí
            <ArrowRight className="size-4" />
          </a>
          <a
            href={DOCS_URL}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full border-white/12 bg-white/[0.03] px-7 text-[15px]"
            )}
          >
            <BookOpen className="size-4 opacity-80" />
            Đọc hướng dẫn
          </a>
        </div>
        <p className="mt-5 text-xs text-muted-foreground/80">macOS · Windows · Linux — miễn phí khi chạy trên máy bạn</p>

        {/* Product shot */}
        <div className="relative mt-14 w-full max-w-[1100px] sm:mt-16">
          <div
            className="absolute -inset-x-10 -top-10 bottom-1/3 -z-10 rounded-[50%] bg-[radial-gradient(closest-side,rgba(52,211,153,0.28),transparent)] blur-2xl"
            aria-hidden
          />
          <div className="ring-glow overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d12]">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="mx-auto text-[11px] text-muted-foreground/70">ViberVN Bot</span>
            </div>
            <Image
              src={shot}
              alt="Ứng dụng ViberVN Bot trên máy tính"
              width={1440}
              height={900}
              priority
              className="block w-full"
            />
          </div>

          <FloatCard
            className="float-slow left-[-3%] top-[68%] hidden md:flex"
            icon={<CalendarClock className="size-4 text-emerald-300" />}
            title="Bản tin sáng"
            body="Đã gửi lúc 07:00"
          />
          <FloatCard
            className="float-slower right-[-3%] top-[38%] hidden md:flex"
            icon={<MessageCircle className="size-4 text-cyan-300" />}
            title="Telegram"
            body="“Xong rồi, mình gửi file nhé”"
          />
          <FloatCard
            className="float-slow bottom-[24%] right-[6%] hidden lg:flex"
            icon={<ShieldCheck className="size-4 text-violet-300" />}
            title="Chờ bạn duyệt"
            body="Gửi email cho khách hàng?"
            action
          />
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  className,
  icon,
  title,
  body,
  action,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  action?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute z-10 items-center border border-white/10 bg-[#0d1016]/95 backdrop-blur-xl gap-3 rounded-2xl px-3.5 py-3 text-left shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <span className="grid size-8 place-items-center rounded-xl bg-white/[0.06]">{icon}</span>
      <span className="flex flex-col">
        <span className="text-xs font-semibold">{title}</span>
        <span className="text-[11px] text-muted-foreground">{body}</span>
      </span>
      {action ? (
        <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] font-semibold text-emerald-300">
          <Check className="size-3" /> Duyệt
        </span>
      ) : null}
    </div>
  );
}
