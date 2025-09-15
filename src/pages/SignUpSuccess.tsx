import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { signUpEmailAtom } from '@/features/auth';
import { useAtom } from 'jotai';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router';

export function SignUpSuccess() {
  const [signUpEmail, setSignUpEmail] = useAtom(signUpEmailAtom);
  const [email] = useState<string | null>(signUpEmail);
  const { t } = useTranslation('auth');

  useEffect(() => {
    setSignUpEmail(null);
  }, []);

  if (!email) {
    return <Navigate to='/' />;
  }

  return (
    <Card className='p-0 overflow-hidden'>
      <CardContent className='p-0'>
        <div className='bg-green-400 flex flex-col items-center justify-center p-4'>
          <CircleCheckBig className='size-16 text-white' />
          <p className='text-base font-bold text-white'>{t('success')}</p>
        </div>
        <div className='p-4 flex flex-col items-center gap-4'>
          <p className='text-sm'>{t('congratulation_account_created')}</p>
          <p className='text-sm'>
            {t('go_to_email_verify_account')}{' '}
            <b className='text-bold'>{email}</b>
          </p>
          <Button asChild size='sm' className='min-w-20'>
            <Link to='/sign-in'>
              {t('login')} <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
