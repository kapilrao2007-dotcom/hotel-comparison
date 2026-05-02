export default function CompareBar({ selected, onRemove, onClear, onCompare }) {
  const slots = [0, 1, 2];
  return (
    <div className={`compare-bar ${selected.length > 0 ? 'visible' : ''}`}>
      <span className="bar-label">Compare:</span>
      <div className="compare-slots">
        {slots.map(i => (
          <div key={i} className={`slot ${selected[i] ? 'filled' : ''}`}>
            {selected[i]
              ? <><span className="slot-name">{selected[i].name}</span>
                  <button className="slot-remove" onClick={() => onRemove(selected[i])}>×</button></>
              : <span className="slot-empty">Select hotel {i + 1}</span>
            }
          </div>
        ))}
      </div>
      <button className="clear-btn" onClick={onClear}>Clear</button>
      <button
        className="compare-now-btn"
        disabled={selected.length < 2}
        onClick={onCompare}
      >
        Compare {selected.length > 0 ? `(${selected.length})` : ''}
      </button>
    </div>
  );
}