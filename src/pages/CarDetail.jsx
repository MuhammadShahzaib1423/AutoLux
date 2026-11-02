import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCarBySlug } from '../data/cars'
import CarArt from '../components/CarArt'
import { useFavorites } from '../lib/favorites'
import { DRIVER_RATE_PER_DAY, formatNumber, formatPKRFull } from '../lib/format'

const inputClass =
  'w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gold'

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B7A62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Spec({ label, value }) {
  return (
    <div className="rounded-xl bg-parchment px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  )
}

export default function CarDetail() {
  const { slug } = useParams()
  const car = getCarBySlug(slug)
  const { isFavorite, toggleFavorite } = useFavorites()

  const [rentDays, setRentDays] = useState(3)
  const [withDriver, setWithDriver] = useState(false)
  const [downPct, setDownPct] = useState(20)
  const [months, setMonths] = useState(36)

  const [form, setForm] = useState({
    intent: 'buy',
    name: '',
    phone: '',
    startDate: '',
    days: '3',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  if (!car) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-4xl font-bold">Car not found</h1>
        <p className="mt-3 text-ink-muted">That listing does not exist any more. Browse the cars we have today.</p>
        <Link
          to="/buy"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-gold"
        >
          Browse cars for sale
        </Link>
      </div>
    )
  }

  const fav = isFavorite(car.slug)
  const rentTotal = rentDays * car.rentPerDay + (withDriver ? rentDays * DRIVER_RATE_PER_DAY : 0)
  const downPayment = Math.round((car.salePrice * downPct) / 100)
  const monthly = Math.round((car.salePrice - downPayment) / months)

  const setField = (patch) => setForm((f) => ({ ...f, ...patch }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) next.phone = 'Please enter a valid phone number (at least 10 digits).'
    if (form.intent === 'rent') {
      if (!form.startDate) next.startDate = 'Please choose a start date.'
      const d = Number(form.days)
      if (!Number.isInteger(d) || d < 1 || d > 30) next.days = 'Days must be between 1 and 30.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const ref = `AL-${String(Date.now()).slice(-6)}`
    setSubmitted({ ref, ...form })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/buy" className="text-sm font-medium text-gold underline-offset-2 hover:underline">
        ← Back to cars
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{car.name}</h1>
          <p className="mt-1 text-ink-muted">
            {car.year} · {car.location} · {car.type} · {car.fuel}
          </p>
        </div>
        {car.badge && (
          <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold tracking-wide text-gold">
            {car.badge}
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="overflow-hidden rounded-3xl shadow-soft lg:col-span-3">
          <CarArt car={car} className="aspect-[16/9] h-full" />
        </div>

        <div className="rounded-3xl border border-sand bg-white p-6 shadow-soft lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Sale price</p>
          <p className="mt-1 font-display text-3xl font-bold">{formatPKRFull(car.salePrice)}</p>
          <p className="mt-3 text-sm text-ink-soft">
            Or rent from <span className="font-semibold text-ink">{formatPKRFull(car.rentPerDay)} / day</span>
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-ink-soft">
            <span className="rounded-full bg-parchment px-2.5 py-1">{car.transmission}</span>
            <span className="rounded-full bg-parchment px-2.5 py-1">{car.seats} seats</span>
            <span className="rounded-full bg-parchment px-2.5 py-1">{formatNumber(car.mileage)} km</span>
            <span className="rounded-full bg-parchment px-2.5 py-1">{car.engine}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{car.description}</p>

          <div className="mt-6 flex gap-3">
            <a
              href="#enquiry"
              className="flex-1 rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-cream transition hover:bg-gold"
            >
              Book / enquire
            </a>
            <button
              type="button"
              onClick={() => toggleFavorite(car.slug)}
              className={`rounded-full border px-5 py-3 text-sm font-medium transition ${
                fav ? 'border-gold bg-gold-soft text-gold' : 'border-sand text-ink hover:border-gold'
              }`}
            >
              {fav ? 'Saved' : 'Save car'}
            </button>
          </div>
        </div>
      </div>

      {/* Specs + features */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">Specifications</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Spec label="Make" value={car.brand} />
            <Spec label="Model year" value={car.year} />
            <Spec label="Body type" value={car.type} />
            <Spec label="Fuel" value={car.fuel} />
            <Spec label="Transmission" value={car.transmission} />
            <Spec label="Seats" value={car.seats} />
            <Spec label="Mileage" value={`${formatNumber(car.mileage)} km`} />
            <Spec label="Engine" value={car.engine} />
            <Spec label="Location" value={car.location} />
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold">Features</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {car.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Calculators */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-sand bg-white p-6 shadow-soft">
          <h2 className="font-display text-2xl font-bold">Rental calculator</h2>
          <p className="mt-1 text-sm text-ink-muted">See your total before you enquire.</p>
          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Number of days
            </span>
            <input
              type="number"
              min="1"
              max="30"
              value={rentDays}
              onChange={(e) => setRentDays(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
              className={inputClass}
            />
          </label>
          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={withDriver}
              onChange={(e) => setWithDriver(e.target.checked)}
              className="h-4 w-4 accent-[#B45309]"
            />
            Add a driver ({formatPKRFull(DRIVER_RATE_PER_DAY)} / day)
          </label>
          <div className="mt-5 space-y-1.5 border-t border-sand pt-4 text-sm">
            <p className="flex justify-between">
              <span className="text-ink-muted">Rental ({rentDays} × {formatPKRFull(car.rentPerDay)})</span>
              <span>{formatPKRFull(rentDays * car.rentPerDay)}</span>
            </p>
            {withDriver && (
              <p className="flex justify-between">
                <span className="text-ink-muted">Driver ({rentDays} × {formatPKRFull(DRIVER_RATE_PER_DAY)})</span>
                <span>{formatPKRFull(rentDays * DRIVER_RATE_PER_DAY)}</span>
              </p>
            )}
            <p className="flex justify-between border-t border-sand pt-2 text-base font-semibold">
              <span>Total</span>
              <span>{formatPKRFull(rentTotal)}</span>
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-sand bg-white p-6 shadow-soft">
          <h2 className="font-display text-2xl font-bold">Finance calculator</h2>
          <p className="mt-1 text-sm text-ink-muted">Estimate your monthly instalment.</p>
          <div className="mt-5">
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">Down payment</span>
              <span className="font-medium">
                {downPct}% · {formatPKRFull(downPayment)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="mt-2 w-full"
              aria-label="Down payment percentage"
            />
          </div>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Repayment period
            </span>
            <select value={months} onChange={(e) => setMonths(Number(e.target.value))} className={inputClass}>
              <option value={12}>12 months</option>
              <option value={24}>24 months</option>
              <option value={36}>36 months</option>
              <option value={48}>48 months</option>
            </select>
          </label>
          <div className="mt-5 space-y-1.5 border-t border-sand pt-4 text-sm">
            <p className="flex justify-between">
              <span className="text-ink-muted">Amount financed</span>
              <span>{formatPKRFull(car.salePrice - downPayment)}</span>
            </p>
            <p className="flex justify-between border-t border-sand pt-2 text-base font-semibold">
              <span>Estimated monthly</span>
              <span>{formatPKRFull(monthly)} / month</span>
            </p>
            <p className="text-xs text-ink-muted">Estimate only, before bank charges and insurance.</p>
          </div>
        </div>
      </div>

      {/* Booking / enquiry form */}
      <div id="enquiry" className="mt-10 scroll-mt-24 rounded-3xl border border-sand bg-white p-6 shadow-soft sm:p-8">
        {submitted ? (
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-light">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B7A62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold">Enquiry received</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Thank you, {submitted.name}. Your {submitted.intent === 'rent' ? 'rental' : 'purchase'} enquiry for the{' '}
              {car.name} has been recorded. Our team will call you on {submitted.phone} shortly.
            </p>
            <p className="mt-4 text-sm">
              Reference: <span className="font-semibold">{submitted.ref}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(null)
                setForm({ intent: 'buy', name: '', phone: '', startDate: '', days: '3', message: '' })
              }}
              className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-gold"
            >
              Make another enquiry
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl font-bold">Book or enquire about this car</h2>
            <p className="mt-1 text-sm text-ink-muted">Fill in your details and our team will call you back.</p>

            <form onSubmit={onSubmit} noValidate className="mt-6">
              <fieldset>
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">I want to</legend>
                <div className="flex gap-3">
                  {[
                    { value: 'buy', label: `Buy — ${formatPKRFull(car.salePrice)}` },
                    { value: 'rent', label: `Rent — ${formatPKRFull(car.rentPerDay)} / day` },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${
                        form.intent === opt.value ? 'border-gold bg-gold-soft text-gold' : 'border-sand hover:border-gold'
                      }`}
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={opt.value}
                        checked={form.intent === opt.value}
                        onChange={() => setField({ intent: opt.value })}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Your name *
                  </label>
                  <input
                    id="bk-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setField({ name: e.target.value })}
                    placeholder="Full name"
                    className={inputClass}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="bk-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Phone number *
                  </label>
                  <input
                    id="bk-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField({ phone: e.target.value })}
                    placeholder="03xx xxxxxxx"
                    className={inputClass}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
                {form.intent === 'rent' && (
                  <>
                    <div>
                      <label htmlFor="bk-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Start date *
                      </label>
                      <input
                        id="bk-date"
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setField({ startDate: e.target.value })}
                        className={inputClass}
                      />
                      {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="bk-days" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Number of days *
                      </label>
                      <input
                        id="bk-days"
                        type="number"
                        min="1"
                        max="30"
                        value={form.days}
                        onChange={(e) => setField({ days: e.target.value })}
                        className={inputClass}
                      />
                      {errors.days && <p className="mt-1 text-xs text-red-600">{errors.days}</p>}
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="bk-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Message (optional)
                </label>
                <textarea
                  id="bk-message"
                  rows="3"
                  value={form.message}
                  onChange={(e) => setField({ message: e.target.value })}
                  placeholder="Anything we should know — inspection time, delivery city, questions about the car…"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="mt-6 rounded-full bg-gold px-7 py-3 text-sm font-medium text-white transition hover:bg-ink"
              >
                Submit enquiry
              </button>
              <p className="mt-3 text-xs text-ink-muted">
                No payment is taken here. This enquiry simply asks our team to call you back.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
