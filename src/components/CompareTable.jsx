const AMENITY_LABELS = {
  wifi: 'WiFi', pool: 'Pool', spa: 'Spa', gym: 'Gym',
  restaurant: 'Restaurant', bar: 'Bar', beachAccess: 'Beach Access',
  parking: 'Parking', roomService: 'Room Service', airConditioning: 'AC',
};

export default function CompareTable({ hotels, onClose }) {
  const bestPrice = Math.min(...hotels.map(h => h.pricePerNight));
  const bestRating = Math.max(...hotels.map(h => h.rating));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Package <span>Comparison</span></h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="row-label-cell" style={{background:'var(--dark-2)'}}>Hotel</th>
                {hotels.map(h => (
                  <th key={h.id} className="hotel-col-header">
                    <img src={h.image} alt={h.name} className="hotel-col-img" />
                    <div className="col-name">{h.name}</div>
                    <div className="col-location">{h.location}</div>
                    <div className="col-stars">{'★'.repeat(h.stars)}{'☆'.repeat(5-h.stars)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-label-cell">Price/Night</td>
                {hotels.map(h => (
                  <td key={h.id} className="data-cell price-cell">
                    ${h.pricePerNight}
                    <small>/night</small>
                    {h.pricePerNight === bestPrice && <span className="best-tag">BEST</span>}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="row-label-cell">Rating</td>
                {hotels.map(h => (
                  <td key={h.id} className="data-cell">
                    <div className="rating-cell">
                      <span className="rating-pill">{h.rating}</span>
                      <span style={{fontSize:12,color:'var(--text-muted)'}}>{h.reviews.toLocaleString()} reviews</span>
                      {h.rating === bestRating && <span className="best-tag">TOP</span>}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="row-label-cell">Duration</td>
                {hotels.map(h => <td key={h.id} className="data-cell">{h.nights} Nights</td>)}
              </tr>
              <tr>
                <td className="row-label-cell">Includes</td>
                {hotels.map(h => (
                  <td key={h.id} className="data-cell">
                    {h.includes.map(i => <span key={i} className="incl-tag">{i}</span>)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="row-label-cell">Cancellation</td>
                {hotels.map(h => (
                  <td key={h.id} className="data-cell">
                    <span className={h.cancellation.includes('Free') ? 'cancel-free' : 'cancel-no'}>
                      {h.cancellation}
                    </span>
                  </td>
                ))}
              </tr>
              {Object.keys(AMENITY_LABELS).map(key => (
                <tr key={key}>
                  <td className="row-label-cell">{AMENITY_LABELS[key]}</td>
                  {hotels.map(h => (
                    <td key={h.id} className="data-cell">
                      <span className={h.amenities[key] ? 'check-yes' : 'check-no'}>
                        {h.amenities[key] ? '✔' : '✘'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}