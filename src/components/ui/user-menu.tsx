import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '@/types';
import { Role } from '@/types/role';
import { useLogout } from '@/features/auth';

interface UserMenuProps {
  user?: User;
}

type MenuItem = {
  label: string;
  to?: string;
  action?: () => void;
  roles?: Role[];
};

export function UserMenu({ user }: UserMenuProps) {
  const { t } = useTranslation('common');

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const menuItems: MenuItem[] = [
    { to: '/profile', label: t('auth.profile') },
    { to: '/bookings', label: t('header.booking-history') },
    {
      to: '/dashboard/admin/venues',
      label: t('auth.amdin'),
      roles: [Role.ADMIN, Role.MODERATOR],
    },
    { to: '/dashboard/om/venues', label: t('auth.om') },
    {
      label: t('auth.logout'),
      action: handleLogout,
    },
  ];

  const canAccess = (roles?: Role[]) => {
    if (!roles?.length) return true;
    return user ? roles.includes(user.role.id) : false;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer ring-2 ring-indigo-200'>
          <AvatarImage
            src='https://ca.slack-edge.com/E028JVBUY4F-U06PMNCPVPT-9c2f971890ca-512'
            alt='User'
          />
          <AvatarFallback>{user && user.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {menuItems
          .filter((item) => canAccess(item.roles))
          .map((item) => (
            <DropdownMenuItem
              key={item.label}
              onClick={item.action}
              asChild={!!item.to}
            >
              {item.to ? (
                <NavLink to={item.to}>{item.label}</NavLink>
              ) : (
                <span>{item.label}</span>
              )}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
