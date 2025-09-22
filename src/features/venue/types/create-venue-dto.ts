export type CreateVenueDto = {
  name: string;
  address: string;
  ward_id: number;
  lat: string;
  lng: string;
  description?: string;
};
