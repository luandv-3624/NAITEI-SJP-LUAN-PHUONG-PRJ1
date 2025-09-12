import Axios from 'axios';
import { tokenService } from './token-service';
import { store } from '@/atoms';
import { isLoginAtom } from '@/features/auth';

export const axios = Axios.create({
  baseURL: '/api',
});

export const REFRESH_ENDPOINT = '/auth/refresh-token';

axios.interceptors.request.use(
  (config) => {
    const accessToken = tokenService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');

    if (
      refreshToken &&
      error.response?.status === 401 &&
      originalRequest.url !== REFRESH_ENDPOINT &&
      originalRequest.url !== '/auth/login' &&
      originalRequest.url !== '/auth/signup' &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(REFRESH_ENDPOINT, {
          refresh_token: refreshToken,
        });
        const { access_token: newAccessToken } = data.data;
        tokenService.setAccessToken(newAccessToken);

        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        localStorage.removeItem('refreshToken');
        tokenService.clearTokens();
        store.set(isLoginAtom, false);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
