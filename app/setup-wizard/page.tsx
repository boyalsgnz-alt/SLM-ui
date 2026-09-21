'use client';

import { useState } from 'react';
import WizardStepOne from '@/app/setup-wizard/step-1';
import { useSLMStore } from '@/app/providers/slm-store-provider';
import { useShallow } from 'zustand/react/shallow';
import WizardStepZero from '@/app/setup-wizard/step-0';
import WizardStepTwo from '@/app/setup-wizard/step-2';
import { WizardDirection } from '@/app/setup-wizard/types';
import './setup-wizard.css';

const compToRender = [
  {
    index: 0,
    component: WizardStepZero,
  },
  {
    index: 1,
    component: WizardStepOne,
  },
  {
    index: 2,
    component: WizardStepTwo,
  },
];

// This is the controlling parent component
const SetupWizard = () => {
  const user = useSLMStore(useShallow((s) => s.user));
  const setUser = useSLMStore((s) => s.setUser);
  const currentStep = user?.setupStep;

  const [prevStep, setPrevStep] = useState(currentStep);
  const [direction, setDirection] = useState<WizardDirection>('forward');

  if (currentStep !== prevStep) {
    setDirection(
      currentStep !== undefined &&
        prevStep !== undefined &&
        currentStep < prevStep
        ? 'backward'
        : 'forward',
    );
    setPrevStep(currentStep);
  }

  const toRender = compToRender.find((it) => it.index === currentStep);

  if (!toRender) {
    return <div>ERROR</div>;
  } else if (user) {
    const Component = toRender.component;
    return <Component user={user} setUser={setUser} direction={direction} />;
  }
};

export default SetupWizard;
