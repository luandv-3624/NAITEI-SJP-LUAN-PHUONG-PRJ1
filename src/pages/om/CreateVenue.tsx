import { ContentLayout } from '@/components/admin-panel/content-layout';
import { CreateVenue as CV } from '@/features/venue';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';

export function CreateVenue() {
  const { t } = useTranslation('venue');
  return (
    <ContentLayout title={t('create_venue')} menuLayout={MenuLayout.OWNER}>
      <CV />
    </ContentLayout>
  );
}
