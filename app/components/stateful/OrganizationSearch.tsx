import { useEffect, useState } from 'react';
import { searchOrganizations } from '@/app/api/organization';
import { Organization } from '@/app/types/organization';
import { useDebouncedValue } from '@/app/hooks/useDebouncedValue';
import { fieldClasses, fieldLabelClasses } from '@/app/styles/form';

interface OrganizationSearchProps {
  selected?: Organization;
  onSelect: (organization: Organization) => void;
}

export default function OrganizationSearch({
  selected,
  onSelect,
}: OrganizationSearchProps) {
  const [search, setSearch] = useState('');
  const [outcome, setOutcome] = useState<{
    query: string;
    results: Organization[];
    failed: boolean;
  }>();
  const debouncedSearch = useDebouncedValue(search, 300);

  // Tagging the outcome with the query it came from keeps `loading` derived,
  // and makes a late response for an older query impossible to show.
  const loading = outcome?.query !== debouncedSearch;
  const results = outcome?.results ?? [];
  const failed = outcome?.failed ?? false;

  useEffect(() => {
    const controller = new AbortController();

    searchOrganizations(debouncedSearch, controller.signal)
      .then((res) =>
        setOutcome({
          query: debouncedSearch,
          results: res.data ?? [],
          failed: false,
        }),
      )
      .catch(() => {
        if (controller.signal.aborted) return;
        setOutcome({ query: debouncedSearch, results: [], failed: true });
      });

    return () => controller.abort();
  }, [debouncedSearch]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="organization-search" className={fieldLabelClasses}>
          Search organizations
        </label>
        <input
          id="organization-search"
          type="search"
          autoComplete="off"
          placeholder="Start typing a name…"
          className={fieldClasses}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
        {results.map((org) => {
          const isSelected = selected?._id === org._id;
          return (
            <li key={org._id}>
              <button
                type="button"
                onClick={() => onSelect(org)}
                aria-pressed={isSelected}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition duration-200 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-400/30'
                    : 'border-black/10 bg-white/60 hover:border-amber-300 hover:bg-white/80'
                }`}
              >
                <span className="font-medium">{org.name}</span>
                {org.address?.city && (
                  <span className="block text-xs text-foreground/50">
                    {org.address.city}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {loading && <p className="text-sm text-foreground/50">Searching…</p>}
      {!loading && failed && (
        <p className="text-sm text-red-600">Could not load organizations.</p>
      )}
      {!loading && !failed && results.length === 0 && (
        <p className="text-sm text-foreground/50">No organizations found.</p>
      )}
    </div>
  );
}
