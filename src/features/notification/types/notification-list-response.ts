import { Paginated } from '@/types';
import { NotificationType as Notification } from './notification';

export type NotificationListResponse = Paginated<Notification> & {
  unReadCount: number;
};
