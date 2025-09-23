import { useMutation } from '@tanstack/react-query';
import { checkOut } from '@/api/booking';
import { toast } from 'sonner';
import { getQueryKey } from './use-get-booking-list';
import { queryClient } from '@/api/query-client';

export function useCheckout() {
  const mutation = useMutation({
    mutationFn: checkOut,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return mutation;
}
