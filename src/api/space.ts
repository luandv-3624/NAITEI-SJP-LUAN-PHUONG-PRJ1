import { Paginated, Response } from '@/types';
import { axios } from './axios';
import {
  CreateSpaceDto,
  PriceType,
  Space,
  SpaceByVenueQuery,
  SpaceQuery,
  SpaceType,
  UpdateSpaceDto,
} from '@/features/space';

const ENDPOINT = '/spaces';
const VENUE_ENDPOINT = '/venues';

export async function getSpaceDetail(spaceId: string): Promise<Space> {
  const { data } = await axios.get(`${ENDPOINT}/${spaceId}`);

  return data.data;
}

export async function getSpaces(query?: SpaceQuery): Promise<Paginated<Space>> {
  const { data } = await axios.get(`${ENDPOINT}`, { params: query });

  return data.data;
}

export async function getSpaceTypes(): Promise<SpaceType[]> {
  const { data } = await axios.get('/space-types');

  return data.data;
}

export async function getPriceTypes(): Promise<PriceType[]> {
  const { data } = await axios.get('/price-types');

  return data.data;
}

export async function getSpacesByVenue({
  venueId,
  query,
}: {
  venueId: string;
  query?: SpaceByVenueQuery;
}): Promise<Paginated<Space>> {
  const { data } = await axios.get(`${VENUE_ENDPOINT}/${venueId}/spaces`, {
    params: query,
  });

  return data.data;
}

export async function createSpace({
  createSpaceDto,
  venueId,
}: {
  venueId: string;
  createSpaceDto: CreateSpaceDto;
}): Promise<Response<Space>> {
  const { data } = await axios.post(
    `${VENUE_ENDPOINT}/${venueId}/spaces`,
    createSpaceDto,
  );

  return data;
}

export async function updateSpace({
  updateSpaceDto,
  spaceId,
}: {
  spaceId: string;
  updateSpaceDto: UpdateSpaceDto;
}): Promise<Response<Space>> {
  const { data } = await axios.put(`${ENDPOINT}/${spaceId}`, updateSpaceDto);

  return data;
}
