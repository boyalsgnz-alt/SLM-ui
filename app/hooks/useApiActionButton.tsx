import { useEffect, useState } from 'react';
import { ApiResponse } from '@/app/api/base-fetch';

export function useApiActionButton<T>(asyncActionFunc: () => Promise<T>) {
  const [disabled, setDisabled] = useState(false);

  const onClick = async () => {
    setDisabled(true);
    await asyncActionFunc();
    setDisabled(false);
  };

  return {
    disabled,
    onClick,
  };
}

export function useFetch<T>(asyncActionFunc: () => Promise<ApiResponse<T>>) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  useEffect(() => {
    async function execAsyncFunc() {
      const dat = await asyncActionFunc();
      setData(dat.data);
      setLoading(false);
    }
    execAsyncFunc();
  }, []);

  return { data, loading };
}
