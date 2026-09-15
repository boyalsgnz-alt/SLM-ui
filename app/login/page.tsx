'use client';

import GlassEffectContainer from '@/app/components/GlassEffectContainer/GlassEffectContainer';
import { useState } from 'react';
import { useSLMStore } from '@/app/providers/slm-store-provider';
import { loginUser } from '@/app/api/auth';
import { useRouter } from 'next/navigation';
import {
  fieldClasses,
  fieldLabelClasses,
  primaryButtonClasses,
} from '@/app/styles/form';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useSLMStore((s) => s.setUser);

  const login = async () => {
    const { data } = await loginUser({ email, password });
    if (!data) {
      setError('Bad credentials');
      return;
    }
    setUser(data);
    router.push('/');
  };

  return (
    <div
      className={
        'login-window flex h-full w-full items-center justify-center px-4'
      }
    >
      <GlassEffectContainer classes={'w-full max-w-md items-center gap-1 p-8'}>
        <h1 className={'text-2xl font-bold'}>Welcome back</h1>
        <p className={'mb-6 text-sm text-foreground/60'}>
          Sign in to continue to your account.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void login();
          }}
          className={'flex w-full flex-col gap-4'}
        >
          <div className={'flex flex-col gap-1'}>
            <label htmlFor="login-email" className={fieldLabelClasses}>
              Email
            </label>
            <input
              id="login-email"
              name={'email'}
              className={fieldClasses}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={'flex flex-col gap-1'}>
            <label htmlFor="login-password" className={fieldLabelClasses}>
              Password
            </label>
            <input
              id="login-password"
              name={'password'}
              className={fieldClasses}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {error !== '' && (
            <div
              className={'rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600'}
            >
              {error}
            </div>
          )}
          <button type="submit" className={`mt-2 ${primaryButtonClasses}`}>
            Login
          </button>
        </form>
      </GlassEffectContainer>
    </div>
  );
}
