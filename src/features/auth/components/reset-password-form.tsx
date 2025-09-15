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
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { formSchema } from '../form-schemas/reset-password-form-schema';
import { useResetPassword } from '../api/use-reset-password';

export function ResetPasswordForm({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      email,
      token,
    },
  });
  const { t } = useTranslation('auth');

  const resetPassword = useResetPassword();

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetPassword.mutate(values);
  }

  const isLoading = resetPassword.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold'>{t('reset_password')}</h1>
            <p className='text-muted-foreground text-balance'>
              {t('reset_your_password')}
            </p>
          </div>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='******'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>{t('confirm_password')}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='******'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {t('change_password')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
