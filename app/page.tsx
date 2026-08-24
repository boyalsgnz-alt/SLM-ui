'use client';

import LoginPage from '@/app/login/LoginPage';
import { useSLMStore } from '@/app/providers/slm-store-provider';
import { useShallow } from 'zustand/react/shallow';
import { logoutUser, refreshToken } from '@/app/api/auth';
import { useEffect, useState } from 'react';
import AddressForm from '@/app/components/stateful/AddressForm';

export default function Home() {
  const [appState, setAppState] = useState('loading');
  const user = useSLMStore(useShallow((s) => s.user));
  const address = useSLMStore(useShallow((s) => s.user?.address));
  const setAddress = useSLMStore((s) => s.setAddress);
  const setUser = useSLMStore((s) => s.setUser);

  const logout = async () => {
    await logoutUser();
    setUser(undefined);
  };

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
