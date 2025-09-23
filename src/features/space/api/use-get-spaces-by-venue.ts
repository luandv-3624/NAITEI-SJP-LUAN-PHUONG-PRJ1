import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { SpaceByVenueQuery } from '../types';
import { getSpacesByVenue } from '@/api/space';
import { useEffect } from 'react';

const QUERY_KEY = 'spaces-by-venue';

export function getQueryKey(venueId: string, spaceQuery?: SpaceByVenueQuery) {
  return spaceQuery ? [QUERY_KEY, venueId, spaceQuery] : [QUERY_KEY, venueId];
}

export function useGetSpacesByVenue(
  venueId: string,
  spaceQuery?: SpaceByVenueQuery,
) {
  const query = useQuery({
    queryKey: getQueryKey(venueId, spaceQuery),
    queryFn: () => getSpacesByVenue({ venueId, query: spaceQuery }),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    if (!query.data) {
      return;
    }

    if (query.data.meta.current_page < query.data.meta.last_page) {
      const nextPageSpaceQuery: SpaceByVenueQuery = {
        ...spaceQuery,
        page: query.data.meta.current_page + 1,
      };

      queryClient.prefetchQuery({
        queryKey: getQueryKey(venueId, nextPageSpaceQuery),
        queryFn: () => getSpacesByVenue({ venueId, query: nextPageSpaceQuery }),
      });
    }
  }, [query.data, spaceQuery, queryClient, venueId]);

  return query;
}
