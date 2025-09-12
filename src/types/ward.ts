import { Province } from '@/types';

export type Ward = {
  id: number;
  code: string;
  province_id: number;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  province: Province;
};
