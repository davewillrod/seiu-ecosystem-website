import type { NavSection } from "@/types";

export const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Overview", href: "/overview/overview", status: "live", section: "overview" },
      { label: "Current State", href: "/overview/current-state", status: "live", section: "overview" },
      { label: "Future State", href: "/overview/future-state", status: "live", section: "overview" },
      { label: "Roadmap", href: "/overview/roadmap", status: "live", section: "overview" },
      { label: "Staff Portal", href: "/overview/unified-staff-portal", status: "live", section: "overview" },
    ],
  },
  {
    label: "Layers",
    items: [
      { label: "Administrative Registry", href: "/layers/administrative-registry", status: "live", section: "layers", layerNumber: 1 },
      { label: "Identity", href: "/layers/identity", status: "live", section: "layers", layerNumber: 2 },
      { label: "IdP / SSO", href: "/layers/idp-sso", status: "live", section: "layers", layerNumber: 3 },
      { label: "Event Backbone", href: "/layers/event-backbone", status: "live", section: "layers", layerNumber: 4 },
      { label: "Member Intelligence", href: "/layers/member-intelligence", status: "live", section: "layers", layerNumber: 5 },
      { label: "Workflow & Case", href: "/layers/workflow-case", status: "live", section: "layers", layerNumber: 6 },
      { label: "Applications & Nodes", href: "/layers/applications-nodes", status: "live", section: "layers", layerNumber: 7 },
      { label: "Content & Publishing", href: "/layers/content-publishing", status: "live", section: "layers", layerNumber: 8 },
    ],
  },
];
