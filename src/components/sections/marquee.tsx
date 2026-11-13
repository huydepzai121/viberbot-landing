const items = [
  "Telegram",
  "Zalo",
  "Discord",
  "Slack",
  "WhatsApp",
  "Signal",
  "Email",
  "Gmail",
  "Google Calendar",
  "Google Drive",
  "Notion",
  "GitHub",
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "OpenRouter",
  "Ollama",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section className="px-4 py-16 sm:px-6" aria-label="Kết nối">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
        Làm việc cùng ứng dụng và mô hình AI bạn đang dùng
      </p>
      <div className="marquee-mask mx-auto max-w-[1100px] overflow-hidden">
        <div className="marquee flex w-max gap-3">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
