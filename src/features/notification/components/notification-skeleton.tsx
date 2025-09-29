import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

export function NotificationSkeleton({ pageSize }: { pageSize: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        <Bell className='w-6 h-6' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64 max-h-80 overflow-y-auto gap-y-2'>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className='p-2 rounded-md'>
              <Skeleton className='h-4 w-32 mb-2' />
              <Skeleton className='h-3 w-48 mb-1' />
              <Skeleton className='h-3 w-20' />
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
