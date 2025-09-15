import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { getVenueDetail } from '@/api/venue';
import { isLoginAtom } from '@/features/auth';

const QUERY_KEY = 'venue';

export function getQueryKey(venueId?: string) {
  return venueId ? [QUERY_KEY, venueId] : [QUERY_KEY];
}

export function useGetVenueDetail(venueId: string) {
  const isLogin = useAtomValue(isLoginAtom);

  const query = useQuery({
    queryKey: getQueryKey(venueId),
    queryFn: () => getVenueDetail(venueId),
    enabled: isLogin,
  });

  return query;
}
