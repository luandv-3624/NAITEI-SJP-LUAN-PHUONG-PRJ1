export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type Paginated<T> = {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
};
