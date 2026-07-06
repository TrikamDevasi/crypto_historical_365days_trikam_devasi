import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Pagination = ({ page, totalPages, onPageChange, limit, onLimitChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/40">Rows per page:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange?.(Number(e.target.value))}
          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white/70 focus:outline-none focus:border-primary"
        >
          {[10, 20, 50, 100].map((l) => (
            <option key={l} value={l} className="bg-bg-secondary">{l}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-1 rounded text-white/40 hover:text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeftIcon fontSize="small" />
        </button>

        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`
              min-w-[28px] h-7 rounded text-xs font-medium transition-all
              ${p === page
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-1 rounded text-white/40 hover:text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>

      <span className="text-xs text-white/30">
        Page {page} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
