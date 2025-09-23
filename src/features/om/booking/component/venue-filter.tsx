import { Label } from '@/components/ui/label';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { Venue } from '@/features/om/venue';
import { BookingFilterParams } from '@/features/booking';
import { useTranslation } from 'react-i18next';

interface VenueFilterProps {
  filters: BookingFilterParams & { venueId?: string };
  venues: Venue[];
  onFilterChange: (key: string, value: string) => void;
}

export function VenueFilter({
  filters,
  venues,
  onFilterChange: onChange,
}: VenueFilterProps) {
  const { t } = useTranslation('booking');

  const [open, setOpen] = useState(false);
  const selectedVenue = useMemo(
    () => venues.find((v) => String(v.id) === filters.venueId),
    [venues, filters.venueId],
  );

  return (
    <div>
      <Label htmlFor='venue' className='text-sm text-gray-600 mb-1 block'>
        {t('filter.venue')}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            className='w-[200px] justify-between'
          >
            <span className='truncate overflow-hidden whitespace-nowrap text-ellipsis flex-1 text-left'>
              {selectedVenue
                ? selectedVenue.name
                : t('booking_list.all_venues')}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[260px] p-0'>
          <Command>
            <CommandInput placeholder='Search venue...' />
            <CommandList>
              <CommandEmpty>{t('booking_list.not_venues')}</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value=''
                  onSelect={() => {
                    onChange('venueId', '');
                    setOpen(false);
                  }}
                  className='truncate max-w-[300px]'
                >
                  {t('booking_list.all_venues')}
                </CommandItem>

                {venues.map((venue) => (
                  <CommandItem
                    key={venue.id}
                    value={String(venue.id)}
                    onSelect={(value) => {
                      onChange('venueId', value);
                      setOpen(false);
                    }}
                    className='truncate max-w-[300px]'
                    title={venue.name}
                  >
                    {venue.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
