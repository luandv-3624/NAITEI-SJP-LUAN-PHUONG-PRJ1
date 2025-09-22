import { VenueList } from '@/features/om/venue';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';

export function VenueListPage() {
  const { t } = useTranslation('common');

  return (
    <ContentLayout menuLayout={MenuLayout.ADMIN} title={t('om.venue_list')}>
      <VenueList />
    </ContentLayout>
  );
}
