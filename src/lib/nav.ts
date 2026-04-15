import type { NavSection } from "@/types";

export const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Home",
        href: "/",
        status: "live",
        workstream: "Overview",
        audience: ["All"],
      },
    ],
  },
  {
    label: "WS-1 · CRM & Platform",
    items: [
      {
        label: "Unified data model",
        href: "/ws1/unified-data-model",
        status: "live",
        workstream: "WS-1",
        audience: ["Technical agency", "Frameworks & Co."],
      },
      {
        label: "SSO & identity architecture",
        href: "/ws1/sso-identity",
        status: "live",
        workstream: "WS-1",
        audience: ["Technical agency"],
      },
      {
        label: "Node integration map",
        href: "/ws1/node-integration-map",
        status: "live",
        workstream: "WS-1",
        audience: ["Technical agency", "Frameworks & Co.", "SEIU executive"],
      },
      {
        label: "CRM agency brief",
        href: "/ws1/crm-agency-brief",
        status: "live",
        workstream: "WS-1",
        audience: ["Technical agency"],
      },
    ],
  },
  {
    label: "WS-2 · Home Care",
    items: [
      {
        label: "Phase 1 campaign brief",
        href: "/ws2/campaign-brief",
        status: "live",
        workstream: "WS-2",
        audience: ["Frameworks & Co.", "SEIU executive"],
      },
      {
        label: "Worker personas",
        href: "/ws2/worker-personas",
        status: "live",
        workstream: "WS-2",
        audience: ["Frameworks & Co.", "SEIU executive"],
      },
      {
        label: "60-day onboarding sequence",
        href: "/ws2/onboarding-sequence",
        status: "soon",
        workstream: "WS-2",
        audience: ["Technical agency", "Frameworks & Co."],
      },
    ],
  },
  {
    label: "WS-3 · Content & Frontend",
    items: [
      {
        label: "Content operations model",
        href: "/ws3/content-operations",
        status: "live",
        workstream: "WS-3",
        audience: ["Frameworks & Co.", "Technical agency"],
      },
      {
        label: "Frontend architecture",
        href: "/ws3/frontend-architecture",
        status: "live",
        workstream: "WS-3",
        audience: ["Technical agency", "Frameworks & Co."],
      },
    ],
  },
  {
    label: "WS-4 · Governance",
    items: [
      {
        label: "Training Centre governance brief",
        href: "/ws4/training-centre-governance",
        status: "soon",
        workstream: "WS-4",
        audience: ["SEIU executive"],
      },
      {
        label: "Ecosystem investment case",
        href: "/ws4/investment-case",
        status: "soon",
        workstream: "WS-4",
        audience: ["SEIU executive"],
      },
      {
        label: "Phased programme roadmap",
        href: "/ws4/programme-roadmap",
        status: "soon",
        workstream: "WS-4",
        audience: ["SEIU executive", "Technical agency"],
      },
    ],
  },
];
