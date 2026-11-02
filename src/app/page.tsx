import Image from "next/image";
import { Check, Download, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { FaqSection } from "@/components/faq-section";
import { InstallTabs } from "@/components/install-tabs";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const RELEASES = "https://github.com/nullmastermind/vibervn-bot-releases/releases";
const TAG = `${RELEASES}/tag/v0.3.0`;
const DL = `${RELEASES}/download/v0.3.0`;

const integrations = [
  "Telegram",
  "Gmail",
  "Google Drive",
  "Slack",
  "Notion",
  "GitHub",
  "OpenAI-compatible",
];

const whatsNew = [
  {
    title: "Dạy một việc (Teach a task)",
    body: "Trong Show computer, thêm ghi chú tùy chọn rồi Start: bạn điều khiển trình duyệt trong khung đỏ; mọi click, gõ phím và đổi trang được ghi kèm ảnh. Mật khẩu / OTP / thẻ được ghi ở dạng ẩn. Khi Stop, agent biến bản ghi thành skill đã lưu và báo tên skill.",
  },
  {
    title: "Bằng chứng làm việc trên trình duyệt",
    body: "Khi agent dùng trình duyệt trong một câu trả lời, ảnh chụp tab hiện dưới tin nhắn — bấm để phóng to, hoặc mở Show computer từ liên kết.",
  },
  {
    title: "Trình duyệt giữ đăng nhập",
    body: "Mỗi bot có một hồ sơ trình duyệt bền; trình duyệt local còn mở khoảng 30 phút idle — đăng nhập và trang đang mở được giữ giữa các việc. Agent có thể đóng đúng trình duyệt nó mở (không tắt nhầm desktop app).",
  },
];

const platforms = [
  {
    title: "Windows 11 (x64)",
    note: "22H2+ · cần thêm chứng chỉ bên dưới",
    links: [
      {
        label: ".msix",
        badge: "win-x64",
        href: `${DL}/VibervnbotBundled-0.3.0-win-x64.msix`,
      },
      {
        label: "ViberVN-signing.cer",
        badge: "cert",
        href: `${DL}/ViberVN-signing.cer`,
      },
    ],
  },
  {
    title: "macOS 13+",
    note: "Apple Silicon (M1+) hoặc Intel",
    links: [
      {
        label: ".dmg Apple Silicon",
        badge: "arm64",
        href: `${DL}/VibervnbotBundled-0.3.0-mac-arm64.dmg`,
      },
      {
        label: ".dmg Intel",
        badge: "x64",
        href: `${DL}/VibervnbotBundled-0.3.0-mac-x64.dmg`,
      },
    ],
  },
  {
    title: "Linux",
    note: "chmod +x AppImage rồi chạy",
    links: [
      {
        label: ".AppImage",
        badge: "x86_64",
        href: `${DL}/VibervnbotBundled-0.3.0-linux-x86_64.AppImage`,
      },
      {
        label: ".AppImage",
        badge: "arm64",
        href: `${DL}/VibervnbotBundled-0.3.0-linux-arm64.AppImage`,
      },
    ],
  },
];

const pricing = [
  {
    name: "Free",
    price: "0đ",
    soon: false,
    featured: false,
    desc: "Chạy trên máy tính của bạn.",
    feats: [
      "Không giới hạn số bot trên máy bạn",
      "Mọi mô hình AI với key / endpoint của bạn",
      "Mac, Windows và Linux",
      "Bot hoạt động khi máy đang bật",
    ],
    cta: "Tải về miễn phí",
    href: "#download",
    variant: "default" as const,
  },
  {
    name: "Starter",
    price: "Coming soon",
    soon: true,
    featured: false,
    desc: "Bot vẫn chạy khi laptop tắt — gói cloud khởi đầu.",
    feats: ["Always-on 24/7", "Máy cloud riêng cho bot", "Tài nguyên cloud mức cơ bản"],
    cta: "Coming soon",
    href: "#download",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "Coming soon",
    soon: true,
    featured: true,
    desc: "Bot 24/7 trên cloud khi laptop đóng.",
    feats: ["Always-on 24/7", "Máy cloud riêng cho bot", "Tài nguyên cloud cao hơn Starter"],
    cta: "Coming soon",
    href: "#download",
    variant: "brand" as const,
  },
  {
    name: "Max",
    price: "Coming soon",
    soon: true,
    featured: false,
    desc: "Máy cloud lớn nhất trong các gói.",
    feats: ["Always-on 24/7", "Máy cloud riêng cho bot", "Tài nguyên cloud cao nhất"],
    cta: "Coming soon",
    href: "#download",
    variant: "outline" as const,
  },
];

function SectionHead({
  kicker,
  title,
  desc,
  center,
}: {
  kicker: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-8 max-w-2xl", center && "mx-auto text-center")}>
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-brand">{kicker}</div>
      <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {desc ? <p className="text-muted-foreground">{desc}</p> : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="page-glow" aria-hidden />
      <SiteHeader />

      <main id="top" className="relative z-10 flex-1">
        {/* Hero */}
        <section className="px-4 pb-10 pt-14 sm:px-6 sm:pt-16">
          <div className="mx-auto grid w-full max-w-[1180px] items-start gap-10 lg:grid-cols-2">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-[rgba(46,204,113,0.3)] bg-[rgba(46,204,113,0.1)] text-[#b8f5d0]"
              >
                v0.3.0 · Desktop · Terminal · Nhắn tin
              </Badge>
              <h1 className="mb-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Trợ lý AI cá nhân
                <br />
                <span className="hero-gradient-text">chạy trên máy của bạn</span>
              </h1>
              <p className="mb-6 max-w-md text-base text-muted-foreground sm:text-lg">
                Desktop, terminal và các nền tảng nhắn tin. Tự host, tự chọn model, cập nhật bằng
                cách cài đè bản mới.
              </p>
              <div className="mb-5 flex flex-wrap gap-3">
                <a href="#download" className={cn(buttonVariants({ size: "lg" }), "btn-brand h-11 rounded-full border-0 px-6 font-semibold")}>
                  <Download className="size-4" />
                  Tải bộ cài
                </a>
                <a
                  href={RELEASES}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 rounded-full px-6")}
                >
                  Tất cả phiên bản & ghi chú
                  <ExternalLink className="size-3.5 opacity-70" />
                </a>
              </div>
              <p className="text-sm text-[#6b7385]">
                Installers & ghi chú phát hành:{" "}
                <a href={RELEASES} className="text-[#b7cbff] underline underline-offset-3">
                  GitHub Releases
                </a>
              </p>
              <div className="mt-6 flex flex-wrap gap-2" aria-label="Tích hợp">
                {integrations.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-border bg-white/[0.025] px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[320px] pb-12 pr-2 pt-3">
              <div className="mock-perspective relative z-10 rounded-[22px] border border-white/14 bg-gradient-to-b from-white/14 to-white/[0.03] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.55),0_0_80px_rgba(46,204,113,0.12)]">
                <Image
                  src="/mockups/mock-chat.png"
                  alt="ViberVN Bot — chat + browser preview"
                  width={1440}
                  height={900}
                  className="max-h-[460px] w-full rounded-[14px] border border-white/6 object-cover object-left-top"
                  priority
                />
              </div>
              <div className="absolute bottom-3 right-0 z-20 w-[132px] rotate-[5deg] rounded-[28px] border border-white/14 bg-[rgba(12,14,20,0.82)] p-1.5 shadow-2xl backdrop-blur-md">
                <Image
                  src="/mockups/mock-telegram.png"
                  alt="Telegram với ViberVN Bot"
                  width={240}
                  height={480}
                  className="rounded-[22px]"
                />
              </div>
              <div className="absolute bottom-0 left-0 z-20 w-[48%] -rotate-2 rounded-[14px] border border-white/14 bg-[rgba(12,14,20,0.85)] p-1.5 shadow-xl backdrop-blur-md">
                <Image
                  src="/mockups/mock-terminal.png"
                  alt="CLI vibervnbot"
                  width={640}
                  height={360}
                  className="rounded-[10px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What's new */}
        <section id="whats-new" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-[1180px]">
            <SectionHead
              kicker="v0.3.0"
              title="Có gì mới"
              desc="Tóm tắt từ ghi chú phát hành chính thức trên GitHub Releases (v0.3.0)."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {whatsNew.map((item) => (
                <Card key={item.title} className="glass border-border bg-transparent ring-0">
                  <CardHeader>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a href={TAG} className="text-[#b7cbff] underline underline-offset-3">
                Ghi chú v0.3.0
              </a>
              <a href={RELEASES} className="text-[#b7cbff] underline underline-offset-3">
                Mọi phiên bản
              </a>
            </div>
          </div>
        </section>

        {/* Features bento */}
        <section id="features" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-[1180px]">
            <SectionHead
              kicker="Workspace"
              title="Một app. Nhiều bề mặt."
              desc="Desktop đẹp như Linear, sức mạnh CLI, nhắn tin luôn bật qua gateway — chạy trên máy bạn."
            />
            <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
              <Card className="glass row-span-2 border-border bg-transparent ring-0 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Chat + live preview</CardTitle>
                  <CardDescription>
                    Giao việc bằng tiếng Việt — bot dựng trang, gửi báo cáo, soạn content. Panel
                    preview hiện ngay bên phải.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="overflow-hidden rounded-xl border border-border">
                    <Image
                      src="/mockups/mock-chat.png"
                      alt="Chat mockup"
                      width={1440}
                      height={900}
                      className="max-h-[520px] w-full object-cover object-left-top"
                    />
                  </div>
                </CardContent>
              </Card>

              {[
                {
                  title: "Automations",
                  desc: "Cron thật: báo cáo sáng, tóm tắt email, nhắc lịch.",
                  img: "/mockups/mock-automations.png",
                  alt: "Automations mockup",
                },
                {
                  title: "Plugins",
                  desc: "Connectors cho Telegram, Gmail, Drive, Slack…",
                  img: "/mockups/mock-plugins.png",
                  alt: "Plugins mockup",
                },
                {
                  title: "Telegram",
                  desc: "Nhắn bot khi laptop đóng — gateway polling.",
                  img: "/mockups/mock-telegram.png",
                  alt: "Telegram mockup",
                },
                {
                  title: "CLI",
                  desc: "status, chat, doctor, gateway — cùng config với desktop.",
                  img: "/mockups/mock-terminal.png",
                  alt: "Terminal mockup",
                },
              ].map((f) => (
                <Card key={f.title} className="glass border-border bg-transparent ring-0">
                  <CardHeader>
                    <CardTitle className="text-base">{f.title}</CardTitle>
                    <CardDescription>{f.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-xl border border-border">
                      <Image
                        src={f.img}
                        alt={f.alt}
                        width={800}
                        height={500}
                        className="h-40 w-full object-cover object-left-top"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section id="showcase" className="border-y border-border bg-white/[0.015] px-4 py-16 sm:px-6">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-12">
            <SectionHead
              kicker="Demo"
              title="Giao diện được thiết kế lại"
              desc="Mockup dark mode — mô phỏng workflow thật bằng tiếng Việt."
            />

            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-3">
                  Desktop
                </Badge>
                <h3 className="mb-2 text-2xl font-bold tracking-tight">
                  Từ ý tưởng đến preview trong một cửa sổ
                </h3>
                <p className="text-muted-foreground">
                  Sidebar Chat · Library · Automations · Plugins. Bot viết landing cafe, bạn chỉnh
                  CTA — panel localhost cập nhật ngay.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src="/mockups/mock-chat.png"
                  alt="Chat + preview"
                  width={1440}
                  height={900}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="order-2 overflow-hidden rounded-2xl border border-border shadow-2xl lg:order-1">
                <Image
                  src="/mockups/mock-automations.png"
                  alt="Automations"
                  width={1200}
                  height={800}
                  className="w-full"
                />
              </div>
              <div className="order-1 lg:order-2">
                <Badge variant="secondary" className="mb-3">
                  Automations
                </Badge>
                <h3 className="mb-2 text-2xl font-bold tracking-tight">Việc lặp lại chạy đúng giờ</h3>
                <p className="text-muted-foreground">
                  Báo cáo doanh thu 8:00, tóm tắt Gmail giờ hành chính, nhắc họp tối — Active /
                  Paused rõ ràng.
                </p>
              </div>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-3">
                  Messaging
                </Badge>
                <h3 className="mb-2 text-2xl font-bold tracking-tight">Telegram trong túi bạn</h3>
                <p className="text-muted-foreground">
                  Hỏi lịch, nhờ draft caption, gửi vào nhóm marketing — không cần mở desktop.
                </p>
              </div>
              <div className="mx-auto max-w-[360px] overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src="/mockups/mock-telegram.png"
                  alt="Telegram phone"
                  width={480}
                  height={960}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Download */}
        <section id="download" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-[1180px]">
            <SectionHead
              kicker="Tải về"
              title="Tải ViberVN Bot v0.3.0"
              desc="Asset chính thức trên GitHub Releases · v0.3.0. Mọi phiên bản & ghi chú tại trang Releases."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {platforms.map((p) => (
                <Card key={p.title} className="glass border-border bg-transparent ring-0">
                  <CardHeader>
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                    <CardDescription>
                      {p.note.includes("chmod") ? (
                        <>
                          <code className="font-mono text-xs">chmod +x</code> AppImage rồi chạy
                        </>
                      ) : (
                        p.note
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        className="flex items-center justify-between gap-2 rounded-xl border border-border bg-white/[0.03] px-3 py-2.5 text-sm transition hover:bg-white/[0.06]"
                      >
                        <span className="font-medium">{l.label}</span>
                        <Badge variant="secondary">{l.badge}</Badge>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a href={RELEASES} className="text-[#b7cbff] underline underline-offset-3">
                Tất cả phiên bản và ghi chú phát hành
              </a>
              <a href={TAG} className="text-[#b7cbff] underline underline-offset-3">
                Tag v0.3.0
              </a>
            </div>
            <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
              Bộ cài chưa được ký bởi nhà phát hành tin cậy; mỗi hệ điều hành sẽ cảnh báo một lần.
            </p>
          </div>
        </section>

        {/* Install */}
        <section id="install" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-[1180px]">
            <SectionHead
              kicker="Cài đặt"
              title="Hướng dẫn theo hệ điều hành"
              desc="Hướng dẫn cài theo từng hệ điều hành — giữ nguyên các lệnh PowerShell / shell chính thức."
            />
            <InstallTabs />
            <Card className="glass mt-6 border-border bg-transparent ring-0">
              <CardHeader>
                <CardTitle className="text-base">Cập nhật và cài lại</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tải bản mới ở trên và <strong className="text-foreground">cài đè</strong> lên bản
                  cũ; dữ liệu và cấu hình của bạn được giữ nguyên. Nếu ứng dụng báo thiếu hoặc hỏng
                  runtime, tải lại bộ cài từ GitHub Releases và cài lại.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-[1180px]">
            <SectionHead
              kicker="Bảng giá"
              title="Free trên máy bạn. Cloud sắp mở."
              center
            />
            <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
              Starter, Pro và Max bổ sung không gian cloud always-on — Coming soon.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {pricing.map((plan) => (
                <Card
                  key={plan.name}
                  className={cn(
                    "glass relative border-border bg-transparent ring-0",
                    plan.featured && "price-featured"
                  )}
                >
                  <CardHeader>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{plan.name}</Badge>
                      {plan.featured ? (
                        <Badge className="border-transparent bg-[rgba(46,204,113,0.18)] text-[#b8f5d0]">
                          Phổ biến nhất
                        </Badge>
                      ) : null}
                    </div>
                    <CardTitle className="text-3xl font-extrabold tracking-tight">
                      {plan.soon ? (
                        <span className="text-lg font-semibold text-brand">Coming soon</span>
                      ) : (
                        plan.price
                      )}
                    </CardTitle>
                    <CardDescription>{plan.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2.5">
                      {plan.feats.map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="border-0 bg-transparent">
                    <a
                      href={plan.href}
                      className={cn(
                        buttonVariants({
                          variant: plan.variant === "outline" ? "outline" : "default",
                          size: "lg",
                        }),
                        "w-full rounded-full",
                        plan.variant === "brand" && "btn-brand border-0"
                      )}
                    >
                      {plan.cta}
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CLI */}
        <section id="cli" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-[1180px]">
            <SectionHead kicker="CLI" title="Bắt đầu nhanh trên terminal" />
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr]">
              <div className="overflow-hidden rounded-2xl border border-border bg-[#0a0c12] shadow-xl">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                  <span className="text-[#6b7385]">
                    # Linux AppImage (sau khi tải từ GitHub Releases)
                  </span>
                  {"\n"}
                  <span className="text-[#b8f5d0]">
                    chmod +x VibervnbotBundled-*-linux-x86_64.AppImage
                  </span>
                  {"\n"}
                  <span className="text-[#b8f5d0]">
                    ./VibervnbotBundled-*-linux-x86_64.AppImage
                  </span>
                  {"\n\n"}
                  <span className="text-[#6b7385]"># Kiểm tra</span>
                  {"\n"}
                  <span className="text-[#b8f5d0]">vibervnbot status</span>
                  {"\n"}
                  <span className="text-[#b8f5d0]">
                    vibervnbot chat -q &quot;Xin chào&quot; --oneshot -Q
                  </span>
                </pre>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/mockups/mock-terminal.png"
                  alt="Styled terminal"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-[1180px]">
            <SectionHead kicker="FAQ" title="Câu hỏi thường gặp" center />
            <FaqSection />
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-20 pt-8 sm:px-6">
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="glass rounded-3xl border border-border px-6 py-12 text-center sm:px-12">
              <h2 className="mb-3 text-3xl font-bold tracking-tight">
                Sẵn sàng chạy bot trên máy bạn?
              </h2>
              <p className="mb-6 text-muted-foreground">
                Tải bản mới nhất từ GitHub Releases — Free, self-hosted.
              </p>
              <a
                href="#download"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "btn-brand h-11 rounded-full border-0 px-8 font-semibold"
                )}
              >
                Tải bộ cài ngay
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            © ViberVN Bot · v0.3.0 ·{" "}
            <a href={RELEASES} className="text-[#b7cbff] underline underline-offset-3">
              GitHub Releases
            </a>
          </div>
          <div className="flex gap-4">
            <a href={RELEASES} className="hover:text-foreground">
              Releases
            </a>
            <a href={TAG} className="hover:text-foreground">
              v0.3.0
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
