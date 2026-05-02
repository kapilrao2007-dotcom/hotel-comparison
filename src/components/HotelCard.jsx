export default function HotelCard({ hotel, selected, onToggle, disabled }) {
  const topAmenities = Object.entries(hotel.amenities)
    .filter(([, v]) => v).slice(0, 4)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').trim());

  return (
    <div className={`hotel-card ${selected ? 'selected' : ''}`} onClick={() => !disabled || selected ? onToggle(hotel) : null}>
      <div className="card-img-wrap">
        <img src={hotel.image} alt={hotel.name} />
        {hotel.badge && <span className="card-badge">{hotel.badge}</span>}
        <div className="select-overlay">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {selected
              ? <polyline points="20 6 9 17 4 12" />
              : <line x1="12" y1="5" x2="12" y2="19" />//<line x1="5" y1="12" x2="19" y2="12" />
            }
          </svg>
        </div>
      </div>
      <div className="card-body">
        <div className="card-location">{hotel.location}</div>
        <div className="card-name">{hotel.name}</div>
        <div className="card-stars">{'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)}</div>
        <div className="card-meta">
          <div className="card-rating">
            <span className="rating-score">{hotel.rating}</span>
            <span className="rating-reviews">{hotel.reviews.toLocaleString()} reviews</span>
          </div>
          <div className="card-price">
            <div className="price-amount">${hotel.pricePerNight}<span>/night</span></div>
          </div>
        </div>
        <div className="card-amenities">
          {topAmenities.map(a => <span key={a} className="amenity-tag">{a}</span>)}
        </div>
        <button
          className={`select-btn ${selected ? 'selected-btn' : ''}`}
          onClick={e => { e.stopPropagation(); onToggle(hotel); }}
          disabled={disabled && !selected}
        >
          {selected ? '✓ Added to Compare' : disabled ? 'Max 3 Selected' : '+ Add to Compare'}
        </button>
      </div>
    </div>
  );
}