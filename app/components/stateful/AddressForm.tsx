export default function AddressForm({ address, setAddress }) {
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
        placeholder="Zipcode"
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.zipcode}
        onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
      />
      <input
        placeholder="City"
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
      />
      <input
        placeholder="Country"
        className="rounded-md border border-black py-1 px-2 text-black"
        value={address?.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
      />
      <div>
        {address &&
          Object.entries(address).map(([key, value]) => (
            <p key={key} className="text-black">{`${key}: ${value}`}</p>
          ))}
      </div>
    </div>
  );
}
