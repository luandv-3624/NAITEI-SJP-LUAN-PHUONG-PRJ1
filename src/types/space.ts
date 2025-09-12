import { SpaceType, PriceType, Amenity, Venue } from '@/types';

export type Space = {
  id: number;
  venue: Venue;
  name: string;
  space_type_id: number;
  capacity: number;
  price_type_id: number;
  price: string;
  description: string;
  status: string;
  images: string[];
  space_type: SpaceType;
  price_type: PriceType;
  amenities: Amenity[];
};
