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

export async function verifyEmail({ token }: { token: string }): Promise<void> {
  await axios.post(`${ENDPOINT}/verify`, { token });
}

export async function getProfile(): Promise<User> {
  const { data } = await axios.get(PROFILE_ENDPOINT);
  return data.data;
}

export async function forgotPassword({
  email,
}: {
  email: string;
}): Promise<void> {
  await axios.post(`${ENDPOINT}/password/forgot-password`, { email });
}

export async function resetPassword({
  email,
  token,
  password,
  confirmPassword,
}: {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<void> {
  await axios.post(`${ENDPOINT}/password/reset`, {
    email,
    token,
    password,
    password_confirmation: confirmPassword,
  });
}

export async function loginWithGoogle(searchParams: URLSearchParams): Promise<{
  access_token: string;
  refresh_token: string;
}> {
  const { data } = await axios.get(`${ENDPOINT}/google/callback`, {
    params: searchParams,
  });

  return data.data;
}
