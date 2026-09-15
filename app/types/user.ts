import { Address } from '@/app/types/address';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: string;
  address: Address;
  setupCompleted: boolean;
  setupStep: number;
}

export interface LoginDto {
  email: string;
  password: string;
}
