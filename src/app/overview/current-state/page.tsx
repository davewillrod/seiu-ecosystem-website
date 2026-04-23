import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { StatCallout } from "@/components/artifacts/StatCallout";
import { Flag } from "@/components/artifacts/Flag";

export default function CurrentStatePage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="Overview · Current State"
        title="Current State"
        titleAccent="State"
        description="SEIU currently operates as a connected institution in strategy, but as a fragmented system landscape in execution. Eight or more disconnected platforms, five separate login environments, and no unified identity layer."
        meta={[
          { label: "Status", value: "Documented" },
          { label: "Replaces", value: "Live operational systems" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Platform map diagram */}
      <div className="mb-12 animate-fade-up">
        <svg
          role="img"
          aria-label="Current-state fragmented platform landscape"
          viewBox="0 0 700 420"
          width="100%"
        >
          <defs>
            <marker id="cs-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.2)" />
            </marker>
          </defs>

          {/* Background label */}
          <rect x="0" y="0" width="700" height="420" rx="8" fill="#ffffff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          <text x="14" y="22" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.2)">CURRENT STATE — FRAGMENTED PLATFORM LANDSCAPE</text>

          {/* Unionware — center-left, primary */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "0ms" }}>
            <rect x="24" y="50" width="160" height="52" rx="6" fill="#411175" fillOpacity="0.06" stroke="#411175" strokeOpacity="0.25" strokeWidth="1" />
            <text x="104" y="72" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#411175">Unionware</text>
            <text x="104" y="88" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.5">System of record · 350k+ records</text>
          </g>

          {/* Mobile App */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "60ms" }}>
            <rect x="270" y="50" width="140" height="52" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            <text x="340" y="72" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">Mobile App</text>
            <text x="340" y="88" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.35)">React Native · Node.js · Strapi</text>
          </g>

          {/* Strapi */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "120ms" }}>
            <rect x="490" y="50" width="140" height="52" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            <text x="560" y="72" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">Strapi</text>
            <text x="560" y="88" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.35)">CMS + auth rules + segmentation</text>
          </g>

          {/* WorkersFirst */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "180ms" }}>
            <rect x="24" y="170" width="140" height="52" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            <text x="94" y="192" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">WorkersFirst</text>
            <text x="94" y="208" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.35)">Separate backend + auth</text>
          </g>

          {/* My65+ */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "240ms" }}>
            <rect x="200" y="170" width="130" height="52" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            <text x="265" y="192" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">My65+</text>
            <text x="265" y="208" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.35)">Separate platform + auth</text>
          </g>

          {/* Training Centre */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "300ms" }}>
            <rect x="366" y="170" width="150" height="52" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            <text x="441" y="192" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">Training Centre</text>
            <text x="441" y="208" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.35)">MySIS · Canvas · Vubiz</text>
          </g>

          {/* UnionSavings */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "360ms" }}>
            <rect x="548" y="170" width="130" height="52" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            <text x="613" y="192" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">UnionSavings</text>
            <text x="613" y="208" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.35)">Retention touchpoint</text>
          </g>

          {/* Pain points row */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "420ms" }}>
            <rect x="24" y="290" width="652" height="104" rx="6" fill="#EEEEEE" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
            <text x="36" y="312" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">FRAGMENTATION CONSEQUENCES</text>
            {[
              { x: 36, label: "5 login environments" },
              { x: 186, label: "No canonical identity" },
              { x: 336, label: "24h batch sync delays" },
              { x: 486, label: "Point-to-point coupling" },
              { x: 36, label: "Policy logic in Strapi" },
              { x: 186, label: "Inconsistent data quality" },
              { x: 336, label: "Duplicate member records" },
              { x: 486, label: "No event coordination" },
            ].map(({ x, label }, i) => {
              const row = Math.floor(i / 4);
              return (
                <g key={label}>
                  <circle cx={x + 4} cy={330 + row * 22} r="3" fill="#411175" fillOpacity="0.3" />
                  <text x={x + 12} y={330 + row * 22 + 4} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="10.5" fill="rgba(0,0,0,0.5)">{label}</text>
                </g>
              );
            })}
          </g>

          {/* Integration lines — dashed to show fragility */}
          <line x1="184" y1="76" x2="270" y2="76" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#cs-arrow)" />
          <line x1="410" y1="76" x2="490" y2="76" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#cs-arrow)" />
          <line x1="104" y1="102" x2="104" y2="170" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#cs-arrow)" />
          <line x1="340" y1="102" x2="265" y2="170" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#cs-arrow)" />
          <line x1="340" y1="102" x2="441" y2="170" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#cs-arrow)" />
        </svg>
        <p className="font-mono text-[10px] text-black/25 text-center mt-2">
          Dashed lines represent fragile, ad hoc integrations — not architectural contracts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <StatCallout value="8+" label="Disconnected platforms" />
        <StatCallout value="5" label="Login environments" />
        <StatCallout value="24h" label="Batch sync cycle (Unionware → mobile)" />
      </div>

      {/* Unionware */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <SectionLabel number="01" label="Unionware — current system of record" />
        <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
          Unionware is the current administrative system of record. It contains 350,000+ member records, including historical and inactive members. The member ID is the only field treated as universally present and institutionally authoritative. Member creation is Finance-controlled — not self-serve.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-2">What it owns today</p>
            {[
              "Official member registry",
              "Dues and financial administration",
              "Historical member records",
              "Finance-controlled member creation",
              "Masked SIN handling",
              "Member status changes",
              "Ticketing & case workflows",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 py-1.5 border-b border-black/5">
                <span className="w-1 h-1 rounded-full bg-purple-power flex-shrink-0" />
                <span className="text-sm font-light text-black/60">{item}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-2">Key constraints</p>
            {[
              "Data quality is inconsistent",
              "Missing emails across many records",
              "No real-time integration capabilities",
              "Not fit for multi-node orchestration",
              "Tight coupling to legacy workflows",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 py-1.5 border-b border-black/5">
                <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                <span className="text-sm font-light text-black/50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile app */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "180ms" }}>
        <SectionLabel number="02" label="Mobile app stack" />
        <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
          The mobile app is live and fully operational, and is already one of the most important digital surfaces in the ecosystem. Its current architecture includes meaningful shadow identity and authorization state that the target architecture must carefully extract.
        </p>
        <Callout variant="default">
          <strong>Key architectural issue:</strong> Strapi currently handles both content delivery and authorization rules — controlling access by job function, employer, and bargaining unit. Simply "replacing auth in Strapi" is not enough; policy extraction is also required.
        </Callout>
      </section>

      {/* Pain points */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "240ms" }}>
        <SectionLabel number="03" label="Architectural pain points" />
        <div className="flex flex-col gap-3">
          <Flag>
            <strong>Identity fragmentation</strong>
            The same human can exist as multiple unconnected records. WorkersFirst can introduce member-number mismatch issues. Rejoining members may lose continuity with prior institutional history if not reconciled.
          </Flag>
          <Flag>
            <strong>Data quality constraints</strong>
            Inconsistent employer classifications, thousands of job classifications due to employer variation, missing email values for many members, especially older records.
          </Flag>
          <Flag>
            <strong>Policy logic fragmentation</strong>
            Strapi currently contains mobile access rules and segmentation logic. The ecosystem does not yet have a clean target-state policy architecture.
          </Flag>
          <Flag>
            <strong>Integration fragility</strong>
            Point-to-point logic and batch synchronization limit agility. Not every system is currently capable of webhook-driven synchronization. Not every node is yet prepared for SSO migration.
          </Flag>
        </div>
      </section>
    </PageContent>
  );
}
