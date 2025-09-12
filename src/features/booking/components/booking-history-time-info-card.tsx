import { Card } from '@/components/ui/card';
import { Calendar, CheckCircle } from 'lucide-react';
import { Booking } from '@/types';
import { useDateTimeFormatter } from '@/features/booking';
import { useTranslation } from 'react-i18next';

interface Props {
  booking: Booking;
}

export function BookingHistoryTimeInfoCard({ booking }: Props) {
  const { t } = useTranslation('booking');
  const { formatDate, formatDateTime, formatTime } = useDateTimeFormatter();

  return (
    <Card className='border-0 shadow-sm'>
      <div className='p-6'>
        <h2 className='text-xl font-bold mb-4'>{t('time_info')}</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <div className='flex items-center gap-2 text-gray-600 mb-2'>
                <Calendar className='w-4 h-4' />
                <span className='font-medium'>{t('start')}</span>
              </div>
              <div className='text-lg font-semibold'>
                {formatDateTime(booking.start_time)}
              </div>
              <div className='text-sm text-gray-500'>
                {formatTime(booking.start_time)}
              </div>
            </div>

            {booking.check_in && (
              <div>
                <div className='flex items-center gap-2 text-gray-600 mb-2'>
                  <CheckCircle className='w-4 h-4 text-green-600' />
                  <span className='font-medium'>{t('checkin')}</span>
                </div>
                <div className='text-sm text-gray-700'>
                  {formatDate(booking.check_in)}
                </div>
              </div>
            )}
          </div>

          <div className='space-y-4'>
            <div>
              <div className='flex items-center gap-2 text-gray-600 mb-2'>
                <Calendar className='w-4 h-4' />
                <span className='font-medium'>{t('end')}</span>
              </div>
              <div className='text-lg font-semibold'>
                {formatDateTime(booking.end_time)}
              </div>
              <div className='text-sm text-gray-500'>
                {formatTime(booking.end_time)}
              </div>
            </div>

            {booking.check_out && (
              <div>
                <div className='flex items-center gap-2 text-gray-600 mb-2'>
                  <CheckCircle className='w-4 h-4 text-blue-600' />
                  <span className='font-medium'>{t('checkout')}</span>
                </div>
                <div className='text-sm text-gray-700'>
                  {formatDate(booking.check_out)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
