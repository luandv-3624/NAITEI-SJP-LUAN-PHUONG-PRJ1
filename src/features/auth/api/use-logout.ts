import { logout } from '@/api/auth';
import { AxiosError } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSetAtom } from 'jotai';
import { tokenService } from '@/api/token-service';
import { isLoginAtom } from '../atomts';

export function useLogout() {
  const setIsLogin = useSetAtom(isLoginAtom);

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      tokenService.clearTokens();
      localStorage.removeItem('refreshToken');

      setIsLogin(false);
    },
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
  });

  return mutation;
}
