export type Response<T> = {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  data: T;
};
