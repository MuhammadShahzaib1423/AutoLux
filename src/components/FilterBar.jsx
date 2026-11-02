import { BRANDS, FUELS, TYPES } from '../data/cars'
import { formatPKR } from '../lib/format'

const selectClass =
  'w-full rounded-full border border-sand bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-gold'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</span>
      {children}
    </label>
  )
}

export default function FilterBar({ filters, onChange, onReset, mode }) {
  const maxPriceOptions =
    mode === 'rent'
      ? [
          { value: 'Any', label: 'Any daily rate' },
          { value: '10000', label: 'Up to PKR 10,000 / day' },
          { value: '15000', label: 'Up to PKR 15,000 / day' },
          { value: '25000', label: 'Up to PKR 25,000 / day' },
        ]
      : [
          { value: 'Any', label: 'Any price' },
          { value: '5000000', label: `Up to PKR ${formatPKR(5000000)}` },
          { value: '10000000', label: 'Up to PKR 1 crore' },
          { value: '15000000', label: 'Up to PKR 1.5 crore' },
          { value: '20000000', label: 'Up to PKR 2 crore' },
        ]

  const sortOptions =
    mode === 'rent'
      ? [
          { value: 'featured', label: 'Featured' },
          { value: 'price-asc', label: 'Daily rate: low to high' },
          { value: 'price-desc', label: 'Daily rate: high to low' },
          { value: 'newest', label: 'Newest first' },
        ]
      : [
          { value: 'featured', label: 'Featured' },
          { value: 'price-asc', label: 'Price: low to high' },
          { value: 'price-desc', label: 'Price: high to low' },
          { value: 'newest', label: 'Newest first' },
        ]

  return (
    <div className="rounded-2xl border border-sand bg-white p-4 shadow-soft sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <Field label="Search">
          <input
            type="text"
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Make, model or city"
            className={selectClass}
          />
        </Field>
        <Field label="Body type">
          <select value={filters.type} onChange={(e) => onChange({ type: e.target.value })} className={selectClass}>
            <option value="All">All types</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Brand">
          <select value={filters.brand} onChange={(e) => onChange({ brand: e.target.value })} className={selectClass}>
            <option value="All">All brands</option>
            {BRANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Fuel">
          <select value={filters.fuel} onChange={(e) => onChange({ fuel: e.target.value })} className={selectClass}>
            <option value="All">All fuels</option>
            {FUELS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Max price">
          <select value={filters.maxPrice} onChange={(e) => onChange({ maxPrice: e.target.value })} className={selectClass}>
            {maxPriceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sort by">
          <select value={filters.sort} onChange={(e) => onChange({ sort: e.target.value })} className={selectClass}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-gold underline-offset-2 transition hover:underline"
        >
          Clear all filters
        </button>
      </div>
    </div>
  )
}
