interface DataTableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <div className={`border border-black/10 rounded-xl overflow-hidden ${className ?? ""}`}>
      <table className="w-full">
        <thead>
          <tr className="bg-grey">
            {headers.map((header) => (
              <th
                key={header}
                className="px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-black/30 text-left"
              >
                {header}
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
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3.5 py-3 text-sm leading-snug ${
                    j === 0 ? "font-medium text-black" : "font-light text-black/60"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
