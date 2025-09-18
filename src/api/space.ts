import { Paginated } from '@/types';
import { axios } from './axios';
import { PriceType, Space, SpaceQuery, SpaceType } from '@/features/space';

const ENDPOINT = '/spaces';

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
