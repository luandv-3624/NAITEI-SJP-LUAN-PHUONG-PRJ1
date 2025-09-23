import { toInt } from '@/lib/to-int';
import { MyVenuesQuery } from '../types';

export function searchParamsToMyVenuesQuery(
  params: URLSearchParams,
): MyVenuesQuery {
  const query: MyVenuesQuery = {};

  const page = params.get('page');
  if (page) {
    query.page = toInt(page, 1);
  }

  return query;
}
