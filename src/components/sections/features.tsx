import {
  Brain,
  CalendarClock,
  Check,
  LayoutGrid,
  MonitorPlay,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SectionHead } from "./section-head";
import { cn } from "@/lib/utils";

function Tile({
  className,
  icon,
  title,
  desc,
  children,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("glass card-hover group relative flex flex-col overflow-hidden rounded-3xl p-6", className)}>
      <div className="mb-4 grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      {children ? <div className="mt-6 flex-1">{children}</div> : null}
    </div>
  );
}

function ChatDemo() {
  return (
    <div className="space-y-3 rounded-2xl border border-white/[0.07] bg-black/30 p-4 text-[13px]">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-emerald-400/15 px-3.5 py-2 text-emerald-50">
        Tìm giúp mình vé xe Hà Nội đi Đà Nẵng tối thứ Sáu
      </div>
      <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-white/[0.05] px-3.5 py-2 text-muted-foreground">
        Mình đã xem 3 nhà xe còn chỗ. Đây là 2 chuyến hợp giờ nhất:
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03]">
        {[
          ["Giường nằm VIP", "19:30 → 07:00", "Chọn"],
          ["Limousine 22 chỗ", "20:15 → 07:40", "Chọn"],
        ].map(([n, t, b], i) => (
          <div key={n} className={cn("flex items-center justify-between px-3.5 py-2.5", i && "border-t border-white/[0.06]")}>
            <div>
              <div className="font-medium text-foreground">{n}</div>
              <div className="text-xs text-muted-foreground">{t}</div>
            </div>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">{b}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground/70">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> Đã làm trong 42 giây · 6 bước
      </div>
    </div>
  );
}

function ComputerDemo() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/30">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2 text-[11px] text-muted-foreground">
        <span className="rounded bg-white/[0.06] px-2 py-0.5">Máy tính</span>
        <span className="truncate">trang đặt lịch · đang điền biểu mẫu</span>
      </div>
      <div className="relative m-3 rounded-lg border-2 border-rose-400/70 p-3">
        <span className="absolute -top-2.5 left-3 rounded bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
          Bạn đang điều khiển
        </span>
        <div className="space-y-2">
          <div className="h-2.5 w-2/3 rounded bg-white/10" />
          <div className="h-7 rounded-md border border-white/10 bg-white/[0.03]" />
          <div className="h-7 rounded-md border border-white/10 bg-white/[0.03]" />
          <div className="h-7 w-24 rounded-md bg-emerald-400/30" />
        </div>
        <MousePointer2 className="absolute bottom-6 right-10 size-5 fill-white text-white drop-shadow" />
      </div>
    </div>
  );
}

function RoutineDemo() {
  const rows = [
    ["Bản tin sáng", "07:00 hằng ngày", true],
    ["Tóm tắt email", "17:30 · T2–T6", true],
    ["Theo dõi trang giá vé", "mỗi 3 giờ", false],
  ] as const;
  return (
    <div className="space-y-2">
      {rows.map(([n, t, on]) => (
        <div key={n} className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/25 px-3.5 py-2.5">
          <div>
            <div className="text-sm font-medium">{n}</div>
            <div className="text-xs text-muted-foreground">{t}</div>
          </div>
          <span className={cn("flex h-5 w-9 items-center rounded-full p-0.5", on ? "bg-emerald-400/80" : "bg-white/15")}>
            <span className={cn("size-4 rounded-full bg-white transition", on && "translate-x-4")} />
          </span>
        </div>
      ))}
    </div>
  );
}

function MemoryDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {["Ghế cạnh lối đi", "Không họp trước 9h", "Gửi báo cáo bằng Excel", "Gọi sếp là anh Minh"].map((m) => (
        <span key={m} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground">
          {m}
        </span>
      ))}
      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
        + Kỹ năng mới: xuất hóa đơn
      </span>
    </div>
  );
}

function ApprovalDemo() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-black/30 p-4">
      <div className="text-xs text-muted-foreground">Bot muốn gửi</div>
      <div className="mt-1 text-sm font-medium">Email báo giá tới khách hàng</div>
      <div className="mt-3 flex gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
          <Check className="size-3" /> Duyệt
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">Sửa</span>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHead
          kicker="Tính năng"
          title={
            <>
              Không chỉ trả lời. <span className="text-gradient">Bot làm hộ bạn.</span>
            </>
          }
          desc="Một trợ lý biết dùng trình duyệt, nhớ thói quen của bạn và tự chạy việc theo lịch, trong một ứng dụng gọn gàng."
        />

        <div className="grid gap-4 md:grid-cols-6">
          <Tile
            className="md:col-span-4"
            icon={<Sparkles className="size-5" />}
            title="Giao việc bằng tiếng Việt, nhận kết quả"
            desc="Bot tự chia nhỏ công việc, dùng công cụ phù hợp và trả về kết quả gọn: một danh sách, một file, hoặc thẻ để bạn bấm chọn."
          >
            <ChatDemo />
          </Tile>
          <Tile
            className="md:col-span-2"
            icon={<MonitorPlay className="size-5" />}
            title="Xem bot dùng máy tính"
            desc="Tab Máy tính cho bạn xem bot thao tác trên trình duyệt, giành quyền điều khiển bất cứ lúc nào, hoặc làm mẫu để bot học."
          >
            <ComputerDemo />
          </Tile>
          <Tile
            className="md:col-span-2"
            icon={<CalendarClock className="size-5" />}
            title="Tự động theo lịch"
            desc="Bản tin sáng, tóm tắt email, theo dõi trang web. Đặt một lần, bot tự chạy và gửi kết quả cho bạn."
          >
            <RoutineDemo />
          </Tile>
          <Tile
            className="md:col-span-2"
            icon={<Brain className="size-5" />}
            title="Nhớ và học dần"
            desc="Bot ghi nhớ điều bạn thích, tự tạo kỹ năng sau những việc khó và rút kinh nghiệm khi bạn chê một câu trả lời."
          >
            <MemoryDemo />
          </Tile>
          <Tile
            className="md:col-span-2"
            icon={<ShieldCheck className="size-5" />}
            title="Bạn duyệt trước khi gửi"
            desc="Có thể giữ lại mọi tin nhắn gửi đi và khoản thanh toán chờ bạn bấm Duyệt, kèm giới hạn chi phí theo ngày."
          >
            <ApprovalDemo />
          </Tile>
          <Tile
            className="md:col-span-3"
            icon={<Users className="size-5" />}
            title="Cả một đội bot"
            desc="Tạo nhiều bot với vai trò, mô hình và trí nhớ riêng. Các bot có lịch làm việc riêng, nhắn cho nhau và cùng bàn trong nhóm chat."
          />
          <Tile
            className="md:col-span-3"
            icon={<LayoutGrid className="size-5" />}
            title="Plugin và kỹ năng"
            desc="Thêm kết nối và kỹ năng từ thư viện có sẵn: Google Workspace, đọc hóa đơn VAT, tạo mã VietQR, tra chuyến bay nội địa và nhiều hơn nữa."
          />
        </div>
      </div>
    </section>
  );
}
