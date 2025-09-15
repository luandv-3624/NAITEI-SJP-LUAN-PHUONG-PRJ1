import { signUp } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { signUpEmailAtom } from '../atomts';
import i18n from '@/i18n';

export function useSignUp() {
  const navigate = useNavigate();
  const setSignUpEmail = useSetAtom(signUpEmailAtom);

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      setSignUpEmail(user.email);
      navigate('/sign-up-success');
    },
    onError: () => {
      toast(i18n.t('failed_register', { ns: 'auth' }));
    },
  });

  return mutation;
}
