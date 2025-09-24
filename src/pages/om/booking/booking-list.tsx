import { ContentLayout } from '@/components/admin-panel/content-layout';
import { MenuLayout } from '@/types/menu-layout';
import { BookingList } from '@/features/om/booking';
import { useTranslation } from 'react-i18next';

export function BookingListPage() {
  const { t } = useTranslation('common');

  return (
    <ContentLayout menuLayout={MenuLayout.OWNER} title={t('om.booking_list')}>
      <BookingList />
    </ContentLayout>
  );
}
