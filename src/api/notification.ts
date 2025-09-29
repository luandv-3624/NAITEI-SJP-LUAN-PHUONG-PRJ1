import {
  NotificationListResponse,
  NotificationType as Notification,
} from '@/features/notification';
import { Response } from '@/types';
import { axios } from './axios';

const BOOKING_ENDPOINT = '/notifications';

export async function getNotificationByMe({
  pageParam = 1,
  pageSize = 10,
}: {
  pageParam: number;
  pageSize: number;
}): Promise<NotificationListResponse> {
  const { data } = await axios.get(`${BOOKING_ENDPOINT}/me`, {
    params: { page: pageParam, pageSize },
  });

  return {
    data: data?.data?.data,
    unReadCount: data?.data?.unread_count,
    meta: data?.data?.meta,
    links: data?.data?.links,
  };
}

export async function readNotification(
  notificationId: string,
): Promise<Response<Notification>> {
  const { data } = await axios.put(`${BOOKING_ENDPOINT}/${notificationId}`);

  return data;
}
