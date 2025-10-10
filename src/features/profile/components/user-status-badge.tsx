import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import { USER_STATUS, UserStatus } from '@/constants';
import { useTranslation } from 'react-i18next';

export function StatusBadge({ status }: { status: UserStatus }) {
  const { t } = useTranslation('profile');

  switch (status) {
    case USER_STATUS.ACTIVE:
      return (
        <Badge variant='default' className='flex items-center gap-1'>
          <CheckCircle className='w-3 h-3' />
          {t(`status.${USER_STATUS.ACTIVE}`)}
        </Badge>
      );

    case USER_STATUS.INACTIVE:
      return (
        <Badge variant='destructive' className='flex items-center gap-1'>
          <XCircle className='w-3 h-3' />
          {t(`status.${USER_STATUS.INACTIVE}`)}
        </Badge>
      );

    case USER_STATUS.VERIFIED:
      return (
        <Badge variant='secondary' className='flex items-center gap-1'>
          <ShieldCheck className='w-3 h-3' />
          {t(`status.${USER_STATUS.VERIFIED}`)}
        </Badge>
      );

    default:
      return (
        <Badge variant='outline' className='flex items-center gap-1'>
          <HelpCircle className='w-3 h-3' />
          {t('status.unknown')}
        </Badge>
      );
  }
}
