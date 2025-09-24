import { updateUser } from '@/api/user';
import { AxiosError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getQueryKey } from './use-get-users';
import { useSetAtom } from 'jotai';
import { modalLoadingAtom } from '@/atoms/modal-loading-atom';
import i18n from '@/i18n';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const setModalLoading = useSetAtom(modalLoadingAtom);

  const mutation = useMutation({
    mutationFn: updateUser,
    onMutate: () => {
      setModalLoading(true);
    },
    onSuccess: () => {
      toast(i18n.t('user_updated_success', { ns: 'user' }));
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
    onError: (error: AxiosError) => {
      toast(error.response?.data.message);
    },
    onSettled: () => {
      setModalLoading(false);
    },
  });

  return mutation;
}
