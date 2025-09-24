import { updateSpace } from '@/api/space';
import { AxiosError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getQueryKey as getSpaceDetailQueryKey } from './use-get-space-detail';
import { getQueryKey as getSpacesByVenueQueryKey } from './use-get-spaces-by-venue';
import { getQueryKey } from './use-get-spaces';

export function useUpdateSpace() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSpace,
    onSuccess: (res, { spaceId }) => {
      toast(res.message);
      queryClient.invalidateQueries({
        queryKey: getSpaceDetailQueryKey(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: getSpacesByVenueQueryKey(String(res.data.venue_id)),
      });
      queryClient.invalidateQueries({
        queryKey: getQueryKey(),
      });
    },
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
  });

  return mutation;
}
