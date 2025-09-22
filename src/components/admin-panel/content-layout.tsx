import { Navbar } from '@/components/admin-panel/navbar';
import { MenuLayout } from '@/types/menu-layout';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  menuLayout: MenuLayout;
}

export function ContentLayout({
  title,
  children,
  menuLayout,
}: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} menuLayout={menuLayout} />
      <div className='container pt-8 pb-8 px-4 sm:px-8 mx-auto'>{children}</div>
    </div>
  );
}
