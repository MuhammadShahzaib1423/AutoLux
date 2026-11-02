import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cars } from '../data/cars'
import { applyFilters, DEFAULT_FILTERS } from '../lib/filterCars'
import CarCard from '../components/CarCard'
import FilterBar from '../components/FilterBar'

export default function Rent() {
  const [params] = useSearchParams()
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, query: params.get('q') || '' })

  const results = applyFilters(cars, filters, 'rentPerDay')

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Cars for rent</h1>
      <p className="mt-2 text-ink-muted">
        Premium cars by the day, with an optional driver. Use the calculator on each car to see your total
        before you enquire.
      </p>

      <div className="mt-7">
        <FilterBar
          filters={filters}
          onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
          onReset={() => setFilters({ ...DEFAULT_FILTERS })}
          mode="rent"
        />
      </div>

      <p className="mt-7 text-sm text-ink-muted" role="status">
        {results.length} {results.length === 1 ? 'car' : 'cars'} available for rent
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((car) => (
            <CarCard key={car.slug} car={car} mode="rent" />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-sand bg-white p-10 text-center shadow-soft">
          <h2 className="font-display text-2xl font-semibold">No rental cars match your search</h2>
          <p className="mt-2 text-ink-muted">Try widening your filters or searching for a different make or city.</p>
          <button
            type="button"
            onClick={() => setFilters({ ...DEFAULT_FILTERS })}
            className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-gold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
