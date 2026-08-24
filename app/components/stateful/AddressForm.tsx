import { useApiActionButton } from '@/app/hooks/useApiActionButton';
import { updateUser } from '@/app/api/user';
import { Address } from '@/app/types/address';

interface AddressFormProps {
  address: Address;
  setAddress: (address: Address) => void;
}

export default function AddressForm({ address, setAddress }: AddressFormProps) {
  const { disabled, onClick } = useApiActionButton(() =>
    updateUser({ address: address }),
  );
  return (
    <div className="flex flex-col rounded-md border border-black">
      <input
        placeholder="Address 1"
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.street}
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
      />
      <input
        placeholder="Suite, building, ..."
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.apt_unit}
        onChange={(e) => setAddress({ ...address, apt_unit: e.target.value })}
      />
      <input
        placeholder="City"
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
      />
      <input
        placeholder="State"
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.state}
        onChange={(e) => setAddress({ ...address, state: e.target.value })}
      />
      <input
        placeholder="Postcode"
        type="text"
        autoComplete="postal-code"
        inputMode="numeric"
        pattern="[0-9]*"
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.postcode}
        onChange={(e) => {
          setAddress({ ...address, postcode: Number(e.target.value) });
        }}
      />
      <input
        placeholder="Country"
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
      />
      <button
        disabled={disabled}
        onClick={() => onClick()}
        className={'text-black'}
      >
        Save
      </button>
      <hr className={'border border-black'} />
      <div>
        {address &&
          Object.entries(address).map(([key, value]) => (
            <p key={key} className="text-black">{`${key}: ${value}`}</p>
          ))}
      </div>
    </div>
  );
}
