"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const code = "rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-xs text-foreground";

const faqs = [
  {
    q: "ViberVN Bot chạy ở đâu? Dữ liệu của tôi đi đâu?",
    a: "Bot chạy trên máy tính của bạn. Lịch sử trò chuyện, trí nhớ và cài đặt được lưu trên máy. Nội dung bạn giao việc chỉ được gửi tới nhà cung cấp mô hình AI mà bạn tự chọn.",
  },
  {
    q: "Tôi có cần biết lập trình không?",
    a: "Không. Bạn cài ứng dụng như phần mềm bình thường, chọn mô hình AI rồi nhắn việc bằng tiếng Việt. Lệnh dòng lệnh chỉ dành cho ai thích dùng terminal.",
  },
  {
    q: "Dùng mô hình AI nào? Có tốn phí không?",
    a: "Ứng dụng miễn phí khi chạy trên máy bạn. Bạn dùng khóa API hoặc tài khoản của nhà cung cấp mình chọn (OpenAI, Anthropic, Gemini, OpenRouter…) và trả phí trực tiếp cho họ, hoặc chạy mô hình miễn phí trên máy bằng Ollama.",
  },
  {
    q: "Tắt máy thì bot có chạy không?",
    a: "Bản miễn phí chạy khi máy đang bật. Các gói cloud luôn bật 24/7 sắp ra mắt.",
  },
  {
    q: "Làm sao nhắn cho bot qua Telegram hoặc Zalo?",
    a: "Trong ứng dụng, mở phần Nhắn tin, chọn Telegram hoặc Zalo và dán mã bot bạn tạo trên nền tảng đó. Hướng dẫn từng bước có trong tài liệu.",
  },
  {
    q: "Vì sao hệ điều hành cảnh báo khi cài?",
    a: (
      <>
        Bộ cài chưa được ký bởi nhà phát hành được hệ điều hành tin cậy sẵn, nên mỗi hệ điều hành cảnh báo một lần.
        Trên Windows cần thêm chứng chỉ một lần, trên macOS chọn Open Anyway, trên Linux chạy{" "}
        <code className={code}>chmod +x</code> cho file AppImage. Xem phần Hướng dẫn cài nhanh ở trên.
      </>
    ),
  },
  {
    q: "Cập nhật có mất dữ liệu không?",
    a: "Không. Tải bản mới và cài đè lên bản cũ, dữ liệu và cấu hình được giữ nguyên.",
  },
];

export function FaqSection() {
  return (
    <Accordion defaultValue={["item-0"]} className="mx-auto max-w-3xl">
      {faqs.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`item-${i}`}
          className="glass mb-3 rounded-2xl border px-5 last:border-b"
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
