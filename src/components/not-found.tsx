import { cn } from '@/lib';
import { FaCat } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export function NotFound({ className, ...props }: React.ComponentProps<'div'>) {
  const { t } = useTranslation('common');

  return (
    <div
      className={cn(
        'flex flex-col gap-4 items-center justify-center',
        className,
      )}
      {...props}
    >
      <FaCat className='size-20 text-muted-foreground' />
      <p className='text-sm font-bold text-muted-foreground'>
        {t('not_found')}
      </p>
    </div>
  );
}
