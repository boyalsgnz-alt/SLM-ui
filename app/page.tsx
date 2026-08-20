'use client';

import LoginPage from '@/app/Login/LoginPage';
import { useSLMStore } from '@/app/providers/slm-store-provider';
import { useShallow } from 'zustand/react/shallow';
import { logoutUser, refreshToken } from '@/app/api/auth';
import { useEffect, useState } from 'react';
import { useApiActionButton } from '@/app/hooks/useApiActionButton';
import AddressForm from '@/app/components/stateful/AddressForm';

export default function Home() {
  const [appState, setAppState] = useState('loading');
  const user = useSLMStore(useShallow((s) => s.user));
  const address = useSLMStore(useShallow((s) => s.address));
  const setAddress = useSLMStore((s) => s.setAddress);
  const setUser = useSLMStore((s) => s.setUser);

  const logout = async () => {
    await logoutUser();
    setUser(undefined);
  };

  const refresh = async () => {
    await refreshToken();
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
        {user === undefined ? (
          <LoginPage />
        ) : (
          <>
            <button
              onClick={logout}
              className="text-black border border-black rounded-md py-1 px-3"
            >
              Log out
            </button>
            <AddressForm address={address} setAddress={setAddress} />
          </>
        )}
      </main>
    </div>
  );
}
