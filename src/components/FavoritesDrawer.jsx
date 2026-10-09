import React from 'react';
import { X, Heart, Trash2, ArrowRight, Bed, Bath, Maximize2 } from 'lucide-react';

export default function FavoritesDrawer({ 
  isOpen, 
  onClose, 
  favoriteProperties = [], 
  onRemoveFavorite, 
  onClearAll, 
  onSelectProperty,
  onExploreProperties 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="favorites-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#fef2f2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={20} fill="#ef4444" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Saved Homes</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} bookmarked
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {favoriteProperties.length > 0 && (
              <button 
                className="btn btn-ghost btn-sm" 
                onClick={onClearAll}
                style={{ fontSize: '0.8rem', color: '#ef4444' }}
                title="Clear all favorites"
              >
                Clear all
              </button>
            )}
            <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close drawer">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {favoriteProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: 'var(--color-text-muted)' }}>
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'var(--color-bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                color: '#94a3b8'
              }}>
                <Heart size={32} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
                No saved properties yet
              </h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                Tap the heart icon on any property card to save your favorite luxury residences for later review.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  if (onExploreProperties) onExploreProperties();
                }}
              >
                Explore Properties
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {favoriteProperties.map((prop) => (
                <div 
                  key={prop.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-subtle)',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <img 
                    src={prop.images[0]} 
                    alt={prop.title} 
                    style={{
                      width: '100px',
                      height: '80px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                  />

                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <h4 
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: 'var(--color-text-main)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                      >
                        {prop.title}
                      </h4>
                      <button 
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          padding: '0.2rem'
                        }}
                        onClick={() => onRemoveFavorite(prop.id)}
                        title="Remove from favorites"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-accent-blue)', margin: '0.25rem 0' }}>
                      {prop.priceFormatted}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      <span>{prop.bedrooms} beds</span>
                      <span>•</span>
                      <span>{prop.bathrooms} baths</span>
                      <span>•</span>
                      <span>{prop.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {favoriteProperties.length > 0 && (
          <div style={{
            padding: '1.25rem',
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-bg-surface)'
          }}>
            <button 
              className="btn btn-primary btn-block"
              onClick={() => {
                onClose();
                if (onExploreProperties) onExploreProperties();
              }}
            >
              <span>Browse More Listings</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
