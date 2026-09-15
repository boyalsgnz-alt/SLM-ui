import StyledField, { StyledInputClasses } from './StyledField';
import { fieldClasses } from '@/app/styles/form';

interface TextFieldProps {
  text: string;
  inputVal: string;
  setInputVal: (keyToModify: string, val: string) => void;
  additionalClasses?: StyledInputClasses;
  keyToModify: string;
}

function TextField({
  text,
  inputVal,
  setInputVal,
  additionalClasses,
  keyToModify,
}: TextFieldProps) {
  return (
    <StyledField text={text} additionalClasses={additionalClasses}>
      {(htmlLabel) => (
        <input
          id={htmlLabel}
          type="text"
          className={`${fieldClasses} ${additionalClasses?.input ?? ''}`}
          placeholder={text}
          value={inputVal ?? ''}
          onChange={(e) => setInputVal(keyToModify, e.target.value)}
        />
      )}
    </StyledField>
  );
}

export default TextField;
