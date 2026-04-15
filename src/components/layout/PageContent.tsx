interface PageContentProps {
  children: React.ReactNode;
}

export function PageContent({ children }: PageContentProps) {
  return (
    <div className="px-14 pt-14 pb-24 max-w-content">
      {children}
    </div>
  );
}
