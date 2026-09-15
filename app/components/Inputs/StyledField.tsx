import { fieldLabelClasses } from '@/app/styles/form';

interface StyledInputClasses {
  div?: string;
  label?: string;
  input?: string;
}

interface FieldProps {
  text: string;
  additionalClasses?: StyledInputClasses;
  children: (htmlLabel: string) => React.ReactNode;
}

function StyledField({ text, additionalClasses, children }: FieldProps) {
  const htmlLabel = text.replace(' ', '-').toLowerCase();
  return (
    <div
      className={`flex w-full flex-col gap-1 ${additionalClasses?.div ?? ''}`}
    >
      <label
        htmlFor={htmlLabel}
        className={`${fieldLabelClasses} ${additionalClasses?.label ?? ''}`}
      >
        {text}
      </label>
      {children(htmlLabel)}
    </div>
  );
}

export default StyledField;
export type { StyledInputClasses };
