import { ContentLayout } from '@/components/admin-panel/content-layout';
import { ManageVenue as MV } from '@/features/venue';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export function ManageVenue() {
  const { t } = useTranslation('venue');
  const { venueId } = useParams();

  return (
    <ContentLayout title={t('manage_venue')} menuLayout={MenuLayout.OWNER}>
      <MV venueId={venueId!} />
    </ContentLayout>
  );
}
