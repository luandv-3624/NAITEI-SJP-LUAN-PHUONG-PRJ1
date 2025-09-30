export type NotificationData = {
  id: number;
  url: string;
  type: string;
  new_status?: string;
};

export type NotificationType = {
  id: number;
  title: string;
  message: string;
  data: NotificationData;
  is_read: boolean;
  created_at: string;
};
