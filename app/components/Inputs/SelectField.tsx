import StyledField, { StyledInputClasses } from './StyledField';
import { fieldClasses } from '@/app/styles/form';

interface SelectFieldProps {
  text: string;
  inputVal: string;
  setInputVal: (keyToModify: string, val: string) => void;
  additionalClasses?: StyledInputClasses;
  keyToModify: string;
  selectOptions: string[];
}

function SelectField({
  text,
  inputVal,
  setInputVal,
  additionalClasses,
  keyToModify,
  selectOptions,
}: SelectFieldProps) {
  return (
    <StyledField text={text} additionalClasses={additionalClasses}>
      {(htmlLabel) => (
        <select
          id={htmlLabel}
          className={`${fieldClasses} ${additionalClasses?.input ?? ''}`}
          value={inputVal}
          onChange={(e) => {
            setInputVal(keyToModify, e.target.value);
          }}
        >
          {selectOptions.map((it) => (
            <option value={it} key={it}>
              {it}
            </option>
          ))}
        </select>
      )}
    </StyledField>
  );
}

export default SelectField;
