import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getBookingMe } from '@/api/booking';
import { useAtomValue } from 'jotai';
import { isLoginAtom } from '@/features/auth';
import { BookingFilterParams } from '../types';

const QUERY_KEY = 'bookings-me';
export function getQueryKey(filter?: BookingFilterParams) {
  return filter ? [QUERY_KEY, filter] : [QUERY_KEY];
}

export function useGetBookingMe(params: BookingFilterParams) {
  const isLogin = useAtomValue(isLoginAtom);

  return useQuery({
    queryKey: getQueryKey(params),
    queryFn: () => getBookingMe(params),
    enabled: isLogin,
    placeholderData: keepPreviousData,
  });
}
