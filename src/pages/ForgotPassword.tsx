import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ForgotPasswordForm, useForgotPassword } from '@/features/auth';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export function ForgotPassword() {
  const forgetPassword = useForgotPassword();
  const { t } = useTranslation('auth');

  if (forgetPassword.isSuccess) {
    return (
      <Card className='p-0 overflow-hidden'>
        <CardContent className='p-0'>
          <div className='bg-foreground p-6 flex flex-col justify-center items-center gap-2'>
            <CircleCheckBig className='size-16 text-secondary' />
            <p className='text-sm font-bold text-secondary'>{t('success')}</p>
          </div>
          <div className='p-4 flex flex-col items-center'>
            <p className='text-sm'>{t('reset_password_is_send_to_mail')}</p>
            <Button asChild size='sm' className='min-w-20 mt-4'>
              <Link to='/sign-in'>
                {t('login')} <ArrowRight />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='p-0 overflow-hidden'>
      <CardContent className='p-0'>
        <ForgotPasswordForm
          onSubmit={(values) => {
            forgetPassword.mutate(values);
          }}
          isLoading={forgetPassword.isPending}
        />
      </CardContent>
    </Card>
  );
}
