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
import { formSchema } from '../form-schemas/forgot-password-form-schema';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';

export function ForgotPasswordForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const { t } = useTranslation('auth');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold'>{t('forgot_password')}</h1>
            <p className='text-muted-foreground text-balance'>
              {t('reset_your_password')}
            </p>
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='name@example.com'
                    autoComplete='email'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {t('send_request_password')}
          </Button>
          <div className='text-center text-sm'>
            {t('back_to')}{' '}
            <Link to='/sign-in' className='underline underline-offset-4'>
              {t('sign_in')}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
