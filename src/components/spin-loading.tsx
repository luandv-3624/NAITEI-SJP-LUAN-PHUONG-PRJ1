import { cn } from '@/lib';
import { Loader2 } from 'lucide-react';

export function SpinLoading({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 items-center justify-center min-h-50',
        className,
      )}
      {...props}
    >
      <Loader2 className='size-10 text-muted-foreground animate-spin' />
    </div>
  );
}
