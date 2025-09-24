import { toInt } from '@/lib/to-int';
import { GetUsersQuery } from '../types';
import { isValidSortBy, isValidSortOrder } from './type-check';

export const searchParamsToGetUsersQuery = (
  searchParams: URLSearchParams,
): GetUsersQuery => {
  const usersQuery: GetUsersQuery = {};

  const page = searchParams.get('page');
  if (page) {
    const parsedPage = toInt(page, 1);
    usersQuery.page = parsedPage > 0 ? parsedPage : 1;
  }

  const pageSize = searchParams.get('pageSize');
  if (pageSize !== null) {
    const parsedPageSize = toInt(pageSize, 10);
    usersQuery.perPage = parsedPageSize > 0 ? parsedPageSize : 10;
  }

  const search = searchParams.get('search');
  if (search !== null && search.length > 0) {
    usersQuery.search = search;
  }

  const sortBy = searchParams.get('sortBy');
  if (sortBy !== null && isValidSortBy(sortBy)) {
    usersQuery.sortBy = sortBy;
  }

  const sortOrder = searchParams.get('sortOrder');
  if (sortOrder !== null && isValidSortOrder(sortOrder)) {
    usersQuery.sortOrder = sortOrder;
  }

  return usersQuery;
};
