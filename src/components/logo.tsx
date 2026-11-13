import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 font-semibold tracking-tight", className)}>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,#6ee7b7,#22d3ee)] shadow-[0_8px_24px_-6px_rgba(52,211,153,0.6)]">
        <svg viewBox="0 0 24 24" className="size-[18px] text-[#03130d]" fill="none" aria-hidden>
          <rect x="4" y="7" width="16" height="11" rx="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="9.5" cy="12.5" r="1.4" fill="currentColor" />
          <circle cx="14.5" cy="12.5" r="1.4" fill="currentColor" />
          <path d="M12 7V4.5M12 4.5h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span>
        ViberVN <span className="text-muted-foreground">Bot</span>
      </span>
    </span>
  );
}
