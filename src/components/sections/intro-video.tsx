export function IntroVideo() {
  return (
    <section id="gioi-thieu" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300/90">
          Video giới thiệu
        </p>
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Xem ViberVN Bot chạy trên app thật
        </h2>
        <div className="ring-glow overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d12]">
          <video
            className="block aspect-video w-full"
            controls
            playsInline
            preload="metadata"
            poster="/video/viberbot-intro-poster.jpg"
            src="/video/viberbot-intro.mp4"
          >
            Video giới thiệu ViberVN Bot, có phụ đề và lồng tiếng tiếng Việt.
          </video>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Dựng từ ảnh chụp và màn hình app thật, có lời thoại tiếng Việt.
        </p>
      </div>
    </section>
  );
}
