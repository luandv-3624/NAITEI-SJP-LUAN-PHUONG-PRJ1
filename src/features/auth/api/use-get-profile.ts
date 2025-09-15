import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { isLoginAtom } from '../atomts';
import { getProfile } from '@/api/auth';

const QUERY_KEY = 'profile';

export function getQueryKey() {
  return [QUERY_KEY];
}

export function useGetProfile() {
  const isLogin = useAtomValue(isLoginAtom);

  const query = useQuery({
    queryKey: getQueryKey(),
    queryFn: getProfile,
    enabled: isLogin,
  });

  return query;
}
