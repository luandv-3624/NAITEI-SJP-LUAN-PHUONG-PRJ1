import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageSize, PAGE_SIZES } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export function BookingHistoryPagination({
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: {
  currentPage: number;
  pageSize: PageSize;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) {
  const { t } = useTranslation('common');

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className='flex items-center justify-between mt-4'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href='#'
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className='flex items-center gap-2'>
        <span className='text-sm text-gray-600'>{t('rows_per_page')}:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className='w-20'>
            <SelectValue placeholder='Page size' />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((pageSize) => (
              <SelectItem value={pageSize.toString()}>{pageSize}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
