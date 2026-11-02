import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Buy from './pages/Buy'
import Rent from './pages/Rent'
import CarDetail from './pages/CarDetail'
import Sell from './pages/Sell'
import Favorites from './pages/Favorites'
import { FavoritesProvider } from './lib/favorites'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-muted">That page does not exist. Head back to the showroom.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-gold"
      >
        Back to home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <FavoritesProvider>
      <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/car/:slug" element={<CarDetail />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  )
}
