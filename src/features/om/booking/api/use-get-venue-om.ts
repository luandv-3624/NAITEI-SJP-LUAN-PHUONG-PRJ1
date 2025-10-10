import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { isLoginAtom } from '@/features/auth';
import { useAtomValue } from 'jotai';
import { getVenuesOM } from '@/api/venue';
import { VenueFilterParams } from '@/features/om/venue';

const QUERY_KEY = 'venues';

export function getQueryKeyVenues(params?: Partial<VenueFilterParams>) {
  return params ? [QUERY_KEY, params] : [QUERY_KEY];
}

export function useGetVenuesOM(params: Partial<VenueFilterParams>) {
  const isLogin = useAtomValue(isLoginAtom);

  return useQuery({
    queryKey: getQueryKeyVenues(params),
    queryFn: () => getVenuesOM(params),
    enabled: isLogin,
    placeholderData: keepPreviousData,
  });
}
