import { createSpace } from '@/api/space';
import { AxiosError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getQueryKey as getAllSpacesQueryKey } from './use-get-spaces';
import { getQueryKey } from './use-get-spaces-by-venue';

export function useCreateSpace() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSpace,
    onSuccess: (res, { venueId }) => {
      toast(res.message);
      queryClient.invalidateQueries({ queryKey: getAllSpacesQueryKey() });
      queryClient.invalidateQueries({ queryKey: getQueryKey(venueId) });
    },
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
  });

  return mutation;
}
