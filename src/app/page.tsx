import { SiteHeader } from "@/components/site-header";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Features } from "@/components/sections/features";
import { How } from "@/components/sections/how";
import { Channels } from "@/components/sections/channels";
import { DownloadSection } from "@/components/sections/download";
import { Pricing } from "@/components/sections/pricing";
import { FinalCta, SiteFooter } from "@/components/sections/cta-footer";
import { SectionHead } from "@/components/sections/section-head";

export default function HomePage() {
  return (
    <>
      <div className="page-glow" aria-hidden />
      <SiteHeader />
      <main id="top" className="relative z-10 flex-1">
        <Hero shot="/screens/04-chat-reply.webp" />
        <Marquee />
        <Features />
        <How />
        <Channels />
        <DownloadSection />
        <Pricing />
        <section id="faq" className="scroll-mt-20 px-4 py-24 sm:px-6">
          <div className="mx-auto w-full max-w-[1200px]">
            <SectionHead kicker="Hỏi đáp" title="Câu hỏi thường gặp" center />
            <FaqSection />
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
