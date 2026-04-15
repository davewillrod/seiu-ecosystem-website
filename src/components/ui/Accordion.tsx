"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "border border-black/10 rounded-xl overflow-hidden divide-y divide-black/10",
        className
      )}
    >
      {items.map((item, i) => (
        <div key={i} className="bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between px-5 py-3.5 text-left group"
          >
            <span className="text-sm font-medium text-black">{item.title}</span>
            <ChevronDown
              size={14}
              className={cn(
                "text-black/30 flex-shrink-0 transition-transform",
                open === i ? "rotate-180" : ""
              )}
              aria-hidden="true"
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm font-light text-black/50 leading-relaxed">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
