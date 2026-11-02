import { cn } from "@/lib/utils";

/** Intentional placeholder for future client photography. */
export function PhotoSlot({ ratio = "3/4", label, className }: { ratio?: string; label?: string; className?: string }) {
  return (
    <div className={cn("photo-slot w-full", className)} style={{ aspectRatio: ratio }}>
      <div className="absolute inset-3 border border-gold/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary/40">
        <span className="font-serif text-3xl italic">A</span>
        {label && <span className="eyebrow text-[0.58rem]">{label}</span>}
      </div>
    </div>
  );
}
