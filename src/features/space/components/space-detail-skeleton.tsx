import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SpaceDetailSkeleton() {
  return (
    <div className='bg-gray-50 min-h-screen animate-pulse'>
      <div className='max-w-7xl mx-auto px-4 md:px-8 mt-6'>
        <div className='relative w-full h-[400px] rounded-2xl overflow-hidden'>
          <Skeleton className='w-full h-[400px] bg-gray-200' />
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <div className='lg:col-span-3'>
          <div className='mb-8 flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
            <div className='flex-1 space-y-3'>
              <Skeleton className='h-8 w-48 bg-gray-200' />
              <div className='flex items-center gap-4'>
                {['w-24', 'w-20', 'w-16'].map((w, i) => (
                  <Skeleton key={i} className={`h-4 ${w} bg-gray-200`} />
                ))}
              </div>
              {['w-64', 'w-40'].map((w, i) => (
                <Skeleton key={i} className={`h-4 ${w} bg-gray-200`} />
              ))}
            </div>

            <div className='bg-gray-100 rounded-xl p-6 min-w-[18rem] space-y-3'>
              <Skeleton className='h-8 w-24 mx-auto bg-gray-200' />
              <Skeleton className='h-4 w-16 mx-auto bg-gray-200' />
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className='h-10 w-full bg-gray-200' />
              ))}
            </div>
          </div>

          <div className='sticky top-16 z-10 bg-white rounded-lg shadow-sm mb-8 border'>
            <div className='flex'>
              <div className='flex-1 py-4 text-center'>
                <Skeleton className='h-5 w-20 mx-auto bg-gray-200' />
              </div>
              <div className='flex-1 py-4 text-center'>
                <Skeleton className='h-5 w-16 mx-auto bg-gray-200' />
              </div>
              <div className='flex-1 py-4 text-center'>
                <Skeleton className='h-5 w-24 mx-auto bg-gray-200' />
              </div>
            </div>
          </div>

          <Card className='mb-8 border-0 shadow-sm'>
            <div className='p-6 space-y-4'>
              <Skeleton className='h-8 w-40 bg-gray-200' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full bg-gray-200' />
                <Skeleton className='h-4 w-5/6 bg-gray-200' />
                <Skeleton className='h-4 w-2/3 bg-gray-200' />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className='flex justify-between py-2 border-b border-gray-100'
                  >
                    <Skeleton className='h-4 w-20 bg-gray-200' />
                    <Skeleton className='h-4 w-24 bg-gray-200' />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className='mb-8 border-0 shadow-sm'>
            <div className='p-6'>
              <Skeleton className='h-8 w-32 mb-6 bg-gray-200' />
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-3 p-4 bg-gray-100 rounded-lg'
                  >
                    <Skeleton className='w-6 h-6 rounded bg-gray-200' />
                    <Skeleton className='h-4 w-20 bg-gray-200' />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className='mb-8 border-0 shadow-sm'>
            <div className='p-6 space-y-4'>
              <Skeleton className='h-8 w-48 bg-gray-200' />
              <Skeleton className='h-24 rounded-lg bg-gray-200' />
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='space-y-4'>
                  <Skeleton className='h-4 w-32 bg-gray-200' />
                  <Skeleton className='h-10 w-full bg-gray-200' />
                  <Skeleton className='h-4 w-32 mt-4 bg-gray-200' />
                  <Skeleton className='h-10 w-full bg-gray-200' />
                </div>
                <div className='space-y-3'>
                  <Skeleton className='h-4 w-40 bg-gray-200' />
                  <Skeleton className='h-24 rounded-lg bg-gray-200' />
                  <Skeleton className='h-10 w-full bg-gray-200' />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='lg:col-span-1 space-y-6'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className='border-0 shadow-sm'>
              <div className='p-6 space-y-3'>
                <Skeleton className='h-6 w-32 bg-gray-200' />
                <Skeleton className='h-4 w-48 bg-gray-200' />
                <Skeleton className='h-4 w-40 bg-gray-200' />
                <Skeleton className='h-10 w-full bg-gray-200' />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
