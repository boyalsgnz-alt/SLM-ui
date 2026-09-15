import GlassEffectContainer from '@/app/components/GlassEffectContainer/GlassEffectContainer';
import AddressForm from '@/app/components/stateful/AddressForm';
import { Address } from '@/app/types/address';
import StepIndicator from '@/app/setup-wizard/StepIndicator';
import { WizardStepProps } from '@/app/setup-wizard/types';
import { updateUser } from '@/app/api/user';

const WizardStepOne = ({ user, setUser, direction }: WizardStepProps) => {
  function setAddress(address: Address) {
    setUser({ ...user, address });
  }

  function goToPreviousStep() {
    const prevUser = { ...user, setupStep: 0 };
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
          <StepIndicator currentStep={1} totalSteps={2} />
        </div>
        <h1 className={'text-2xl font-bold'}>What&apos;s your address?</h1>
        <p className={'mb-6 text-sm text-foreground/60'}>
          We&apos;ll use this to personalize your experience.
        </p>
        <AddressForm address={user.address ?? {}} setAddress={setAddress} />
      </GlassEffectContainer>
    </div>
  );
};

export default WizardStepOne;
