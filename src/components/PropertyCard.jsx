import React, { useState } from 'react';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  SlidersHorizontal, 
  ArrowRight,
  Sparkles,
  BadgeCheck
} from 'lucide-react';
import './PropertyCard.css';

export default function PropertyCard({ 
  property, 
  isFavorite, 
  isCompared, 
  onToggleFavorite, 
  onToggleCompare, 
  onSelectProperty,
  isListView = false
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onSelectProperty) {
      onSelectProperty(property);
    }
  };

  return (
    <article 
      className={`property-card ${isListView ? 'property-card-list-view' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Box */}
      <div className="property-card-media" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="property-card-img" 
          loading="lazy" 
        />

        {/* Badges */}
        <div className="property-card-badges">
          {property.status === 'For Sale' ? (
            <span className="badge badge-sale">For Sale</span>
          ) : (
            <span className="badge badge-rent">For Rent</span>
          )}

          {property.isFeatured && (
            <span className="badge badge-featured">
              <Sparkles size={11} /> Featured
            </span>
          )}

          {property.isNew && (
            <span className="badge badge-new">New</span>
          )}
        </div>

        {/* Action Controls (Favorite & Compare) */}
        <div className="property-card-actions" onClick={(e) => e.stopPropagation()}>
          <button 
            type="button"
            className={`card-action-btn ${isCompared ? 'active-compare' : ''}`}
            title={isCompared ? "Remove from comparison" : "Add to comparison"}
            onClick={() => onToggleCompare(property)}
          >
            <SlidersHorizontal size={15} />
          </button>
          
          <button 
            type="button"
            className={`card-action-btn ${isFavorite ? 'active-favorite heart-animated' : ''}`}
            title={isFavorite ? "Remove from saved" : "Save to favorites"}
            onClick={() => onToggleFavorite(property)}
          >
            <Heart 
              size={15} 
              fill={isFavorite ? "#ef4444" : "none"} 
              color={isFavorite ? "#ef4444" : "currentColor"} 
            />
          </button>
        </div>

        {/* Price & Area overlay */}
        <div className="property-card-media-bottom">
          <span className="property-card-price">{property.priceFormatted}</span>
          <span className="property-card-sqft-price">{property.pricePerSqFt}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="property-card-body">
        <h3 className="property-card-title" onClick={handleCardClick} title={property.title}>
          {property.title}
        </h3>

        <div className="property-card-address">
          <MapPin size={14} color="#64748b" style={{ flexShrink: 0 }} />
          <span>{property.address}, {property.city}</span>
        </div>

        {/* Specs Highlights */}
        <div className="property-card-specs">
          <div className="spec-item" title={`${property.bedrooms} Bedrooms`}>
            <Bed size={16} className="spec-icon" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="spec-item" title={`${property.bathrooms} Bathrooms`}>
            <Bath size={16} className="spec-icon" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="spec-item" title={`${property.sqft.toLocaleString()} Square Feet`}>
            <Maximize2 size={15} className="spec-icon" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="property-card-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="property-type-pill">{property.type}</span>
            {property.reraId && (
              <span className="property-rera-pill" title={`RERA ID: ${property.reraId}`}>
                <BadgeCheck size={12} color="#16a34a" /> RERA
              </span>
            )}
          </div>
          
          <button 
            type="button" 
            className="btn btn-outline btn-sm property-view-btn"
            onClick={handleCardClick}
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
