import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BOOKING_STATUS, BOOKING_PAYMENT_STATUS } from '@/constants';
import { BookingFilterParams } from '@/features/booking';
import { useGetVenuesOM } from '@/features/om/booking';
import { VenueFilter } from '@/features/om/booking';

interface BookingListFilterProps {
  filters: BookingFilterParams & { venueId?: string };
  onFilterChange: (key: string, value: string) => void;
}

const bookingStatus = [['ALL', 'all'], ...Object.entries(BOOKING_STATUS)];
const paymentStatus = [
  ['ALL', 'all'],
  ...Object.entries(BOOKING_PAYMENT_STATUS),
];

export function BookingListFilter({
  filters,
  onFilterChange: onChange,
}: BookingListFilterProps) {
  const { t } = useTranslation('booking');

  const { data: venuesResponse } = useGetVenuesOM({});
  const venues = venuesResponse?.data ?? [];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
      <div className='lg:col-span-2'>
        <Label htmlFor='search' className='text-sm text-gray-600 mb-1 block'>
          {t('filter.search')}
        </Label>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
          <Input
            id='search'
            placeholder='Search by space name...'
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      <div>
        <Label htmlFor='status' className='text-sm text-gray-600 mb-1 block'>
          {t('filter.status')}
        </Label>
        <div className='relative'>
          <Select
            value={filters.status}
            onValueChange={(value) => onChange('status', value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='All Status' />
            </SelectTrigger>
            <SelectContent>
              {bookingStatus.map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor='payment' className='text-sm text-gray-600 mb-1 block'>
          {t('filter.payment')}
        </Label>
        <Select
          value={filters.statusPayment}
          onValueChange={(value) => onChange('statusPayment', value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='All Payments' />
          </SelectTrigger>
          <SelectContent>
            {paymentStatus.map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor='start_date'
          className='text-sm text-gray-600 mb-1 block'
        >
          {t('filter.start_date')}
        </Label>
        <Input
          id='start_date'
          type='date'
          value={filters.startTime}
          onChange={(e) => onChange('startTime', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor='end_date' className='text-sm text-gray-600 mb-1 block'>
          {t('filter.end_date')}
        </Label>
        <Input
          id='end_date'
          type='date'
          value={filters.endTime}
          onChange={(e) => onChange('endTime', e.target.value)}
        />
      </div>

      <VenueFilter
        filters={filters}
        venues={venues}
        onFilterChange={onChange}
      />
    </div>
  );
}
