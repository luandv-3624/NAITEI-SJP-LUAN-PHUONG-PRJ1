import { User, Space } from '@/types';
import { BookingStatus, BookingPaymentStatus } from '@/constants/';

export type Booking = {
  id: number;
  user: User;
  space: Space;
  status: BookingStatus;
  status_payment: BookingPaymentStatus;
  total_price: number;
  start_time: string;
  end_time: string;
  checkin: string | null;
  checkout: string | null;
};
