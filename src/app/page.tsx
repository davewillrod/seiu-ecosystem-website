import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageContent } from "@/components/layout/PageContent";
import { navSections } from "@/lib/nav";

export default function HomePage() {
  const overviewItems = navSections.find((s) => s.label === "Overview")?.items ?? [];
  const layerItems = navSections.find((s) => s.label === "Layers")?.items ?? [];

  return (
    <PageContent>
      {/* Hero */}
      <div className="mb-14 animate-fade-up">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-0.5 h-5 bg-purple-power rounded-full flex-shrink-0" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 leading-none">
            Frameworks &amp; Co. · April 2026
          </p>
        </div>

        <h1 className="text-5xl font-bold leading-tight mb-4">
          SEIU Healthcare
          <br />
          <em className="font-bold italic text-purple-power not-italic">
            Ecosystem
          </em>{" "}
          Architecture
        </h1>

        <p className="text-sm font-light text-black/50 leading-relaxed max-w-xl mb-6">
          A strategic architecture brief documenting SEIU Healthcare's transformation from fragmented platforms to a unified member lifecycle system — organized across eight interconnected layers, each with clear domain ownership and integration boundaries.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-power" />
            <span className="font-mono text-[10px] text-black/40">350,000+ member records</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-power" />
            <span className="font-mono text-[10px] text-black/40">8 ecosystem layers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-power" />
            <span className="font-mono text-[10px] text-black/40">8 disconnected platforms today</span>
          </div>
        </div>
      </div>

      {/* Context strip */}
      <div
        className="bg-purple-power text-white rounded-xl p-5 mb-12 animate-fade-up"
        style={{ animationDelay: "60ms" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
          Strategic context
        </p>
        <p className="text-sm font-light leading-relaxed text-white/80">
          SEIU Healthcare currently operates across{" "}
          <strong className="font-semibold text-white">eight disconnected platforms</strong> and{" "}
          <strong className="font-semibold text-white">five separate login environments</strong>.
          A worker who touches the Training Centre, WorkersFirst, My65+, and the mobile app may be
          treated as four different people. This site documents the architecture to unify them —
          through shared identity, a centralized authentication plane, an event backbone, and a
          member intelligence layer that makes the ecosystem operate as one institution.
        </p>
      </div>

      {/* Overview section */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/30">Overview</span>
          <span className="flex-1 h-px bg-black/10" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {overviewItems.map((item) =>
            item.status === "soon" ? (
              <div
                key={item.href}
                className="bg-grey/50 border border-black/[0.06] rounded-xl p-5 opacity-60"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black/25">
                    Overview
                  </span>
                  <Clock size={12} className="text-black/20" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium text-black/40 leading-snug mb-1.5">{item.label}</h3>
                <p className="text-xs font-light text-black/30 leading-snug">Coming soon.</p>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white border border-black/10 rounded-xl p-5 block hover:border-purple-power/30 hover:-translate-y-px transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black/30">Overview</span>
                  <ArrowUpRight
                    size={14}
                    className="text-black/20 group-hover:text-purple-power group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm font-medium text-black leading-snug mb-1.5">{item.label}</h3>
                <p className="text-xs font-light text-black/50 leading-snug">
                  {overviewDescriptions[item.href] ?? ""}
                </p>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Layers section */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "180ms" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/30">Layers</span>
          <span className="flex-1 h-px bg-black/10" />
        </div>
        <div className="flex flex-col gap-2">
          {layerItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-white border border-black/10 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-purple-power/30 hover:-translate-y-px transition-all"
            >
              <div className="w-7 h-7 rounded-md bg-purple-power/8 border border-purple-power/15 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-[10px] text-purple-power font-medium">
                  {item.layerNumber}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black leading-snug">{item.label}</p>
                <p className="text-xs font-light text-black/40 leading-snug mt-0.5">
                  {layerDescriptions[item.href] ?? ""}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="text-black/20 group-hover:text-purple-power flex-shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>
    </PageContent>
  );
}

const overviewDescriptions: Record<string, string> = {
  "/overview/overview": "Strategic thesis, ecosystem purpose, and the foundational principles governing the entire architecture.",
  "/overview/current-state": "Current-state platform landscape — eight disconnected systems, five login environments, and the pain points driving transformation.",
  "/overview/future-state": "Target-state domain model — the eight-layer dependency stack, SEIU Core Platform, and domain ownership boundaries.",
  "/overview/roadmap": "Phased implementation sequence from foundation through mature target state.",
  "/overview/unified-staff-portal": "Unified web interface for SEIU staff — single operational surface over the entire distributed architecture.",
};

const layerDescriptions: Record<string, string> = {
  "/layers/administrative-registry": "Official member registry, dues processing, employer taxonomy, and Finance-controlled membership workflows.",
  "/layers/identity": "Canonical person record, external identifier crosswalks, merge/reconciliation logic, and person continuity.",
  "/layers/idp-sso": "Centralized authentication plane, MFA, JWT token issuance, and SSO across all ecosystem nodes.",
  "/layers/event-backbone": "Shared event transport, publish/subscribe routing, reliable fan-out, and institutional integration contracts.",
  "/layers/member-intelligence": "Lifecycle state, engagement scoring, cohort orchestration, and next-best-action trigger logic.",
  "/layers/workflow-case": "Internal operational workflows, member service cases, grievance handling, tasks, queues, and audit trails.",
  "/layers/applications-nodes": "Mobile app, WorkersFirst, Training Centre, My65+, and the future member web app — execution and experience layer.",
  "/layers/content-publishing": "Strapi editorial content hub, campaign publishing, content projections, and multi-surface distribution.",
};
