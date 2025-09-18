import { getWards } from '@/api/address';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'wards';

export function getQueryKey(provinceId: number) {
  return [QUERY_KEY, provinceId];
}

export function useGetWards(provinceId: number) {
  const query = useQuery({
    queryKey: getQueryKey(provinceId),
    queryFn: () => getWards(provinceId),
    staleTime: Infinity,
    enabled: provinceId !== 0,
  });

  return query;
}
