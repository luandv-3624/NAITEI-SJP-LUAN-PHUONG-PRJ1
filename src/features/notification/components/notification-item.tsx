import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useDateTimeFormatter } from '@/features/booking';
import { NotificationType as Notification } from '../types';

interface NotificationItemProps {
  notification: Notification;
  handleReadNoti: (id: string) => void;
}

function NotificationItemComponent({
  notification,
  handleReadNoti,
}: NotificationItemProps) {
  const { formatDate } = useDateTimeFormatter();
  const handleClick = () => handleReadNoti(String(notification.id));

  return (
    <DropdownMenuItem
      asChild
      className={`
                        cursor-pointer transition-colors mb-1
                        ${!notification.is_read ? 'bg-blue-50 dark:bg-blue-900/40 font-semibold' : ''}
                        hover:bg-gray-100 dark:hover:bg-gray-800
                    `}
      onClick={handleClick}
    >
      <NavLink to={notification.data?.url ?? '#'}>
        <div>
          <p className='font-semibold'>{notification.title}</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {notification.message}
          </p>
          <p className='text-xs text-gray-400 mt-1'>
            {formatDate(notification.created_at)}
          </p>
        </div>
      </NavLink>
    </DropdownMenuItem>
  );
}

export const NotificationItem = memo(NotificationItemComponent);
