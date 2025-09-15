import { axios } from './axios';
import { Venue, Space } from '@/types';

const VENUE_ENDPOINT = '/venues';

export async function getVenueDetail(venueId: string): Promise<Venue> {
  const { data } = await axios.get(`${VENUE_ENDPOINT}/${venueId}`);

  return data.data;
}

export async function getSpaceByVenue(venueId: string): Promise<Space[]> {
  const { data } = await axios.get(`${VENUE_ENDPOINT}/${venueId}/spaces`);

  return data.data;
}
