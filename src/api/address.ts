import { axios } from './axios';

const ENDPOINT = '/provinces';

export async function getProvinces(): Promise<
  { id: number; name: string; name_en: string }[]
> {
  const { data } = await axios.get(`${ENDPOINT}`);

  return data.data;
}

export async function getWards(
  provinceId: number,
): Promise<{ id: number; name: string; name_en: string }[]> {
  const { data } = await axios.get(`${ENDPOINT}/${provinceId}/wards`);

  return data.data;
}
