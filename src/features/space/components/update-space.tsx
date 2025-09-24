import { useNavigate } from 'react-router';
import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { Card, CardContent } from '@/components/ui/card';
import { SpaceForm } from './space-form';
import { useTranslation } from 'react-i18next';
import { Edit } from 'lucide-react';
import { useUpdateSpace } from '../api/use-update-space';
import { useGetSpaceDetail } from '../api';
import { AxiosError } from '@/types';
import { HTTP_STATUS_CODE } from '@/constants';
import { NotFound } from '@/components/not-found';
import { GeneralError } from '@/components/general-error';
import { SpinLoading } from '@/components/spin-loading';
import { Skeleton } from '@/components/ui/skeleton';

export function UpdateSpace({ spaceId }: { spaceId: string }) {
  const updateSpace = useUpdateSpace();
  const navigate = useNavigate();
  const { t } = useTranslation('space');
  const { data: space, isPending, isError, error } = useGetSpaceDetail(spaceId);

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
          {
            label: space.venue.name,
            link: `/dashboard/om/venues/${space.venue.id}`,
          },
          {
            label: t('spaces'),
            link: `/dashboard/om/venues/${space.venue.id}/spaces`,
          },
          {
            label: space.name,
            link: `/dashboard/om/venues/${space.venue.id}/spaces/${space.id}`,
          },
          { label: t('update') },
        ]}
      />
      <Card>
        <CardContent>
          <SpaceForm
            onSubmit={(values) => {
              updateSpace.mutate(
                { spaceId, updateSpaceDto: values },
                {
                  onSuccess: () => {
                    navigate(
                      `/dashboard/om/venues/${space.venue.id}/spaces/${space.id}`,
                    );
                  },
                },
              );
            }}
            initialValues={{
              capacity: space.capacity,
              description: space.description,
              name: space.name,
              price: space.price,
              price_type_id: space.price_type.id,
              space_type_id: space.space_type.id,
              status: space.status,
            }}
            submitBtn={
              <>
                {t('update_space')} <Edit />
              </>
            }
            disabled={updateSpace.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
