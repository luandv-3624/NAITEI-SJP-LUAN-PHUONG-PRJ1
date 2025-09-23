import { useNavigate } from 'react-router';
import { useCreateVenue } from '../api/use-create-venue';
import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { Card, CardContent } from '@/components/ui/card';
import { VenueForm } from './venue-form';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

export function CreateVenue() {
  const createVenue = useCreateVenue();
  const navigate = useNavigate();
  const { t } = useTranslation('venue');

  return (
    <div className='space-y-4'>
      <BreadcrumbIndies
        items={[
          { label: t('my_venues'), link: '/dashboard/om/venues' },
          { label: t('new') },
        ]}
      />
      <Card>
        <CardContent>
          <VenueForm
            onSubmit={(values) => {
              createVenue.mutate(values, {
                onSuccess: () => {
                  navigate('/dashboard/om/venues');
                },
              });
            }}
            submitBtn={
              <>
                {t('create_venue')} <Plus />
              </>
            }
            disabled={createVenue.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
