import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { GetUsersQuery } from '../types';
import { getUsers } from '@/api/user';
import { useEffect } from 'react';

const QUERY_KEY = 'users';

export function getQueryKey(userQuery?: GetUsersQuery) {
  return userQuery ? [QUERY_KEY, userQuery] : [QUERY_KEY];
}

export function useGetUsers(userQuery?: GetUsersQuery) {
  const query = useQuery({
    queryKey: getQueryKey(userQuery),
    queryFn: () => getUsers(userQuery),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    if (!query.data) {
      return;
    }

    if (query.data.meta.current_page < query.data.meta.last_page) {
      const nextPageUserQuery: GetUsersQuery = {
        ...userQuery,
        page: query.data.meta.current_page + 1,
      };

      queryClient.prefetchQuery({
        queryKey: getQueryKey(nextPageUserQuery),
        queryFn: () => getUsers(nextPageUserQuery),
      });
    }
  }, [query.data, userQuery, queryClient]);

  return query;
}
