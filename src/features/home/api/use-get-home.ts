import { getHome } from '@/api/home';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'home';

export function getQueryKey() {
  return [QUERY_KEY];
}

export function useGetHome() {
  const query = useQuery({
    queryKey: getQueryKey(),
    queryFn: getHome,
  });

  return query;
}
