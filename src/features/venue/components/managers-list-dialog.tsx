import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';
import { Binoculars } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ManagersListDialog({ managers }: { managers: User[] }) {
  const { t } = useTranslation('venue');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='rounded-full size-10 p-0'>
          <Binoculars />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('managers_list')}</DialogTitle>
          <DialogDescription className='line-clamp-1'>
            {t('managers_list_description')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[calc(100vh-110px)]'>
          <div className='flex flex-col gap-4 p-2'>
            {managers.length === 0 && (
              <span className='text-sm text-muted-foreground'>
                {t('no_managers')}
              </span>
            )}
            {managers.map((manager, index) => (
              <React.Fragment key={manager.id}>
                <div className='flex items-center gap-4'>
                  <img src='/auth-wall.jpg' className='size-10 rounded-full' />
                  <div className='text-sm flex flex-col'>
                    <span className='font-bold'>{manager.name}</span>
                    <span className='text-muted-foreground'>
                      {manager.email}
                    </span>
                  </div>
                </div>
                {index < managers.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
