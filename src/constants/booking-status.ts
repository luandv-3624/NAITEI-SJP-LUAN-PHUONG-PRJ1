export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED_UNPAID: 'confirmed-unpaid',
  PAID_PENDING: 'paid-pending',
  PARTIAL_PENDING: 'partial-pending',
  ACCEPTED: 'accepted',
  DONE: 'done',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const;

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
