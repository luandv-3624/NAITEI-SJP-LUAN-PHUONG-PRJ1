import { useMutation } from '@tanstack/react-query';
import { checkIn } from '@/api/booking';
import { toast } from 'sonner';
import { getQueryKey } from './use-get-booking-list';
import { queryClient } from '@/api/query-client';
import { AxiosError } from '@/types';

export function useCheckin() {
  const mutation = useMutation({
    mutationFn: checkIn,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return mutation;
}
