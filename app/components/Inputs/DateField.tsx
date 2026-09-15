import StyledField, { StyledInputClasses } from './StyledField';
import { fieldClasses } from '@/app/styles/form';

interface DateFieldProps {
  text: string;
  inputVal: Date | null;
  setInputVal: (keyToModify: string, val: Date | null) => void;
  additionalClasses?: StyledInputClasses;
  keyToModify: string;
}

function DateField({
  text,
  inputVal,
  setInputVal,
  additionalClasses,
  keyToModify,
}: DateFieldProps) {
  let domValue = '';

  if (inputVal) {
    const date = inputVal instanceof Date ? inputVal : new Date(inputVal);
    domValue = Number.isNaN(date.getTime())
      ? ''
      : date.toISOString().split('T')[0];
  }

  return (
    <StyledField text={text} additionalClasses={additionalClasses}>
      {(htmlLabel) => (
        <input
          id={htmlLabel}
          type="date"
          className={`${fieldClasses} ${additionalClasses?.input ?? ''}`}
          placeholder={text}
          value={domValue}
          onChange={(e) => {
            const raw = e.target.value;
            setInputVal(keyToModify, raw ? new Date(raw) : null);
          }}
        />
      )}
    </StyledField>
  );
}

export default DateField;
