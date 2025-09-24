import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { User } from '@/types';
import { useTranslation } from 'react-i18next';
import ManagersListDialog from './managers-list-dialog';

export function ManagersFront({ managers }: { managers: User[] }) {
  const { t } = useTranslation('venue');

  return (
    <div className='relative flex gap-2 items-center'>
      {managers.length === 0 && (
        <span className='text-sm text-muted-foreground'>
          {t('no_managers')}
        </span>
      )}
      {managers.length <= 3 &&
        managers.map((manager) => (
          <HoverCard key={manager.id}>
            <HoverCardTrigger asChild>
              <img
                src='/auth-wall.jpg'
                className='size-10 rounded-full cursor-pointer hover:border hover:border-blue-400'
              />
            </HoverCardTrigger>
            <HoverCardContent className='min-w-100 flex gap-4 items-center'>
              <img src='/auth-wall.jpg' className='size-8 rounded-full' />
              <div className='text-sm flex flex-col'>
                <span className='font-bold'>{manager.name}</span>
                <span className='text-muted-foreground'>{manager.email}</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      {managers.length > 3 && (
        <>
          {managers.slice(0, 2).map((manager) => (
            <HoverCard key={manager.id}>
              <HoverCardTrigger asChild>
                <img
                  src='/auth-wall.jpg'
                  className='size-10 rounded-full cursor-pointer hover:border hover:border-blue-400'
                />
              </HoverCardTrigger>
              <HoverCardContent className='min-w-100 flex gap-4 items-center'>
                <img src='/auth-wall.jpg' className='size-8 rounded-full' />
                <div className='text-sm flex flex-col'>
                  <span className='font-bold'>{manager.name}</span>
                  <span className='text-muted-foreground'>{manager.email}</span>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
          <div className='size-10 rounded-full flex items-center justify-center text-sm font-bold bg-muted text-muted-foreground'>
            +{managers.length - 2}
          </div>
        </>
      )}
      <ManagersListDialog managers={managers} />
    </div>
  );
}
