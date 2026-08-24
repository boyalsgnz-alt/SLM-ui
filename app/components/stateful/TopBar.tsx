'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSLMStore } from '@/app/providers/slm-store-provider';
import { useShallow } from 'zustand/react/shallow';
import { logoutUser, refreshToken } from '@/app/api/auth';
import { useEffect } from 'react';

const TopBar = () => {
  const router = useRouter();
  const user = useSLMStore(useShallow((s) => s.user));
  const setUser = useSLMStore((s) => s.setUser);

  const logout = async () => {
    await logoutUser();
    setUser(undefined);
    router.replace('/login');
  };

  useEffect(() => {
    async function checkRefresh() {
      const { data } = await refreshToken();
      setUser(data);
    }
    void checkRefresh();
  }, []);

  return (
    <div
      className={
        'flex flex-row justify-between items-center p-4 border-b border-b-gray-300'
      }
    >
      <Image
        src={'vercel.svg'}
        alt={'logo'}
        width={32}
        height={32}
        onClick={() => {
          router.push('/');
        }}
      />
      <div className={'flex flex-row justify-items-end gap-2 items-center'}>
        {user && <p className={'flex'}>{user.name}</p>}
        <button
          className={
            'rounded-xl px-3 py-1 font-bold text-amber-500 border-amber-500 border-2 transition duration-350 ease-in-out hover:text-amber-100 hover:bg-amber-500 focus:outline-none focus:shadow-outline'
          }
          onClick={() => {
            if (user) {
              logout();
              router.push('/');
            } else {
              router.push('/login');
            }
          }}
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
