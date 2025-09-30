import { useEffect } from 'react';
import { echo } from '@/lib/echo';
import { toast } from 'sonner';
import { queryClient } from '@/api/query-client';
import { getQueryKey } from '@/features/notification';
import { useGetProfile } from '@/features/auth';

export function useNotification() {
  const { data: user } = useGetProfile();

  useEffect(() => {
    if (!user) return;

    const channel = echo.channel(`user.${user.id}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.listen('NotificationCreated', (event: any) => {
      toast(event.title, {
        description: event.message,
        action: event.data?.url
          ? {
              label: 'View',
              onClick: () => window.open(event.data.url, '_blank'),
            }
          : undefined,
      });

      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    });

    return () => {
      channel.stopListening('NotificationCreated');
      echo.leaveChannel(`user.${user.id}`);
    };
  }, [user, queryClient]);
}
