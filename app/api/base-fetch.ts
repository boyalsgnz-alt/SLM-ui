export const baseFetch = async <T>(
  path: string,
  method: string,
  options?: Partial<RequestInit>,
  body?: T,
): Promise<never> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ? options.headers : {}),
    },
    ...options,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (res.status > 299) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as never;
};
