"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/artifacts/Badge";

interface ExpandableCardProps {
  label?: string;
  title: string;
  children: React.ReactNode;
}

export function ExpandableCard({ label, title, children }: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-black/10 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-black/2 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {label && <Badge variant="purple">{label}</Badge>}
          <span className="text-sm font-medium text-black">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-black/30 transition-transform flex-shrink-0",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-black/8 text-sm font-light text-black/50 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
