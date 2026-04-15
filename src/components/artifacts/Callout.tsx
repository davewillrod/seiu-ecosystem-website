import { cn } from "@/lib/cn";

interface CalloutProps {
  variant?: "default" | "accent";
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  variant = "default",
  children,
  className,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-lg px-4 py-3.5 text-sm leading-relaxed",
        variant === "default"
          ? "bg-grey border border-black/10 text-black/50 [&_strong]:text-black [&_strong]:font-medium"
          : "bg-purple-power/5 border border-purple-power/20 text-black/60 [&_strong]:text-purple-power [&_strong]:font-medium",
        className
      )}
    >
      {children}
    </div>
  );
}
