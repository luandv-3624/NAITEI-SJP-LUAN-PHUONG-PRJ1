import { isLoginAtom } from '@/features/auth';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router';

export function AuthLayout() {
  const isLogin = useAtomValue(isLoginAtom);

  if (isLogin) {
    return <Navigate to='/' />;
  }

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className='flex flex-col gap-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
