import { SpaceType, PriceType, Amenity, Venue } from '@/types';
import { SpaceStatus } from '@/constants';

export type Space = {
  id: number;
  venue: Venue;
  name: string;
  space_type_id: number;
  capacity: number;
  price_type_id: number;
  price: string;
  description: string;
  status: SpaceStatus;
  images: string[];
  space_type: SpaceType;
  price_type: PriceType;
  amenities: Amenity[];
  type: {
    id: number;
    name: string;
  };
};
