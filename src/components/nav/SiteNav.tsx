"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navSections } from "@/lib/nav";
import { NavSection } from "./NavSection";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Site navigation"
      className="fixed left-0 top-0 h-screen w-[248px] bg-white border-r border-black/10 flex flex-col overflow-y-auto z-50"
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-black/10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 leading-none mb-2.5">
          Frameworks &amp; Co.
        </p>
        <Link href="/" className="block">
          <Image
            src="/seiu-logo.svg"
            alt="SEIU Healthcare"
            width={148}
            height={33}
            priority
          />
        </Link>
        <p className="font-mono text-[10px] text-black/25 mt-2 leading-none">
          Ecosystem Architecture
        </p>
      </div>

      {/* Nav sections */}
      <div className="flex-1 py-4">
        {navSections.map((section) => (
          <NavSection
            key={section.label}
            section={section}
            currentPath={pathname}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-black/10">
        <p className="font-mono text-[10px] text-black/25 leading-relaxed">
          April 2026 · Confidential
        </p>
        <p className="font-mono text-[10px] text-black/20 leading-relaxed mt-0.5">
          SEIU Healthcare
        </p>
      </div>
    </nav>
  );
}
