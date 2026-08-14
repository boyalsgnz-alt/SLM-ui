'use client';

import LoginPage from '@/app/Login/LoginPage';
import { useSLMStore } from '@/app/providers/slm-store-provider';
import { useShallow } from 'zustand/react/shallow';

export default function Home() {
  const user = useSLMStore(useShallow((s) => s.user));
  const setUser = useSLMStore((s) => s.setUser);

  const logout = async () => {
    const res = await fetch('http://localhost:3000/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUser(undefined);
  };

  console.log(user);
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-alice-blue">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {user === undefined ? (
          <LoginPage />
        ) : (
          <button
            onClick={logout}
            className="text-black border border-black rounded-md py-1 px-3"
          >
            Log out
          </button>
        )}
      </main>
    </div>
  );
}
