import { ContentLayout } from '@/components/admin-panel/content-layout';
import { MyVenuesList } from '@/features/venue';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';

export function MyVenues() {
  const { t } = useTranslation('venue');

  return (
    <ContentLayout menuLayout={MenuLayout.OWNER} title={t('my_venues')}>
      <MyVenuesList />
    </ContentLayout>
  );
}
