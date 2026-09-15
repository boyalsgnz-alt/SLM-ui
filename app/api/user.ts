import { User } from '@/app/types/user';
import { ApiResponse, baseFetch, retryWithRefresh } from '@/app/api/base-fetch';

const updateUser = async (body: Partial<User>) => {
  console.log('right before sending');
  console.log(body);
  return await retryWithRefresh(() => baseFetch('users/me', 'PATCH', {}, body));
};

const fetchUser = async (): Promise<ApiResponse<User>> => {
  return await retryWithRefresh(() => baseFetch('users/me', 'GET', {}));
};

export { updateUser, fetchUser };
