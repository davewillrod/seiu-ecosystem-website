"use client";

import { cn } from "@/lib/cn";

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="flex border-b border-black/10 mb-8 gap-0" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 border-b-2 -mb-px transition-colors",
            active === tab.id
              ? "border-purple-power text-purple-power"
              : "border-transparent text-black/30 hover:text-black/60"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
