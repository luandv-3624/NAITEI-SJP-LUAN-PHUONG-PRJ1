import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';
import { MenuLayout } from '@/types/menu-layout';
import { Outlet } from 'react-router';

export function OMLayout() {
  return (
    <AdminPanelLayout menuLayout={MenuLayout.OWNER}>
      <Outlet />
    </AdminPanelLayout>
  );
}
