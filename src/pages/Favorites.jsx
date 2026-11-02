import { Link } from 'react-router-dom'
import { cars } from '../data/cars'
import CarCard from '../components/CarCard'
import { useFavorites } from '../lib/favorites'

export default function Favorites() {
  const { favorites } = useFavorites()
  const saved = cars.filter((c) => favorites.includes(c.slug))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Saved cars</h1>
      <p className="mt-2 text-ink-muted">Your favourites are saved on this device, even if you leave and come back.</p>

      {saved.length > 0 ? (
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-2xl border border-sand bg-white p-10 text-center shadow-soft">
          <h2 className="font-display text-2xl font-semibold">No saved cars yet</h2>
          <p className="mt-2 text-ink-muted">
            Tap the heart on any car to save it here for later.
          </p>
          <Link
            to="/buy"
            className="mt-5 inline-block rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-gold"
          >
            Browse cars for sale
          </Link>
        </div>
      )}
    </div>
  )
}
