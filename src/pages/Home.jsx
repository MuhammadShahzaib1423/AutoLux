import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { cars } from '../data/cars'
import CarCard from '../components/CarCard'
import CarArt from '../components/CarArt'

const FEATURED_SLUGS = ['toyota-fortuner-sigma-4', 'bmw-3-series-320i', 'kia-sportage-awd', 'tesla-model-3']

const STEPS = [
  {
    title: 'Buy',
    heading: 'Choose your car',
    text: 'Browse verified listings, compare prices and inspect the full history of every car before you decide.',
    link: '/buy',
    cta: 'Browse cars for sale',
  },
  {
    title: 'Sell',
    heading: 'List in minutes',
    text: 'Tell us about your car and get a fair valuation. We handle the listing, the buyers and the paperwork.',
    link: '/sell',
    cta: 'Sell your car',
  },
  {
    title: 'Rent',
    heading: 'Drive for a day',
    text: 'Pick a car, choose your days and drive. Daily rates, optional driver, and delivery across major cities.',
    link: '/rent',
    cta: 'Browse rental cars',
  },
]

const WHY = [
  {
    title: 'Inspected cars',
    text: 'Every listing is checked in person — condition, documents and ownership history verified.',
  },
  {
    title: 'Clear pricing',
    text: 'The price you see is the price you pay. No hidden charges on purchase or rental.',
  },
  {
    title: 'Easy paperwork',
    text: 'Transfer, registration and rental agreements handled for you, step by step.',
  },
  {
    title: 'Support on every step',
    text: 'A real team on phone and email, from your first enquiry to handover day.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'I found my Corolla on AutoLux and the whole process felt calm and transparent. The inspection report gave me real confidence.',
    name: 'Ahmed Raza',
    place: 'Islamabad',
    detail: 'Bought a Toyota Corolla Grande',
  },
  {
    quote:
      'Renting the Sportage for a family trip to Murree was effortless. Clean car, fair daily rate, and the driver option was a blessing.',
    name: 'Fatima Khan',
    place: 'Lahore',
    detail: 'Rented a KIA Sportage AWD',
  },
  {
    quote:
      'I listed my old Swift on a Monday and had three serious buyers by Friday. The team handled the transfer paperwork for me.',
    name: 'Bilal Ahmed',
    place: 'Rawalpindi',
    detail: 'Sold a Suzuki Swift',
  },
]

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B7A62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const featured = FEATURED_SLUGS.map((slug) => cars.find((c) => c.slug === slug)).filter(Boolean)
  const heroCar = cars.find((c) => c.slug === 'toyota-fortuner-sigma-4')

  const onSearch = (e) => {
    e.preventDefault()
    navigate(query.trim() ? `/buy?q=${encodeURIComponent(query.trim())}` : '/buy')
  }

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-sand">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Buy · Sell · Rent</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-[3.4rem]">
              Find the car that fits your life.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              AutoLux is Pakistan&rsquo;s calm, elegant car marketplace. Verified cars, honest prices, and
              rental by the day — in Islamabad, Rawalpindi, Lahore and Karachi.
            </p>

            <form onSubmit={onSearch} className="mt-7 flex max-w-lg items-center gap-2 rounded-full border border-sand bg-white p-1.5 shadow-soft">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by make, model or city…"
                aria-label="Search cars"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-ink-muted"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-gold"
              >
                Search cars
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-ink-soft">
              <span>
                <strong className="text-ink">9</strong> cars listed
              </span>
              <span>
                <strong className="text-ink">4</strong> cities served
              </span>
              <span>
                <strong className="text-ink">100%</strong> listings inspected
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-3xl shadow-lift"
          >
            {heroCar && <CarArt car={heroCar} className="aspect-[16/9]" />}
            <div className="flex items-center justify-between bg-white px-5 py-4">
              <div>
                <p className="font-display text-lg font-semibold">{heroCar?.name}</p>
                <p className="text-sm text-ink-muted">Featured this week · {heroCar?.location}</p>
              </div>
              <Link
                to={`/car/${heroCar?.slug}`}
                className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-white transition hover:bg-ink"
              >
                View car
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured cars */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Featured cars</h2>
            <p className="mt-1 text-ink-muted">Handpicked listings, ready to buy or rent today.</p>
          </div>
          <Link to="/buy" className="shrink-0 text-sm font-medium text-gold underline-offset-2 hover:underline">
            View all cars
          </Link>
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((car, i) => (
            <motion.div
              key={car.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-sand bg-parchment">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-bold">How AutoLux works</h2>
          <p className="mt-1 text-ink-muted">Three simple ways to get behind the wheel.</p>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-sand bg-white p-6 shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft font-display text-lg font-bold text-gold">
                  {i + 1}
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{step.title}</p>
                <h3 className="mt-1 font-display text-xl font-semibold">{step.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
                <Link to={step.link} className="mt-4 inline-block text-sm font-medium text-gold underline-offset-2 hover:underline">
                  {step.cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AutoLux */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold">Why buyers and sellers trust AutoLux</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item) => (
            <div key={item.title} className="flex gap-3">
              <CheckIcon />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-sand">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-bold">What our customers say</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="flex flex-col rounded-2xl border border-sand bg-white p-6 shadow-soft"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 border-t border-sand pt-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-ink-muted">
                    {t.place} · {t.detail}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Selling your car? Start here.</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/70">
              Get a fair valuation and reach thousands of verified buyers across Pakistan — free to list.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/sell" className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-white transition hover:bg-gold-light hover:text-ink">
              Sell your car
            </Link>
            <Link to="/rent" className="rounded-full border border-cream/40 px-6 py-3 text-sm font-medium transition hover:border-cream hover:bg-white/10">
              Rent a car instead
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
