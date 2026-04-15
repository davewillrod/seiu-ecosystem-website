import { cn } from "@/lib/cn";

export function Divider({ className }: { className?: string }) {
  return (
    <hr
      className={cn("border-t border-black/10 my-9", className)}
      aria-hidden="true"
    />
  );
}
