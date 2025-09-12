import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BookingStatusBadge } from './booking-status-badge';
import { PaymentStatusBadge } from './payment-status-badge';
import { BookingPaymentStatus, BookingStatus } from '@/constants';
import { useDateTimeFormatter } from '@/features/booking';
import { Booking } from '@/types';
import { useTranslation } from 'react-i18next';
import { PaymentModal } from './payment-modal';
import { BookingCancelModal } from './booking-cancel-modal';
import {
  BookingHistoryTimeInfoCard,
  BookingHistoryPaymentInfoCard,
  BookingHistorySpaceInfoCard,
} from '@/features/booking';

interface BookingHistoryDetailProps {
  booking: Booking;
}

export function BookingHistoryDetail({ booking }: BookingHistoryDetailProps) {
  const { t } = useTranslation('booking');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { formatDate } = useDateTimeFormatter();

  const totalPaid = useMemo(
    () =>
      booking.payments
        .filter((p) => p.status === 'success')
        .reduce((sum, p) => sum + parseFloat(p.amount), 0),
    [booking.payments],
  );

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 md:px-8 py-8'>
        <div className='mb-6'>
          <Button
            variant='ghost'
            className='mb-4 -ml-3'
            onClick={() => window.history.back()}
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t('back_list')}
          </Button>

          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                {t('title_detail', { id: booking.id })}
              </h1>
              <p className='text-gray-600'>
                {t('created_at', { date: formatDate(booking.created_at) })}
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <BookingStatusBadge status={booking.status as BookingStatus} />
              <PaymentStatusBadge
                status={booking.status_payment as BookingPaymentStatus}
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-1 gap-8'>
          <div className='space-y-6'>
            <BookingHistorySpaceInfoCard
              booking={booking}
              onShowPaymentModal={() => setShowPaymentModal(true)}
              onShowCancelModal={() => setShowCancelModal(true)}
            />
            <BookingHistoryTimeInfoCard booking={booking} />
            <BookingHistoryPaymentInfoCard
              booking={booking}
              totalPaid={totalPaid}
            />
          </div>
        </div>

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
      </div>
    </div>
  );
}
