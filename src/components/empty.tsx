import { cn } from '@/lib';
import { FaBoxOpen } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export function Empty({
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
      <FaBoxOpen className='size-20 text-muted-foreground' />
      <p className='text-sm font-bold text-muted-foreground'>
        {message ?? t('empty')}
      </p>
    </div>
  );
}
