import { ContentLayout } from '@/components/admin-panel/content-layout';
import { CreateSpace as CS } from '@/features/space';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export function CreateSpace() {
  const { t } = useTranslation('space');
  const { venueId } = useParams();

  return (
    <ContentLayout title={t('create_space')} menuLayout={MenuLayout.OWNER}>
      <CS venueId={venueId!} />
    </ContentLayout>
  );
}
