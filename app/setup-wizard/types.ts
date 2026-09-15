import { User } from '@/app/types/user';

export type WizardDirection = 'forward' | 'backward';

export interface WizardStepProps {
  user: Partial<User>;
  setUser: (user: Partial<User>) => void;
  direction: WizardDirection;
}
