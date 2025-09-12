import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router';
import { useVerifyEmail } from '../api/use-verify-email';
import { toast } from 'sonner';
import { ArrowLeft, CircleCheckBig, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const tokenProcessed = useRef<boolean>(false);
  const verifyEmail = useVerifyEmail();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  useEffect(() => {
    const i = setTimeout(() => {
      if (token && !tokenProcessed.current) {
        tokenProcessed.current = true;
        verifyEmail.mutate(
          { token },
          {
            onError: () => {
              toast(t('email_verification_error'));
              navigate('/');
            },
          },
        );
      }
    }, 1000);

    return () => {
      clearTimeout(i);
    };
  }, [token, tokenProcessed.current, verifyEmail.mutate, t, navigate]);

  if (!token) {
    return <Navigate to='/' />;
  }

  if (verifyEmail.isIdle || verifyEmail.isPending) {
    return (
      <Card className='p-0 mx-auto'>
        <CardContent className='p-0 size-30 flex items-center justify-center'>
          <Loader2 className='animate-spin size-10' />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='p-0 overflow-hidden'>
      <CardContent className='p-0'>
        <div className='bg-foreground p-6 flex flex-col justify-center items-center gap-2'>
          <CircleCheckBig className='size-16 text-secondary' />
          <p className='text-sm font-bold text-secondary'>
            {t('email_verification_success')}
          </p>
        </div>
        <div className='p-4 flex justify-center'>
          <Button variant='outline' asChild>
            <Link to='/sign-in'>
              <ArrowLeft /> {t('back_to_sign_in')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
