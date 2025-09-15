import { resetPassword } from '@/api/auth';
import i18n from '@/i18n';
import { AxiosError } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useResetPassword() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast(i18n.t('reset_password_success', { ns: 'auth' }));
      navigate('/sign-in');
    },
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
  });

  return mutation;
}
