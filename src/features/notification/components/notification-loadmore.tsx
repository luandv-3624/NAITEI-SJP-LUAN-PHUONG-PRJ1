import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';

interface NotificationLoadMoreProps {
  pageSize: number;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function NotificationLoadMore({
  pageSize,
  isFetchingNextPage,
  fetchNextPage,
}: NotificationLoadMoreProps) {
  const { t } = useTranslation('notification');

  if (isFetchingNextPage) {
    return (
      <div className='flex flex-col gap-2 py-2'>
        {Array.from({ length: pageSize }).map((_, i) => (
          <div key={i} className='p-2 rounded-md'>
            <Skeleton className='h-4 w-32 mb-2' />
            <Skeleton className='h-3 w-48 mb-1' />
            <Skeleton className='h-3 w-20' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='flex justify-center py-2'>
      <Button
        size='sm'
        variant='ghost'
        onClick={fetchNextPage}
        disabled={isFetchingNextPage}
      >
        {t('loadMore')}
      </Button>
    </div>
  );
}
