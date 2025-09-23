import { PriceType, SpaceType } from '@/types';
import { SpaceStatus } from './space-status';

export type Space = {
  id: number;
  name: string;
  venue_id: number;
  venue: {
    id: number;
    name: string;
    address: string;
    ward: {
      id: number;
      name: string;
      province: {
        id: number;
        name: string;
      };
    };
  };
  space_type: SpaceType;
  capacity: number;
  price_type: PriceType;
  price: string;
  status: SpaceStatus;
  description: string;
  created_at: string;
  updated_at: string;
};
