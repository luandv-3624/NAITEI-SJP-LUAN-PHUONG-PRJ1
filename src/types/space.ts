import { SpaceType, PriceType, Amenity } from '@/types';

export type Space = {
  id: number;
  venue_id: number;
  name: string;
  space_type_id: number;
  capacity: number;
  price_type_id: number;
  price: string;
  description: string;
  status: string;
  type: SpaceType;
  price_type: PriceType;
  amenities: Amenity[]; // có thể định nghĩa chi tiết hơn nếu có data
};
