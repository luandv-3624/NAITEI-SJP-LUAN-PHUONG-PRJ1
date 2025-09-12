import { Card } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getPaymentMethodName } from '@/lib';
import { Booking } from '@/types';
import { PaymentMethod } from '@/constants';
import { useDateTimeFormatter } from '@/features/booking';
import { useTranslation } from 'react-i18next';

interface Props {
  booking: Booking;
  totalPaid: number;
}

export function BookingHistoryPaymentInfoCard({ booking, totalPaid }: Props) {
  const { t } = useTranslation('booking');
  const { formatDate } = useDateTimeFormatter();

  return (
    <Card className='border-0 shadow-sm'>
      <div className='p-6'>
        <h2 className='text-xl font-bold mb-4'>{t('payment_info')}</h2>

        <div className='space-y-4'>
          <div className='flex justify-between items-center p-4 bg-gray-50 rounded-lg'>
            <span className='font-medium'>{t('total_price')}</span>
            <span className='text-lg font-bold text-gray-900'>
              {parseInt(booking.total_price).toLocaleString()}₫
            </span>
          </div>

          <div className='flex justify-between items-center p-4 bg-green-50 rounded-lg'>
            <span className='font-medium text-green-800'>{t('paid')}</span>
            <span className='text-lg font-bold text-green-600'>
              {totalPaid.toLocaleString()}₫
            </span>
          </div>

          {totalPaid < parseFloat(booking.total_price) && (
            <div className='flex justify-between items-center p-4 bg-red-50 rounded-lg'>
              <span className='font-medium text-red-800'>{t('remaining')}</span>
              <span className='text-lg font-bold text-red-600'>
                {(parseFloat(booking.total_price) - totalPaid).toLocaleString()}
                ₫
              </span>
            </div>
          )}
        </div>

        {booking.payments.length > 0 && (
          <div className='mt-6'>
            <h3 className='font-semibold mb-3'>{t('payment_history')}</h3>
            <div className='space-y-3'>
              {booking.payments.map((payment) => (
                <div
                  key={payment.id}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex items-center gap-3'>
                    <CreditCard className='w-5 h-5 text-gray-500' />
                    <div>
                      <div className='font-medium'>
                        {getPaymentMethodName(payment.method as PaymentMethod)}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {formatDate(payment.paid_at)}
                      </div>
                    </div>
                  </div>

                  <div className='text-right'>
                    <div className='font-semibold'>
                      {parseInt(payment.amount).toLocaleString()}₫
                    </div>
                    <Badge
                      variant={
                        payment.status === 'success' ? 'default' : 'destructive'
                      }
                      className='text-xs'
                    >
                      {payment.status === 'success'
                        ? t('success')
                        : t('failed')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
