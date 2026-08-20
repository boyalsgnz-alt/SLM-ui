'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { SLMStore, SLMStoreState, SLMStoreType } from '@/app/store/store';
import { User } from '@/app/types/user';

/*  eslint-disable react-hooks/refs */

const SLMStoreContext = createContext<ReturnType<typeof SLMStore> | null>(null);

export function SLMStoreProvider({
  children,
  initData,
}: {
  children: React.ReactNode;
  initData: Partial<SLMStoreState>;
}) {
  const storeRef = useRef<ReturnType<typeof SLMStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = SLMStore({
      user: initData.user,
      address: initData.address,
    });
  }

  return (
    <SLMStoreContext.Provider value={storeRef.current}>
      {children}
    </SLMStoreContext.Provider>
  );
}

export function useSLMStore<T>(selector: (store: SLMStoreType) => T): T {
  const context = useContext(SLMStoreContext);
  if (!context)
    throw new Error('useLibraryStore must be used within LibraryStoreProvider');
  return useStore(context, selector);
}
