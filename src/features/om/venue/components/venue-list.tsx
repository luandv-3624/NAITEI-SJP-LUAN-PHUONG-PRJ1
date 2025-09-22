import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VenueFilter } from './venue-filter';
import { VenueTable } from './venue-table';
import { VenuePagination } from './venue-pagination';
import { useDebounce, usePagination } from '@/hooks';
import { useGetVenues } from '@/features/om/venue';
import { useTranslation } from 'react-i18next';
import { PageSize } from '@/constants';
import { VenueFilterParams } from '@/features/om/venue';

export const FILTER_VALUES = {
  ALL: 'all',
} as const;

export function VenueList() {
  const { t } = useTranslation('venue');
  const {
    page: currentPage,
    setPage: setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination();

  const [filters, setFilters] = useState<VenueFilterParams>({
    page: currentPage,
    pageSize: pageSize,
    name: '',
    address: '',
    ownerId: '',
    wardId: '',
    status: FILTER_VALUES.ALL,
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  const debouncedName = useDebounce(filters.name, 500);
  const debouncedAddress = useDebounce(filters.address, 500);

  const params: VenueFilterParams = {
    page: currentPage,
    pageSize,
    name: debouncedName || undefined,
    address: debouncedAddress || undefined,
    ownerId: filters.ownerId || undefined,
    wardId: filters.wardId || undefined,
    status: filters.status !== FILTER_VALUES.ALL ? filters.status : undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  const { data, isPending, isFetching } = useGetVenues(params);

  const venues = data?.data || [];
  const totalRecords = data?.meta?.total || 0;
  const totalPages = data?.meta?.last_page || 1;

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setCurrentPage(1);
    },
    [setCurrentPage],
  );

  return (
    <div className='min-h-screen p-4 md:p-6'>
      <div className='max-w-7xl mx-auto'>
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>{t('venue_list.filter_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <VenueFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {t('venue_list.total_venues', { total: totalRecords })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VenueTable
              venues={venues}
              isPending={isPending}
              isFetching={isFetching}
            />

            <VenuePagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(size) => {
                setPageSize(size as PageSize);
                setCurrentPage(1);
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
