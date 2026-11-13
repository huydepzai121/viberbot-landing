import { cn } from "@/lib/utils";

export function SectionHead({
  kicker,
  title,
  desc,
  center,
}: {
  kicker: string;
  title: React.ReactNode;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", center && "mx-auto text-center")}>
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300/90">{kicker}</div>
      <h2 className="text-balance text-3xl font-bold tracking-[-0.03em] sm:text-[2.6rem] sm:leading-[1.1]">{title}</h2>
      {desc ? <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">{desc}</p> : null}
    </div>
  );
}
