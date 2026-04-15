import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./Badge";

interface ArtifactCardProps {
  workstream: string;
  title: string;
  titleAccent?: string;
  description: string;
  audience: string[];
  status: "live" | "soon";
  href?: string;
}

export function ArtifactCard({
  workstream,
  title,
  titleAccent,
  description,
  audience,
  status,
  href,
}: ArtifactCardProps) {
  const renderTitle = () => {
    if (!titleAccent) return title;
    const idx = title.indexOf(titleAccent);
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <em className="italic text-purple-power not-italic">{titleAccent}</em>
        {title.slice(idx + titleAccent.length)}
      </>
    );
  };

  if (status === "soon") {
    return (
      <div className="bg-grey/50 border border-black/[0.06] rounded-xl p-5 opacity-60 pointer-events-none">
        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/25">
            {workstream}
          </span>
          <Badge variant="soon">Soon</Badge>
        </div>
        <h3 className="text-sm font-medium text-black/40 leading-snug mb-1.5">
          {title}
        </h3>
        <p className="text-xs font-light text-black/30 leading-snug">
          {description}
        </p>
      </div>
    );
  }

  return (
    <Link
      href={href ?? "#"}
      className="group bg-white border border-black/10 rounded-xl p-5 block hover:border-purple-power/30 hover:-translate-y-px transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-black/30">
          {workstream}
        </span>
        <ArrowUpRight
          size={14}
          className="text-black/20 group-hover:text-purple-power group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-sm font-medium text-black leading-snug mb-1.5">
        {renderTitle()}
      </h3>
      <p className="text-xs font-light text-black/50 leading-snug mb-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-1">
        {audience.map((a) => (
          <Badge key={a} variant="muted">
            {a}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
