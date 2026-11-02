import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CarArt from './CarArt'
import { useFavorites } from '../lib/favorites'
import { formatNumber, formatPKRFull } from '../lib/format'

function HeartIcon({ filled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? '#B45309' : 'none'} stroke={filled ? '#B45309' : '#44403C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

export default function CarCard({ car, mode = 'both' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [days, setDays] = useState(3)
  const fav = isFavorite(car.slug)

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group overflow-hidden rounded-2xl border border-sand bg-white shadow-soft hover:shadow-lift"
    >
      <div className="relative">
        <Link to={`/car/${car.slug}`}>
          <CarArt car={car} className="aspect-[16/8]" />
        </Link>
        {car.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold tracking-wide text-ink">
            {car.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleFavorite(car.slug)}
          aria-label={fav ? `Remove ${car.name} from favourites` : `Save ${car.name} to favourites`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 shadow-soft transition hover:scale-105"
        >
          <HeartIcon filled={fav} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold leading-snug">
              <Link to={`/car/${car.slug}`} className="transition hover:text-gold">
                {car.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              {car.year} &middot; {car.location}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-ink-soft">
          <span className="rounded-full bg-parchment px-2.5 py-1">{car.type}</span>
          <span className="rounded-full bg-parchment px-2.5 py-1">{car.fuel}</span>
          <span className="rounded-full bg-parchment px-2.5 py-1">{car.transmission}</span>
          <span className="rounded-full bg-parchment px-2.5 py-1">{formatNumber(car.mileage)} km</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-sand pt-4">
          <div>
            {mode !== 'rent' && (
              <p className="text-lg font-semibold text-ink">{formatPKRFull(car.salePrice)}</p>
            )}
            {mode !== 'buy' && (
              <p className={`text-sm ${mode === 'rent' ? 'text-lg font-semibold text-ink' : 'text-ink-muted'}`}>
                {formatPKRFull(car.rentPerDay)}
                <span className="font-normal text-ink-muted"> / day</span>
              </p>
            )}
          </div>
          <Link
            to={`/car/${car.slug}`}
            className="shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition hover:bg-gold"
          >
            View details
          </Link>
        </div>

        {mode === 'rent' && (
          <div className="mt-4 rounded-xl bg-parchment p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rental calculator</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="One fewer day"
                  onClick={() => setDays((d) => Math.max(1, d - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-sand bg-white text-base leading-none"
                >
                  −
                </button>
                <span className="w-16 text-center text-sm font-semibold">
                  {days} {days === 1 ? 'day' : 'days'}
                </span>
                <button
                  type="button"
                  aria-label="One more day"
                  onClick={() => setDays((d) => Math.min(30, d + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-sand bg-white text-base leading-none"
                >
                  +
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              Total: <span className="font-semibold text-ink">{formatPKRFull(car.rentPerDay * days)}</span>
              <span className="text-ink-muted"> for {days} {days === 1 ? 'day' : 'days'}</span>
            </p>
          </div>
        )}
      </div>
    </motion.article>
  )
}
