interface StatCalloutProps {
  value: string;
  label: string;
}

export function StatCallout({ value, label }: StatCalloutProps) {
  return (
    <div className="inline-flex flex-col gap-0.5">
      <span className="font-mono text-3xl font-bold text-purple-power leading-none">
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-black/30">
        {label}
      </span>
    </div>
  );
}
