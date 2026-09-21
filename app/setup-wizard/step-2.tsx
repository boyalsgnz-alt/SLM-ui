import { useState } from 'react';
import GlassEffectContainer from '@/app/components/GlassEffectContainer/GlassEffectContainer';
import OrganizationSearch from '@/app/components/stateful/OrganizationSearch';
import StepIndicator from '@/app/setup-wizard/StepIndicator';
import { WizardStepProps } from '@/app/setup-wizard/types';
import { Organization } from '@/app/types/organization';
import { primaryButtonClasses } from '@/app/styles/form';
import { updateUser } from '@/app/api/user';

const WizardStepTwo = ({ user, setUser, direction }: WizardStepProps) => {
  const [selected, setSelected] = useState<Organization>();

  function goToPreviousStep() {
    const prevUser = { ...user, setupStep: 1 };
    setUser(prevUser);
    void updateUser(prevUser);
  }

  const slideClass =
    direction === 'backward' ? 'wizard-step-backward' : 'wizard-step-forward';

  return (
    <div
      className={
        'flex flex-col flex-1 w-full h-full items-center justify-center px-4'
      }
    >
      <GlassEffectContainer
        classes={`w-full max-w-md items-center gap-1 p-8 ${slideClass}`}
      >
        <div className={'relative flex w-full items-center justify-center'}>
          <button
            type="button"
            aria-label="Back to previous step"
            className={
              'absolute left-0 flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition duration-200 ease-in-out hover:bg-black/5 hover:text-foreground'
            }
            onClick={goToPreviousStep}
          >
            ←
          </button>
          <StepIndicator currentStep={2} totalSteps={3} />
        </div>
        <h1 className={'text-2xl font-bold'}>Find your organization</h1>
        <p className={'mb-6 text-sm text-foreground/60'}>
          Search for the organization you belong to.
        </p>
        <OrganizationSearch selected={selected} onSelect={setSelected} />
        <button
          disabled={!selected}
          className={`mt-4 ${primaryButtonClasses}`}
          onClick={() => {
            const nextUser = { ...user, setupCompleted: true };
            setUser(nextUser);
            void updateUser(nextUser);
          }}
        >
          Finish
        </button>
      </GlassEffectContainer>
    </div>
  );
};

export default WizardStepTwo;
