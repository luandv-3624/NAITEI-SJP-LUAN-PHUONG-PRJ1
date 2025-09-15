import { forgotPassword } from '@/api/auth';
import { AxiosError } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useForgotPassword() {
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
  });

  return mutation;
}
