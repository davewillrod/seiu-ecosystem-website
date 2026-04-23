export type Status = "live" | "soon";

export interface NavItem {
  label: string;
  href: string;
  status: Status;
  section: "overview" | "layers";
  layerNumber?: number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}
