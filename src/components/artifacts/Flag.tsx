interface FlagProps {
  children: React.ReactNode;
}

export function Flag({ children }: FlagProps) {
  return (
    <div className="bg-white border-y border-r border-black/10 border-l-2 border-l-red-500/60 rounded-r-lg px-4 py-2.5 [&_strong]:text-black [&_strong]:font-medium [&_strong]:block [&_strong]:mb-0.5 [&_strong]:text-sm text-sm text-black/50 leading-relaxed">
      {children}
    </div>
  );
}
