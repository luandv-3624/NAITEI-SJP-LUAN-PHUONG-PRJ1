import { MenuLayout } from '@/types/menu-layout';
import {
  Building,
  LayoutGrid,
  LucideIcon,
  ChartColumnDecreasing,
} from 'lucide-react';

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
              submenus: [
                {
                  href: '/dashboard/admin/venues',
                  label: 'venue_list',
                },
              ],
            },
          ],
        },
      ];
    case MenuLayout.OWNER:
      return [
        {
          groupLabel: '',
          menus: [
            {
              href: '',
              icon: Building,
              label: 'venues',
              submenus: [
                {
                  href: '/dashboard/om/venues',
                  label: 'my_venues',
                },
                {
                  href: '/dashboard/om/create-venue',
                  label: 'create_venue',
                },
              ],
            },
            {
              href: '',
              icon: ChartColumnDecreasing,
              label: 'bookings',
              submenus: [
                {
                  href: '/dashboard/om/bookings',
                  label: 'booking_list',
                },
              ],
            },
          ],
        },
      ];
  }
}
