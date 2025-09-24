import { Booking, Response } from '@/types';
import { axios } from './axios';
import { CreateBookingResponse, BookingMeResponse } from '@/features/booking';
import { BookingFilterParams } from '@/features/booking';
import { BookingListResponse } from '@/features/om/booking';
import { BookingStatus } from '@/constants';

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

export async function getBookingMe(
  params: BookingFilterParams,
): Promise<BookingMeResponse> {
  const { data } = await axios.get(`${BOOKING_ENDPOINT}/me`, { params });

  return data.data;
}

export async function getBookingDetail(id: string): Promise<Booking> {
  const { data } = await axios.get(`${BOOKING_ENDPOINT}/${id}`);

  return data.data;
}

export async function getBookingListOM(
  params: BookingFilterParams & { venueId?: string },
): Promise<BookingListResponse> {
  const { data } = await axios.get(`${BOOKING_ENDPOINT}/om`, { params });

  return data.data;
}

export async function checkIn(bookingId: string): Promise<Response<Booking>> {
  const { data } = await axios.post(
    `${BOOKING_ENDPOINT}/${bookingId}/check-in`,
  );

  return data;
}

export async function checkOut(bookingId: string): Promise<Response<Booking>> {
  const { data } = await axios.post(
    `${BOOKING_ENDPOINT}/${bookingId}/check-out`,
  );

  return data;
}

export async function updateStatus({
  bookingId,
  status,
}: {
  bookingId: string;
  status: BookingStatus;
}): Promise<Response<Booking>> {
  const { data } = await axios.put(`${BOOKING_ENDPOINT}/${bookingId}/status`, {
    status,
  });

  return data;
}
