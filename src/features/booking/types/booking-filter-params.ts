import { PageSize, BookingStatus, BookingPaymentStatus } from '@/constants';

export type BookingFilterParams = {
  page: number;
  pageSize: PageSize;
  status: BookingStatus | 'all' | undefined;
  statusPayment: BookingPaymentStatus | 'all' | undefined;
  search: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  sortBy: string;
  sortOrder: string;
};
