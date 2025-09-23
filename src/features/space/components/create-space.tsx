import { useNavigate } from 'react-router';
import { useCreateSpace } from '../api/use-create-space';
import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { Card, CardContent } from '@/components/ui/card';
import { SpaceForm } from './space-form';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { useGetVenueDetail } from '@/features/venue';
import { Skeleton } from '@/components/ui/skeleton';
import { SpinLoading } from '@/components/spin-loading';
import { AxiosError } from '@/types';
import { NotFound } from '@/components/not-found';
import { GeneralError } from '@/components/general-error';
import { HTTP_STATUS_CODE } from '@/constants';

export function CreateSpace({ venueId }: { venueId: string }) {
  const createSpace = useCreateSpace();
  const navigate = useNavigate();
  const { t } = useTranslation('space');

  const {
    data: venue,
    isPending: isVenuePending,
    isError: isVenueError,
    error: venueError,
  } = useGetVenueDetail(venueId);

  if (isVenuePending) {
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

  return (
    <div className='space-y-4'>
      <BreadcrumbIndies
        items={[
          { label: t('my_venues'), link: '/dashboard/om/venues' },
          { label: venue.name, link: `/dashboard/om/venues/${venue.id}` },
          {
            label: t('spaces'),
            link: `/dashboard/om/venues/${venue.id}/spaces`,
          },
          { label: t('create') },
        ]}
      />
      <Card>
        <CardContent>
          <SpaceForm
            onSubmit={(values) => {
              createSpace.mutate(
                { venueId, createSpaceDto: values },
                {
                  onSuccess: () => {
                    navigate(`/dashboard/om/venues/${venue.id}/spaces`);
                  },
                },
              );
            }}
            submitBtn={
              <>
                {t('create_space')} <Plus />
              </>
            }
            disabled={createSpace.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
