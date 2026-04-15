import Link from "next/link";
import { cn } from "@/lib/cn";
import type { NavSection as NavSectionType } from "@/types";

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
                  className="flex items-center px-5 py-1.5 text-[13px] text-black/20 cursor-default"
                  aria-disabled="true"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-5 py-1.5 text-[13px] transition-colors",
                    isActive
                      ? "text-purple-power bg-purple-power/[0.06] border-l-2 border-purple-power font-normal pl-[18px]"
                      : "text-black/40 hover:text-black hover:bg-black/[0.04]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
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
