import { ContentLayout } from '@/components/admin-panel/content-layout';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { t } = useTranslation('common');

  return (
    <ContentLayout menuLayout={MenuLayout.ADMIN} title={t('dashboard')}>
      {t('dashboard')}
    </ContentLayout>
  );
}
