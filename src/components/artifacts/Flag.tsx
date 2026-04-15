interface FlagProps {
  title: string;
  children: React.ReactNode;
}

export function Flag({ title, children }: FlagProps) {
  return (
    <div className="bg-white border-y border-r border-black/10 border-l-2 border-l-red-500/60 rounded-r-lg px-4 py-2.5">
      <strong className="text-black font-medium block mb-0.5 text-sm">
        {title}
      </strong>
      <div className="text-sm text-black/50 leading-relaxed">{children}</div>
    </div>
  );
}
