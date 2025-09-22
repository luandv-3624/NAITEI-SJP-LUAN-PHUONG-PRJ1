import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VENUE_STATUS } from '@/constants';
import { VenueFilterParams } from '@/features/om/venue';

export const VENUES_SORT_BY = {
  CREATED_AT: 'created_at',
  NAME: 'name',
  STATUS: 'status',
} as const;

interface VenueFilterProps {
  filters: VenueFilterParams;
  onFilterChange: (key: string, value: string) => void;
}

const venueStatus = [['ALL', 'all'], ...Object.entries(VENUE_STATUS)];

export function VenueFilter({
  filters,
  onFilterChange: onChange,
}: VenueFilterProps) {
  const { t } = useTranslation('venue');

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
      <div className='lg:col-span-2'>
        <Label htmlFor='name' className='text-sm text-gray-600 mb-1 block'>
          {t('filter.venue_name')}
        </Label>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
          <Input
            id='name'
            placeholder={t('filter.search_venue_placeholder')}
            value={filters.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      <div>
        <Label htmlFor='address' className='text-sm text-gray-600 mb-1 block'>
          {t('filter.address')}
        </Label>
        <div className='relative'>
          <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
          <Input
            id='address'
            placeholder={t('filter.search_address_placeholder')}
            value={filters.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      <div>
        <Label htmlFor='status' className='text-sm text-gray-600 mb-1 block'>
          {t('filter.status')}
        </Label>
        <Select
          value={filters.status}
          onValueChange={(value) => onChange('status', value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={t('filter.all_status')} />
          </SelectTrigger>
          <SelectContent>
            {venueStatus.map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {t(`${value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor='sortBy' className='text-sm text-gray-600 mb-1 block'>
          {t('filter.sort_by')}
        </Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => onChange('sortBy', value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={t('filter.sort_by_placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(VENUES_SORT_BY).map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {t(`sort.${value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
