import React from 'react';
import { X, Check, Minus } from 'lucide-react';

export default function CompareModal({ 
  isOpen, 
  onClose, 
  comparedProperties = [], 
  onRemoveFromCompare, 
  onSelectProperty,
  onClearCompare
}) {
  if (!isOpen) return null;

  const allAmenities = [
    "Sea View",
    "Private Swimming Pool",
    "Smart Home Automation",
    "100% Power Backup",
    "Private Elevator",
    "Vaastu Compliant",
    "Servant Quarters",
    "Private Cinema",
    "EV Fast Charging"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '960px', width: '95vw', padding: 0 }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Indian Luxury Property Comparison</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Compare specifications, RERA certification, carpet area, and amenities side by side
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {comparedProperties.length > 0 && (
              <button 
                className="btn btn-ghost btn-sm"
                style={{ color: '#ef4444' }}
                onClick={onClearCompare}
              >
                Clear all
              </button>
            )}
            <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close compare modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
          {comparedProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>No properties added to compare yet.</p>
              <p style={{ fontSize: '0.875rem' }}>Click the slider compare icon on any property card to compare up to 3 listings side-by-side.</p>
            </div>
          ) : (
            <div style={{ minWidth: `${Math.max(600, comparedProperties.length * 280)}px` }}>
              {/* Properties Cards Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${comparedProperties.length}, 1fr)`,
                gap: '1rem',
                borderBottom: '2px solid var(--color-border-subtle)',
                paddingBottom: '1.5rem',
                alignItems: 'end'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '1rem' }}>
                  Residences
                </div>

                {comparedProperties.map((prop) => (
                  <div key={prop.id} style={{ position: 'relative' }}>
                    <button 
                      type="button" 
                      onClick={() => onRemoveFromCompare(prop.id)}
                      style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        zIndex: 10,
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 26,
                        height: 26,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#ef4444'
                      }}
                      title="Remove from comparison"
                    >
                      <X size={14} />
                    </button>
                    <img 
                      src={prop.images[0]} 
                      alt={prop.title} 
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '0.75rem' }} 
                    />
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.3 }}>{prop.title}</h4>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-accent-blue)', marginBottom: '0.5rem' }}>
                      {prop.priceFormatted}
                    </div>
                    <button 
                      className="btn btn-primary btn-sm btn-block"
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                    >
                      View Dossier
                    </button>
                  </div>
                ))}
              </div>

              {/* Rows Comparison */}
              {[
                { label: 'Status & Type', getVal: (p) => `${p.status} • ${p.type}` },
                { label: 'City & Locality', getVal: (p) => `${p.neighborhoodName}, ${p.city}` },
                { label: 'RERA Registration', getVal: (p) => p.reraId || 'Verified' },
                { label: 'Bedrooms', getVal: (p) => `${p.bedrooms} BHK` },
                { label: 'Bathrooms', getVal: (p) => `${p.bathrooms} Baths` },
                { label: 'Carpet Area', getVal: (p) => `${p.sqft.toLocaleString('en-IN')} sq ft` },
                { label: 'Rate / sq ft', getVal: (p) => p.pricePerSqFt },
                { label: 'Possession Year', getVal: (p) => p.yearBuilt },
                { label: 'Reserved Car Parks', getVal: (p) => `${p.garage} Covered` },
                { label: 'Society Maintenance', getVal: (p) => p.hoa }
              ].map((row, idx) => (
                <div 
                  key={row.label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `200px repeat(${comparedProperties.length}, 1fr)`,
                    gap: '1rem',
                    padding: '0.85rem 0',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--color-bg-surface)',
                    fontSize: '0.9rem'
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--color-text-secondary)', paddingLeft: '0.5rem' }}>
                    {row.label}
                  </div>
                  {comparedProperties.map((prop) => (
                    <div key={prop.id} style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {row.getVal(prop)}
                    </div>
                  ))}
                </div>
              ))}

              {/* Amenities Comparison */}
              <div style={{ marginTop: '1.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
                Signature Society & Residence Inclusions
              </div>

              {allAmenities.map((amenity, idx) => (
                <div 
                  key={amenity}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `200px repeat(${comparedProperties.length}, 1fr)`,
                    gap: '1rem',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--color-bg-surface)',
                    fontSize: '0.875rem'
                  }}
                >
                  <div style={{ color: 'var(--color-text-body)', paddingLeft: '0.5rem' }}>
                    {amenity}
                  </div>
                  {comparedProperties.map((prop) => {
                    const hasAmenity = prop.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()));
                    return (
                      <div key={prop.id} style={{ display: 'flex', alignItems: 'center' }}>
                        {hasAmenity ? (
                          <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                            <Check size={16} /> Yes
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Minus size={16} /> —
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
