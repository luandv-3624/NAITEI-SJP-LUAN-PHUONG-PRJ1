import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowLeft, CircleCheckBig, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useSignInGoogle } from '../api/use-sign-in-google';
import { GeneralError } from '@/components/general-error';

export function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const signInGoogle = useSignInGoogle();
  const { t } = useTranslation('auth');

  useEffect(() => {
    const i = setTimeout(() => {
      signInGoogle.mutate(searchParams);
    }, 1000);

    return () => {
      clearTimeout(i);
    };
  }, [searchParams, signInGoogle.mutate]);

  if (signInGoogle.isIdle || signInGoogle.isPending) {
    return (
      <Card className='p-0 mx-auto'>
        <CardContent className='p-0 size-30 flex items-center justify-center'>
          <Loader2 className='animate-spin size-10' />
        </CardContent>
      </Card>
    );
  }

  if (signInGoogle.isError) {
    return (
      <div>
        <GeneralError />
        <div className='flex justify-center mt-4'>
          <Button variant='outline' asChild>
            <Link to='/'>
              <ArrowLeft /> {t('back_to_home')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className='p-0 overflow-hidden'>
      <CardContent className='p-0'>
        <div className='bg-foreground p-6 flex flex-col justify-center items-center gap-2'>
          <CircleCheckBig className='size-16 text-secondary' />
          <p className='text-sm font-bold text-secondary'>
            {t('login_success')}
          </p>
        </div>
        <div className='p-4 flex justify-center'>
          <Button variant='outline' asChild>
            <Link to='/'>
              <ArrowLeft /> {t('back_to_home')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
