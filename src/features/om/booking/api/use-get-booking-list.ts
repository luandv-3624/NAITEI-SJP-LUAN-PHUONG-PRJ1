import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getBookingListOM } from '@/api/booking';
import { useAtomValue } from 'jotai';
import { isLoginAtom } from '@/features/auth';
import { BookingFilterParams } from '@/features/booking';

const QUERY_KEY = 'bookings';

export function getQueryKey(
  params?: BookingFilterParams & { venueId?: string },
) {
  return params ? [QUERY_KEY, params] : [QUERY_KEY];
}

export function useGetBookingListOM(
  params: BookingFilterParams & { venueId?: string },
) {
  const isLogin = useAtomValue(isLoginAtom);

  return useQuery({
    queryKey: getQueryKey(params),
    queryFn: () => getBookingListOM(params),
    enabled: isLogin,
    placeholderData: keepPreviousData,
  });
}
