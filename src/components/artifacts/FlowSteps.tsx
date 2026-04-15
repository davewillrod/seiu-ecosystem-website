interface Step {
  title: string;
  body: string;
  note?: string;
}

interface FlowStepsProps {
  steps: Step[];
}

export function FlowSteps({ steps }: FlowStepsProps) {
  return (
    <ol className="space-y-0" role="list">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4 relative">
          {/* Left column: number + line */}
          <div className="flex flex-col items-center flex-shrink-0 w-[34px]">
            <div className="w-[34px] h-[34px] rounded-full bg-grey border border-black/[0.12] flex items-center justify-center flex-shrink-0 z-10">
              <span className="font-mono text-[11px] text-black/30">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-black/10 mt-0" />
            )}
          </div>

          {/* Content */}
          <div className={i < steps.length - 1 ? "pb-6" : ""}>
            <p className="text-sm font-medium text-black leading-snug mt-2">
              {step.title}
            </p>
            <p className="text-sm font-light text-black/50 leading-relaxed mt-1">
              {step.body}
            </p>
            {step.note && (
              <p className="font-mono text-[10px] text-purple-power mt-2 uppercase tracking-wide">
                {step.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
