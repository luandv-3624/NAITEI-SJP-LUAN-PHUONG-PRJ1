import { useCallback } from 'react';
import { Bell } from 'lucide-react';
import { useNotification } from '@/hooks/use-notification';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInfiniteNoti, useReadNotification } from '@/features/notification';
import {
  NotificationSkeleton,
  NotificationError,
  NotificationItem,
  NotificationLoadMore,
} from '@/features/notification';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 2;

export function Notification() {
  const { t } = useTranslation('notification');
  useNotification();
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteNoti(PAGE_SIZE);

  const notiMutate = useReadNotification();

  const handleReadNoti = useCallback(
    (notiId: string) => {
      notiMutate.mutate(notiId);
    },
    [notiMutate],
  );

  if (isPending) {
    return <NotificationSkeleton pageSize={PAGE_SIZE} />;
  }

  if (isError) {
    return <NotificationError />;
  }

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];

  const unReadCount = data?.pages.at(0)?.unReadCount ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        <Bell className='w-6 h-6' />
        {unReadCount > 0 && (
          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1'>
            {unReadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64 max-h-96 overflow-y-auto gap-y-2'>
        {notifications.length ? (
          <>
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                handleReadNoti={handleReadNoti}
              />
            ))}
            {hasNextPage && (
              <NotificationLoadMore
                pageSize={PAGE_SIZE}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            )}
          </>
        ) : (
          <DropdownMenuItem>{t('noNotifications')}</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
