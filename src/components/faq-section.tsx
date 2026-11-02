"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "App chạy ở đâu?",
    a: "Trên máy bạn (self-hosted): desktop, terminal và các nền tảng nhắn tin. Free yêu cầu máy đang bật. Cloud Coming soon sẽ always-on.",
  },
  {
    q: "Vì sao OS cảnh báo khi cài?",
    a: "Bộ cài chưa được ký bởi nhà phát hành tin cậy; mỗi hệ điều hành cảnh báo một lần. Làm theo hướng dẫn Cài đặt (chứng chỉ Windows / Open Anyway trên macOS / chmod AppImage trên Linux).",
  },
  {
    q: "Cài Windows thế nào?",
    a: (
      <>
        Tải <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.msix</code> và{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ViberVN-signing.cer</code> từ
        GitHub Releases (v0.3.0). Trong PowerShell Administrator:{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          Import-Certificate -FilePath .\ViberVN-signing.cer -CertStoreLocation
          Cert:\LocalMachine\TrustedPeople
        </code>
        , rồi mở <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.msix</code> → Install.
      </>
    ),
  },
  {
    q: "macOS báo hỏng / bị chặn?",
    a: (
      <>
        Privacy &amp; Security → Open Anyway, hoặc{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          xattr -dr com.apple.quarantine &quot;/Applications/ViberVN Bot.app&quot;
        </code>
        . Nếu vẫn hỏng:{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          codesign --force --deep --sign - &quot;/Applications/ViberVN Bot.app&quot;
        </code>
        .
      </>
    ),
  },
  {
    q: "Cập nhật có mất dữ liệu không?",
    a: "Không. Tải bản mới và cài đè; dữ liệu & cấu hình được giữ. Nếu thiếu/hỏng runtime, tải lại bộ cài từ GitHub Releases và cài lại.",
  },
  {
    q: "Tôi dùng model nào?",
    a: "Tự gắn key/endpoint. Provider có sẵn hoặc custom OpenAI-compatible.",
  },
  {
    q: "Có Telegram / nhắn tin không?",
    a: "Có — gateway nhắn tin (Telegram đã dùng phổ biến). CLI còn helper cho nền tảng khác.",
  },
  {
    q: "Tài liệu / release notes ở đâu?",
    a: (
      <>
        <a
          href="https://github.com/nullmastermind/vibervn-bot-releases/releases"
          className="text-[#b7cbff] underline underline-offset-3"
        >
          GitHub Releases
        </a>{" "}
        — mọi phiên bản, bộ cài và ghi chú (gồm v0.3.0).
      </>
    ),
  },
];

export function FaqSection() {
  return (
    <Accordion defaultValue={["item-0"]} className="mx-auto max-w-3xl">
      {faqs.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`item-${i}`}
          className="glass mb-3 rounded-2xl border px-4 last:border-b"
        >
          <AccordionTrigger className="py-4 text-base hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            <p>{item.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
