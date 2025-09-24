import { VenueStatus } from '@/constants';
import { User, Ward } from '@/types';

export type Venue = {
  id: number;
  owner: User;
  name: string;
  address: string;
  ward: Ward;
  managers: User[];
  lat: string;
  lng: string;
  description: string;
  status: VenueStatus;
  created_at: string;
  updated_at: string;
};
