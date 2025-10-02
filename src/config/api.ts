export const API_BASE_URL =
  import.meta.env.VITE_ENV === 'local'
    ? '/api'
    : `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/api`;
