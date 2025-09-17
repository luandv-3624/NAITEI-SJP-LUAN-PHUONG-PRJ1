export const SPACE_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
} as const;

export type SpaceStatus = (typeof SPACE_STATUS)[keyof typeof SPACE_STATUS];
