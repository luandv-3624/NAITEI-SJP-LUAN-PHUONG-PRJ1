import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UsersList } from '@/features/user';
import { MenuLayout } from '@/types/menu-layout';
import { useTranslation } from 'react-i18next';

export function UsersPage() {
  const { t } = useTranslation('user');

  return (
    <ContentLayout menuLayout={MenuLayout.ADMIN} title={t('users')}>
      <UsersList />
    </ContentLayout>
  );
}
