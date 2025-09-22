import { Card as C, CardContent } from '@/components/ui/card';
import { SimpleVenue } from '../../types';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Settings, SquareTerminal, UserCog } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './status-badge';

export function Card({
  venue,
  isOwner,
}: {
  venue: SimpleVenue;
  isOwner: boolean;
}) {
  const { t } = useTranslation('venue');

  return (
    <C className='p-0 overflow-hidden'>
      <CardContent className='p-0'>
        <div className='relative'>
          <Link to={`/dashboard/om/venues/${venue.id}`}>
            <img
              src='/auth-wall.jpg'
              className='aspect-video w-full object-cover object-center hover:opacity-80 transition-opacity duration-300'
            />
          </Link>
          {isOwner ? (
            <Badge className='absolute top-2 right-2'>
              <UserCog />
              {t('owner')}
            </Badge>
          ) : (
            <Badge className='absolute top-2 right-2'>
              <Settings />
              {t('manager')}
            </Badge>
          )}
          <StatusBadge
            className='absolute bottom-2 left-2'
            status={venue.status}
          />
        </div>
        <div className='p-3 text-sm space-y-2'>
          <Link to={`/dashboard/om/venues/${venue.id}`}>
            <h2 title={venue.name} className='line-clamp-1 font-bold'>
              {venue.name}
            </h2>
          </Link>
          <div className='flex justify-end pt-2'>
            <Button size='sm' asChild>
              <Link to={`/dashboard/om/venues/${venue.id}`}>
                <SquareTerminal /> {t('manage')}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </C>
  );
}
