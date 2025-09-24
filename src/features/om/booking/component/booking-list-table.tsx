import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, MapPin, User, Users, Calendar } from 'lucide-react';
import { BookingStatusBadge, PaymentStatusBadge } from '@/features/booking';
import { useTranslation } from 'react-i18next';
import { Booking } from '@/types';
import { formatPrice } from '@/lib';
import { useDateTimeFormatter } from '@/features/booking';
import { Link } from 'react-router';
import { CheckInOutButton, UpdateStatusButton } from '@/features/om/booking';

interface BookingListTableProps {
  bookings: Booking[];
  isPending: boolean;
  isFetching: boolean;
}

export function BookingListTable({
  bookings,
  isPending,
  isFetching,
}: BookingListTableProps) {
  const { t } = useTranslation('booking');
  const { formatDate, formatDateTime } = useDateTimeFormatter();

  const isInitialLoading = isPending && bookings.length === 0;
  const isUpdating = isFetching && !isInitialLoading;

  return (
    <div className='relative overflow-x-auto'>
      {isUpdating && (
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <Skeleton className='w-12 h-12 rounded-full' />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('booking_history.table.id')}</TableHead>
            <TableHead>{t('booking_list.table.customer')}</TableHead>
            <TableHead>{t('booking_history.table.space')}</TableHead>
            <TableHead>{t('booking_history.table.duration')}</TableHead>
            <TableHead>{t('booking_history.table.status')}</TableHead>
            <TableHead>{t('booking_history.table.payment')}</TableHead>
            <TableHead>{t('booking_list.table.check')}</TableHead>
            <TableHead>{t('booking_history.table.total')}</TableHead>
            <TableHead>{t('booking_history.table.actions')}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isInitialLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 7 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className='h-4 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className='py-8 text-center'>
                <Calendar className='w-12 h-12 mx-auto mb-4 text-gray-300' />
                {t('booking_history.no_bookings')}
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((b: Booking) => (
              <TableRow key={b.id}>
                <TableCell>
                  <div className='font-medium'>#{b.id}</div>
                  <div className='text-sm text-gray-500'>
                    {formatDate(b.created_at)}
                  </div>
                </TableCell>

                <TableCell>
                  <div className='flex items-center gap-2'>
                    <User className='w-4 h-4 text-green-600' />
                    <div>
                      <div className='font-medium text-sm'>{b.user.name}</div>
                      <div className='text-xs text-gray-500'>
                        {b.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4 text-blue-600' />
                    <div>
                      <div className='font-medium'>{b.space?.name}</div>
                      <div className='text-sm text-gray-500 flex items-center gap-1'>
                        <Users className='w-3 h-3' />
                        {t('booking_history.people', {
                          count: b.space?.capacity,
                        })}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className='text-sm'>
                    <div>
                      {t('booking_history.start')}:{' '}
                      {formatDateTime(b.start_time)}
                    </div>
                    <div>
                      {t('booking_history.end')}: {formatDateTime(b.end_time)}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <BookingStatusBadge status={b.status} />
                </TableCell>

                <TableCell>
                  <PaymentStatusBadge status={b.status_payment} />
                </TableCell>

                <TableCell>
                  {b.check_in ? (
                    <div className='flex flex-col'>
                      <div>
                        {t('booking_list.check_in')}: {b.check_in}
                      </div>
                      <div>
                        {t('booking_list.check_out')}: {b.check_out ?? '-'}
                      </div>
                    </div>
                  ) : (
                    <div>-</div>
                  )}
                </TableCell>

                <TableCell>{formatPrice(String(b.total_price))}</TableCell>

                <TableCell className='flex items-center gap-2'>
                  <Button variant='outline' size='sm' asChild>
                    <Link to={`/dashboard/om/bookings/${b.id}`}>
                      <Eye className='w-4 h-4 mr-1' />
                    </Link>
                  </Button>
                  <CheckInOutButton
                    bookingId={String(b.id)}
                    checkedIn={!!b.check_in}
                  />
                  <UpdateStatusButton bookingId={String(b.id)} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
