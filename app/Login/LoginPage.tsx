'use client';

import GlassEffectContainer from '@/app/components/GlassEffectContainer/GlassEffectContainer';
import { useState } from 'react';
import { useSLMStore } from '@/app/providers/slm-store-provider';
import { loginUser } from '@/app/api/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useSLMStore((s) => s.setUser);

  const login = async () => {
    const { data } = await loginUser({ email, password });
    if (!data) {
      setError('Bad credentials');
    }
    setUser(data);
  };
  return (
    <GlassEffectContainer
      classes={'min-w-1/3 max-w-2/3 flex-wrap gap-4 items-center p-4'}
    >
      <div
        className={
          'flex w-full flex-wrap border-b border-b-black pb-2 justify-center'
        }
      >
        Login
      </div>
      <input
        name={'email'}
        className={
          'backdrop-blur-sm w-3/4 border bg-blue-50 border-blue-100 rounded-md'
        }
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className={
          'backdrop-blur-sm w-3/4 border bg-blue-50 border-blue-100 rounded-md'
        }
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {error !== '' && (
        <div className={'text-red-600'}>
          <p>{error}</p>
        </div>
      )}
      <button
        onClick={login}
        className="border border-black rounded-md py-1 px-4"
      >
        Login
      </button>
    </GlassEffectContainer>
  );
}
