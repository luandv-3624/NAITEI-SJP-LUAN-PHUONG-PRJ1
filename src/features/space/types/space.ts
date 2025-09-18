import { PriceType, SpaceType } from '@/types';

export type Space = {
  id: number;
  name: string;
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
  price: number;
};
