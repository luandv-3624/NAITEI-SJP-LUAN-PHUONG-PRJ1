import { Card, CardContent } from '@/components/ui/card';
import { ResetPasswordForm } from '@/features/auth';
import { Navigate, useSearchParams } from 'react-router';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    return <Navigate to='/' />;
  }

  return (
    <Card className='p-0 overflow-hidden'>
      <CardContent className='p-0'>
        <ResetPasswordForm email={email} token={token} />
      </CardContent>
    </Card>
  );
}
