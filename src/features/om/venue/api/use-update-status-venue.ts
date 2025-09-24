import { useMutation } from '@tanstack/react-query';
import { updateStatusVenue } from '@/api/venue';
import { toast } from 'sonner';
import { AxiosError } from '@/types';
import { queryClient } from '@/api/query-client';
import { getQueryKey as getQueryKeyByParams } from './use-get-venues';

export function useUpdateStatusVenue() {
  const mutation = useMutation({
    mutationFn: updateStatusVenue,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: getQueryKeyByParams() });
    },
    onError: (error: AxiosError) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });

  return mutation;
}
