import { createStore } from 'zustand/vanilla';
import { User } from '@/app/types/user';
import { Address } from '@/app/types/address';

export interface SLMStoreState {
  user: User | undefined;
  address?: Address | undefined;
}

interface SLMStoreActions {
  setUser(user: User | undefined): void;
  setAddress(address: Address | undefined): void;
}

export type SLMStoreType = SLMStoreState & SLMStoreActions;

export const SLMStore = (initState?: Partial<SLMStoreState>) => {
  return createStore<SLMStoreType>((set, get) => ({
    user: undefined,
    address: undefined,
    setUser: (userEnt: User) =>
      set(() => ({
        user: userEnt,
      })),
    setAddress: (addressEnt: Address) =>
      set(() => ({
        address: addressEnt,
      })),
    ...initState,
  }));
};
