import { createVenue } from '@/api/venue';
import { AxiosError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getQueryKey } from './use-get-my-venues';

export function useCreateVenue() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createVenue,
    onSuccess: (res) => {
      toast(res.message);
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
  });

  return mutation;
}
