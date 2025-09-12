import { Card, CardContent } from '@/components/ui/card';
import { Outlet } from 'react-router';

export function SignInOutLayout() {
  return (
    <Card className='overflow-hidden p-0'>
      <CardContent className='grid p-0 md:grid-cols-2'>
        <Outlet />
        <div className='bg-muted relative hidden md:block'>
          <img
            src='/auth-wall.jpg'
            alt='Image'
            className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
          />
        </div>
      </CardContent>
    </Card>
  );
}
