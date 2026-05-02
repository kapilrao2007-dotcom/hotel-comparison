import { useState, useMemo } from 'react';
import './App.css';
import { hotels } from './data/hotels';
import HotelCard from './components/HotelCard';
import CompareBar from './components/CompareBar';
import CompareTable from './components/CompareTable';

export default function App() {
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [maxPrice, setMaxPrice] = useState(600);
  const [minStars, setMinStars] = useState('0');
  const [amenityFilter, setAmenityFilter] = useState('all');

  const toggle = (hotel) => {
    setSelected(prev =>
      prev.find(h => h.id === hotel.id)
        ? prev.filter(h => h.id !== hotel.id)
        : prev.length < 3 ? [...prev, hotel] : prev
    );
  };

  const filtered = useMemo(() => {
    return hotels
      .filter(h => h.pricePerNight <= maxPrice)
      .filter(h => h.stars >= parseInt(minStars))
      .filter(h => amenityFilter === 'all' || h.amenities[amenityFilter])
      .sort((a, b) => {
        if (sortBy === 'price') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [sortBy, maxPrice, minStars, amenityFilter]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-tag">✦ Luxury Travel</div>
        <h1>Find Your <em>Perfect</em> Stay</h1>
        <p>Compare world-class hotel packages side by side</p>
      </header>

      <div className="filters">
        <div className="filter-group">
          <label>Sort</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="rating">Top Rated</option>
            <option value="price">Lowest Price</option>
            <option value="name">A–Z Name</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Max Price</label>
          <input type="range" min="100" max="600" step="10"
            value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} />
          <span className="price-val">${maxPrice}</span>
        </div>
        <div className="filter-group">
          <label>Stars</label>
          <select value={minStars} onChange={e => setMinStars(e.target.value)}>
            <option value="0">All</option>
            <option value="4">4+ ★</option>
            <option value="5">5 ★</option>
          </select>
        </div>
        {['all','pool','spa','beachAccess','gym'].map(a => (
          <button key={a}
            className={`filter-btn ${amenityFilter === a ? 'active' : ''}`}
            onClick={() => setAmenityFilter(a)}
          >
            {a === 'all' ? 'All' : a === 'beachAccess' ? 'Beach' : a.charAt(0).toUpperCase() + a.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid-section">
        <div className="results-info">
          <span><strong>{filtered.length}</strong> packages found</span>
          <span>{selected.length}/3 selected for comparison</span>
        </div>
        {filtered.length === 0
          ? <div className="empty-state"><h3>No packages found</h3><p>Try adjusting your filters</p></div>
          : <div className="hotels-grid">
              {filtered.map(h => (
                <HotelCard key={h.id} hotel={h}
                  selected={!!selected.find(s => s.id === h.id)}
                  onToggle={toggle}
                  disabled={selected.length >= 3}
                />
              ))}
            </div>
        }
      </div>

      <CompareBar
        selected={selected}
        onRemove={toggle}
        onClear={() => setSelected([])}
        onCompare={() => setShowCompare(true)}
      />

      {showCompare && (
        <CompareTable hotels={selected} onClose={() => setShowCompare(false)} />
      )}
    </div>
  );
}