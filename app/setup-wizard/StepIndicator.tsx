interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className={'mb-4 flex items-center gap-1.5'}>
      {Array.from({ length: totalSteps }, (_, step) => (
        <span
          key={step}
          className={`h-1.5 rounded-full ${
            step === currentStep
              ? 'wizard-indicator-active'
              : 'w-1.5 bg-foreground/20'
          }`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
