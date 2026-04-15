export type Status = "live" | "soon";

export type Audience =
  | "SEIU executive"
  | "Technical agency"
  | "Frameworks & Co."
  | "All";

export interface NavItem {
  label: string;
  href: string;
  status: Status;
  workstream: string;
  audience: Audience[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}
