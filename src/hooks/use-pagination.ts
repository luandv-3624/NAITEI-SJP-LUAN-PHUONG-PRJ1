import { useState } from 'react';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '@/constants/pagination';

export function usePagination() {
  const [page, setPage] = useState(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const reset = () => {
    setPage(DEFAULT_CURRENT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
  };

  return { page, setPage, pageSize, setPageSize, reset };
}
