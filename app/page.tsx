'use client';

import { useSLMStore } from '@/app/providers/slm-store-provider';
import { refreshToken } from '@/app/api/auth';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/app/hooks/useApiActionButton';
import { fetchUser } from '@/app/api/user';

export default function Home() {
  const [appState, setAppState] = useState('loading');
  const setUser = useSLMStore((s) => s.setUser);
  const user = useSLMStore(useShallow((s) => s.user));
  const router = useRouter();
  const { loading, data: fetchedUser } = useFetch(() => fetchUser());

  console.log(loading, fetchedUser);

  useEffect(() => {
    async function checkRefresh() {
      const { data } = await refreshToken();
      if (data) {
        setAppState('authenticated');
      } else {
        setAppState('unauthenticated');
      }
      setUser(data);
    }
    checkRefresh();
  }, []);

  useEffect(() => {
    if (user && !user.setupCompleted) {
      router.replace('/setup-wizard');
    }
  }, [user]);

  if (appState === 'loading') {
    return (
      <div className="flex flex-col flex-1 items-center justify-center font-sans bg-alice-blue"></div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-alice-blue">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div>Main page</div>
      </main>
    </div>
  );
}
