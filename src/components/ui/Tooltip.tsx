"use client";

interface TooltipProps {
  trigger: React.ReactNode;
  content: string;
}

export function Tooltip({ trigger, content }: TooltipProps) {
  return (
    <span className="relative group cursor-help border-b border-dashed border-black/20">
      {trigger}
      <span
        role="tooltip"
        className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-black/12 rounded-lg px-3 py-2.5 text-xs font-light text-black/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
      >
        {content}
      </span>
    </span>
  );
}
