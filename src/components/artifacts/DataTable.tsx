interface Column {
  key: string;
  label: string;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  className?: string;
}

export function DataTable({ columns, rows, className }: DataTableProps) {
  return (
    <div
      className={`border border-black/10 rounded-xl overflow-hidden ${className ?? ""}`}
    >
      <table className="w-full">
        <thead>
          <tr className="bg-grey">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-black/30 text-left ${col.className ?? ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`hover:bg-black/[0.02] transition-colors ${i < rows.length - 1 ? "border-b border-black/[0.06]" : ""}`}
            >
              {columns.map((col, j) => (
                <td
                  key={col.key}
                  className={`px-3.5 py-3 text-sm leading-snug ${
                    j === 0
                      ? "font-medium text-black"
                      : "text-black/60 font-light"
                  } ${col.className ?? ""}`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
