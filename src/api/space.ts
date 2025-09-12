import { axios } from './axios';
import { Space } from '@/types';

const SPACE_ENDPOINT = '/spaces';

export async function getSpaceDetail(spaceId: string): Promise<Space> {
  const { data } = await axios.get(`${SPACE_ENDPOINT}/${spaceId}`);

  return data.data;
}
