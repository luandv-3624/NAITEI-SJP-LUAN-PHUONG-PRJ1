import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { PaginationIndies } from '@/components/ui/pagination-indies';
import { useTranslation } from 'react-i18next';
import { useGetMyVenues } from '../../api/use-get-my-venues';
import { searchParamsToMyVenuesQuery } from '../../utils/search-params-to-my-venues-query';
import { CardSkeleton } from './card-skeleton';
import { Card } from './card';
import { useGetProfile } from '@/features/auth';
import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { GeneralError } from '@/components/general-error';
import { AxiosError } from '@/types';
import { Empty } from '@/components/empty';

export function List() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(
    () => searchParamsToMyVenuesQuery(searchParams),
    [searchParams],
  );
  const { t } = useTranslation('venue');

  const containerRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const { data, isPending, isError, error } = useGetMyVenues(query);
  const { data: user } = useGetProfile();

  if (isPending) {
    return (
      <section className='space-y-4'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <GeneralError message={(error as AxiosError).response?.data.message} />
    );
  }

  if (data.data.length === 0) {
    return <Empty message={t('no_venue')} />;
  }

  return (
    <section className='space-y-4'>
      <BreadcrumbIndies items={[{ label: t('my_venues') }]} />
      <div
        className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'
        ref={containerRef}
      >
        {data.data.map((venue) => (
          <Card
            key={venue.id}
            venue={venue}
            isOwner={user?.id === venue.owner_id}
          />
        ))}
      </div>
      {data.meta.last_page > 1 && (
        <PaginationIndies
          handlePageChange={handlePageChange}
          page={data.meta.current_page}
          totalPages={data.meta.last_page}
        />
      )}
    </section>
  );
}
