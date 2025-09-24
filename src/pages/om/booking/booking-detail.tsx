import { BookingDetail } from '@/features/om/booking';
import { BookingDetailLayout } from '@/pages';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';

export function BookingDetailPage() {
  const { t } = useTranslation('common');

  return (
    <ContentLayout menuLayout={MenuLayout.OWNER} title={t('om.booking_detail')}>
      <BookingDetailLayout DetailComponent={BookingDetail} />
    </ContentLayout>
  );
}
