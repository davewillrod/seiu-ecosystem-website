import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { DataTable } from "@/components/artifacts/DataTable";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { Flag } from "@/components/artifacts/Flag";
import { Divider } from "@/components/ui/Divider";

export default function FrontendArchitecturePage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-03 · Content & Frontend"
        title="Frontend Architecture"
        titleAccent="Architecture"
        description="Three distinct frontend contexts — master brand site, campaign microsites, and future member web-app. Stack decisions, deployment patterns, content integration, and analytics architecture."
        meta={[
          { label: "Audience", value: "Technical agency · Frameworks & Co." },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Section 1: Three contexts */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="Three distinct frontend contexts" />
        <Callout className="mb-5">
          Three frontend contexts are defined. They share Strapi as a content
          source but are{" "}
          <strong>architecturally independent applications</strong> with different
          stacks, audiences, and deployment pipelines. They are not versions of
          the same application.
        </Callout>

        <div className="space-y-4">
          {/* Context 1 */}
          <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="purple">Context 1</Badge>
                <p className="text-sm font-medium text-black">seiuhealthcare.ca</p>
              </div>
              <p className="font-mono text-[10px] text-black/30">Master brand marketing site</p>
            </div>
            <div className="px-5 py-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Stack</p>
                  <p className="text-xs font-medium text-black">Next.js (App Router)</p>
                  <p className="text-xs font-light text-black/40">Deployed on Vercel</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Content</p>
                  <p className="text-xs font-medium text-black">Strapi via ISR</p>
                  <p className="text-xs font-light text-black/40">Revalidation webhook on publish</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Audience</p>
                  <p className="text-xs font-medium text-black">Public · Prospects</p>
                  <p className="text-xs font-light text-black/40">SEO-critical</p>
                </div>
              </div>
              <p className="text-sm font-light text-black/50 leading-relaxed mb-3">
                Frameworks & Co. involvement is required for all design changes regardless of scope — this is a brand constraint, not a technical one. Next.js provides maximum design flexibility with no platform constraints, appropriate for the institutional significance of the master site.
              </p>
              <div className="bg-grey/50 rounded-lg p-3">
                <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-2">Rejected alternatives</p>
                <div className="space-y-1.5">
                  <p className="text-xs font-light text-black/40">
                    <strong className="text-black/50 font-medium">Webflow:</strong> Visual builder advantage neutralized by Frameworks involvement requirement. Dual content path risk (Webflow CMS + Strapi).
                  </p>
                  <p className="text-xs font-light text-black/40">
                    <strong className="text-black/50 font-medium">Framer:</strong> More appropriate for campaign microsites. Limited layout flexibility for complex editorial pages.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Context 2 */}
          <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="yellow">Context 2</Badge>
                <p className="text-sm font-medium text-black">Campaign microsites</p>
              </div>
              <p className="font-mono text-[10px] text-black/30">Custom domains · Monthly cadence</p>
            </div>
            <div className="px-5 py-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Stack</p>
                  <p className="text-xs font-medium text-black">Framer (default)</p>
                  <p className="text-xs font-light text-black/40">Custom Next.js permitted per campaign</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Content</p>
                  <p className="text-xs font-medium text-black">Strapi direct REST API</p>
                  <p className="text-xs font-light text-black/40">No sync middleware</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Domain</p>
                  <p className="text-xs font-medium text-black">Custom per campaign</p>
                  <p className="text-xs font-light text-black/40">e.g. homecarewin.ca</p>
                </div>
              </div>
              <p className="text-sm font-light text-black/50 leading-relaxed mb-3">
                Framer queries Strapi directly via REST API at request time. No sync middleware. Content updates in Strapi appear on microsites without redeployment.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-grey/50 rounded-lg p-3">
                  <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-2">Standardized per microsite</p>
                  <ul className="space-y-1">
                    {["Strapi API connection pattern", "Form submission endpoint (serverless fn)", "GTM container (same ID)", "Cookie consent banner", "DNS pattern (Cloudflare proxied)"].map(item => (
                      <li key={item} className="text-xs font-light text-black/40 flex items-start gap-1">
                        <span className="text-purple-power">·</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-grey/50 rounded-lg p-3">
                  <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-2">Flexible per campaign</p>
                  <ul className="space-y-1">
                    {["All visual design", "Strapi content queries", "Form fields beyond baseline", "Custom domain name", "Tooling (Framer is default, not mandatory)"].map(item => (
                      <li key={item} className="text-xs font-light text-black/40 flex items-start gap-1">
                        <span className="text-black/30">·</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Context 3 */}
          <div className="bg-white border border-black/[0.06] rounded-xl overflow-hidden opacity-60">
            <div className="px-5 py-3.5 border-b border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="soon">Context 3</Badge>
                <p className="text-sm font-medium text-black">app.seiuhealthcare.ca</p>
              </div>
              <p className="font-mono text-[10px] text-black/30">Future member web-app · Not in current scope</p>
            </div>
            <div className="px-5 py-4">
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Stack</p>
                  <p className="text-xs font-medium text-black/40">Next.js (separate codebase)</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Auth</p>
                  <p className="text-xs font-medium text-black/40">IdP (SSO) authenticated</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">Audience</p>
                  <p className="text-xs font-medium text-black/40">Authenticated members</p>
                </div>
              </div>
              <Callout>
                <strong>Key principle:</strong> The master site and the member app are never the same codebase, even if they share a monorepo or design system. They are different products serving different audiences with different auth requirements.
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 2: Form submission architecture */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="02" label="Campaign form submission architecture" />
        <div className="bg-white border border-black/10 rounded-xl p-5 mb-4">
          <p className="font-mono text-[10px] text-black/30 mb-3 uppercase tracking-widest">Data flow</p>
          <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
            {["Framer form", "→", "Serverless function", "→", "Strapi leads (now)", "/ CRM ingestion API (when live)"].map((item, i) => (
              <span key={i} className={item.startsWith("→") ? "text-black/20" : item.includes("CRM") ? "text-purple-power" : "bg-grey px-2 py-1 rounded text-black/60"}>{item}</span>
            ))}
          </div>
        </div>
        <p className="text-sm font-light text-black/50 leading-relaxed mb-4">
          Framer posts to a serverless function (Vercel Edge Function or Cloudflare Worker). The function holds the Strapi API token server-side and forwards the payload. This prevents client-side token exposure. When the CRM is live, only the function's destination URL changes — Framer and the form are untouched.
        </p>
        <DataTable
          columns={[
            { key: "field", label: "Standard lead field" },
            { key: "purpose", label: "Purpose" },
          ]}
          rows={[
            { field: "campaign_slug", purpose: "Identifies which campaign generated the lead" },
            { field: "source_domain", purpose: "Which microsite domain the form was submitted from" },
            { field: "utm_source / utm_medium / utm_campaign", purpose: "Attribution — closes the loop between paid spend and lead capture" },
            { field: "sector", purpose: "Which healthcare sector the worker identifies with" },
            { field: "consent + timestamp", purpose: "Required for CASL compliance" },
            { field: "name, email", purpose: "Contact fields for CRM prospect record" },
          ]}
        />
      </section>

      {/* Section 3: Analytics */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="03" label="Analytics architecture" />
        <Callout variant="accent" className="mb-4">
          Single GTM container. Single GA4 property.{" "}
          <strong>All frontend contexts — one unified analytics view.</strong>
        </Callout>
        <div className="space-y-3">
          {[
            { item: "One GTM container ID", detail: "Deployed on every surface. next/google-tag-manager on master site. Framer custom code field on microsites." },
            { item: "One GA4 property", detail: "Each campaign custom domain added as a cross-domain measurement target in GA4 data stream settings." },
            { item: "Cross-domain linking", detail: "Users moving between a campaign microsite and seiuhealthcare.ca are tracked as a single session." },
            { item: "UTM passthrough", detail: "UTM parameters passed through to form submission payloads, closing attribution loop between paid media spend and lead capture." },
          ].map((item) => (
            <div key={item.item} className="flex gap-3 bg-white border border-black/10 rounded-lg p-3.5">
              <span className="text-purple-power font-mono text-[10px] mt-0.5">→</span>
              <div>
                <p className="text-xs font-medium text-black mb-0.5">{item.item}</p>
                <p className="text-xs font-light text-black/50 leading-snug">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-2">Per microsite launch checklist</p>
          <div className="bg-grey border border-black/10 rounded-lg p-3.5">
            <ol className="space-y-1.5">
              {[
                "Add new campaign domain to GA4 cross-domain configuration",
                "Deploy cookie consent banner (required per custom domain)",
                "Verify GTM container firing correctly on new domain",
                "Confirm form submission UTM passthrough working end-to-end",
              ].map((item, i) => (
                <li key={i} className="text-xs font-light text-black/50 flex items-start gap-2">
                  <span className="font-mono text-[10px] text-black/25 flex-shrink-0">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Section 4: Layered architecture */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="04" label="Frontend composition model" />
        <DataTable
          columns={[
            { key: "layer", label: "Layer" },
            { key: "stack", label: "Stack" },
            { key: "purpose", label: "Purpose" },
            { key: "data", label: "Data sources" },
          ]}
          rows={[
            {
              layer: "Marketing",
              stack: <Badge variant="purple">Next.js / Vercel</Badge>,
              purpose: "Brand, SEO, editorial",
              data: "Strapi (ISR)",
            },
            {
              layer: "Campaigns",
              stack: <Badge variant="yellow">Framer</Badge>,
              purpose: "Acquisition, landing pages",
              data: "Strapi (direct API)",
            },
            {
              layer: "Applications",
              stack: <Badge variant="soon">Next.js (future)</Badge>,
              purpose: "Authenticated member experiences",
              data: "APIs + IdP + Strapi",
            },
          ]}
        />
      </section>

      {/* Section 5: Open questions */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="05" label="Open questions" />
        <div className="space-y-3">
          <Flag title="Strapi server infrastructure">
            The hosting provider for the self-hosted Strapi instance needs to be confirmed (likely DigitalOcean or AWS EC2). This determines Cloudflare origin configuration and available scaling headroom.
          </Flag>
          <Flag title="My65+ data residency constraints">
            May create constraints on how member identity is passed through frontend auth flows. Must be assessed before Context 3 (member web-app) is designed.
          </Flag>
        </div>
      </section>
    </PageContent>
  );
}
