"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { TabBar } from "@/components/ui/TabBar";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { DataTable } from "@/components/artifacts/DataTable";
import { FlowSteps } from "@/components/artifacts/FlowSteps";
import { Flag } from "@/components/artifacts/Flag";
import { CodeBlock } from "@/components/artifacts/CodeBlock";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "boundaries", label: "Boundaries" },
  { id: "integration", label: "Integration" },
  { id: "transition", label: "Transition" },
];

export default function IdpSsoPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 3 · IdP / SSO"
        title="IdP / SSO"
        titleAccent="SSO"
        description="The centralized authentication plane responsible for secure login, session management, MFA, and single sign-on across all nodes. Authentication is centralized; authorization is distributed."
        meta={[
          { label: "Layer", value: "3 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="animate-fade-up">
          {/* Auth flow diagram */}
          <svg
            role="img"
            aria-label="IdP / SSO centralized authentication flow"
            viewBox="0 0 700 280"
            width="100%"
            className="mb-10"
          >
            <defs>
              <marker id="idp-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.3)" />
              </marker>
            </defs>

            {/* Nodes */}
            {[
              { label: "User", sub: "Any application", x: 14, y: 100, w: 110, highlight: false, delay: 0 },
              { label: "IdP", sub: "Auth0 / Okta", x: 186, y: 80, w: 110, highlight: true, delay: 80 },
              { label: "JWT Token", sub: "sub · person_id · email", x: 362, y: 100, w: 130, highlight: false, delay: 160 },
              { label: "Application", sub: "Any node backend", x: 558, y: 100, w: 128, highlight: false, delay: 240 },
            ].map(({ label, sub, x, y, w, highlight, delay }) => (
              <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${delay}ms` }}>
                <rect x={x} y={y} width={w} height={56} rx="6"
                  fill={highlight ? "#411175" : "#ffffff"}
                  fillOpacity={highlight ? 1 : 1}
                  stroke={highlight ? "#411175" : "rgba(0,0,0,0.12)"}
                  strokeWidth="1"
                />
                <text x={x + w / 2} y={y + 24} textAnchor="middle"
                  fontFamily="'Work Sans', system-ui, sans-serif"
                  fontSize="12" fontWeight="500"
                  fill={highlight ? "#ffffff" : "#000000"}
                >{label}</text>
                <text x={x + w / 2} y={y + 40} textAnchor="middle"
                  fontFamily="'DM Mono', monospace"
                  fontSize="8.5"
                  fill={highlight ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)"}
                >{sub}</text>
              </g>
            ))}

            {/* Arrows */}
            <line x1="124" y1="128" x2="180" y2="118" stroke="rgba(0,0,0,0.2)" strokeWidth="1" markerEnd="url(#idp-arrow)" style={{ animation: "fade-up 0.35s ease both", animationDelay: "100ms" }} />
            <text x="148" y="112" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill="rgba(0,0,0,0.25)">login</text>

            <line x1="296" y1="118" x2="356" y2="126" stroke="rgba(0,0,0,0.2)" strokeWidth="1" markerEnd="url(#idp-arrow)" style={{ animation: "fade-up 0.35s ease both", animationDelay: "200ms" }} />
            <text x="326" y="110" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill="rgba(0,0,0,0.25)">issues</text>

            <line x1="492" y1="128" x2="552" y2="128" stroke="rgba(0,0,0,0.2)" strokeWidth="1" markerEnd="url(#idp-arrow)" style={{ animation: "fade-up 0.35s ease both", animationDelay: "280ms" }} />
            <text x="522" y="118" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill="rgba(0,0,0,0.25)">validates</text>

            {/* Identity domain side note */}
            <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "360ms" }}>
              <rect x="362" y="185" width="320" height="50" rx="6" fill="#EEEEEE" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
              <text x="374" y="206" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="#000000">Identity Domain</text>
              <text x="374" y="224" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="rgba(0,0,0,0.35)">Resolves person_id from sub · Anchors auth to personhood</text>
              <line x1="622" y1="156" x2="622" y2="184" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#idp-arrow)" />
            </g>

            {/* SSO note */}
            <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "440ms" }}>
              <rect x="14" y="200" width="300" height="62" rx="6" fill="#411175" fillOpacity="0.04" stroke="#411175" strokeOpacity="0.15" strokeWidth="1" />
              <text x="26" y="220" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.6)">SSO — ONE LOGIN ACROSS ALL NODES</text>
              {["Mobile App", "WorkersFirst", "My65+", "Training Centre"].map((node, i) => (
                <g key={node}>
                  <circle cx={28 + i * 72} cy={244} r="2.5" fill="#411175" fillOpacity="0.3" />
                  <text x={36 + i * 72} y={248} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="9.5" fill="rgba(0,0,0,0.5)">{node}</text>
                </g>
              ))}
            </g>
          </svg>

          <section className="mb-10">
            <SectionLabel number="01" label="Core principle" />
            <Callout variant="accent" className="mb-4">
              <strong>Authentication is centralized. Authorization is distributed.</strong> The IdP handles login and token issuance — nothing more. Authorization decisions are made by application backends using identity context, member intelligence state, and domain-specific logic.
            </Callout>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Current-state issues" />
            <div className="grid grid-cols-2 gap-3">
              {[
                { issue: "No unified login", detail: "Each node manages its own login and session model" },
                { issue: "Tight coupling", detail: "Auth and business logic are entangled in Strapi and backends" },
                { issue: "High friction", detail: "Cross-node user journeys require re-authentication" },
                { issue: "Inconsistent MFA", detail: "Security posture varies significantly across surfaces" },
              ].map(({ issue, detail }) => (
                <div key={issue} className="bg-grey rounded-lg p-4">
                  <p className="text-sm font-medium text-black mb-1">{issue}</p>
                  <p className="text-sm font-light text-black/50 leading-snug">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Technology direction" />
            <p className="text-sm font-light text-black/60 leading-relaxed mb-3">
              A managed IdP is strongly recommended over building a custom auth system. Auth0 and Okta are the primary candidates.
            </p>
            <DataTable
              headers={["Provider", "Strengths", "Considerations"]}
              rows={[
                ["Auth0", "Strong developer experience, flexible customization, broad OIDC/SAML support", "Pricing scales with MAU — review at SEIU scale"],
                ["Okta", "Enterprise-grade, strong workforce identity capabilities, robust MFA", "More operational complexity, higher floor cost"],
              ]}
            />
          </section>
        </div>
      )}

      {activeTab === "boundaries" && (
        <div className="animate-fade-up">
          <Callout variant="accent" className="mb-6">
            <strong>Owns:</strong> Authentication (login, password, MFA), session lifecycle, token issuance (JWT / access tokens), SSO across all applications, account credential management.
          </Callout>

          <Callout className="mb-6">
            <strong>Does not own:</strong> Person identity (Identity Domain), membership authority (Administrative Registry), lifecycle logic (Member Intelligence), authorization and business rules (application backends). Roles and permissions are not the institutional business source of truth inside the IdP — they may appear in tokens as controlled claims, but the IdP is not the authoritative home of business authorization.
          </Callout>

          <SectionLabel number="01" label="Token design principles" />
          <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
            Tokens should be minimal, stable, and not used as a business logic vehicle. Large, complex tokens with embedded lifecycle state create coupling between the IdP and downstream application logic.
          </p>
          <CodeBlock>{`// Recommended token claims (minimal)
{
  "sub":       "auth0|abc123",        // IdP subject identifier
  "person_id": "uuid",                // from Identity Domain
  "email":     "member@seiu.ca",      // stable email claim
  "iat":       1714000000,
  "exp":       1714003600
}

// AVOID: complex business logic, dynamic lifecycle state,
// large role payloads, or anything that mutates frequently`}</CodeBlock>
        </div>
      )}

      {activeTab === "integration" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Integration relationships" />
            <DataTable
              headers={["System", "Integration", "Direction"]}
              rows={[
                ["Identity Domain", "Maps IdP subject (sub) ↔ person_id; tokens carry person_id claim", "IdP → Identity"],
                ["Application backends", "Validate JWTs via JWKS endpoint; resolve person context from Identity", "IdP → App"],
                ["Administrative Registry", "Optionally validates membership context during auth flows", "Registry → IdP"],
                ["Member Intelligence", "Consumes login events via Event Backbone for engagement signals", "IdP → Backbone → Intelligence"],
                ["Event Backbone", "Emits auth.login.succeeded, auth.account.created events where useful", "IdP → Backbone"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Backend integration pattern" />
            <CodeBlock>{`// Middleware — validate JWT on every protected request
import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(
  new URL('https://YOUR_IDP/.well-known/jwks.json')
);

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const { payload } = await jwtVerify(token, JWKS);

  // Attach canonical identity to request context
  req.personId = payload.person_id;
  next();
}`}</CodeBlock>
          </section>
        </div>
      )}

      {activeTab === "transition" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Migration sequence" />
            <FlowSteps
              steps={[
                {
                  title: "Phase 1 — Introduce IdP for new users",
                  body: "New prospect and member accounts are created through the IdP. Existing legacy auth flows remain active. No disruption to current production systems.",
                },
                {
                  title: "Phase 2 — Integrate mobile app",
                  body: "Mobile app auth transitions from Strapi-mediated flow to IdP-based authentication. Strapi's current auth and policy role begins to be extracted.",
                },
                {
                  title: "Phase 3 — Expand to other nodes",
                  body: "WorkersFirst, My65+, and Training Centre integrate with the IdP. SSO becomes live across these surfaces. Node-specific auth systems are decommissioned.",
                },
                {
                  title: "Phase 4 — Full SSO and legacy retirement",
                  body: "All nodes authenticate through the shared IdP. Legacy auth systems are retired. Full SSO is operational across the ecosystem.",
                },
              ]}
            />
          </section>

          <section className="mb-6">
            <SectionLabel number="02" label="Open questions" />
            <div className="flex flex-col gap-3">
              <Flag>
                <strong>IdP provider selection</strong>
                Auth0 vs. Okta decision is pending. Cost modeling at SEIU's actual MAU scale should inform this — both are technically capable. Organizational preferences and existing vendor relationships may be a factor.
              </Flag>
              <Flag>
                <strong>Mobile app auth migration complexity</strong>
                The mobile app currently mixes auth, segmentation, and policy logic through Strapi. The migration requires careful policy extraction before the auth layer can be independently replaced.
              </Flag>
            </div>
          </section>
        </div>
      )}
    </PageContent>
  );
}
