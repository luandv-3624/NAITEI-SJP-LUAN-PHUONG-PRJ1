import { addManagers } from '@/api/venue';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryKey as getVenueDetailQueryKey } from './use-get-venue-detail';
import { AxiosError } from '@/types';
import { toast } from 'sonner';

export function useAddManagers() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addManagers,
    onSuccess: (res, { venueId }) => {
      toast(res.message);
      queryClient.invalidateQueries({
        queryKey: getVenueDetailQueryKey(venueId),
      });
    },
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
  });

  return mutation;
}
