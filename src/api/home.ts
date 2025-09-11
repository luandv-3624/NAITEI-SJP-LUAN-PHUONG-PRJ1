// import { axios } from './axios';
import type { Home } from '@/features/home';

// const ENDPOINT = '/home';

export async function getHome(): Promise<Home> {
  //   const { data } = await axios.get(`${ENDPOINT}`);

  const data = { message: 'This is Home' };

  await new Promise((r) => {
    setTimeout(r, 3000);
  });

  return data;
}
