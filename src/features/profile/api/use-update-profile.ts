import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/api/auth';
import { toast } from 'sonner';
import { AxiosError } from '@/types';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      toast(response.message);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: AxiosError) => {
      toast(error?.response?.data?.message);
    },
  });
}
