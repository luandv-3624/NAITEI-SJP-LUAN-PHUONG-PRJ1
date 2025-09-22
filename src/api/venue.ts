import {
  CreateVenueDto,
  MyVenuesQuery,
  SimpleVenue,
  UpdateVenueDto,
} from '@/features/venue';
import { axios } from './axios';
import { Venue, Space, Paginated, Response } from '@/types';

const VENUE_ENDPOINT = '/venues';

export async function getVenueDetail(venueId: string): Promise<Venue> {
  const { data } = await axios.get(`${VENUE_ENDPOINT}/${venueId}`);

  return data.data;
}

export async function getSpaceByVenue(venueId: string): Promise<Space[]> {
  const { data } = await axios.get(`${VENUE_ENDPOINT}/${venueId}/spaces`);

  return data.data;
}

export async function getMyVenues(
  query?: MyVenuesQuery,
): Promise<Paginated<SimpleVenue>> {
  const { data } = await axios.get(`${VENUE_ENDPOINT}/mine`, {
    params: query,
  });

  return data.data;
}

export async function createVenue(
  createVenueDto: CreateVenueDto,
): Promise<Response<Venue>> {
  const { data } = await axios.post(`${VENUE_ENDPOINT}`, createVenueDto);

  return data;
}

export async function updateVenue({
  id,
  updateVenueDto,
}: {
  updateVenueDto: UpdateVenueDto;
  id: string;
}): Promise<Response<Venue>> {
  const { data } = await axios.put(`${VENUE_ENDPOINT}/${id}`, updateVenueDto);

  return data;
}
