import { Booking } from '@/types';
import { CheckInOutButton, UpdateStatusButton } from '@/features/om/booking';

interface BookingDetailActionsProps {
  booking: Booking;
}

export function BookingDetailActions({ booking }: BookingDetailActionsProps) {
  return (
    <div className='flex gap-2 ml-auto'>
      <CheckInOutButton
        bookingId={String(booking.id)}
        checkedIn={!!booking.check_in}
      />
      <UpdateStatusButton bookingId={String(booking.id)} />
    </div>
  );
}
