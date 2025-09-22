import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, MapPin, User, Building2, Users } from 'lucide-react';
import { VenueStatusBadge } from './venue-status-badge';
import { useTranslation } from 'react-i18next';
import { Venue } from '@/features/om/venue';
import { useDateTimeFormatter } from '@/features/booking';
import { Link } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { VENUE_STATUS } from '@/constants';
import { useUpdateStatusVenue } from '@/features/om/venue';

interface VenueTableProps {
  venues: Venue[];
  isPending: boolean;
  isFetching: boolean;
}

const statusUpdateOptions = [VENUE_STATUS.APPROVED, VENUE_STATUS.BLOCKED];

export function VenueTable({ venues, isPending, isFetching }: VenueTableProps) {
  const { t } = useTranslation('venue');
  const { formatDate } = useDateTimeFormatter();

  const isInitialLoading = isPending && venues.length === 0;
  const isUpdating = isFetching && !isInitialLoading;

  const updateStatusMutation = useUpdateStatusVenue();

  return (
    <div className='relative overflow-x-auto'>
      {isUpdating && (
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <Skeleton className='w-12 h-12 rounded-full' />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.id')}</TableHead>
            <TableHead>{t('table.venue_info')}</TableHead>
            <TableHead>{t('table.location')}</TableHead>
            <TableHead>{t('table.owner')}</TableHead>
            <TableHead>{t('table.managers')}</TableHead>
            <TableHead>{t('table.status')}</TableHead>
            <TableHead>{t('table.created_at')}</TableHead>
            <TableHead>{t('table.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isInitialLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className='h-4 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : venues.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className='py-8 text-center'>
                <Building2 className='w-12 h-12 mx-auto mb-4 text-gray-300' />
                {t('no_venues')}
              </TableCell>
            </TableRow>
          ) : (
            venues.map((venue: Venue) => (
              <TableRow key={venue.id}>
                <TableCell>
                  <div className='font-medium'>#{venue.id}</div>
                </TableCell>
                <TableCell>
                  <div className='flex items-start gap-2'>
                    <Building2 className='w-4 h-4 text-blue-600 mt-1' />
                    <div>
                      <div className='font-medium whitespace-pre-line'>
                        {venue.name}
                      </div>
                      <div className='text-sm text-gray-500 max-w-xs truncate'>
                        {venue.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-start gap-2'>
                    <MapPin className='w-4 h-4 text-red-600 mt-1' />
                    <div>
                      <div className='text-sm max-w-xs whitespace-pre-line'>
                        {venue.address}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {venue.ward?.full_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <User className='w-4 h-4 text-green-600' />
                    <div>
                      <div className='font-medium text-sm'>
                        {venue.owner.name}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {venue.owner.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Users className='w-4 h-4 text-purple-600' />
                    <span className='text-sm'>
                      {venue.managers.length} {t('managers')}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <VenueStatusBadge status={venue.status} />
                </TableCell>
                <TableCell>
                  <div className='text-sm'>{formatDate(venue.created_at)}</div>
                </TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm' asChild>
                      <Link to={`/venues/${venue.id}`}>
                        <Eye className='w-4 h-4 mr-1' />
                        {t('view')}
                      </Link>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='sm'>
                          <MoreVertical className='w-4 h-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {statusUpdateOptions.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() =>
                              updateStatusMutation.mutate({
                                venueId: String(venue.id),
                                status,
                              })
                            }
                          >
                            {t(status)}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
