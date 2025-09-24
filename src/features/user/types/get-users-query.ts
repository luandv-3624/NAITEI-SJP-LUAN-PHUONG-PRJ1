import { UserSortOrder } from './user-sort-order';
import { UserSortBy } from './user-sort-by';

export type GetUsersQuery = {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: UserSortBy;
  sortOrder?: UserSortOrder;
};
