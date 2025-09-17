import { axios } from './axios';
import { CreateBookingResponse } from '@/features/booking';

const BOOKING_ENDPOINT = '/bookings';

export async function createBooking(bookingData: {
  space_id: number;
  start_time: string;
  end_time: string;
}): Promise<CreateBookingResponse> {
  const { data } = await axios.post<CreateBookingResponse>(
    BOOKING_ENDPOINT,
    bookingData,
  );

  return data;
}
