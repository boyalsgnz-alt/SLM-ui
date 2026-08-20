import { refreshToken } from '@/app/api/auth';

interface ApiResponse<T> {
  description: string;
  status: number;
  data: T | undefined;
}

export const baseFetch = async <T>(
  path: string,
  method: string,
  options?: Partial<RequestInit>,
  body?: T,
): Promise<ApiResponse<never>> => {
  console.log(`BaseFetch called with "${path}"`);
  const httpRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ? options.headers : {}),
    },
    ...options,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (httpRes.status > 299) {
    return {
      status: httpRes.status,
      description: 'Unauthorized',
      data: undefined,
    };
  }

  const apiRes = await httpRes.json();

  return {
    status: httpRes.status,
    description: apiRes.description,
    data: apiRes.data as never,
  };
};

let refreshPromise: Promise<ApiResponse<never>> | null = null;

function refreshTokenOnce(): Promise<ApiResponse<never>> {
  if (!refreshPromise) {
    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function retryWithRefresh(
  callToRetry: () => Promise<ApiResponse<never>>,
  attempt = 0,
): Promise<ApiResponse<never>> {
  const result = await callToRetry();
  if (result.status === 401 && attempt < 1) {
    try {
      await refreshTokenOnce();
    } catch {
      return result;
    }
    return retryWithRefresh(callToRetry, attempt + 1);
  }
  return result;
}
