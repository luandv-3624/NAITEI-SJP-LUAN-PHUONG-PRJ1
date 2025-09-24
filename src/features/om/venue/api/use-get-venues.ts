import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { isLoginAtom } from '@/features/auth';
import { useAtomValue } from 'jotai';
import { getVenues } from '@/api/venue';
import { VenueFilterParams } from '../types';

const QUERY_KEY = 'venues';

export function getQueryKey(params?: VenueFilterParams) {
  return params ? [QUERY_KEY, params] : [QUERY_KEY];
}

export function useGetVenues(params?: VenueFilterParams) {
  const isLogin = useAtomValue(isLoginAtom);

  return useQuery({
    queryKey: getQueryKey(params),
    queryFn: () => getVenues(params),
    enabled: isLogin,
    placeholderData: keepPreviousData,
  });
}
