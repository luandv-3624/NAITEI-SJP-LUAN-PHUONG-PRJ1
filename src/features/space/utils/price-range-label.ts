import { PriceRange } from '../types/price-range';

export const priceRangeLabel: {
  [key in PriceRange]: {
    label: string;
    min?: number;
    max?: number;
  };
} = {
  [PriceRange.TO_5]: {
    label: 'to_5',
    max: 5000000,
  },
  [PriceRange.FROM_5_TO_10]: {
    label: 'from_5_to_10',
    min: 5000000,
    max: 10000000,
  },
  [PriceRange.FROM_10_TO_20]: {
    label: 'from_10_to_20',
    min: 10000000,
    max: 20000000,
  },
  [PriceRange.FROM_20]: {
    label: 'from_20',
    min: 20000000,
  },
};
