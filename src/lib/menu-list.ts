import { MenuLayout } from '@/types/menu-layout';
import { LayoutGrid, LucideIcon } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(layout: MenuLayout): Group[] {
  switch (layout) {
    case MenuLayout.ADMIN:
      return [
        {
          groupLabel: '',
          menus: [
            {
              href: '/dashboard/admin',
              label: 'dashboard',
              icon: LayoutGrid,
              submenus: [],
            },
          ],
        },
      ];
    case MenuLayout.OWNER:
      return [];
  }
}
