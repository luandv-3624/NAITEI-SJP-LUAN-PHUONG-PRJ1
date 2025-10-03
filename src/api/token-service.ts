import { AxiosError } from '@/types';
import { axios, REFRESH_ENDPOINT } from './axios';

class TokenService {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  clearTokens() {
    this.accessToken = null;
  }

  async initiateSilentRefresh({ onNoToken }: { onNoToken?: () => void }) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      if (onNoToken) onNoToken();
      return false;
    }

    try {
      const { data } = await axios.post(REFRESH_ENDPOINT, {
        refresh_token: refreshToken,
      });

      const { access_token } = data.data;

      this.setAccessToken(access_token);
      return true;
    } catch (error) {
      if ((error as AxiosError).message === 'Network Error') {
        console.error(
          'No internet connection. Silent refresh cannot be completed at the moment.',
        );
      } else {
        console.error('Silent refresh failed:', error);
        localStorage.removeItem('refreshToken');
        this.clearTokens();
      }
    }

    return false;
  }
}

export const tokenService = new TokenService();
