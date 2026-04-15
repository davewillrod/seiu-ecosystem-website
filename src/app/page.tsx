import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { PageContent } from "@/components/layout/PageContent";
import { navSections } from "@/lib/nav";

export default function HomePage() {
  const workstreams = navSections.filter((s) => s.label !== "Overview");

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
          A comprehensive breakdown of SEIU Healthcare's current and future
          technology state — from fragmented platforms to a unified member
          lifecycle system. Organized into four workstreams covering CRM &amp;
          platform, home care, content &amp; frontend, and governance.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-power" />
            <span className="font-mono text-[10px] text-black/40">
              70,000+ members
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-power" />
            <span className="font-mono text-[10px] text-black/40">
              7 ecosystem nodes
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-power" />
            <span className="font-mono text-[10px] text-black/40">
              4 workstreams
            </span>
          </div>
        </div>
      </div>

      {/* Context strip */}
      <div
        className="bg-purple-power text-white rounded-xl p-5 mb-12 animate-fade-up"
        style={{ animationDelay: "60ms" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
          Context
        </p>
        <p className="text-sm font-light leading-relaxed text-white/80">
          SEIU Healthcare currently operates across{" "}
          <strong className="font-semibold text-white">
            eight disconnected platforms
          </strong>{" "}
          and{" "}
          <strong className="font-semibold text-white">
            five separate login environments
          </strong>
          . A member who touches the Training Centre, WorkersFirst, My65+, and
          the mobile app is treated as four different people. This site documents
          the architecture to unify them — from CRM selection through SSO
          deployment, content infrastructure, and governance.
        </p>
      </div>

      {/* Workstream sections */}
      {workstreams.map((section, si) => (
        <section
          key={section.label}
          className="mb-12 animate-fade-up"
          style={{ animationDelay: `${(si + 2) * 60}ms` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/30">
              {section.label}
            </span>
            <span className="flex-1 h-px bg-black/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {section.items.map((item) => (
              <ArtifactCard
                key={item.href}
                workstream={item.workstream}
                title={item.label}
                description={getArtifactDescription(item.href)}
                audience={item.audience}
                status={item.status}
                href={item.href}
              />
            ))}
          </div>
        </section>
      ))}
    </PageContent>
  );
}

function getArtifactDescription(href: string): string {
  const descriptions: Record<string, string> = {
    "/ws1/unified-data-model":
      "Member record schema, domain ownership, and the canonical identity model across all eight ecosystem nodes.",
    "/ws1/sso-identity":
      "IdP selection, Auth0/Okta evaluation, phased SSO rollout, and identity resolution vs authentication federation.",
    "/ws1/node-integration-map":
      "Weighted connection map of all ecosystem nodes — directional flows, trigger events, and CRM integration requirements.",
    "/ws1/crm-agency-brief":
      "Technical brief for the CRM agency scoping engagement — architecture requirements, platform evaluation, and open questions.",
    "/ws2/campaign-brief":
      "Phase 1 Home Care campaign strategy — the WSIB acquisition window, My65+ enrollment funnel, and three-phase campaign arc.",
    "/ws2/worker-personas":
      "Detailed persona profiles for the four core Home Care worker archetypes entering the SEIU ecosystem.",
    "/ws2/onboarding-sequence":
      "60-day automated onboarding sequence — CRM trigger logic, communication cadence, and conversion checkpoints.",
    "/ws3/content-operations":
      "Strapi content hub architecture, content type registry, editorial ownership model, and multi-consumer publishing flows.",
    "/ws3/frontend-architecture":
      "Three distinct frontend contexts — master site, campaign microsites, and future member app — with stack decisions and rationale.",
    "/ws4/training-centre-governance":
      "Training Centre governance framework — institutional alignment, operator accountability, and SEIU strategic ownership.",
    "/ws4/investment-case":
      "Economic case for the ecosystem infrastructure investment — lifetime value modelling and acquisition efficiency multipliers.",
    "/ws4/programme-roadmap":
      "Phased programme roadmap across all four workstreams — milestones, dependencies, and delivery sequencing through 2027.",
  };
  return descriptions[href] ?? "Artifact in progress.";
}
