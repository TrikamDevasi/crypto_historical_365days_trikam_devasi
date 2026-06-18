import { useState, useCallback } from 'react';
import { PAGINATION } from '../utils/constants';

const usePagination = (initialPage = PAGINATION.DEFAULT_PAGE, initialLimit = PAGINATION.DEFAULT_LIMIT) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goToPage = useCallback((p) => setPage(p), []);
  const changeLimit = useCallback((l) => { setLimit(l); setPage(1); }, []);
  const reset = useCallback(() => { setPage(initialPage); setLimit(initialLimit); }, [initialPage, initialLimit]);

  return { page, limit, setPage, setLimit, nextPage, prevPage, goToPage, changeLimit, reset };
};

export default usePagination;
