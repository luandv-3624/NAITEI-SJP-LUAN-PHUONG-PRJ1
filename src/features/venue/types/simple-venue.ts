import { VenueStatus } from './venue-status';

export type SimpleVenue = {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  ward_id: number;
  lat: string;
  lng: string;
  description: string;
  status: VenueStatus;
};
