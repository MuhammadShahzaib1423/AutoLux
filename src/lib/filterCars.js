export const DEFAULT_FILTERS = {
  query: '',
  type: 'All',
  brand: 'All',
  fuel: 'All',
  maxPrice: 'Any',
  sort: 'featured',
}

export function applyFilters(list, filters, priceField) {
  const q = filters.query.trim().toLowerCase()
  let out = list.filter((car) => {
    if (q) {
      const hay = `${car.name} ${car.brand} ${car.type} ${car.fuel} ${car.location} ${car.year}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (filters.type !== 'All' && car.type !== filters.type) return false
    if (filters.brand !== 'All' && car.brand !== filters.brand) return false
    if (filters.fuel !== 'All' && car.fuel !== filters.fuel) return false
    if (filters.maxPrice !== 'Any' && car[priceField] > Number(filters.maxPrice)) return false
    return true
  })

  switch (filters.sort) {
    case 'price-asc':
      out = [...out].sort((a, b) => a[priceField] - b[priceField])
      break
    case 'price-desc':
      out = [...out].sort((a, b) => b[priceField] - a[priceField])
      break
    case 'newest':
      out = [...out].sort((a, b) => b.year - a.year || b[priceField] - a[priceField])
      break
    default:
      break
  }
  return out
}
