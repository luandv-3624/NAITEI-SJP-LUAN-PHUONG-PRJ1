import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Save, X, Loader2, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { profileSchema } from '../form-schema.ts';
import { User, UpdateProfileRequest } from '../types';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditProps {
  profile: User;
  onSave: (data: UpdateProfileRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ProfileEdit({
  profile,
  onSave,
  onCancel,
  isLoading,
}: ProfileEditProps) {
  const { t } = useTranslation('profile');

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      phone_number: profile.phone_number,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    const updateData: UpdateProfileRequest = {
      name: data.name,
      phone_number: data.phone_number,
    };
    onSave(updateData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <Avatar className='h-20 w-20 cursor-pointer'>
              <AvatarImage alt={profile.name} />
              <AvatarFallback className='text-lg'>
                {profile.name}
              </AvatarFallback>
            </Avatar>
            <div className='absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1 cursor-pointer hover:bg-blue-700 transition-colors'>
              <Camera className='w-4 h-4 text-white' />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('fields.name')} <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('fields.phone_number')}{' '}
                    <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-4'>
            <FormItem>
              <FormLabel>{t('fields.email')}</FormLabel>
              <FormControl>
                <Input value={profile.email} disabled className='bg-gray-100' />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>{t('fields.role')}</FormLabel>
              <FormControl>
                <Input
                  value={profile.role.name}
                  disabled
                  className='bg-gray-100'
                />
              </FormControl>
            </FormItem>
          </div>
        </div>

        <div className='flex justify-end space-x-3 pt-4 border-t'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={isLoading}
          >
            <X className='w-4 h-4 mr-1' />
            {t('cancel')}
          </Button>
          <Button
            type='submit'
            disabled={isLoading || !form.formState.isDirty}
            className='flex items-center gap-2'
          >
            {isLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Save className='w-4 h-4' />
            )}
            {t('save_changes')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
