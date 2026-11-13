import { Download, KeyRound, MessagesSquare } from "lucide-react";
import { SectionHead } from "./section-head";

const steps = [
  {
    icon: Download,
    title: "Tải và cài ứng dụng",
    desc: "Có bản cho macOS, Windows và Linux. Cài một lần, cập nhật bằng cách cài đè bản mới, dữ liệu vẫn giữ nguyên.",
  },
  {
    icon: KeyRound,
    title: "Chọn mô hình AI",
    desc: "Dùng tài khoản hoặc khóa API của bạn: OpenAI, Anthropic, Gemini, OpenRouter, hay mô hình chạy trên máy như Ollama.",
  },
  {
    icon: MessagesSquare,
    title: "Giao việc ở bất cứ đâu",
    desc: "Nhắn trong ứng dụng, hoặc kết nối Telegram, Zalo để giao việc từ điện thoại. Bot báo lại khi xong.",
  },
];

export function How() {
  return (
    <section id="how" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHead kicker="Bắt đầu" title="Chạy trong 3 bước" center />
        <div className="relative grid gap-4 md:grid-cols-3">
          <div
            className="absolute left-[16%] right-[16%] top-[38px] hidden h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent md:block"
            aria-hidden
          />
          {steps.map((s, i) => (
            <div key={s.title} className="relative flex flex-col items-center px-4 text-center">
              <div className="relative mb-6 grid size-[76px] place-items-center rounded-2xl border border-white/10 bg-[#0b0d12] shadow-[0_0_40px_-10px_rgba(52,211,153,0.5)]">
                <s.icon className="size-7 text-emerald-300" />
                <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-emerald-400 text-xs font-bold text-[#03130d]">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
