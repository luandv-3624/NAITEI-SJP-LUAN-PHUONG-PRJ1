import { ContentLayout } from '@/components/admin-panel/content-layout';
import { SpaceDetailDashboard } from '@/features/space';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export function SpaceDetail() {
  const { t } = useTranslation('space');
  const { spaceId } = useParams();

  return (
    <ContentLayout title={t('space')} menuLayout={MenuLayout.OWNER}>
      <SpaceDetailDashboard spaceId={spaceId!} />
    </ContentLayout>
  );
}
