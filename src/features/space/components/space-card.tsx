import { MapPin, NotebookTabs } from 'lucide-react';
import { Space } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { SpaceTypeBadge } from './space-type-badge';
import { Badge } from '@/components/ui/badge';
import { FaPeopleGroup } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export function SpaceCard({ space }: { space: Space }) {
  const { i18n, t } = useTranslation('space');

  const addressLine = `${space.venue.address}, ${space.venue.ward.name}, ${space.venue.ward.province.name}`;
  const price = `${space.price.toLocaleString()} đ/${i18n.language === 'vi' ? space.price_type.name : space.price_type.name_en}`;

  return (
    <Card className='p-0 overflow-hidden'>
      <CardContent className='p-0'>
        <div className='relative'>
          <Link to={`/spaces/${space.id}`}>
            <img
              src='/auth-wall.jpg'
              className='aspect-video w-full object-cover object-center hover:opacity-80 transition-opacity duration-300'
            />
          </Link>
          <SpaceTypeBadge
            spaceType={space.space_type}
            className='absolute top-2 right-2'
          />
          <Badge className='absolute bottom-2 left-2' variant='secondary'>
            <FaPeopleGroup /> {t('capacity')}: {space.capacity}
          </Badge>
        </div>
        <div className='p-3 text-sm space-y-2'>
          <Link to='#'>
            <h2 title={space.name} className='line-clamp-1 font-bold'>
              {space.name}
            </h2>
          </Link>
          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
            <MapPin className='size-5' />
            <p title={addressLine} className='line-clamp-1'>
              {addressLine}
            </p>
          </div>
          <div className='flex items-end justify-between pt-2'>
            <span className='font-bold'>{price}</span>
            <Button size='sm' asChild>
              <Link to={`/spaces/${space.id}`}>
                <NotebookTabs /> {t('detail')}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
