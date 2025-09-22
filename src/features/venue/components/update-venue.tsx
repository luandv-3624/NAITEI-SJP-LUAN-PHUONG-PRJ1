import { useNavigate } from 'react-router';
import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { Card, CardContent } from '@/components/ui/card';
import { VenueForm } from './venue-form';
import { useTranslation } from 'react-i18next';
import { Edit } from 'lucide-react';
import { useUpdateVenue } from '../api/use-update-venue';
import { useGetVenueDetail } from '../api';
import { AxiosError } from '@/types';
import { HTTP_STATUS_CODE } from '@/constants';
import { NotFound } from '@/components/not-found';
import { GeneralError } from '@/components/general-error';
import { SpinLoading } from '@/components/spin-loading';
import { Skeleton } from '@/components/ui/skeleton';

export function UpdateVenue({ venueId }: { venueId: string }) {
  const updateVenue = useUpdateVenue();
  const navigate = useNavigate();
  const { t } = useTranslation('venue');
  const { data: venue, isPending, isError, error } = useGetVenueDetail(venueId);

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
    <div className='space-y-4'>
      <BreadcrumbIndies
        items={[
          { label: t('my_venues'), link: '/dashboard/om/venues' },
          { label: venue.name, link: `/dashboard/om/venues/${venueId}` },
          { label: t('update') },
        ]}
      />
      <Card>
        <CardContent>
          <VenueForm
            onSubmit={(values) => {
              updateVenue.mutate(
                { id: venueId, updateVenueDto: values },
                {
                  onSuccess: () => {
                    navigate(`/dashboard/om/venues/${venueId}`);
                  },
                },
              );
            }}
            initialValues={{
              province_id: venue.ward.province_id,
              address: venue.address,
              description: venue.description,
              lat: venue.lat,
              lng: venue.lng,
              name: venue.name,
              ward_id: venue.ward_id,
            }}
            submitBtn={
              <>
                {t('update_venue')} <Edit />
              </>
            }
            disabled={updateVenue.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
