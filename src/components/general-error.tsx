import { cn } from '@/lib';
import { MdError } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export function GeneralError({
  className,
  message,
  ...props
}: React.ComponentProps<'div'> & { message?: string }) {
  const { t } = useTranslation('common');

  return (
    <div
      className={cn(
        'flex flex-col gap-4 items-center justify-center',
        className,
      )}
      {...props}
    >
      <MdError className='size-20 text-muted-foreground' />
      <p className='text-sm font-bold text-muted-foreground'>
        {message ?? t('an_error_occured')}
      </p>
    </div>
  );
}
