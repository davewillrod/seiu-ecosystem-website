import { cn } from "@/lib/cn";

interface BadgeProps {
  variant?: "purple" | "yellow" | "muted" | "live" | "soon";
  children: React.ReactNode;
  className?: string;
}

const variantClasses = {
  purple: "bg-purple-power/[0.08] text-purple-power border-purple-power/20",
  yellow: "bg-yellow/20 text-black border-yellow/40",
  muted: "bg-black/5 text-black/50 border-black/10",
  live: "bg-purple-power/[0.08] text-purple-power border-purple-power/20",
  soon: "bg-black/5 text-black/30 border-black/[0.08]",
};

export function Badge({ variant = "muted", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] px-2 py-0.5 rounded-sm border inline-flex items-center",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
