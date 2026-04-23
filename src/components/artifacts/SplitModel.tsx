interface SplitModelProps {
  left: { label: string; sublabel?: string };
  right: { label: string; sublabel?: string };
  connector?: string;
}

export function SplitModel({ left, right, connector = "→" }: SplitModelProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 bg-white border border-black/10 rounded-lg px-4 py-3">
        <p className="text-sm font-medium text-black">{left.label}</p>
        {left.sublabel && (
          <p className="font-mono text-[10px] text-black/30 mt-0.5">{left.sublabel}</p>
        )}
      </div>
      <span className="font-mono text-[11px] text-black/30 flex-shrink-0">{connector}</span>
      <div className="flex-1 bg-white border border-purple-power/20 rounded-lg px-4 py-3">
        <p className="text-sm font-medium text-purple-power">{right.label}</p>
        {right.sublabel && (
          <p className="font-mono text-[10px] text-black/30 mt-0.5">{right.sublabel}</p>
        )}
      </div>
    </div>
  );
}
