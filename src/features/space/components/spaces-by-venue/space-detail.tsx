import { AxiosError } from '@/types';
import { useGetSpaceDetail } from '../../api';
import { HTTP_STATUS_CODE } from '@/constants';
import { NotFound } from '@/components/not-found';
import { GeneralError } from '@/components/general-error';
import { Skeleton } from '@/components/ui/skeleton';
import { SpinLoading } from '@/components/spin-loading';
import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { useTranslation } from 'react-i18next';
import { SpaceStatusBadge } from '../space-status-badge';
import { Edit, Users } from 'lucide-react';
import { SpaceTypeBadge } from '../space-type-badge';
import { formatPrice } from '@/lib';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDateTimeFormatter } from '@/features/booking';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export function SpaceDetail({ spaceId }: { spaceId: string }) {
  const { data, isPending, isError, error } = useGetSpaceDetail(spaceId);
  const { t, i18n } = useTranslation('space');
  const { formatDateTime } = useDateTimeFormatter();

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
          {
            label: data.venue.name,
            link: `/dashboard/om/venues/${data.venue.id}`,
          },
          {
            label: t('spaces'),
            link: `/dashboard/om/venues/${data.venue.id}/spaces`,
          },
          { label: data.name },
        ]}
      />
      <img
        src='/auth-wall.jpg'
        className='h-80 w-full bg-accent rounded-2xl object-cover object-center'
      />
      <div className='grid grid-cols-2 gap-4 h-40 text-sm'>
        <div className='space-y-2 p-4'>
          <div className='flex items-center gap-4'>
            <h1 className='text-4xl font-bold'>{data.name}</h1>
            <SpaceStatusBadge status={data.status} />
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Users className='size-4' />{' '}
              {t('people', { count: data.capacity })}
            </div>
            <SpaceTypeBadge spaceType={data.space_type} />
          </div>
          <p>
            <span className='font-bold'>{t('created_at')}: </span>
            {formatDateTime(data.created_at)}
          </p>
          <p>
            <span className='font-bold'>{t('updated_at')}: </span>
            {formatDateTime(data.updated_at)}
          </p>
        </div>
        <div className='rounded-lg bg-blue-400/20 flex flex-col items-center justify-center'>
          <span className='text-blue-500 text-3xl font-bold'>
            {formatPrice(String(data.price))}
          </span>
          <span className='text-muted-foreground'>
            /{' '}
            {i18n.language === 'vi'
              ? data.price_type.name
              : data.price_type.name_en}
          </span>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('description')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm'>{data.description}</p>
        </CardContent>
      </Card>
      <div className='flex justify-end'>
        <Button variant='outline' asChild className=''>
          <Link
            to={`/dashboard/om/venues/${data.venue.id}/spaces/${data.id}/edit`}
          >
            {t('update')} <Edit />
          </Link>
        </Button>
      </div>
    </section>
  );
}
