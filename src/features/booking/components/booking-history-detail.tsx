import { useState, useMemo } from 'react';
import { Booking } from '@/types';
import { PaymentModal } from './payment-modal';
import { BookingCancelModal } from './booking-cancel-modal';
import {
  BookingHistoryTimeInfoCard,
  BookingHistoryPaymentInfoCard,
  BookingHistorySpaceInfoCard,
  BookingDetailLayout,
  BookingHistoryDetailActions,
} from '@/features/booking';

interface BookingHistoryDetailProps {
  booking: Booking;
}

export function BookingHistoryDetail({ booking }: BookingHistoryDetailProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const totalPaid = useMemo(
    () =>
      booking.payments
        .filter((p) => p.status === 'success')
        .reduce((sum, p) => sum + parseFloat(p.amount), 0),
    [booking.payments],
  );

  return (
    <BookingDetailLayout
      booking={booking}
      renderSpaceInfoCard={
        <BookingHistorySpaceInfoCard
          booking={booking}
          renderActions={
            <BookingHistoryDetailActions
              booking={booking}
              onShowPaymentModal={() => setShowPaymentModal(true)}
              onShowCancelModal={() => setShowCancelModal(true)}
            />
          }
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
      renderModals={
        <>
          <PaymentModal
            booking={booking}
            totalPaid={totalPaid}
            open={showPaymentModal}
            onOpenChange={setShowPaymentModal}
          />
          <BookingCancelModal
            open={showCancelModal}
            onOpenChange={setShowCancelModal}
          />
        </>
      }
    />
  );
}
