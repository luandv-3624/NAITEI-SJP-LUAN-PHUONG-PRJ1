import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { useGetVenueDetail } from '@/features/venue';
import { useTranslation } from 'react-i18next';
import { useGetSpacesByVenue } from '../../api/use-get-spaces-by-venue';
import { Skeleton } from '@/components/ui/skeleton';
import { SpinLoading } from '@/components/spin-loading';
import { AxiosError } from '@/types';
import { NotFound } from '@/components/not-found';
import { GeneralError } from '@/components/general-error';
import { HTTP_STATUS_CODE } from '@/constants';
import { Filters } from './filters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Empty } from '@/components/empty';
import { SpaceTypeBadge } from '../space-type-badge';
import { PriceTypeBadge } from '../price-type-badge';
import { formatPrice } from '@/lib';
import { SpaceStatusBadge } from '../space-status-badge';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router';
import { Edit, Eye, Plus } from 'lucide-react';
import { PaginationIndies } from '@/components/ui/pagination-indies';
import { useMemo } from 'react';
import { searchParamsToSpaceQuery } from '../../utils/search-params-to-space-query';

export function List({ venueId }: { venueId: string }) {
  const { t } = useTranslation('space');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(
    () => searchParamsToSpaceQuery(searchParams),
    [searchParams],
  );

  const {
    data: venue,
    isPending: isVenuePending,
    isError: isVenueError,
    error: venueError,
  } = useGetVenueDetail(venueId);
  const {
    data: spaces,
    isPending,
    isError,
    error,
  } = useGetSpacesByVenue(venueId, query);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  if (isPending || isVenuePending) {
    return (
      <div className='space-y-4'>
        <Skeleton className='w-20 h-5' />
        <SpinLoading />
      </div>
    );
  }

  if (isVenueError) {
    const err = venueError as AxiosError;

    if (err.response?.data.statusCode === HTTP_STATUS_CODE.NOT_FOUND) {
      return <NotFound />;
    }

    return <GeneralError message={err.response?.data.message} />;
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
          { label: venue.name, link: `/dashboard/om/venues/${venue.id}` },
          { label: t('spaces') },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            <span>{t('spaces_filter')}</span>
            <Button asChild variant='outline' size='sm'>
              <Link to={`/dashboard/om/venues/${venue.id}/spaces/create`}>
                {t('create_space')}
                <Plus />
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Filters />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          {spaces.data.length === 0 ? (
            <Empty />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-30'>{t('id')}</TableHead>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead className='w-40'>{t('space_type')}</TableHead>
                  <TableHead className='w-40'>{t('price_type')}</TableHead>
                  <TableHead className='w-40'>{t('price')}</TableHead>
                  <TableHead className='w-40'>{t('space_status')}</TableHead>
                  <TableHead className='w-40'>{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spaces.data.map((space) => (
                  <TableRow key={space.id}>
                    <TableCell className='font-bold'>#{space.id}</TableCell>
                    <TableCell className='relative'>
                      <div className='absolute inset-0 flex items-center'>
                        <p className='truncate' title={space.name}>
                          {space.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <SpaceTypeBadge spaceType={space.space_type} />
                    </TableCell>
                    <TableCell>
                      <PriceTypeBadge priceType={space.price_type} />
                    </TableCell>
                    <TableCell>{formatPrice(String(space.price))}</TableCell>
                    <TableCell>
                      <SpaceStatusBadge status={space.status} />
                    </TableCell>
                    <TableCell className='space-x-2'>
                      <Button
                        asChild
                        className='p-0 size-10 rounded-full'
                        variant='outline'
                      >
                        <Link
                          to={`/dashboard/om/venues/${venueId}/spaces/${space.id}`}
                        >
                          <Eye />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className='p-0 size-10 rounded-full'
                        variant='outline'
                      >
                        <Link
                          to={`/dashboard/om/venues/${venueId}/spaces/${space.id}/edit`}
                        >
                          <Edit />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {spaces.meta.last_page > 1 && (
        <div className='flex justify-center mt-4 w-full'>
          <PaginationIndies
            handlePageChange={handlePageChange}
            page={spaces.meta.current_page}
            totalPages={spaces.meta.last_page}
          />
        </div>
      )}
    </section>
  );
}
