import { loginWithGoogle } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { isLoginAtom } from '../atomts';
import { tokenService } from '@/api/token-service';
import { toast } from 'sonner';
import i18n from '@/i18n';

export function useSignInGoogle() {
  const setIsLogin = useSetAtom(isLoginAtom);

  const mutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: ({ access_token, refresh_token }) => {
      localStorage.setItem('refreshToken', refresh_token);
      tokenService.setAccessToken(access_token);

      setIsLogin(true);
    },
    onError: () => {
      toast(i18n.t('failed_login', { ns: 'auth' }));
    },
  });

  return mutation;
}
