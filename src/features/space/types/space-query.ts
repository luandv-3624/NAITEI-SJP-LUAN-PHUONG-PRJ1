export type SpaceQuery = {
  wardId?: number;
  provinceId?: number;
  name?: string;
  spaceTypeId?: number;
  priceTypeId?: number;
  minCapacity?: number;
  maxCapacity?: number;
  minPrice?: number;
  maxPrice?: number;
  startTime?: string;
  endTime?: string;
  page?: number;
  pageSize?: number;
};
