import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UpdateSpace as US } from '@/features/space';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export function UpdateSpace() {
  const { t } = useTranslation('space');
  const { spaceId } = useParams();

  return (
    <ContentLayout title={t('update_space')} menuLayout={MenuLayout.OWNER}>
      <US spaceId={spaceId!} />
    </ContentLayout>
  );
}
