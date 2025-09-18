import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getBookingMe } from '@/api/booking';
import { useAtomValue } from 'jotai';
import { isLoginAtom } from '@/features/auth';

const QUERY_KEY = 'bookings';

export function useGetBookingMe(params: any) {
  const isLogin = useAtomValue(isLoginAtom);

  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => getBookingMe(params),
    enabled: isLogin,
    placeholderData: keepPreviousData,
  });
}
