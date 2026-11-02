import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-parchment">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold">
            Auto<span className="text-gold">Lux</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Pakistan&rsquo;s elegant car marketplace. Buy verified cars, sell with confidence, and rent
            premium cars by the day.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <Link to="/buy" className="transition hover:text-gold">
                Buy a car
              </Link>
            </li>
            <li>
              <Link to="/rent" className="transition hover:text-gold">
                Rent a car
              </Link>
            </li>
            <li>
              <Link to="/sell" className="transition hover:text-gold">
                Sell your car
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="transition hover:text-gold">
                Saved cars
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <a href="mailto:hello@autolux.pk" className="transition hover:text-gold">
                hello@autolux.pk
              </a>
            </li>
            <li>
              <a href="tel:+9251111000000" className="transition hover:text-gold">
                +92 51 111 000 000
              </a>
            </li>
            <li>Blue Area, Islamabad, Pakistan</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Visit us</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>Monday – Saturday</li>
            <li>9:00 AM – 7:00 PM</li>
            <li>Sunday: closed</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand py-5 text-center text-sm text-ink-muted">
        &copy; 2026 AutoLux. All rights reserved. Listings shown are illustrative.
      </div>
    </footer>
  )
}
