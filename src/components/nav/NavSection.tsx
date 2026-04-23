import Link from "next/link";
import { Database, Fingerprint, ShieldCheck, Zap, BrainCircuit, Workflow, Layers, FileText, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { NavSection as NavSectionType } from "@/types";

const LAYER_ICONS: Record<number, LucideIcon> = {
  1: Database,
  2: Fingerprint,
  3: ShieldCheck,
  4: Zap,
  5: BrainCircuit,
  6: Workflow,
  7: Layers,
  8: FileText,
};

interface NavSectionProps {
  section: NavSectionType;
  currentPath: string;
}

export function NavSection({ section, currentPath }: NavSectionProps) {
  return (
    <div className="mb-5">
      <p className="px-5 mb-1.5 font-mono text-[9px] uppercase tracking-widest text-black/25 leading-none">
        {section.label}
      </p>
      <ul role="list">
        {section.items.map((item) => {
          const isActive = currentPath === item.href;
          const isSoon = item.status === "soon";

          return (
            <li key={item.href}>
              {isSoon ? (
                <span
                  className="flex items-center gap-2 px-5 py-1.5 text-[13px] text-black/20 cursor-default"
                  aria-disabled="true"
                >
                  {item.layerNumber !== undefined && (
                    <span className="flex-shrink-0 w-4 h-4 rounded-sm bg-black/5 flex items-center justify-center font-mono text-[9px] text-black/20">
                      {item.layerNumber}
                    </span>
                  )}
                  {item.layerNumber !== undefined && (() => {
                    const Icon = LAYER_ICONS[item.layerNumber!];
                    return Icon ? <Icon size={11} className="text-black/15 flex-shrink-0" /> : null;
                  })()}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-5 py-1.5 text-[13px] transition-colors",
                    isActive
                      ? "text-purple-power bg-purple-power/[0.06] border-l-2 border-purple-power font-normal pl-[18px]"
                      : "text-black/40 hover:text-black hover:bg-black/[0.04]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.layerNumber !== undefined && (
                    <span
                      className={cn(
                        "flex-shrink-0 w-4 h-4 rounded-sm flex items-center justify-center font-mono text-[9px]",
                        isActive
                          ? "bg-purple-power/10 text-purple-power"
                          : "bg-black/6 text-black/30"
                      )}
                    >
                      {item.layerNumber}
                    </span>
                  )}
                  {item.layerNumber !== undefined && (() => {
                    const Icon = LAYER_ICONS[item.layerNumber!];
                    return Icon ? (
                      <Icon
                        size={11}
                        className={cn(
                          "flex-shrink-0",
                          isActive ? "text-purple-power" : "text-black/25"
                        )}
                      />
                    ) : null;
                  })()}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
