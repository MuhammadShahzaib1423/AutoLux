import { useState } from 'react'
import { formatPKRFull } from '../lib/format'

const inputClass =
  'w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gold'

const CITIES = ['Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Other']

export default function Sell() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    city: 'Islamabad',
    price: '',
    description: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const setField = (patch) => setForm((f) => ({ ...f, ...patch }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Please enter a valid phone number (at least 10 digits).'
    if (!form.make.trim()) next.make = 'Please enter the make (e.g. Toyota).'
    if (!form.model.trim()) next.model = 'Please enter the model (e.g. Corolla Grande).'
    const y = Number(form.year)
    if (!Number.isInteger(y) || y < 1990 || y > 2026) next.year = 'Enter a year between 1990 and 2026.'
    if (!form.price.trim() || Number(form.price) <= 0) next.price = 'Please enter your expected price in PKR.'
    if (form.mileage.trim() && (Number.isNaN(Number(form.mileage)) || Number(form.mileage) < 0)) {
      next.mileage = 'Mileage must be a positive number.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted({ ref: `AL-${String(Date.now()).slice(-6)}`, ...form })
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-sand bg-white p-8 text-center shadow-soft">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-light">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B7A62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold">Your car listing request is in</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            Thank you, {submitted.name}. We will call you on {submitted.phone} to arrange a free inspection of
            your {submitted.make} {submitted.model} ({submitted.year}) and confirm your expected price of{' '}
            {formatPKRFull(Number(submitted.price))}.
          </p>
          <p className="mt-4 text-sm">
            Reference: <span className="font-semibold">{submitted.ref}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(null)
              setForm({ name: '', phone: '', make: '', model: '', year: '', mileage: '', city: 'Islamabad', price: '', description: '' })
            }}
            className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-gold"
          >
            Submit another car
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Sell your car</h1>
      <p className="mt-2 text-ink-muted">
        Tell us about your car and get a fair valuation. Listing is free, and our team handles inspection,
        buyers and paperwork.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-7 rounded-3xl border border-sand bg-white p-6 shadow-soft sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sell-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Your name *
            </label>
            <input id="sell-name" type="text" value={form.name} onChange={(e) => setField({ name: e.target.value })} placeholder="Full name" className={inputClass} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="sell-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Phone number *
            </label>
            <input id="sell-phone" type="tel" value={form.phone} onChange={(e) => setField({ phone: e.target.value })} placeholder="03xx xxxxxxx" className={inputClass} />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="sell-make" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Make *
            </label>
            <input id="sell-make" type="text" value={form.make} onChange={(e) => setField({ make: e.target.value })} placeholder="e.g. Toyota" className={inputClass} />
            {errors.make && <p className="mt-1 text-xs text-red-600">{errors.make}</p>}
          </div>
          <div>
            <label htmlFor="sell-model" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Model *
            </label>
            <input id="sell-model" type="text" value={form.model} onChange={(e) => setField({ model: e.target.value })} placeholder="e.g. Corolla Grande" className={inputClass} />
            {errors.model && <p className="mt-1 text-xs text-red-600">{errors.model}</p>}
          </div>
          <div>
            <label htmlFor="sell-year" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Year *
            </label>
            <input id="sell-year" type="number" min="1990" max="2026" value={form.year} onChange={(e) => setField({ year: e.target.value })} placeholder="e.g. 2022" className={inputClass} />
            {errors.year && <p className="mt-1 text-xs text-red-600">{errors.year}</p>}
          </div>
          <div>
            <label htmlFor="sell-mileage" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Mileage (km)
            </label>
            <input id="sell-mileage" type="number" min="0" value={form.mileage} onChange={(e) => setField({ mileage: e.target.value })} placeholder="e.g. 45000" className={inputClass} />
            {errors.mileage && <p className="mt-1 text-xs text-red-600">{errors.mileage}</p>}
          </div>
          <div>
            <label htmlFor="sell-city" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              City
            </label>
            <select id="sell-city" value={form.city} onChange={(e) => setField({ city: e.target.value })} className={inputClass}>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sell-price" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Expected price (PKR) *
            </label>
            <input id="sell-price" type="number" min="1" value={form.price} onChange={(e) => setField({ price: e.target.value })} placeholder="e.g. 5850000" className={inputClass} />
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="sell-desc" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
            About your car
          </label>
          <textarea
            id="sell-desc"
            rows="4"
            value={form.description}
            onChange={(e) => setField({ description: e.target.value })}
            placeholder="Condition, features, service history, anything a buyer should know…"
            className={inputClass}
          />
        </div>

        <button type="submit" className="mt-6 rounded-full bg-gold px-7 py-3 text-sm font-medium text-white transition hover:bg-ink">
          Request valuation
        </button>
        <p className="mt-3 text-xs text-ink-muted">Free to list. No payment is taken here.</p>
      </form>
    </div>
  )
}
