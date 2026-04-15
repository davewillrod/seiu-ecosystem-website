interface PageHeaderProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  meta: { label: string; value: string }[];
}

export function PageHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  meta,
}: PageHeaderProps) {
  const renderTitle = () => {
    if (!titleAccent) return title;
    const idx = title.indexOf(titleAccent);
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <em className="font-bold italic text-purple-power not-italic">
          {titleAccent}
        </em>
        {title.slice(idx + titleAccent.length)}
      </>
    );
  };

  return (
    <header className="mb-10 pb-8 border-b border-black/10">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-0.5 h-5 bg-purple-power rounded-full flex-shrink-0" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 leading-none">
          {eyebrow}
        </p>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight mb-3">{renderTitle()}</h1>

      {/* Description */}
      <p className="text-sm font-light text-black/50 leading-relaxed max-w-xl mb-6">
        {description}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {meta.map((item, i) => (
          <span key={i} className="font-mono text-[11px] text-black/30">
            <span className="text-black/20">{item.label} </span>
            {item.value}
          </span>
        ))}
      </div>
    </header>
  );
}
