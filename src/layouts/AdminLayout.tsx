import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';
import { useGetProfile } from '@/features/auth';
import { MenuLayout } from '@/types/menu-layout';
import { Role } from '@/types/role';
import { Navigate, Outlet } from 'react-router';

function AdminLayout() {
  const { data: user, isPending, isError } = useGetProfile();

  if (isPending) {
    return null;
  }

  if (isError || user.role.id !== Role.ADMIN) {
    return <Navigate to='/' />;
  }

  return (
    <AdminPanelLayout menuLayout={MenuLayout.ADMIN}>
      <Outlet />
    </AdminPanelLayout>
  );
}
export default AdminLayout;
