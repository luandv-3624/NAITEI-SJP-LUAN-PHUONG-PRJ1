import { useGetHome } from '../api/use-get-home';

export function Info() {
  const { data, isPending, isError } = useGetHome();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <div>{data.message}</div>;
}
