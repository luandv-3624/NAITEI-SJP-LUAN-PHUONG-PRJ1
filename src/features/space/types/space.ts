import { Amenity, PriceType, SpaceType, Venue } from '@/types';
import { SpaceStatus } from './space-status';

export type Space = {
  id: number;
  name: string;
  venue_id: number;
  venue: Venue;
  space_type_id: number;
  space_type: SpaceType;
  capacity: number;
  price_type_id: number;
  price_type: PriceType;
  price: string;
  images: string[];
  status: SpaceStatus;
  description: string;
  created_at: string;
  updated_at: string;
  amenities: Amenity[];
  type: {
    id: number;
    name: string;
  };
};
