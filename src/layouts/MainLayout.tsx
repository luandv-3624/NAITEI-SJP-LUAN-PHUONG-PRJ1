import { isLoginAtom } from '@/features/auth';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router';

export function MainLayout() {
  const isLogin = useAtomValue(isLoginAtom);

  if (!isLogin) {
    return <Navigate to='/sign-in' />;
  }

  return <Outlet />;
}
