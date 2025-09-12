import { axios } from './axios';
import { Response } from '@/types';

const ENDPOINT = 'payment';

export const createPayment = async (payload: {
  booking_id: number;
  amount: number;
}): Promise<Response<{ qrCode: string; requestId: string }>> => {
  const { data } = await axios.post(`${ENDPOINT}/momo`, {
    ...payload,
  });

  return data;
};
