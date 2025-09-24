import { useMemo } from 'react';
import { Booking } from '@/types';
import {
  BookingHistorySpaceInfoCard,
  BookingHistoryTimeInfoCard,
  BookingHistoryPaymentInfoCard,
  BookingDetailLayout,
} from '@/features/booking';
import { BookingDetailActions } from '@/features/om/booking';
import { PAYMENT_STATUS } from '@/constants';

interface BookingDetailProps {
  booking: Booking;
}

export function BookingDetail({ booking }: BookingDetailProps) {
  const totalPaid = useMemo(
    () =>
      booking.payments
        .filter((p) => p.status === PAYMENT_STATUS.SUCCESS)
        .reduce((sum, p) => sum + parseFloat(p.amount), 0),
    [booking.payments],
  );

  return (
    <BookingDetailLayout
      booking={booking}
      renderSpaceInfoCard={
        <BookingHistorySpaceInfoCard
          booking={booking}
          renderActions={<BookingDetailActions booking={booking} />}
        />
      }
      renderExtraCards={
        <>
          <BookingHistoryTimeInfoCard booking={booking} />
          <BookingHistoryPaymentInfoCard
            booking={booking}
            totalPaid={totalPaid}
          />
        </>
      }
    />
  );
}
