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
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { FaGoogle } from 'react-icons/fa';
import { formSchema } from '../form-schemas/sign-in-form-schema';
import { useSignIn } from '../api/use-sign-in';
import { useTranslation } from 'react-i18next';

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { t } = useTranslation('auth');

  const signIn = useSignIn();

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn.mutate(values);
  }

  const isLoading = signIn.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold'>{t('welcome_back')}</h1>
            <p className='text-muted-foreground text-balance'>
              {t('login_to_account')}
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <div className='flex items-center'>
                  <FormLabel>{t('password')}</FormLabel>
                  <Link
                    to='#'
                    className='ml-auto text-sm underline-offset-2 hover:underline'
                  >
                    {t('forgot_password')}
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder='******'
                    autoComplete='current-password'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {t('login')}
          </Button>
          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
            <span className='bg-card text-muted-foreground relative z-10 px-2'>
              {t('or_continue_with')}
            </span>
          </div>
          <Button
            variant='outline'
            type='button'
            className='w-full'
            disabled={isLoading}
          >
            <FaGoogle />
          </Button>
          <div className='text-center text-sm'>
            {t('dont_have_account')}{' '}
            <Link to='/sign-up' className='underline underline-offset-4'>
              {t('sign_up')}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
