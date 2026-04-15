interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <pre
      className={`bg-grey border border-black/[0.12] rounded-lg px-3.5 py-2.5 font-mono text-xs leading-7 overflow-x-auto ${className ?? ""}`}
    >
      {children}
    </pre>
  );
}
