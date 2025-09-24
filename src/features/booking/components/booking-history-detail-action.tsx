import { Button } from '@/components/ui/button';
import { CreditCard, XCircle } from 'lucide-react';
import { BOOKING_PAYMENT_STATUS, BOOKING_STATUS } from '@/constants';
import { Booking } from '@/types';
import { useTranslation } from 'react-i18next';

interface BookingHistoryDetailActionsProps {
  booking: Booking;
  onShowPaymentModal: () => void;
  onShowCancelModal: () => void;
}

export function BookingHistoryDetailActions({
  booking,
  onShowPaymentModal,
  onShowCancelModal,
}: BookingHistoryDetailActionsProps) {
  const { t } = useTranslation('booking');

  return (
    <div className='flex gap-2 ml-auto'>
      {booking.status_payment !== BOOKING_PAYMENT_STATUS.PAID && (
        <Button
          size='sm'
          className='bg-blue-600 hover:bg-blue-700'
          onClick={onShowPaymentModal}
        >
          <CreditCard className='w-4 h-4 mr-2' />
          {t('btn_pay')}
        </Button>
      )}

      {(booking.status === BOOKING_STATUS.PENDING ||
        booking.status === BOOKING_STATUS.CONFIRMED_UNPAID) && (
        <Button variant='destructive' size='sm' onClick={onShowCancelModal}>
          <XCircle className='w-4 h-4 mr-2' />
          {t('btn_cancel')}
        </Button>
      )}
    </div>
  );
}
