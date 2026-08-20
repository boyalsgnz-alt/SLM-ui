import type { LoginDto } from '@/app/types/user';
import { baseFetch } from '@/app/api/base-fetch';

const loginUser = (body: LoginDto) => {
  return baseFetch('auth/login', 'POST', {}, body);
};

const logoutUser = () => {
  return baseFetch('auth/logout', 'POST');
};

const refreshToken = () => {
  return baseFetch('auth/refresh', 'POST');
};

export { loginUser, logoutUser, refreshToken };
