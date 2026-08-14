import { createStore } from 'zustand/vanilla';
import { User } from '@/app/types/user';

interface SLMStoreState {
  user: User | undefined;
}

interface SLMStoreActions {
  setUser(user: User | undefined): void;
}

export type SLMStoreType = SLMStoreState & SLMStoreActions;

export const SLMStore = (initState?: Partial<SLMStoreState>) => {
  return createStore<SLMStoreType>((set, get) => ({
    user: undefined,
    setUser: (userEnt: User) =>
      set((state) => ({
        user: {
          ...state.user,
          ...userEnt,
        },
      })),
    ...initState,
  }));
};
