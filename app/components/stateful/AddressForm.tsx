import { useApiActionButton } from '@/app/hooks/useApiActionButton';
import { updateUser } from '@/app/api/user';
import { Address } from '@/app/types/address';
import {
  fieldClasses,
  fieldLabelClasses as labelClasses,
  primaryButtonClasses,
} from '@/app/styles/form';

interface AddressFormProps {
  address: Address;
  setAddress: (address: Address) => void;
}

export default function AddressForm({ address, setAddress }: AddressFormProps) {
  const { disabled, onClick } = useApiActionButton(() =>
    updateUser({ address: address }),
  );
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="address-street" className={labelClasses}>
          Street address
        </label>
        <input
          id="address-street"
          placeholder="123 Main St"
          className={fieldClasses}
          value={address?.street ?? ''}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address-unit" className={labelClasses}>
          Apt, suite, etc.
        </label>
        <input
          id="address-unit"
          placeholder="Optional"
          className={fieldClasses}
          value={address?.apt_unit ?? ''}
          onChange={(e) => setAddress({ ...address, apt_unit: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="address-city" className={labelClasses}>
            City
          </label>
          <input
            id="address-city"
            className={fieldClasses}
            value={address?.city ?? ''}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address-state" className={labelClasses}>
            State
          </label>
          <input
            id="address-state"
            className={fieldClasses}
            value={address?.state ?? ''}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="address-postcode" className={labelClasses}>
            Postcode
          </label>
          <input
            id="address-postcode"
            type="text"
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="[0-9]*"
            className={fieldClasses}
            value={address?.postcode ?? ''}
            onChange={(e) => {
              setAddress({ ...address, postcode: Number(e.target.value) });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address-country" className={labelClasses}>
            Country
          </label>
          <input
            id="address-country"
            className={fieldClasses}
            value={address?.country ?? ''}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />
        </div>
      </div>
      <button
        disabled={disabled}
        onClick={() => onClick()}
        className={`mt-2 ${primaryButtonClasses}`}
      >
        Save
      </button>
    </div>
  );
}
