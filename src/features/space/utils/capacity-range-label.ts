import { CapacityRange } from '../types/capacity-range';

export const capacityRangeLabel: {
  [key in CapacityRange]: {
    label: string;
    min?: number;
    max?: number;
  };
} = {
  [CapacityRange.TO_2]: {
    label: 'to_2',
    max: 2,
  },
  [CapacityRange.FROM_2_TO_5]: {
    label: 'from_2_to_5',
    min: 2,
    max: 5,
  },
  [CapacityRange.FROM_5]: {
    label: 'from_5',
    min: 5,
  },
};
