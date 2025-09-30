import { useMutation } from '@tanstack/react-query';
import { createBooking } from '@/api/booking';
import { toast } from 'sonner';
import i18n from '@/i18n';
import { AxiosError } from '@/types';

export function useCreateBooking() {
  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (response) => {
      toast.success(
        response.message || i18n.t('booking_success', { ns: 'booking' }),
      );
    },
    onError: (error: AxiosError) => {
      const message =
        error?.response?.data?.message ||
        i18n.t('booking_failed', { ns: 'booking' });
      toast.error(message);
    },
  });

  return mutation;
}
