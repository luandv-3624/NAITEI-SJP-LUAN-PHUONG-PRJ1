import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { Booking } from '@/types';
import { formatPrice } from '@/lib';
import { BOOKING_PAYMENT_STATUS, BOOKING_STATUS } from '@/constants';

export function BookingListStatistic({ bookings }: { bookings: Booking[] }) {
  const stats = [
    {
      label: 'Total Bookings',
      value: bookings.length,
      icon: Calendar,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Completed',
      value: bookings.filter((b) => b.status === BOOKING_STATUS.DONE).length,
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Pending',
      value: bookings.filter((b) => b.status === BOOKING_STATUS.PENDING).length,
      icon: Clock,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Total Paid',
      value: formatPrice(
        String(
          bookings
            .filter(
              (b) =>
                b.status_payment === BOOKING_PAYMENT_STATUS.PAID ||
                b.status_payment === BOOKING_PAYMENT_STATUS.PARTIAL,
            )
            .reduce((sum, b) => sum + Number(b.total_price), 0),
        ),
      ),
      icon: CreditCard,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
      {stats.map(({ label, value, icon: Icon, iconColor, bgColor }) => (
        <Card key={label}>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className={`p-2 rounded-lg ${bgColor}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <div className='text-2xl font-bold'>{value}</div>
                <div className='text-sm'>{label}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
