import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { DataTable } from "@/components/artifacts/DataTable";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { Flag } from "@/components/artifacts/Flag";
import { FlowSteps } from "@/components/artifacts/FlowSteps";
import { Divider } from "@/components/ui/Divider";
import { Tabs } from "@/components/ui/Tabs";

export default function SSOIdentityPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-01 · CRM & Platform"
        title="SSO & Identity Architecture"
        titleAccent="Identity Architecture"
        description="Centralized authentication, distributed authorization. IdP platform evaluation, phased rollout strategy, and the identity resolution model that separates authentication federation from cross-system identity matching."
        meta={[
          { label: "Audience", value: "Technical agency" },
          { label: "Status", value: "Directional — IdP selection pending" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Section 1: Core principle */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="Core identity principle" />
        <div className="bg-purple-power text-white rounded-xl p-6 mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
            Architectural rule
          </p>
          <p className="text-xl font-bold leading-tight mb-2">
            Authentication is centralized.
            <br />
            Authorization is distributed.
          </p>
          <p className="text-sm font-light text-white/70 leading-relaxed">
            The IdP handles login, sessions, and token issuance only. Roles and
            permissions are NOT stored in the IdP. CRM and application logic
            determine what a member can access, based on lifecycle state, node
            context, and business rules.
          </p>
        </div>
        <Callout>
          SEIU's member creation model is <strong>Finance-controlled</strong>,
          not self-serve. Member records originate from dues reports processed by
          Finance, or from MSC intake forwarded to Finance. This means an
          IdP-first model cannot simply be stood up from a clean list — the IdP
          must be reconciled with Unionware's existing records and Finance's
          member creation workflow.
        </Callout>
      </section>

      {/* Section 2: Two distinct problems */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="Two distinct problems" />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-black/10 rounded-xl p-5">
            <Badge variant="purple" className="mb-3">Authentication federation</Badge>
            <p className="text-sm font-medium text-black mb-2">Full SSO</p>
            <p className="text-sm font-light text-black/50 leading-relaxed">
              Every node delegates login to a central IdP. A user clicks "sign
              in" anywhere and is routed through Auth0 or Okta. Requires touching
              every node's auth system.
            </p>
            <p className="font-mono text-[10px] text-purple-power mt-3 uppercase tracking-wide">
              Phase 1 onward
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-xl p-5">
            <Badge variant="muted" className="mb-3">Identity resolution</Badge>
            <p className="text-sm font-medium text-black mb-2">Master identity index</p>
            <p className="text-sm font-light text-black/50 leading-relaxed">
              The CRM has a reliable way to say "the Canvas user with ID X is
              the same person as the My65+ account with ID Y." Established via
              Unionware export without requiring every node to have migrated its
              login system.
            </p>
            <p className="font-mono text-[10px] text-purple-power mt-3 uppercase tracking-wide">
              Phase 0 — required first
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: IdP evaluation */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="03" label="IdP platform evaluation" />
        <Tabs
          tabs={[
            {
              label: "Auth0",
              content: (
                <div className="space-y-3">
                  <DataTable
                    columns={[
                      { key: "criterion", label: "Criterion" },
                      { key: "status", label: "Auth0" },
                    ]}
                    rows={[
                      { criterion: "Native SAML/OIDC support (Canvas)", status: <Badge variant="purple">Confirmed</Badge> },
                      { criterion: "Bulk user import (50k+ records)", status: <Badge variant="purple">Supported via Management API</Badge> },
                      { criterion: "Custom claims (CRM lifecycle claims)", status: <Badge variant="purple">Actions + Rules</Badge> },
                      { criterion: "Canadian data residency", status: <Badge variant="muted">Available (AU/EU/US regions)</Badge> },
                      { criterion: "Machine-to-machine tokens", status: <Badge variant="purple">Supported</Badge> },
                      { criterion: "Webhook / event hooks", status: <Badge variant="purple">Post-login actions</Badge> },
                    ]}
                  />
                  <Callout>
                    Auth0 is the more established platform for rapid deployment. Developer
                    ecosystem is mature. <strong>Cost scales with MAU</strong> — requires
                    confirming active member count for pricing validation.
                  </Callout>
                </div>
              ),
            },
            {
              label: "Okta",
              content: (
                <div className="space-y-3">
                  <DataTable
                    columns={[
                      { key: "criterion", label: "Criterion" },
                      { key: "status", label: "Okta" },
                    ]}
                    rows={[
                      { criterion: "Native SAML/OIDC support (Canvas)", status: <Badge variant="purple">Enterprise-grade</Badge> },
                      { criterion: "Bulk user import (50k+ records)", status: <Badge variant="purple">CSV + API import</Badge> },
                      { criterion: "Custom claims (CRM lifecycle claims)", status: <Badge variant="purple">Expression Language claims</Badge> },
                      { criterion: "Canadian data residency", status: <Badge variant="purple">Cell designation available</Badge> },
                      { criterion: "Machine-to-machine tokens", status: <Badge variant="purple">Supported</Badge> },
                      { criterion: "Webhook / event hooks", status: <Badge variant="purple">Event hooks</Badge> },
                    ]}
                  />
                  <Callout>
                    Okta is the enterprise standard — stronger compliance story and more
                    explicit Canadian data residency options.{" "}
                    <strong>Higher base cost</strong>, more complex initial configuration.
                    Preferred if federal compliance requirements on My65+ are strict.
                  </Callout>
                </div>
              ),
            },
            {
              label: "Selection criteria",
              content: (
                <div className="space-y-3">
                  <p className="text-sm font-light text-black/50 leading-relaxed">
                    The selection decision should be driven by four factors, in order of priority:
                  </p>
                  <div className="space-y-2">
                    {[
                      { n: "1", title: "My65+ federal compliance assessment", detail: "If federal data residency constraints exist on My65+ identity data, Okta's explicit Canadian cell designation is the safer choice." },
                      { n: "2", title: "Technical agency preference", detail: "The agency doing the integration work will have operational experience with one platform over the other. That familiarity reduces delivery risk and should be weighted." },
                      { n: "3", title: "Canvas SAML configuration", detail: "Both support Canvas SAML — but the configuration complexity differs. Confirm with the Training Centre technical team." },
                      { n: "4", title: "Cost at 50k+ MAU", detail: "Auth0 pricing at 50k+ active users requires validation against the actual Unionware active member count. Okta's enterprise pricing negotiation should be run in parallel." },
                    ].map((item) => (
                      <div key={item.n} className="flex gap-3 bg-white border border-black/10 rounded-lg p-3.5">
                        <span className="font-mono text-[10px] text-purple-power mt-0.5 flex-shrink-0">{item.n}</span>
                        <div>
                          <p className="text-xs font-medium text-black mb-0.5">{item.title}</p>
                          <p className="text-xs font-light text-black/50 leading-snug">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Section 4: Unionware/IdP architecture options */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="04" label="Unionware / IdP architecture options" />
        <p className="text-sm font-light text-black/50 leading-relaxed mb-5">
          Three options for how the IdP and Unionware relate. This decision must be made during Phase 0. It gates Phase 1 design.
        </p>
        <div className="space-y-3">
          {[
            {
              option: "Option A",
              name: "IdP bridges to Unionware",
              desc: "Unionware remains identity root. IdP authenticates against Unionware lookup. Tightest coupling — every login touches Unionware.",
              verdict: "Not recommended",
              verdictBadge: "soon" as const,
            },
            {
              option: "Option B",
              name: "Parallel identity index with sync",
              desc: "New CRM has its own identity store seeded from Unionware. A sync keeps dues/status fields aligned. Unionware's data model does not constrain the CRM's data model. Clean separation of CRM intelligence from dues administration.",
              verdict: "Recommended",
              verdictBadge: "purple" as const,
            },
            {
              option: "Option C",
              name: "Unionware as a node",
              desc: "Most aggressive. Unionware treated as a subscriber to the event bus. Highest disruption to Finance workflows. Most aggressive — defers to a future phase after option B is proven.",
              verdict: "Future phase",
              verdictBadge: "muted" as const,
            },
          ].map((opt) => (
            <div key={opt.option} className="bg-white border border-black/10 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-mono text-[10px] text-black/30 block mb-0.5">{opt.option}</span>
                  <p className="text-sm font-medium text-black">{opt.name}</p>
                </div>
                <Badge variant={opt.verdictBadge}>{opt.verdict}</Badge>
              </div>
              <p className="text-sm font-light text-black/50 leading-relaxed">
                {opt.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Section 5: Phased rollout */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="05" label="Phased SSO rollout" />
        <FlowSteps
          steps={[
            {
              title: "Phase 0 — IdP tenant + Home Care prospects (Weeks 1–8)",
              body: "IdP tenant stood up. New Home Care prospects enroll via IdP from day one — clean canonical identity from first touchpoint. Existing members not yet touched.",
              note: "Hard gate — nothing else proceeds without IdP",
            },
            {
              title: "Phase 1 — 50k+ member seeding + Mobile App migration (Weeks 8–20)",
              body: "Active members bulk-seeded into IdP from Unionware export. Mobile app auth migrated from Strapi/Unionware flow to IdP tokens. Strapi's auth role retired. Canvas configured as SAML SP.",
              note: "Option B architecture decision must be confirmed",
            },
            {
              title: "Phase 2 — WorkersFirst + My65+ full integration (Weeks 20–36)",
              body: "WorkersFirst auth system migrated to IdP token validation. My65+ auth system migrated (pending federal compliance assessment). Third-party backend negotiations required.",
              note: "Blocked by WS-3 node audits",
            },
            {
              title: "Phase 3 — Intelligence layer (Weeks 28–40)",
              body: "CRM-derived lifecycle claims passed into IdP tokens. Strapi uses claims for content personalization. Full nudge rules engine live. A/B testing framework operational.",
              note: "Full ecosystem connected",
            },
          ]}
        />
      </section>

      {/* Section 6: Open questions */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="06" label="Open questions" />
        <div className="space-y-3">
          <Flag title="My65+ federal compliance assessment">
            The federal government investment in My65+ may create regulatory or data
            residency constraints on how member identity is stored and federated. Must be
            surfaced before Phase 2 scope is confirmed. If constraints exist, a
            compliance-preserving alternative architecture must be designed.
          </Flag>
          <Flag title="Unionware/IdP architecture decision">
            Option A, B, or C — this decision gates Phase 1 design. Requires input from
            whoever manages Unionware day-to-day and an honest assessment of Unionware's
            webhook/API capability.
          </Flag>
          <Flag title="My65+ webhook delivery timeline">
            The single most important technical dependency for Phase 0. The My65+ team
            needs to be engaged immediately. Even without the webhook, Phase 0 can launch
            with a manual interim process — but this is the highest-priority technical
            negotiation.
          </Flag>
          <Flag title="Active member email coverage">
            The 50k+ estimate is directional. The actual count from a Unionware export
            determines Phase 1 IdP seeding scope and timeline.
          </Flag>
        </div>
      </section>
    </PageContent>
  );
}
