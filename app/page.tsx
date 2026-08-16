'use client';

import LoginPage from '@/app/Login/LoginPage';
import { useSLMStore } from '@/app/providers/slm-store-provider';
import { useShallow } from 'zustand/react/shallow';
import { logoutUser, refreshToken } from '@/app/api/auth';

export default function Home() {
  const user = useSLMStore(useShallow((s) => s.user));
  const setUser = useSLMStore((s) => s.setUser);

  const logout = async () => {
    await logoutUser();
    setUser(undefined);
  };

  const refresh = async () => {
    await refreshToken();
  };

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
            <button
              onClick={refresh}
              className="text-black border border-black rounded-md py-1 px-3"
            >
              Refresh token
            </button>
          </>
        )}
      </main>
    </div>
  );
}
