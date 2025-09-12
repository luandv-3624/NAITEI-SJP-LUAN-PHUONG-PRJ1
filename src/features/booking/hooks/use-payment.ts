import { useEffect, useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useCreatePayment, getQueryKey } from '@/features/booking';
import { paymentFormSchema } from '@/features/booking';
import { queryClient } from '@/api/query-client';
import { echo } from '@/lib/echo';
import { Booking } from '@/types';

type PaymentFormValues = {
  mode: 'full' | 'partial';
  partialAmount?: string;
};

export function usePayment(
  booking: Booking,
  totalPaid: number,
  onClose: () => void,
) {
  const { t } = useTranslation('booking');

  const [paymentMode, setPaymentMode] = useState<'full' | 'partial'>('full');
  const createPaymentMutation = useCreatePayment();
  const [qrData, setQrData] = useState<{
    qrCode: string;
    requestId: string;
  } | null>(null);

  const remaining = useMemo(
    () => parseFloat(booking.total_price) - totalPaid,
    [booking.total_price, totalPaid],
  );

  const form = useForm({
    resolver: zodResolver(paymentFormSchema(remaining)),
    defaultValues: { partialAmount: '', mode: 'full' },
    mode: 'onChange',
  });

  useEffect(() => {
    form.setValue('mode', paymentMode);
  }, [paymentMode]);

  const onSubmit: SubmitHandler<PaymentFormValues> = async (values) => {
    const paidAmount =
      values.mode === 'full'
        ? remaining
        : values.partialAmount
          ? Number(values.partialAmount)
          : 0;

    if (!paidAmount || paidAmount <= 0 || paidAmount > remaining) {
      toast.error(t('payment.invalid_amount'));
      return;
    }

    try {
      const { data } = await createPaymentMutation.mutateAsync({
        booking_id: booking.id,
        amount: paidAmount,
      });
      setQrData({ qrCode: data.qrCode, requestId: data.requestId });
    } catch {
      toast.error(t('payment.error_generate_qr'));
    }
  };

  useEffect(() => {
    if (!qrData?.requestId) return;

    const channel = echo.channel(`payment.${qrData?.requestId}`);
    channel.listen('PaymentUpdated', (data: { status: string }) => {
      if (data.status === 'success') {
        toast.success(t('payment.success'));
        queryClient.invalidateQueries({
          queryKey: getQueryKey(String(booking.id)),
        });
      } else {
        toast.error(t('payment.failed_or_canceled'));
      }
      onClose();
    });

    return () => {
      channel.unsubscribe();
    };
  }, [qrData?.requestId]);

  const resetState = () => {
    setQrData(null);
    form.reset();
    setPaymentMode('full');
  };

  return {
    form,
    paymentMode,
    setPaymentMode,
    loading: createPaymentMutation.isPending,
    onSubmit,
    qrData,
    resetState,
    remaining,
  };
}
