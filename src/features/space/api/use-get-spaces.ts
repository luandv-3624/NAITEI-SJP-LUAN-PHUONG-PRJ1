import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { SpaceQuery } from '../types';
import { getSpaces } from '@/api/space';
import { useEffect } from 'react';

const QUERY_KEY = 'spaces';

export function getQueryKey(spaceQuery?: SpaceQuery) {
  return spaceQuery ? [QUERY_KEY, spaceQuery] : [QUERY_KEY];
}

export function useGetSpaces(spaceQuery?: SpaceQuery) {
  const query = useQuery({
    queryKey: getQueryKey(spaceQuery),
    queryFn: () => getSpaces(spaceQuery),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    if (!query.data) {
      return;
    }

    if (query.data.meta.current_page < query.data.meta.last_page) {
      const nextPageSpaceQuery: SpaceQuery = {
        ...spaceQuery,
        page: query.data.meta.current_page + 1,
      };

      queryClient.prefetchQuery({
        queryKey: getQueryKey(nextPageSpaceQuery),
        queryFn: () => getSpaces(nextPageSpaceQuery),
      });
    }
  }, [query.data, spaceQuery, queryClient]);

  return query;
}
