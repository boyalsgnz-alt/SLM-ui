import GlassEffectContainer from '@/app/components/GlassEffectContainer/GlassEffectContainer';
import TextField from '@/app/components/Inputs/TextField';
import DateField from '@/app/components/Inputs/DateField';
import SelectField from '@/app/components/Inputs/SelectField';
import StepIndicator from '@/app/setup-wizard/StepIndicator';
import { WizardStepProps } from '@/app/setup-wizard/types';
import { primaryButtonClasses } from '@/app/styles/form';
import { updateUser } from '@/app/api/user';

const WizardStepZero = ({ user, setUser, direction }: WizardStepProps) => {
  function modifyUser<T>(keyToModify: string, val: T) {
    setUser({ ...user, [keyToModify]: val });
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
        <StepIndicator currentStep={0} totalSteps={2} />
        <h1 className={'text-2xl font-bold'}>Tell us about yourself</h1>
        <p className={'mb-6 text-sm text-foreground/60'}>
          A few basics to get your profile set up.
        </p>
        <div className={'flex w-full flex-col gap-4'}>
          <TextField
            text={'First name'}
            inputVal={user.firstName || ''}
            setInputVal={modifyUser}
            keyToModify={'firstName'}
          />
          <TextField
            text={'Last name'}
            inputVal={user.lastName || ''}
            setInputVal={modifyUser}
            keyToModify={'lastName'}
          />
          <DateField
            text={'Birthdate'}
            inputVal={user.birthdate || null}
            setInputVal={modifyUser}
            keyToModify={'birthdate'}
          />
          <SelectField
            text={'Gender'}
            inputVal={user.gender || ''}
            setInputVal={modifyUser}
            keyToModify={'gender'}
            selectOptions={['male', 'female', 'other']}
          />
          <button
            className={`mt-2 ${primaryButtonClasses}`}
            onClick={() => {
              const nextUser = { ...user, setupStep: 1 };
              setUser(nextUser);
              void updateUser(nextUser);
            }}
          >
            Continue
          </button>
        </div>
      </GlassEffectContainer>
    </div>
  );
};

export default WizardStepZero;
