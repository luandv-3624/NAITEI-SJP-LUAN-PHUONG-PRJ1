import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UpdateVenue as UV } from '@/features/venue';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export function UpdateVenue() {
  const { t } = useTranslation('venue');
  const { venueId } = useParams();

  return (
    <ContentLayout title={t('update_venue')} menuLayout={MenuLayout.OWNER}>
      <UV venueId={venueId!} />
    </ContentLayout>
  );
}
