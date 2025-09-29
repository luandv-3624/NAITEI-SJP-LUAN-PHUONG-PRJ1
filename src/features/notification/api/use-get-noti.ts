import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotificationByMe } from '@/api/notification';

const QUERY_KEY = 'notifications';

export function getQueryKey(params?: { pageParam: number; pageSize: number }) {
  return params ? [QUERY_KEY, params] : [QUERY_KEY];
}

export function useInfiniteNoti(pageSize = 10) {
  return useInfiniteQuery({
    queryKey: getQueryKey(),
    queryFn: ({ pageParam = 1 }) =>
      getNotificationByMe({ pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page < lastPage.meta.last_page) {
        return lastPage.meta.current_page + 1;
      }
      return undefined;
    },
  });
}
