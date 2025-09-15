import type { SignInDto, SignUpDto } from '@/features/auth';
import { axios } from './axios';
import { User } from '@/types';

const ENDPOINT = '/auth';
const PROFILE_ENDPOINT = '/profile';

export async function signIn(signInDto: SignInDto): Promise<{
  access_token: string;
  refresh_token: string;
}> {
  const { data } = await axios.post(`${ENDPOINT}/login`, signInDto);

  return data.data;
}

export async function signUp(signUpDto: SignUpDto): Promise<User> {
  const { data } = await axios.post(`${ENDPOINT}/signup`, signUpDto);

  return data.data.user;
}

export async function getProfile(): Promise<User> {
  const { data } = await axios.get(PROFILE_ENDPOINT);
  return data.data;
}
