export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  VERIFIED: 'verified',
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
