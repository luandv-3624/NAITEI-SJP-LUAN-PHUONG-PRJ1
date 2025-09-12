import { AxiosError as AE } from 'axios';

export type AxiosError = AE<{
  isSuccess: false;
  statusCode: number;
  message: string;
  error: string[];
}>;
