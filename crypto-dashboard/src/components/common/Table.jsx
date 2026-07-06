import { motion } from 'framer-motion';

const Table = ({ columns, data, onRowClick, emptyMessage = 'No data available' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-white/30">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto no-scrollbar w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider font-sans"
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <motion.tr
              key={row._id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              onClick={() => onRowClick?.(row)}
              className={`
                border-b border-white/[0.04] transition-all duration-300
                hover:bg-white/[0.03] hover:shadow-[inset_2px_0_0_0_#22d3ee]
                ${onRowClick ? 'cursor-pointer' : ''}
              `}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-5 py-4 text-sm text-text-main font-sans">
                  {col.render ? col.render(row[col.key], row, index) : row[col.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
