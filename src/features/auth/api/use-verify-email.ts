import { verifyEmail } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export function useVerifyEmail() {
  const mutation = useMutation({
    mutationFn: verifyEmail,
  });

  return mutation;
}
