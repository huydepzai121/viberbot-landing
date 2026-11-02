"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "#whats-new", label: "Mới" },
  { href: "#features", label: "Tính năng" },
  { href: "#showcase", label: "Demo" },
  { href: "#download", label: "Tải về" },
  { href: "#install", label: "Cài đặt" },
  { href: "#pricing", label: "Bảng giá" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/65 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-[11px] bg-gradient-to-br from-[#2ecc71] to-[#59d6ff] text-[0.78rem] font-extrabold text-[#04110a] shadow-[0_10px_30px_rgba(46,204,113,0.35)]">
            VN
          </span>
          <span>ViberVN Bot</span>
        </a>

        <nav className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex" aria-label="Điều hướng">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#download"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Tải v0.3.0
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Mở menu" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-popover/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Điều hướng mobile">
                {links.map((l) => (
                  <SheetClose
                    key={l.href}
                    render={<a href={l.href} className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" />}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <a
                      href="#download"
                      className={cn(buttonVariants({ size: "lg" }), "mt-3 w-full")}
                    />
                  }
                  onClick={() => setOpen(false)}
                >
                  Tải v0.3.0
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
