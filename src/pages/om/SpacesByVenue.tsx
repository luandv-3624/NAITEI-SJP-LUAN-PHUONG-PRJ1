import { ContentLayout } from '@/components/admin-panel/content-layout';
import { List } from '@/features/space';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export function SpacesByVenues() {
  const { t } = useTranslation('space');
  const { venueId } = useParams();

  return (
    <ContentLayout menuLayout={MenuLayout.OWNER} title={t('spaces')}>
      <List venueId={venueId!} />
    </ContentLayout>
  );
}
