import { modalLoadingAtom } from '@/atoms/modal-loading-atom';
import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';
import ModalLoading from '@/components/modal-loading';
import { useGetProfile } from '@/features/auth';
import { MenuLayout } from '@/types/menu-layout';
import { Role } from '@/types/role';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router';

export function AdminLayout() {
  const { data: user, isPending, isError } = useGetProfile();
  const modalLoading = useAtomValue(modalLoadingAtom);

  if (isPending) {
    return null;
  }

  if (isError || user.role.id !== Role.ADMIN) {
    return <Navigate to='/' />;
  }

  return (
    <AdminPanelLayout menuLayout={MenuLayout.ADMIN}>
      <ModalLoading loading={modalLoading} />
      <Outlet />
    </AdminPanelLayout>
  );
}
