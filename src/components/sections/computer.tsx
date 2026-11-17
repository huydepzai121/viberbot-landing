"use client";

import { useState } from "react";
import {
  Box,
  Eye,
  GraduationCap,
  Hand,
  Laptop,
  Maximize2,
  MousePointer2,
  Package,
  Repeat,
} from "lucide-react";
import { SectionHead } from "./section-head";
import { cn } from "@/lib/utils";

type Place = "local" | "docker";

const PLACE_NOTE: Record<Place, string> = {
  local: "Màn hình chạy trên máy đang chạy bot (local), cùng với terminal",
  docker: "Màn hình chạy bên trong sandbox Docker, cùng với terminal",
};

const POINTS = [
  {
    icon: Box,
    t: "Trên máy bạn hoặc trong sandbox",
    d: "Chọn ở Cài đặt › Máy tính của bot: chạy local, trong Docker hoặc trên một máy SSH. Với Docker, bot có máy riêng và tab Máy tính hiện cả màn hình của nó.",
  },
  {
    icon: Repeat,
    t: "Đổi qua lại khi bot đang chạy",
    d: "Chuyển giữa local và Docker ngay cả lúc màn hình đang bật. Màn hình tắt ở chỗ cũ, bật lại ở chỗ mới, và khung luôn ghi rõ nó đang chạy ở đâu.",
  },
  {
    icon: Hand,
    t: "Đang xem, rồi Tiếp quản",
    d: "Mặc định bạn chỉ xem. Bấm Tiếp quản để tự đăng nhập, nhập mã 2FA hay thanh toán; bot chờ tới khi bạn trả quyền hoặc tự nhận lại sau một lúc bạn không thao tác.",
  },
  {
    icon: GraduationCap,
    t: "Dạy bot bằng cách làm mẫu",
    d: "Dạy một tác vụ: bot quan sát bạn làm trên trình duyệt rồi biến thành kỹ năng. Mật khẩu và mã OTP bạn gõ không bị ghi lại.",
  },
  {
    icon: Package,
    t: "Cài phần mềm, đặt lại máy",
    d: "Nhắn “cài LibreOffice” là bot tự cài trong sandbox. Đặt lại máy tính đưa nó về như mới mà vẫn giữ thư mục /workspace.",
  },
  {
    icon: MousePointer2,
    t: "Bot nhường chuột cho bạn",
    d: "Khi bot dùng chính màn hình của bạn, bạn chạm chuột hay bàn phím là bot dừng ngay, chờ bạn bấm Trả lại cho bot.",
  },
] as const;

function PlaceSwitch({ place, onChange }: { place: Place; onChange: (p: Place) => void }) {
  return (
    <div role="radiogroup" aria-label="Nơi màn hình chạy" className="flex rounded-full border border-white/10 bg-black/30 p-0.5 text-[11px]">
      {(
        [
          ["local", "Máy này", Laptop],
          ["docker", "Docker", Box],
        ] as const
      ).map(([value, label, Icon]) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={place === value}
          onClick={() => onChange(value)}
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors",
            place === value ? "bg-emerald-400/20 font-semibold text-emerald-200" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="size-3" />
          {label}
        </button>
      ))}
    </div>
  );
}

function ComputerPane() {
  const [place, setPlace] = useState<Place>("docker");
  const sandbox = place === "docker";

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.2),transparent)] blur-2xl" aria-hidden />
      <div className="ring-glow overflow-hidden rounded-3xl border border-white/12 bg-[#0b0d12]">
        {/* Tab bar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-md bg-white/[0.07] px-2 py-1 font-medium">Máy tính</span>
            <span className="hidden items-center gap-1.5 text-emerald-300 sm:inline-flex">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> Trực tiếp · bot đang điều khiển
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PlaceSwitch place={place} onChange={setPlace} />
            <Maximize2 className="hidden size-3.5 text-muted-foreground sm:block" aria-label="Mở rộng" />
          </div>
        </div>

        {/* Screen */}
        <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.07] bg-[linear-gradient(160deg,#141a24,#0d1118)]">
          {sandbox ? (
            <>
              {/* The bot's own desktop: a browser window over a dark dock */}
              <div className="absolute inset-x-[7%] top-[8%] bottom-[22%] overflow-hidden rounded-lg border border-white/10 bg-[#10141c] shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-2.5 py-1.5">
                  <span className="size-1.5 rounded-full bg-rose-400/70" />
                  <span className="size-1.5 rounded-full bg-amber-300/70" />
                  <span className="size-1.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 h-3 flex-1 rounded bg-white/[0.06]" />
                </div>
                <div className="space-y-2 p-3">
                  <div className="h-2 w-1/2 rounded bg-white/10" />
                  <div className="h-5 rounded border border-white/10 bg-white/[0.03]" />
                  <div className="h-5 rounded border border-white/10 bg-white/[0.03]" />
                  <div className="h-5 w-20 rounded bg-emerald-400/30" />
                </div>
              </div>
              <div className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-xl border border-white/10 bg-black/50 px-2 py-1.5">
                {["bg-emerald-400/50", "bg-sky-400/50", "bg-amber-300/50", "bg-white/25"].map((c) => (
                  <span key={c} className={cn("size-3.5 rounded", c)} />
                ))}
                <span className="ml-1 text-[9px] tabular-nums text-muted-foreground">09:41</span>
              </div>
            </>
          ) : (
            /* Local: the bot's browser on this machine */
            <div className="absolute inset-0 flex flex-col">
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/20 px-3 py-1.5 text-[10px] text-muted-foreground">
                <span>‹ ›</span>
                <span className="h-3.5 flex-1 truncate rounded bg-white/[0.06] px-2 leading-[14px]">trang đặt lịch</span>
              </div>
              <div className="space-y-2 p-4">
                <div className="h-2.5 w-2/3 rounded bg-white/10" />
                <div className="h-6 rounded-md border border-white/10 bg-white/[0.03]" />
                <div className="h-6 rounded-md border border-white/10 bg-white/[0.03]" />
                <div className="h-6 w-24 rounded-md bg-emerald-400/30" />
              </div>
            </div>
          )}
          <MousePointer2 className="absolute bottom-[34%] right-[22%] size-5 fill-white text-white drop-shadow" />

          {/* The one floating control */}
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-[#0b0d12]/90 p-1 text-[11px] shadow-lg backdrop-blur">
            <span className="inline-flex items-center gap-1 px-2 text-muted-foreground">
              <Eye className="size-3" /> Đang xem
            </span>
            <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 font-semibold text-emerald-200">Tiếp quản</span>
          </div>
        </div>

        {/* Where the screen runs, as the pane says it */}
        <div className="flex items-start gap-2 border-t border-white/[0.06] px-4 py-3 text-xs text-muted-foreground" aria-live="polite">
          {sandbox ? <Box className="mt-0.5 size-3.5 shrink-0 text-emerald-300" /> : <Laptop className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />}
          <span>{PLACE_NOTE[place]}</span>
          {sandbox ? <span className="ml-auto shrink-0 tabular-nums">Ổ đĩa 2,4 GB</span> : null}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground/70">Bấm Máy này / Docker để thử đổi chỗ chạy.</p>
    </div>
  );
}

export function Computer() {
  return (
    <section id="computer" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <SectionHead
            kicker="Máy tính của bot"
            title={
              <>
                Xem bot làm việc, <span className="text-gradient">tiếp quản khi cần</span>
              </>
            }
            desc="Tab Máy tính phát trực tiếp màn hình của bot ngay cạnh khung chat. Màn hình chạy trên máy bạn hoặc trong sandbox Docker, và bạn đổi qua lại được cả khi bot đang làm."
          />
          <ComputerPane />
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((x) => (
            <div key={x.t} className="glass card-hover rounded-2xl p-5">
              <x.icon className="mb-3 size-5 text-emerald-300" />
              <div className="text-sm font-semibold">{x.t}</div>
              <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
