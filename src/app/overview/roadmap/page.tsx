import { Clock } from "lucide-react";
import { PageContent } from "@/components/layout/PageContent";
import { PageHeader } from "@/components/layout/PageHeader";

export default function RoadmapPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="Overview · Roadmap"
        title="Programme Roadmap"
        titleAccent="Roadmap"
        description="Phased milestones, delivery sequencing, and cross-layer dependencies across the full implementation horizon."
        meta={[
          { label: "Status", value: "Coming soon" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <div className="flex flex-col items-center justify-center py-20 gap-5 animate-fade-up">
        <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
          <Clock className="w-5 h-5 text-black/25" aria-hidden="true" />
        </div>
        <div className="text-center max-w-sm">
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/25 mb-2">
            In progress
          </p>
          <p className="text-sm font-light text-black/40 leading-relaxed">
            The programme roadmap is being prepared. It will document phased delivery milestones, cross-layer dependencies, and the sequencing from current state through mature target state.
          </p>
        </div>
      </div>
    </PageContent>
  );
}
