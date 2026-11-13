import { Laptop, Link2, QrCode, Smartphone } from "lucide-react";
import { SectionHead } from "./section-head";

function Bubble({ me, children }: { me?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={
        me
          ? "ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-[#2b8cff] px-3 py-2 text-[13px] text-white"
          : "w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.08] px-3 py-2 text-[13px] text-foreground/90"
      }
    >
      {children}
    </div>
  );
}

export function Channels() {
  return (
    <section id="channels" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead
            kicker="Nhắn tin"
            title={
              <>
                Bot ở trong túi bạn, <span className="text-gradient">24/7</span>
              </>
            }
            desc="Kết nối một lần, sau đó giao việc từ Telegram, Zalo, Discord, Slack, WhatsApp hay email. Cùng một bot, cùng trí nhớ, ở mọi nơi."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Smartphone, t: "Telegram và Zalo", d: "Nhắn như với một người, gửi ảnh, file hay tin nhắn thoại." },
              { icon: QrCode, t: "Mở trên điện thoại", d: "Quét mã QR để dùng toàn bộ ứng dụng trên điện thoại qua HTTPS." },
              { icon: Link2, t: "Liên kết thiết bị", d: "Giao việc cho một máy khác ở nhà hay văn phòng mà không cần mở cổng mạng." },
              { icon: Laptop, t: "Desktop và dòng lệnh", d: "Ứng dụng desktop cho mọi người, lệnh vibervnbot cho người thích terminal." },
            ].map((x) => (
              <div key={x.t} className="glass rounded-2xl p-4">
                <x.icon className="mb-3 size-5 text-emerald-300" />
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{x.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone illustration */}
        <div className="relative mx-auto w-full max-w-[340px]">
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),transparent)] blur-2xl" aria-hidden />
          <div className="ring-glow rounded-[44px] border border-white/12 bg-[#0b0d12] p-3">
            <div className="overflow-hidden rounded-[34px] border border-white/[0.06] bg-[#0f1218]">
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 pb-3 pt-6">
                <span className="grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,#6ee7b7,#22d3ee)] text-xs font-bold text-[#03130d]">
                  VB
                </span>
                <div>
                  <div className="text-sm font-semibold">ViberVN Bot</div>
                  <div className="text-[11px] text-emerald-300">đang hoạt động</div>
                </div>
              </div>
              <div className="space-y-2.5 px-3 py-4">
                <Bubble>Chào buổi sáng! Hôm nay bạn có 3 cuộc họp, cuộc đầu tiên lúc 9:30.</Bubble>
                <Bubble me>Dời cuộc 9:30 sang chiều giúp mình</Bubble>
                <Bubble>Lúc 14:00 cả hai bên đều trống. Mình gửi lời mời mới nhé?</Bubble>
                <div className="flex gap-2 pl-1">
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Gửi đi
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">Chọn giờ khác</span>
                </div>
                <Bubble me>Gửi đi</Bubble>
                <Bubble>Đã gửi. Mình sẽ báo khi mọi người nhận lời.</Bubble>
              </div>
              <div className="m-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-muted-foreground/70">
                Nhắn tin…
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
