import { useMemo, useRef } from 'react';
import { searchParamsToSpaceQuery } from '../utils/search-params-to-space-query';
import { useSearchParams } from 'react-router';
import { useGetSpaces } from '../api/use-get-spaces';
import { SpaceCard } from './space-card';
import { PaginationIndies } from '@/components/ui/pagination-indies';
import { SpaceCardSkeleton } from './space-card-skeleton';
import { Bug, PackageOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SpaceList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(
    () => searchParamsToSpaceQuery(searchParams),
    [searchParams],
  );
  const { t } = useTranslation('space');

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

  const { data, isPending, isError } = useGetSpaces(query);

  if (isPending) {
    return (
      <section className='space-y-4'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <SpaceCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 min-h-50'>
        <Bug className='size-10' />
        <p className='text-sm font-bold'>{t('something_went_wrong')}</p>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 min-h-50'>
        <PackageOpen className='size-10' />
        <p className='text-sm font-bold'>{t('no_space')}</p>
      </div>
    );
  }

  return (
    <section className='space-y-4'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4' ref={containerRef}>
        {data.data.map((space) => (
          <SpaceCard key={space.id} space={space} />
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
