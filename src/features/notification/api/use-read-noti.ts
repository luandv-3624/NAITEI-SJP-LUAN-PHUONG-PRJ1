import { useMutation, InfiniteData } from '@tanstack/react-query';
import { readNotification } from '@/api/notification';
import { toast } from 'sonner';
import { queryClient } from '@/api/query-client';
import { AxiosError } from '@/types';
import { NotificationType, NotificationListResponse } from '../types';
import { getQueryKey } from './use-get-noti';

export function useReadNotification() {
  const mutation = useMutation({
    mutationFn: readNotification,
    onSuccess: (_, notiId) => {
      queryClient.setQueryData<InfiniteData<NotificationListResponse>>(
        getQueryKey(),
        (oldData) => {
          if (!oldData) return oldData;

          let totalUnReadCount = oldData.pages.at(0)?.unReadCount ?? 0;

          const pages = oldData.pages.map((page) => {
            const data = page.data.map((n: NotificationType) => {
              if (String(n.id) === notiId && !n.is_read) {
                totalUnReadCount = Math.max(0, totalUnReadCount - 1);
                return { ...n, is_read: true };
              }
              return n;
            });
            return { ...page, data };
          });

          return {
            ...oldData,
            pages: pages.map((p) => ({
              ...p,
              unReadCount: totalUnReadCount,
            })),
          };
        },
      );
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return mutation;
}
