import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { MyVenuesQuery } from '../types';
import { useEffect } from 'react';
import { getMyVenues } from '@/api/venue';

const QUERY_KEY = 'my-venues';

export function getQueryKey(venueQuery?: MyVenuesQuery) {
  return venueQuery ? [QUERY_KEY, venueQuery] : [QUERY_KEY];
}

export function useGetMyVenues(venueQuery?: MyVenuesQuery) {
  const query = useQuery({
    queryKey: getQueryKey(venueQuery),
    queryFn: () => getMyVenues(venueQuery),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    if (!query.data) {
      return;
    }

    if (query.data.meta.current_page < query.data.meta.last_page) {
      const nextPageVenueQuery: MyVenuesQuery = {
        ...venueQuery,
        page: query.data.meta.current_page + 1,
      };

      queryClient.prefetchQuery({
        queryKey: getQueryKey(nextPageVenueQuery),
        queryFn: () => getMyVenues(nextPageVenueQuery),
      });
    }
  }, [query.data, venueQuery, queryClient]);

  return query;
}
