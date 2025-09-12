export const BOOKING_PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PARTIAL: 'partial',
  PAID: 'paid',
} as const;

export type BookingPaymentStatus =
  (typeof BOOKING_PAYMENT_STATUS)[keyof typeof BOOKING_PAYMENT_STATUS];
