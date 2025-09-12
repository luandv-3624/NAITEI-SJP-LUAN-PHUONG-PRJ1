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

  async initiateSilentRefresh() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
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
      console.error('Silent refresh failed:', error);
      localStorage.removeItem('refreshToken');
      this.clearTokens();
    }

    return false;
  }
}

export const tokenService = new TokenService();
