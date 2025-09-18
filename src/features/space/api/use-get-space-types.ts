import { getSpaceTypes } from '@/api/space';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'space-types';

export function getQueryKey() {
  return [QUERY_KEY];
}

export function useGetSpaceTypes() {
  const query = useQuery({
    queryKey: getQueryKey(),
    queryFn: getSpaceTypes,
    staleTime: Infinity,
  });

  return query;
}
