import { SimpleUser } from '@/features/user';
import { axios } from './axios';

const ENDPOINT = '/users';

export async function getUsersSimpleList(): Promise<SimpleUser[]> {
  const { data } = await axios.get(`${ENDPOINT}/simple-list`);

  return data.data;
}
