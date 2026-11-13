"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { DOCS_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "#features", label: "Tính năng" },
  { href: "#how", label: "Cách dùng" },
  { href: "#channels", label: "Nhắn tin" },
  { href: "#pricing", label: "Bảng giá" },
  { href: "#faq", label: "Hỏi đáp" },
  { href: DOCS_URL, label: "Tài liệu" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label="ViberVN Bot">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 text-sm text-muted-foreground lg:flex" aria-label="Điều hướng">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#download"
            className={cn(
              buttonVariants({ size: "sm" }),
              "btn-brand hidden h-9 rounded-full border-0 px-4 font-semibold sm:inline-flex"
            )}
          >
            Tải miễn phí
            <ArrowRight className="size-3.5" />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Mở menu" />}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-popover/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Điều hướng mobile">
                {links.map((l) => (
                  <SheetClose
                    key={l.href}
                    render={
                      <a
                        href={l.href}
                        className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      />
                    }
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <a
                      href="#download"
                      className={cn(buttonVariants({ size: "lg" }), "btn-brand mt-3 w-full rounded-full border-0")}
                    />
                  }
                  onClick={() => setOpen(false)}
                >
                  Tải miễn phí
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
