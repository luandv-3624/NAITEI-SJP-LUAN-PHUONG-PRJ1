import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Eye, CreditCard, XCircle } from 'lucide-react';
import { Link } from 'react-router';
import { BOOKING_PAYMENT_STATUS, BOOKING_STATUS } from '@/constants';
import { Booking } from '@/types';
import { useTranslation } from 'react-i18next';

interface Props {
  booking: Booking;
  onShowPaymentModal: () => void;
  onShowCancelModal: () => void;
}

export function BookingHistorySpaceInfoCard({
  booking,
  onShowPaymentModal,
  onShowCancelModal,
}: Props) {
  const { t } = useTranslation('booking');

  return (
    <Card className='border-0 shadow-sm'>
      <div className='p-6'>
        <h2 className='text-xl font-bold mb-4'>{t('space_info')}</h2>

        <div className='flex gap-4'>
          <div className='w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0'>
            {booking.space.images && booking.space.images[0] ? (
              <img
                src={booking.space.images[0]}
                alt={booking.space.name}
                className='w-full h-full object-cover'
                loading='lazy'
              />
            ) : (
              <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                <span className='text-gray-400 text-xs'>{t('no_image')}</span>
              </div>
            )}
          </div>

          <div className='flex-1'>
            <h3 className='font-semibold text-lg mb-2'>{booking.space.name}</h3>

            <div className='space-y-2 text-sm text-gray-600'>
              {booking.space.venue?.address && (
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4' />
                  <span>{booking.space.venue?.address}</span>
                </div>
              )}
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4' />
                <span>{t('capacity', { count: booking.space.capacity })}</span>
              </div>
            </div>

            <div className='mt-3 flex items-center gap-3'>
              <Button asChild variant='outline' size='sm'>
                <Link
                  to={`/spaces/${booking.space.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Eye className='w-4 h-4 mr-2' />
                  {t('space_info')}
                </Link>
              </Button>

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
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={onShowCancelModal}
                  >
                    <XCircle className='w-4 h-4 mr-2' />
                    {t('btn_cancel')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
