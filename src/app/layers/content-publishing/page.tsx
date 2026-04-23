"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { TabBar } from "@/components/ui/TabBar";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { DataTable } from "@/components/artifacts/DataTable";
import { FlowSteps } from "@/components/artifacts/FlowSteps";
import { Flag } from "@/components/artifacts/Flag";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "boundaries", label: "Boundaries" },
  { id: "integration", label: "Integration" },
  { id: "transition", label: "Transition" },
];

export default function ContentPublishingPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 8 · Content & Publishing"
        title="Content & Publishing"
        titleAccent="Publishing"
        description="The centralized editorial and publishing layer — managing, structuring, and distributing content across all SEIU surfaces. Anchored by Strapi as the canonical content hub."
        meta={[
          { label: "Layer", value: "8 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
        icon={<FileText size={20} />}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="animate-fade-up">
          {/* Content flow diagram */}
          <svg
            role="img"
            aria-label="Content & Publishing layer — Strapi as hub distributing to all surfaces"
            viewBox="0 0 700 320"
            width="100%"
            className="mb-10"
          >
            <defs>
              <marker id="cp-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.2)" />
              </marker>
            </defs>

            {/* Inputs — left */}
            <text x="14" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">CONTENT AUTHORS</text>
            {[
              { label: "Editorial Team", sub: "Articles · Events · Campaigns" },
              { label: "Campaign Team", sub: "Microsites · Promotions" },
              { label: "Program Owners", sub: "Training · WorkersFirst projections" },
            ].map(({ label, sub }, i) => {
              const y = 28 + i * 74;
              return (
                <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${i * 60}ms` }}>
                  <rect x="14" y={y} width="172" height="56" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  <text x="26" y={y + 28} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">{label}</text>
                  <text x="26" y={y + 44} fontFamily="'DM Mono', monospace" fontSize="8.5" fill="rgba(0,0,0,0.3)">{sub}</text>
                  <line x1="186" y1={y + 28} x2="256" y2={y + 28} stroke="rgba(0,0,0,0.15)" strokeWidth="1" markerEnd="url(#cp-arrow)" />
                </g>
              );
            })}

            {/* Strapi hub */}
            <g style={{ animation: "fade-up 0.4s ease both", animationDelay: "60ms" }}>
              <circle cx="330" cy="160" r="62" fill="#411175" fillOpacity="0.07" stroke="#411175" strokeOpacity="0.25" strokeWidth="1.5" />
              <text x="330" y="152" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#411175">Strapi</text>
              <text x="330" y="169" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#411175" fillOpacity="0.6)">Content Hub</text>
              <text x="330" y="184" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#411175" fillOpacity="0.6)">REST / GraphQL API</text>
            </g>

            {/* Consumer surfaces — right */}
            <text x="460" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">CONTENT SURFACES</text>
            {[
              { label: "Master Marketing Site", sub: "Next.js · ISR · seiuhealthcare.ca", delay: 160 },
              { label: "Campaign Microsites", sub: "Framer or Next.js · custom domains", delay: 220 },
              { label: "Mobile App", sub: "Editorial content · announcements", delay: 280 },
              { label: "Applications", sub: "WorkersFirst · Training · My65+", delay: 340 },
            ].map(({ label, sub, delay }, i) => {
              const y = 28 + i * 70;
              return (
                <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${delay}ms` }}>
                  <line x1="392" y1={y + 22} x2="456" y2={y + 22} stroke="rgba(0,0,0,0.15)" strokeWidth="1" markerEnd="url(#cp-arrow)" />
                  <rect x="456" y={y} width="230" height="46" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  <text x="468" y={y + 22} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="#000000">{label}</text>
                  <text x="468" y={y + 36} fontFamily="'DM Mono', monospace" fontSize="8.5" fill="rgba(0,0,0,0.3)">{sub}</text>
                </g>
              );
            })}
          </svg>

          <section className="mb-10">
            <SectionLabel number="01" label="Core principle" />
            <Callout variant="accent" className="mb-4">
              <strong>Content is authored once and distributed everywhere.</strong> One canonical content record in Strapi carries consumer flags that determine where it should appear — mobile, marketing site, campaigns, applications. No duplication.
            </Callout>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Strapi target-state scope" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-[10px] text-purple-power uppercase tracking-wider mb-3">Strapi is</p>
                {[
                  "Content management system",
                  "Content distribution layer",
                  "Editorial projection layer for selected operational entities",
                  "Campaign content engine",
                  "Structured reference content store",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5 border-b border-black/6">
                    <span className="w-1 h-1 rounded-full bg-purple-power flex-shrink-0" />
                    <span className="text-sm font-light text-black/70">{item}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-3">Strapi is not</p>
                {[
                  "The long-term IdP or auth engine",
                  "The institutional policy engine",
                  "The workflow or case management system",
                  "The administrative registry system",
                  "The source of truth for operational data",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5 border-b border-black/6">
                    <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                    <span className="text-sm font-light text-black/50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Current state issues" />
            <Callout>
              Strapi currently plays a broader role than its desired long-term scope. It mediates authentication and authorization rules for the mobile app, and carries segmentation logic tied to job function, employer, and bargaining unit. The target architecture requires <strong>policy extraction</strong>, not just auth replacement.
            </Callout>
          </section>
        </div>
      )}

      {activeTab === "boundaries" && (
        <div className="animate-fade-up">
          <Callout variant="accent" className="mb-6">
            <strong>Owns:</strong> Editorial content (articles, events, campaigns, FAQs, petitions), marketing pages and site structure, campaign microsites, content schemas and models, content delivery APIs, editorial projections of selected operational entities, content-level analytics instrumentation.
          </Callout>

          <Callout className="mb-6">
            <strong>Does not own:</strong> Authentication (IdP), identity (Identity Domain), membership data (Administrative Registry), lifecycle logic (Member Intelligence), operational application data (Applications layer). Workflow data is never treated as content.
          </Callout>

          <SectionLabel number="01" label="Content model — four distinct domains" />
          <DataTable
            headers={["Content type", "Who authors it", "Lives in Strapi?", "Notes"]}
            rows={[
              ["Editorial content", "Editorial / campaign teams", "Yes — primary", "Articles, events, campaigns, FAQs, petitions, surveys"],
              ["Editorial projections", "Program / operational owners", "Yes — projection layer", "Training programs, WorkersFirst opportunities — one-way sync from operational systems"],
              ["Reference content", "Taxonomy stewards", "Yes — structured data", "Sectors, units, regions, grievance types, collective agreements"],
              ["Workflow / application data", "System-generated", "No", "Submissions, RSVPs, grievances, user actions — belong to Workflow / Applications"],
            ]}
            className="mb-6"
          />

          <SectionLabel number="02" label="Critical rule — one-way projection only" />
          <Callout>
            <strong>Operational → Strapi only.</strong> Operational systems may project certain entities into Strapi for editorial publication. Strapi never writes back to operational systems. The operational system remains the source of truth for operational state.
          </Callout>
        </div>
      )}

      {activeTab === "integration" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Analytics integration" />
            <DataTable
              headers={["Component", "Implementation"]}
              rows={[
                ["Analytics collection", "Segment or RudderStack — event collection layer"],
                ["Marketing analytics", "GA4 — single property, cross-domain tracking enabled"],
                ["Tag management", "Single GTM container across all surfaces"],
                ["UTM attribution", "Captured at entry, passed through form submissions and backend ingestion"],
                ["Event Backbone", "Analytics events feed into backbone → Member Intelligence for lifecycle signals"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Frontend composition" />
            <DataTable
              headers={["Surface", "Stack", "Content source"]}
              rows={[
                ["Master marketing site (seiuhealthcare.ca)", "Next.js + ISR", "Strapi via REST/GraphQL"],
                ["Campaign microsites", "Framer (default) or Next.js for complex campaigns", "Strapi content models"],
                ["Mobile app content", "Native consumption via Strapi API", "Strapi content bundles"],
                ["Future member web app (app.seiuhealthcare.ca)", "Next.js", "Strapi + core platform APIs"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Event backbone interaction" />
            <p className="text-sm font-light text-black/60 leading-relaxed mb-3">
              Strapi is a limited participant in the Event Backbone — not an orchestration engine.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-grey rounded-lg p-4">
                <p className="font-mono text-[10px] text-purple-power uppercase tracking-wider mb-2">Events Strapi may emit</p>
                {["content.published", "campaign.updated"].map((e) => (
                  <div key={e} className="flex items-center gap-2 py-1">
                    <span className="w-1 h-1 rounded-full bg-purple-power flex-shrink-0" />
                    <code className="text-xs font-mono text-black/60">{e}</code>
                  </div>
                ))}
              </div>
              <div className="bg-grey rounded-lg p-4">
                <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-2">Events Strapi may consume</p>
                {["program.published (Training)", "opportunity.published (WF)"].map((e) => (
                  <div key={e} className="flex items-center gap-2 py-1">
                    <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                    <code className="text-xs font-mono text-black/50">{e}</code>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === "transition" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Migration phases" />
            <FlowSteps
              steps={[
                {
                  title: "Phase 1 — Centralize content and standardize publishing",
                  body: "Centralize editorial content in Strapi. Reduce duplication across marketing surfaces. Define content models and consumer flags. Introduce serverless intake endpoints for microsite and campaign form submissions.",
                },
                {
                  title: "Phase 2 — Master site integration and intake formalization",
                  body: "Integrate master site with Strapi. Standardize content schemas and publishing workflows. Begin routing prospect submissions into Identity + Member Intelligence flows.",
                },
                {
                  title: "Phase 3 — Mature campaign and microsite operating model",
                  body: "Migrate microsites to reusable Framer and/or Next.js patterns. Standardize analytics, attribution, and UTM propagation. Formalize submission routing by form type.",
                },
                {
                  title: "Phase 4 — Finalize Strapi as content-only system",
                  body: "Remove remaining business logic and non-editorial workflow responsibilities from Strapi. Keep Strapi as the canonical editorial content and publishing layer.",
                },
              ]}
            />
          </section>

          <section className="mb-6">
            <SectionLabel number="02" label="Open questions" />
            <div className="flex flex-col gap-3">
              <Flag>
                <strong>Design system — critical gap</strong>
                The ecosystem currently lacks a unified design system. The target state must introduce Figma-based design tokens, shared component libraries, and reusable patterns across the master site, microsites, and applications. Without this, campaign velocity and brand consistency will not scale.
              </Flag>
              <Flag>
                <strong>Webflow vs Next.js long-term split</strong>
                The long-term split between Framer, Webflow, and custom Next.js for campaign surfaces should be explicitly decided. Each has different implications for component reuse, editorial control, and deployment velocity.
              </Flag>
              <Flag>
                <strong>Localization strategy</strong>
                SEIU serves a bilingual and multilingual membership. A content localization model for Strapi and all surface types must be defined — especially for campaign microsites targeting Home Care workers.
              </Flag>
            </div>
          </section>
        </div>
      )}
    </PageContent>
  );
}
