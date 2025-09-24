export const PAYMENT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
