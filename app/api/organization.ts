import { Organization } from '@/app/types/organization';
import { ApiResponse, baseFetch, retryWithRefresh } from '@/app/api/base-fetch';

const searchOrganizations = (
  search: string,
  signal?: AbortSignal,
): Promise<ApiResponse<Organization[]>> => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return retryWithRefresh<Organization[]>(() =>
    baseFetch(`organizations${query}`, 'GET', { signal }),
  );
};

export { searchOrganizations };
