import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { DataTable } from "@/components/artifacts/DataTable";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { Divider } from "@/components/ui/Divider";
import { CodeBlock } from "@/components/artifacts/CodeBlock";

export default function UnifiedDataModelPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-01 · CRM & Platform"
        title="Unified Data Model"
        titleAccent="Data Model"
        description="The canonical member record — field schema, domain ownership rules, identity resolution strategy, and the system of record boundaries governing all data across the ecosystem."
        meta={[
          { label: "Audience", value: "Technical agency · Frameworks & Co." },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Section 1: The core problem */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="The fragmentation problem" />
        <Callout variant="accent" className="mb-5">
          SEIU operates across <strong>eight disconnected platforms</strong> and{" "}
          <strong>five separate login environments</strong>. A member who touches
          the Training Centre, WorkersFirst, My65+, and the mobile app is treated
          as four different people. There is no unified member record.
        </Callout>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { problem: "Acquisition duplication", detail: "Full cost paid independently at each node for the same person" },
            { problem: "Lifetime value leak", detail: "Multi-node engagement value unrealized — nodes don't communicate" },
            { problem: "Attrition blindness", detail: "Engagement drop-offs undetected until the member is already gone" },
            { problem: "Political win waste", detail: "WSIB acquisition windows cannot be absorbed at scale by current infrastructure" },
          ].map((item) => (
            <div key={item.problem} className="bg-white border border-black/10 rounded-lg p-4">
              <p className="text-xs font-medium text-black mb-1">{item.problem}</p>
              <p className="text-xs font-light text-black/50 leading-snug">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Identity fields */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="Canonical identity fields" />
        <DataTable
          className="mb-3"
          columns={[
            { key: "field", label: "Field" },
            { key: "authority", label: "Authority" },
            { key: "nullable", label: "Nullable" },
            { key: "notes", label: "Notes" },
          ]}
          rows={[
            {
              field: "member_id",
              authority: <Badge variant="purple">Finance / Unionware</Badge>,
              nullable: <Badge variant="muted">Never</Badge>,
              notes: "Only guaranteed non-null field. Never reissued to new members.",
            },
            {
              field: "email",
              authority: <Badge variant="muted">MSC / member</Badge>,
              nullable: <Badge variant="soon">Yes</Badge>,
              notes: "Secondary identifier. Used for 2FA. Absent on many older records.",
            },
            {
              field: "idp_id",
              authority: <Badge variant="purple">IdP (Auth0/Okta)</Badge>,
              nullable: <Badge variant="soon">Yes</Badge>,
              notes: "Assigned at IdP account creation. Phase 0 onward for new contacts.",
            },
            {
              field: "sin",
              authority: <Badge variant="purple">Finance / Unionware</Badge>,
              nullable: <Badge variant="soon">Masked</Badge>,
              notes: "Stored in Unionware, handled exclusively by Finance. Not migrated.",
            },
            {
              field: "lifecycle_state",
              authority: <Badge variant="purple">CRM</Badge>,
              nullable: <Badge variant="muted">Never</Badge>,
              notes: "prospect → active → engaged → at-risk. Updated by CRM trigger rules.",
            },
            {
              field: "node_presence",
              authority: <Badge variant="purple">CRM</Badge>,
              nullable: <Badge variant="muted">Array</Badge>,
              notes: "Which ecosystem nodes the member has active records in.",
            },
            {
              field: "engagement_score",
              authority: <Badge variant="purple">CRM</Badge>,
              nullable: <Badge variant="soon">Phase 3</Badge>,
              notes: "Behavioral scoring model. Computed continuously from node events.",
            },
          ]}
        />
        <p className="font-mono text-[10px] text-black/25">
          Unionware remains the permanent archive and authority for member_id and SIN. The CRM stores member_id as a foreign key reference only.
        </p>
      </section>

      {/* Section 3: System of record table */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="03" label="System of record ownership" />
        <DataTable
          columns={[
            { key: "system", label: "System" },
            { key: "owns", label: "Owns" },
            { key: "doesnt", label: "Does not own" },
          ]}
          rows={[
            {
              system: "Identity Provider (Auth0/Okta)",
              owns: "Authentication, sessions, token issuance",
              doesnt: "Member profile, roles, business logic",
            },
            {
              system: "CRM",
              owns: "Unified member profile, lifecycle state, cross-node relationships, engagement scoring",
              doesnt: "Authentication, editorial content, domain-specific workflows",
            },
            {
              system: "Strapi",
              owns: "Editorial content, structured reference content",
              doesnt: "Workflow data, auth, integration orchestration",
            },
            {
              system: "Unionware",
              owns: "Dues processing, official member registry, historical archive",
              doesnt: "Lifecycle intelligence, cross-system orchestration, auth",
            },
            {
              system: "Domain systems (Canvas, WorkersFirst, My65+)",
              owns: "Domain-specific workflows, operational data",
              doesnt: "Cross-system orchestration, global lifecycle state, content publishing",
            },
          ]}
        />
      </section>

      <Divider />

      {/* Section 4: Member population tiers */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="04" label="Member population tiers" />
        <p className="text-sm font-light text-black/50 leading-relaxed mb-5">
          The 350,000+ records in Unionware are not a homogeneous dataset. They are tiered by data quality and integration readiness. The CRM seeding strategy maps directly to these tiers.
        </p>
        <div className="space-y-3">
          {[
            {
              tier: "Tier 1 — Active with email",
              count: "~50,000+",
              action: "Phase 1 IdP seeding priority",
              detail: "Active members across all sectors with both a member ID and valid email. Bulk-exported from Unionware, email-matched, IdP accounts created with member ID as custom claim.",
              badge: "purple" as const,
            },
            {
              tier: "Tier 2 — Active, no email",
              count: "Unknown",
              action: "Phase 2 operational catchup",
              detail: "Not bulk-seeded. IdP account created when member makes contact with MSC or engages with any digital touchpoint. MSC prompted to collect email on every interaction.",
              badge: "muted" as const,
            },
            {
              tier: "Tier 3 — Historical / inactive",
              count: "~300,000+",
              action: "No action — Unionware archive",
              detail: "No IdP accounts created proactively. Unionware is the permanent historical archive. Reactivation triggers IdP account creation on demand via webhook.",
              badge: "soon" as const,
            },
            {
              tier: "Tier 4 — Net new Home Care prospects",
              count: "29,000 newly reachable",
              action: "Phase 0 — Campaign touchpoint",
              detail: "Not Unionware members yet. IdP accounts created at first campaign touchpoint. When they convert, Finance creates the Unionware record. IdP account linked to new member ID via webhook.",
              badge: "yellow" as const,
            },
          ].map((tier) => (
            <div key={tier.tier} className="bg-white border border-black/10 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-black">{tier.tier}</p>
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <Badge variant={tier.badge}>{tier.count}</Badge>
                </div>
              </div>
              <p className="font-mono text-[10px] text-purple-power mb-2 uppercase tracking-wide">
                {tier.action}
              </p>
              <p className="text-sm font-light text-black/50 leading-relaxed">
                {tier.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Lifecycle state taxonomy */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="05" label="Lifecycle state taxonomy" />
        <Callout className="mb-5">
          The CRM tracks member lifecycle stage as a dynamic state — not just contact data,
          but{" "}
          <strong>current position in the ecosystem</strong>,{" "}
          <strong>engagement level</strong>, and{" "}
          <strong>proximity to the next conversion moment</strong>.
        </Callout>
        <CodeBlock>
          <span style={{ color: "#411175" }}>member_lifecycle_state</span>
          {`
  └── prospect          // Pre-membership. Campaign contact. IdP account exists.
  └── active            // Dues-paying member. Unionware record confirmed.
  └── engaged           // Active + cross-node. 2+ ecosystem nodes with activity.
  └── at_risk           // Engagement scoring below threshold. Re-engagement active.
  └── churned           // No activity 6mo+. Unionware record historical.
  └── reactivating      // Finance updated status. Reactivation flow triggered.`}
        </CodeBlock>
      </section>
    </PageContent>
  );
}
