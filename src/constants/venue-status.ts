export const VENUE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  BLOCKED: 'blocked',
} as const;

export type VenueStatus = (typeof VENUE_STATUS)[keyof typeof VENUE_STATUS];
