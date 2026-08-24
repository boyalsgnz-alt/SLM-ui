import { Address } from '@/app/types/address';

export interface User {
  _id: string;
  name: string;
  age: number;
  address: Address;
  setupCompleted: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}
