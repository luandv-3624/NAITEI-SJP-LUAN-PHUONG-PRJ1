import { useQuery } from '@tanstack/react-query';
import { getUsersSimpleList } from '@/api/user';

const QUERY_KEY = 'users-simple-list';

export function getQueryKey() {
  return [QUERY_KEY];
}

export function useGetUsersSimpleList() {
  const query = useQuery({
    queryKey: getQueryKey(),
    queryFn: getUsersSimpleList,
  });

  return query;
}
