import { Address } from '@/app/types/address';

export interface Organization {
  _id: string;
  name: string;
  address?: Address;
}
