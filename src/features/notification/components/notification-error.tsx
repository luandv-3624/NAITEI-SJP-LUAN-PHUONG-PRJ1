import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

export function NotificationError() {
  const { t } = useTranslation('notification');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        <Bell className='w-6 h-6' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64 max-h-80 overflow-y-auto gap-y-2'>
        <p className='text-sm text-red-500 p-4'>{t('failed')}</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
