"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export function Tabs({ tabs, className }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("", className)}>
      {/* Tab bar */}
      <div
        className="flex border-b border-black/10 mb-5 gap-0"
        role="tablist"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            aria-controls={`tabpanel-${i}`}
            id={`tab-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              "px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-colors border-b-2 -mb-px",
              active === i
                ? "text-purple-power border-purple-power"
                : "text-black/30 border-transparent hover:text-black/60"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`tabpanel-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={active !== i}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
