import { updateVenue } from '@/api/venue';
import { AxiosError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getQueryKey as getVenueDetailQueryKey } from './use-get-venue-detail';
import { getQueryKey } from './use-get-my-venues';

export function useUpdateVenue() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateVenue,
    onSuccess: (res, { id }) => {
      toast(res.message);
      queryClient.invalidateQueries({ queryKey: getVenueDetailQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
  });

  return mutation;
}
