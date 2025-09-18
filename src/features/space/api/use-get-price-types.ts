import { getPriceTypes } from '@/api/space';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'price-types';

export function getQueryKey() {
  return [QUERY_KEY];
}

export function useGetPriceTypes() {
  const query = useQuery({
    queryKey: getQueryKey(),
    queryFn: getPriceTypes,
    staleTime: Infinity,
  });

  return query;
}
