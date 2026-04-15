interface SectionLabelProps {
  number: string;
  label: string;
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[10px] text-purple-power flex-shrink-0">
        {number}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-black/30 flex-shrink-0">
        {label}
      </span>
      <span className="flex-1 h-px bg-black/10" aria-hidden="true" />
    </div>
  );
}
