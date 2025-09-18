import { toInt } from '@/lib/to-int';
import { SpaceQuery } from '../types';
import { priceRangeLabel } from './price-range-label';
import { PriceRange } from '../types/price-range';
import { CapacityRange } from '../types/capacity-range';
import { capacityRangeLabel } from './capacity-range-label';

export function searchParamsToSpaceQuery(params: URLSearchParams): SpaceQuery {
  const query: SpaceQuery = {};

  const wardId = params.get('wardId');
  if (wardId) {
    query.wardId = toInt(wardId, 0);
  }

  const provinceId = params.get('provinceId');
  if (provinceId && !wardId) {
    query.provinceId = toInt(provinceId, 0);
  }

  const from = params.get('from');
  if (from) {
    const date = new Date(from);
    if (!isNaN(date.getTime())) {
      query.startTime = date.toISOString();
    }
  }

  const name = params.get('name');
  if (name) {
    query.name = name;
  }

  const priceType = params.get('priceTypeId');
  if (priceType) {
    query.priceTypeId = toInt(priceType, 0);
  }

  const spaceType = params.get('spaceTypeId');
  if (spaceType) {
    query.spaceTypeId = toInt(spaceType, 0);
  }

  const priceRange = params.get('priceRange');
  if (priceRange) {
    const pr = toInt(priceRange, 0);
    if (Object.values(PriceRange).includes(pr as PriceRange)) {
      query.minPrice = priceRangeLabel[pr as PriceRange].min;
      query.maxPrice = priceRangeLabel[pr as PriceRange].max;
    }
  }

  const capacityRange = params.get('capacityRange');
  if (capacityRange) {
    const cr = toInt(capacityRange, 0);
    if (Object.values(CapacityRange).includes(cr as CapacityRange)) {
      query.minCapacity = capacityRangeLabel[cr as CapacityRange].min;
      query.maxCapacity = capacityRangeLabel[cr as CapacityRange].max;
    }
  }

  const page = params.get('page');
  if (page) {
    query.page = toInt(page, 1);
  }

  const pageSize = params.get('pageSize');
  if (pageSize) {
    query.pageSize = toInt(pageSize, 12);
  }

  return query;
}
