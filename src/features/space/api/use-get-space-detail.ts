import { useQuery } from '@tanstack/react-query';
import { getSpaceDetail } from '@/api/space';
import { useAtomValue } from 'jotai';
import { isLoginAtom } from '@/features/auth';

const QUERY_KEY = 'space';

export function getQueryKey(spaceId?: string) {
  return spaceId ? [QUERY_KEY, spaceId] : [QUERY_KEY];
}

export function useGetSpaceDetail(spaceId: string) {
  const isLogin = useAtomValue(isLoginAtom);

  const query = useQuery({
    queryKey: getQueryKey(spaceId),
    queryFn: () => getSpaceDetail(spaceId),
    enabled: isLogin,
  });

  return query;
}
