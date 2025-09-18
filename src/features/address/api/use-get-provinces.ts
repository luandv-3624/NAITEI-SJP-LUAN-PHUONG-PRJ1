import { getProvinces } from '@/api/address';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'provinces';

export function getQueryKey() {
  return [QUERY_KEY];
}

export function useGetProvinces() {
  const query = useQuery({
    queryKey: getQueryKey(),
    queryFn: getProvinces,
    staleTime: Infinity,
  });

  return query;
}
