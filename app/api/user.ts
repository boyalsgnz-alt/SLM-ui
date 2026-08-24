import { User } from '@/app/types/user';
import { baseFetch, retryWithRefresh } from '@/app/api/base-fetch';

const updateUser = async (body: Partial<User>) => {
  return await retryWithRefresh(() => baseFetch('users/me', 'PATCH', {}, body));
};

export { updateUser };
