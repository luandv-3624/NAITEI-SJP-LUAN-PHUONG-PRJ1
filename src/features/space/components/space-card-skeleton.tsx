import { Skeleton } from '@/components/ui/skeleton';

export function SpaceCardSkeleton() {
  return (
    <div className='rounded-xl overflow-hidden'>
      <Skeleton className='aspect-video w-full' />
      <div className='p-3 space-y-2'>
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='h-4 w-full' />
        <div className='flex items-end justify-between pt-2'>
          <Skeleton className='h-5 w-1/4' />
          <Skeleton className='h-8 w-16' />
        </div>
      </div>
    </div>
  );
}
