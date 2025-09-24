import { UserSortOrder } from '../types/user-sort-order';
import { UserSortBy } from '../types/user-sort-by';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidSortBy = (value: any): value is UserSortBy => {
  return Object.values(UserSortBy).includes(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidSortOrder = (value: any): value is UserSortOrder => {
  return Object.values(UserSortOrder).includes(value);
};
