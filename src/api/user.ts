import { SimpleUser, GetUsersQuery, UserStatus } from '@/features/user';
import { axios } from './axios';
import { Paginated, Response, User } from '@/types';

const ENDPOINT = '/users';

export async function getUsersSimpleList(): Promise<SimpleUser[]> {
  const { data } = await axios.get(`${ENDPOINT}/simple-list`);

  return data.data;
}

export async function getUsers(
  getUsersQuery?: GetUsersQuery,
): Promise<Paginated<User>> {
  const { data } = await axios.get(`${ENDPOINT}`, { params: getUsersQuery });

  return data.data;
}

export async function updateUser({
  userId,
  roleId,
  status,
}: {
  userId: number;
  status?: UserStatus;
  roleId?: number;
}): Promise<Response<User>> {
  const { data } = await axios.put(`${ENDPOINT}/${userId}`, {
    status,
    role_id: roleId,
  });

  return data;
}

export async function updateUserStatus({
  userId,
  status,
}: {
  userId: number;
  status: UserStatus;
}): Promise<Response<User>> {
  const { data } = await axios.put(`${ENDPOINT}/${userId}/status`, {
    status,
  });

  return data;
}
