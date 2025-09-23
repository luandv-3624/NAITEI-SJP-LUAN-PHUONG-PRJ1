import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
  return (
    <div className='rounded-xl overflow-hidden'>
      <Skeleton className='aspect-video w-full' />
      <div className='p-3 space-y-2'>
        <Skeleton className='h-5 w-3/4' />
        <div className='flex justify-end pt-2'>
          <Skeleton className='h-8 w-16' />
        </div>
      </div>
    </div>
  );
}
