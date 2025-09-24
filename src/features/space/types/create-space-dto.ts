export type CreateSpaceDto = {
  name: string;
  space_type_id: number;
  capacity: number;
  price_type_id: number;
  price: string;
  description?: string;
  status: 'available' | 'unavailable';
};
