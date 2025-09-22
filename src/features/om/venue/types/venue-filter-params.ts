export type VenueFilterParams = {
  page: number;
  pageSize: number;
  name?: string;
  address?: string;
  ownerId?: string;
  wardId?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
