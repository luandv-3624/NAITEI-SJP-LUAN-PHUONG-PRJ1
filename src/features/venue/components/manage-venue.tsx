import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { useGetVenueDetail } from '../api';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Edit, MapPin } from 'lucide-react';
import { useGetProfile } from '@/features/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { SpinLoading } from '@/components/spin-loading';
import { AxiosError } from '@/types';
import { NotFound } from '@/components/not-found';
import { GeneralError } from '@/components/general-error';
import { HTTP_STATUS_CODE } from '@/constants';

export function ManageVenue({ venueId }: { venueId: string }) {
  const { data: venue, isPending, isError, error } = useGetVenueDetail(venueId);
  const { data: user } = useGetProfile();
  const { t, i18n } = useTranslation('venue');

  if (isPending) {
    return (
      <div className='space-y-4'>
        <Skeleton className='w-20 h-5' />
        <SpinLoading />
      </div>
    );
  }

  if (isError) {
    const err = error as AxiosError;

    if (err.response?.data.statusCode === HTTP_STATUS_CODE.NOT_FOUND) {
      return <NotFound />;
    }

    return <GeneralError message={err.response?.data.message} />;
  }

  return (
    <section className='space-y-4'>
      <BreadcrumbIndies
        items={[
          { label: t('my_venues'), link: '/dashboard/om/venues' },
          { label: venue.name },
        ]}
      />
      <img
        src='/auth-wall.jpg'
        className='rounded-lg h-50 w-full object-center object-cover'
      />
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            <span>{t('overview.title', { name: venue.name })}</span>
            {venue.owner_id === user?.id && (
              <Button asChild variant='outline' size='sm'>
                <Link to={`/dashboard/om/venues/${venue.id}/update`}>
                  <Edit /> {t('edit')}
                </Link>
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className='text-sm space-y-4'>
          <p>
            <span className='font-bold'>{t('description')}: </span>{' '}
            {venue.description}
          </p>
          <div className='flex gap-2 items-center'>
            <MapPin className='text-blue-400' />
            <div>
              <p className='font-bold'>{venue.address}</p>
              <p className='text-muted-foreground'>{`${venue.ward.province[i18n.language === 'vi' ? 'name' : 'name_en']}, ${venue.ward[i18n.language === 'vi' ? 'name' : 'name_en']}`}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>{t('owner')}</CardTitle>
          </CardHeader>
          <CardContent className='flex gap-4 items-center'>
            <img src='/auth-wall.jpg' className='size-8 rounded-full' />
            <div className='text-sm flex flex-col'>
              <span className='font-bold'>{venue.owner.name}</span>
              <span className='text-muted-foreground'>{venue.owner.email}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('managers')}</CardTitle>
          </CardHeader>
          <CardContent className='text-sm'>太陽目指す</CardContent>
        </Card>
      </div>
    </section>
  );
}
