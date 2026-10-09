import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Car, 
  Calendar, 
  Compass, 
  Heart, 
  SlidersHorizontal, 
  Share2, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Phone, 
  Mail, 
  Images, 
  Calculator, 
  ShieldCheck, 
  X, 
  ChevronLeft,
  ArrowRight,
  IndianRupee,
  BadgeCheck
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import './PropertyDetailsView.css';

export default function PropertyDetailsView({ 
  property, 
  agent, 
  similarProperties = [], 
  isFavorite, 
  isCompared, 
  onToggleFavorite, 
  onToggleCompare, 
  onSelectProperty, 
  onNavigate, 
  onOpenScheduleTour, 
  onSelectAgent,
  onShowToast 
}) {
  // Lightbox Modal for gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Sub-navigation tabs state
  const [activeSectionTab, setActiveSectionTab] = useState('overview');

  const scrollToSection = (id) => {
    setActiveSectionTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Indian Home Loan EMI Calculator state
  const [homePrice, setHomePrice] = useState(property?.price || 185000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5); // Typical Indian Home Loan Rate (SBI / HDFC)
  const [loanTermYears, setLoanTermYears] = useState(20); // Common Indian Tenure

  if (!property) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Property Not Found</h2>
        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>The property you are looking for does not exist or has been archived.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('properties')}>
          Back to Listings
        </button>
      </div>
    );
  }

  // Indian Home Loan Calculations (EMI)
  const downPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));
  const principalAmount = homePrice - downPaymentAmount;
  const monthlyRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTermYears * 12;
  
  // Standard EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyEMI = monthlyRate > 0 
    ? Math.round(principalAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1))
    : Math.round(principalAmount / numberOfPayments);

  // Stamp Duty (Estimated ~6% in major Indian states)
  const stampDutyAndReg = Math.round(homePrice * 0.06);
  const monthlyMaintenance = property.hoa ? parseInt(property.hoa.replace(/[^0-9]/g, '')) || 0 : 0;
  const totalMonthlyOutflow = monthlyEMI + monthlyMaintenance;

  const formatCroresLakhs = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast("Property link copied to clipboard!", "success");
    } else {
      if (onShowToast) onShowToast("Sharing link ready: " + property.title, "info");
    }
  };

  const openLightbox = (index) => {
    setCurrentImageIdx(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="details-page">
      {/* 1. Breadcrumb Bar */}
      <div className="details-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <div className="breadcrumb-links">
            <button className="breadcrumb-link-btn" onClick={() => onNavigate('home')}>Home</button>
            <ChevronRight size={14} />
            <button className="breadcrumb-link-btn" onClick={() => onNavigate('properties')}>Properties</button>
            <ChevronRight size={14} />
            <span>{property.city}</span>
            <ChevronRight size={14} />
            <span className="breadcrumb-current">{property.title}</span>
          </div>

          <button 
            className="btn btn-outline btn-sm"
            onClick={() => onNavigate('properties')}
          >
            ← Back to Listings
          </button>
        </div>
      </div>

      <div className="container">
        {/* 2. Header: Title, Address, Price, Actions */}
        <div className="details-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
              <span className={`badge ${property.status === 'For Sale' ? 'badge-sale' : 'badge-rent'}`}>
                {property.status}
              </span>
              <span className="badge badge-outline">
                {property.type}
              </span>
              {property.isFeatured && (
                <span className="badge badge-featured">Signature Residence</span>
              )}
              {property.reraId && (
                <span className="badge" style={{ backgroundColor: '#ecfdf5', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                  <BadgeCheck size={12} /> RERA: {property.reraId}
                </span>
              )}
            </div>

            <h1 className="details-title">{property.title}</h1>

            <div className="details-address">
              <MapPin size={18} color="var(--color-accent-blue)" />
              <span>{property.address}, {property.neighborhoodName}, {property.city}, {property.state} - {property.zip}</span>
            </div>
          </div>

          <div className="details-price-box">
            <div className="details-price">{property.priceFormatted}</div>
            <div className="details-price-per-sqft">{property.pricePerSqFt}</div>

            {/* Action buttons (Favorite, Compare, Share) */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button 
                className={`btn btn-sm ${isFavorite ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => onToggleFavorite(property)}
              >
                <Heart size={16} fill={isFavorite ? "#ffffff" : "none"} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
              
              <button 
                className={`btn btn-sm ${isCompared ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => onToggleCompare(property)}
              >
                <SlidersHorizontal size={16} />
                <span>{isCompared ? 'Compared' : 'Compare'}</span>
              </button>

              <button 
                className="btn btn-sm btn-outline"
                onClick={handleShare}
                title="Share Property"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Multi-Image Gallery */}
        <div className="details-gallery">
          <div className="gallery-main-img-box" onClick={() => openLightbox(0)}>
            <img src={property.images[0]} alt={property.title} className="gallery-main-img" />
          </div>

          <div className="gallery-thumbnails-col">
            {property.images.slice(1, 3).map((imgUrl, idx) => (
              <div key={idx} className="gallery-thumb-box" onClick={() => openLightbox(idx + 1)}>
                <img src={imgUrl} alt={`${property.title} preview ${idx + 2}`} className="gallery-thumb-img" />
              </div>
            ))}
          </div>

          <button className="gallery-all-photos-btn" onClick={() => openLightbox(0)}>
            <Images size={16} />
            <span>View All Photos ({property.images.length})</span>
          </button>
        </div>

        {/* 4. Specs Bar */}
        <div className="details-specs-bar">
          <div className="spec-bar-item">
            <Bed size={22} className="spec-bar-icon" />
            <span className="spec-bar-value">{property.bedrooms} BHK</span>
            <span className="spec-bar-label">Bedrooms</span>
          </div>
          <div className="spec-bar-item">
            <Bath size={22} className="spec-bar-icon" />
            <span className="spec-bar-value">{property.bathrooms}</span>
            <span className="spec-bar-label">Bathrooms</span>
          </div>
          <div className="spec-bar-item">
            <Maximize2 size={22} className="spec-bar-icon" />
            <span className="spec-bar-value">{property.sqft.toLocaleString('en-IN')}</span>
            <span className="spec-bar-label">Carpet Area (sq ft)</span>
          </div>
          <div className="spec-bar-item">
            <Car size={22} className="spec-bar-icon" />
            <span className="spec-bar-value">{property.garage} Reserved</span>
            <span className="spec-bar-label">Covered Parking</span>
          </div>
          <div className="spec-bar-item">
            <Calendar size={22} className="spec-bar-icon" />
            <span className="spec-bar-value">{property.yearBuilt}</span>
            <span className="spec-bar-label">Possession Year</span>
          </div>
          <div className="spec-bar-item">
            <Compass size={22} className="spec-bar-icon" />
            <span className="spec-bar-value">{property.lotSize}</span>
            <span className="spec-bar-label">Property Format</span>
          </div>
        </div>

        {/* 5. In-Page Sub-Navigation Tabs */}
        <div className="details-subnav-sticky">
          <div className="tab-pill-group details-subnav-tabs">
            <button 
              type="button" 
              className={`tab-pill-item ${activeSectionTab === 'overview' ? 'active-gold' : ''}`}
              onClick={() => scrollToSection('overview')}
            >
              Overview
            </button>
            <button 
              type="button" 
              className={`tab-pill-item ${activeSectionTab === 'amenities' ? 'active-gold' : ''}`}
              onClick={() => scrollToSection('amenities')}
            >
              Amenities ({property.amenities.length})
            </button>
            <button 
              type="button" 
              className={`tab-pill-item ${activeSectionTab === 'calculator' ? 'active-gold' : ''}`}
              onClick={() => scrollToSection('calculator')}
            >
              EMI & Outflow
            </button>
            <button 
              type="button" 
              className={`tab-pill-item ${activeSectionTab === 'connectivity' ? 'active-gold' : ''}`}
              onClick={() => scrollToSection('connectivity')}
            >
              Locality & Metro
            </button>
            <button 
              type="button" 
              className={`tab-pill-item ${activeSectionTab === 'advisor' ? 'active-gold' : ''}`}
              onClick={() => scrollToSection('advisor')}
            >
              Advisory Partner
            </button>
          </div>
        </div>

        {/* 6. Main Content Grid */}
        <div className="details-content-grid">
          <div className="details-main-col">
            {/* Overview & Story */}
            <div id="overview" className="details-card-section">
              <h3 className="details-section-heading">Architectural Dossier & Specifications</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-body)', marginBottom: '1.5rem' }}>
                {property.overview}
              </p>
              <p style={{ fontSize: '0.975rem', lineHeight: 1.8, color: 'var(--color-text-body)' }}>
                {property.description}
              </p>

              {/* Highlights */}
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Signature Residence Features</h4>
                <div className="highlights-list">
                  {property.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-item">
                      <CheckCircle2 size={18} color="var(--color-accent-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            <div id="amenities" className="details-card-section">
              <h3 className="details-section-heading">Curated Inclusions & Society Amenities</h3>
              <div className="amenities-badges-grid">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="amenity-detail-badge">
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Indian Home Loan EMI Calculator */}
            <div id="calculator" className="details-card-section">
              <h3 className="details-section-heading">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Calculator size={22} color="var(--color-accent-blue)" />
                  <span>Indian Home Loan EMI & Stamp Duty Estimator</span>
                </div>
              </h3>

              <div className="mortgage-calc-box">
                {/* Sliders & Inputs */}
                <div>
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      <span>Property Consideration Value</span>
                      <span>{formatCroresLakhs(homePrice)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10000000" 
                      max="500000000" 
                      step="5000000" 
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--color-accent-blue)' }}
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <span>{formatCroresLakhs(downPaymentAmount)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="15" 
                      max="50" 
                      step="5" 
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--color-accent-blue)' }}
                    />
                  </div>

                  <div className="mortgage-inputs-row">
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Bank Interest Rate (% p.a.)</label>
                      <input 
                        type="number" 
                        step="0.05" 
                        className="form-input" 
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                      />
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>HDFC / SBI Repo Benchmark</span>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Loan Tenure (Years)</label>
                      <select 
                        className="form-select"
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      >
                        <option value={15}>15 Years</option>
                        <option value={20}>20 Years (Standard)</option>
                        <option value={25}>25 Years</option>
                        <option value={30}>30 Years</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="payment-display-card">
                  <div style={{ fontSize: '0.85rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                    Estimated Monthly Home Loan EMI
                  </div>
                  <div className="monthly-payment-amount">
                    ₹{monthlyEMI.toLocaleString('en-IN')}
                    <span style={{ fontSize: '1rem', fontWeight: 500, color: '#cbd5e1' }}> / mo</span>
                  </div>

                  <div style={{ textAlign: 'left', marginTop: '1.25rem', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#cbd5e1' }}>Loan Amount:</span>
                      <span style={{ fontWeight: 700 }}>{formatCroresLakhs(principalAmount)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#cbd5e1' }}>Est. Stamp Duty (~6%):</span>
                      <span style={{ fontWeight: 700 }}>{formatCroresLakhs(stampDutyAndReg)}</span>
                    </div>
                    {monthlyMaintenance > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#cbd5e1' }}>Society Maintenance:</span>
                        <span style={{ fontWeight: 700 }}>₹{monthlyMaintenance.toLocaleString('en-IN')} / mo</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Neighborhood & Connectivity */}
            <div id="connectivity" className="details-card-section">
              <h3 className="details-section-heading">Micro-Market Connectivity & Locality Infrastructure</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>{property.neighborhood.walkScore}/100</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>CIVIC INFRA</div>
                </div>
                <div style={{ padding: '1rem', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>{property.neighborhood.transitScore}/100</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>METRO & AIRPORT</div>
                </div>
                <div style={{ padding: '1rem', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>{property.neighborhood.schoolsScore}/100</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>INTL SCHOOLS</div>
                </div>
                <div style={{ padding: '1rem', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>{property.neighborhood.safetyScore}/100</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>SAFETY INDEX</div>
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>Nearby Key Landmarks</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {property.neighborhood.nearbyPlaces.map((place, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 600 }}>{place.name}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Agent & Tour Schedule Sidebar */}
          <div className="details-sidebar-sticky">
            {/* Agent Contact Card */}
            <div id="advisor" className="agent-contact-card">
              <div className="agent-profile-header">
                <img 
                  src={agent?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"} 
                  alt={agent?.name || "Senior Partner"} 
                  className="agent-avatar-lg" 
                />
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{agent?.name || "Rajesh Singhania"}</h4>
                  <div style={{ color: 'var(--color-accent-blue)', fontSize: '0.8rem', fontWeight: 600 }}>{agent?.title || "Senior Partner"}</div>
                  <div style={{ fontSize: '0.725rem', color: '#16a34a', fontWeight: 700, marginTop: '0.2rem' }}>
                    {agent?.reraNumber || "MahaRERA: A51900028912"}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#c29d59', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.25rem' }}>
                    <Star size={13} fill="#c29d59" /> {agent?.rating || 4.98} ({agent?.reviewsCount || 156} reviews)
                  </div>
                </div>
              </div>

              {/* Direct Booking Actions */}
              <button 
                className="btn btn-gold btn-block btn-lg"
                style={{ marginBottom: '0.85rem' }}
                onClick={() => onOpenScheduleTour(property, agent)}
              >
                Schedule Private Site Visit
              </button>

              <button 
                className="btn btn-outline btn-block"
                style={{ marginBottom: '1.25rem' }}
                onClick={() => onSelectAgent(agent)}
              >
                View Advisor Dossier
              </button>

              {/* Agent contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem' }}>
                <a href={`tel:${agent?.phone}`} className="btn btn-light btn-sm btn-block" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
                  <Phone size={14} color="var(--color-accent-blue)" /> {agent?.phone || "+91 98201 44820"}
                </a>
                <a href={`mailto:${agent?.email}`} className="btn btn-light btn-sm btn-block" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
                  <Mail size={14} color="var(--color-accent-blue)" /> {agent?.email || "rajesh.singhania@luxehaven.in"}
                </a>
              </div>
            </div>

            {/* Guaranteed RERA Clearance Card */}
            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'center'
            }}>
              <ShieldCheck size={28} color="#2563eb" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.825rem', color: '#1e3a8a' }}>
                <strong>100% RERA Verified Asset.</strong> Clean 30-year title search, sanctioned approvals, and Occupancy Certificate (OC) audited.
              </div>
            </div>
          </div>
        </div>

        {/* 6. Similar Recommended Properties */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Similar Luxury Residences in {property.city}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Comparable signature homes matching this architectural format</p>
              </div>
              <button className="btn btn-outline" onClick={() => onNavigate('properties')}>
                Browse All Properties <ArrowRight size={16} />
              </button>
            </div>

            <div className="properties-grid">
              {similarProperties.slice(0, 3).map((simProp) => (
                <PropertyCard
                  key={simProp.id}
                  property={simProp}
                  isFavorite={isFavorite}
                  isCompared={isCompared}
                  onToggleFavorite={onToggleFavorite}
                  onToggleCompare={onToggleCompare}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile & Tablet Floating Bottom Action Bar */}
      <div className="mobile-property-bottom-bar">
        <div className="mobile-bottom-bar-price">
          <div className="mobile-bottom-price-val">{property.priceFormatted}</div>
          <div className="mobile-bottom-price-sqft">{property.pricePerSqFt}</div>
        </div>
        <div className="mobile-bottom-bar-actions">
          <button 
            type="button" 
            className="btn btn-gold btn-sm"
            onClick={() => onOpenScheduleTour(property)}
          >
            <Calendar size={15} /> <span>Book Tour</span>
          </button>
          <button 
            type="button" 
            className="btn btn-outline btn-sm mobile-advisor-btn"
            onClick={() => onSelectAgent(agent || property.agent)}
          >
            <Phone size={15} /> <span>Advisor</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setLightboxOpen(false)}
          style={{ backgroundColor: 'rgba(9, 14, 23, 0.95)' }}
        >
          <button 
            type="button" 
            className="btn btn-ghost btn-icon"
            onClick={() => setLightboxOpen(false)}
            style={{ position: 'absolute', top: 20, right: 20, color: '#ffffff', zIndex: 1100 }}
          >
            <X size={28} />
          </button>

          <button 
            type="button" 
            className="btn btn-ghost btn-icon"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#ffffff', zIndex: 1100, width: 50, height: 50, background: 'rgba(255,255,255,0.1)' }}
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            type="button" 
            className="btn btn-ghost btn-icon"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: '#ffffff', zIndex: 1100, width: 50, height: 50, background: 'rgba(255,255,255,0.1)' }}
          >
            <ChevronRight size={32} />
          </button>

          <div style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={property.images[currentImageIdx]} 
              alt={`${property.title} - photo ${currentImageIdx + 1}`} 
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 'var(--radius-md)' }} 
            />
            <div style={{ color: '#ffffff', marginTop: '1rem', fontSize: '0.95rem' }}>
              Photo {currentImageIdx + 1} of {property.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
