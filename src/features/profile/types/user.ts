import { UserStatus } from '@/constants';

export type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  email_verified_at: string | null;
  status: UserStatus;
  role: {
    id: number;
    name: string;
  };
};
