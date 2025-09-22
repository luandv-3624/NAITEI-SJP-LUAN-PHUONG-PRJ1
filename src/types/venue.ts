import { Ward, Space, User } from '@/types';

export type Venue = {
  id: number;
  owner_id: number;
  name: string;
  avatar: string;
  address: string;
  ward_id: number;
  lat: string;
  lng: string;
  description: string;
  status: string;
  ward: Ward;
  spaces: Space[];
  owner: User;
};
