import { useMutation } from '@tanstack/react-query';
import { createPayment } from '@/api/payment';
import { toast } from 'sonner';
import i18n from '@/i18n';

export function useCreatePayment() {
  const mutation = useMutation({
    mutationFn: createPayment,
    onSuccess: (response) => {
      toast.success(
        response.message ||
          i18n.t('payment.create_payment_success', { ns: 'booking' }),
      );
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        i18n.t('payment.create_payment_failed', { ns: 'booking' });
      toast.error(message);
    },
  });

  return mutation;
}
