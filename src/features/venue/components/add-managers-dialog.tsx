import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { formSchema } from '../schemas/add-managers-schema';
import { useAddManagers } from '../api/use-add-managers';
import { MultiUsersSelect } from '@/features/user';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IoMdPersonAdd } from 'react-icons/io';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AddManagersDialog({
  venueId,
  defaultUserIds,
  excludeUserIds,
}: {
  venueId: string;
  defaultUserIds?: number[];
  excludeUserIds?: number[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userIds: defaultUserIds || [],
    },
  });
  const { t } = useTranslation('venue');
  const [open, setOpen] = useState<boolean>(false);

  const addManagers = useAddManagers();

  function onSubmit(values: z.infer<typeof formSchema>) {
    addManagers.mutate(
      { venueId: venueId, userIds: values.userIds },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  const isLoading = addManagers.isPending;

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          {t('add_managers')} <IoMdPersonAdd />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className='max-h-[calc(100vh-48px)]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
              <DialogHeader>
                <DialogTitle>{t('add_managers')}</DialogTitle>
                <DialogDescription>
                  {t('add_managers_description')}
                </DialogDescription>
              </DialogHeader>
              <FormField
                control={form.control}
                name='userIds'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>{t('managers')}</FormLabel>
                    <FormControl>
                      <MultiUsersSelect
                        onChange={(userIds) => {
                          field.onChange(userIds.map((id) => Number(id)));
                        }}
                        value={field.value.map((id) => String(id))}
                        disabled={isLoading}
                        excludeUserIds={excludeUserIds}
                        modalPopover
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose
                  asChild
                  disabled={isLoading}
                  onClick={() => setOpen(false)}
                >
                  <Button variant='outline'>{t('cancel')}</Button>
                </DialogClose>
                <Button type='submit' disabled={isLoading}>
                  {t('add_managers')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
