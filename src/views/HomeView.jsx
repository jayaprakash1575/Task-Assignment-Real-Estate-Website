import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  IndianRupee, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Key, 
  TrendingUp, 
  Video, 
  Star, 
  ArrowRight, 
  CheckCircle2,
  Building,
  Award
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { propertyTypes, priceRanges } from '../data/propertiesData';
import { testimonialsData } from '../data/testimonialsData';
import './HomeView.css';

export default function HomeView({ 
  properties = [], 
  agents = [], 
  favorites = [], 
  compared = [], 
  onToggleFavorite, 
  onToggleCompare, 
  onSelectProperty, 
  onNavigate, 
  onApplyFilters,
  onSelectAgent
}) {
  // Hero Search State
  const [searchPurpose, setSearchPurpose] = useState('For Sale');
  const [searchLocation, setSearchLocation] = useState('All');
  const [searchType, setSearchType] = useState('All Types');
  const [searchPriceRange, setSearchPriceRange] = useState('Any Price');

  // Featured Properties Filter Tab
  const [featuredTab, setFeaturedTab] = useState('All');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (onApplyFilters) {
      onApplyFilters({
        status: searchPurpose,
        city: searchLocation === 'All' ? '' : searchLocation,
        type: searchType === 'All Types' ? '' : searchType,
        priceRange: searchPriceRange
      });
    }
    onNavigate('properties');
  };

  const handleCategoryClick = (typeName) => {
    if (onApplyFilters) {
      onApplyFilters({
        type: typeName,
        status: 'All',
        city: '',
        priceRange: 'Any Price'
      });
    }
    onNavigate('properties');
  };

  const handleQuickCityClick = (cityName) => {
    let targetCity = cityName;
    if (cityName === 'Worli Sea Face') targetCity = 'Mumbai';
    if (cityName === 'DLF Camellias') targetCity = 'Gurgaon';
    if (cityName === 'Assagao Goa') targetCity = 'Goa';
    if (cityName === 'Jubilee Hills') targetCity = 'Hyderabad';
    if (cityName === 'Sadashivnagar') targetCity = 'Bengaluru';

    if (onApplyFilters) {
      onApplyFilters({
        city: targetCity,
        status: 'All',
        type: '',
        priceRange: 'Any Price'
      });
    }
    onNavigate('properties');
  };

  // Filtered featured list
  const featuredProperties = properties
    .filter(p => p.isFeatured)
    .filter(p => featuredTab === 'All' ? true : p.type === featuredTab);

  return (
    <div className="home-view">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} /> 100% RERA Verified Luxury Portfolio • India
          </div>
          
          <h1 className="hero-title">
            Find Your Sanctuary in <span className="text-gradient-gold">Exceptional Indian Spaces</span>
          </h1>

          <p className="hero-subtitle">
            An elite curated portfolio of sea-facing Mumbai penthouses, DLF golf sky mansions, Portuguese Goan estates, and royal Bengaluru garden residences.
          </p>

          {/* Hero Search Box */}
          <div className="hero-search-card">
            <div className="hero-search-tabs-row">
              <div className="tab-pill-group hero-tab-pill-group">
                <button 
                  type="button"
                  className={`tab-pill-item ${searchPurpose === 'For Sale' ? 'active-gold' : ''}`}
                  onClick={() => setSearchPurpose('For Sale')}
                >
                  <Key size={15} /> Buy A Residence
                </button>
                <button 
                  type="button"
                  className={`tab-pill-item ${searchPurpose === 'For Rent' ? 'active-gold' : ''}`}
                  onClick={() => setSearchPurpose('For Rent')}
                >
                  <Home size={15} /> Rent Luxury Home
                </button>
              </div>
            </div>

            <form onSubmit={handleHeroSearch} className="hero-search-fields-grid">
              {/* Location */}
              <div className="hero-search-field">
                <label className="hero-field-label">Prime Indian Corridor</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: 12, top: 13, color: '#64748b' }} />
                  <select 
                    className="form-select" 
                    style={{ paddingLeft: '2.4rem' }}
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  >
                    <option value="All">All Prime Indian Markets</option>
                    <option value="Mumbai">Mumbai (Worli, Bandra, Pali Hill)</option>
                    <option value="Gurgaon">Gurgaon (Golf Course Road, DLF 5)</option>
                    <option value="New Delhi">New Delhi (Chhatarpur, Lutyens')</option>
                    <option value="Goa">Goa (Assagao, Anjuna, Candolim)</option>
                    <option value="Bengaluru">Bengaluru (Sadashivnagar, Indiranagar)</option>
                    <option value="Hyderabad">Hyderabad (Jubilee Hills)</option>
                    <option value="Pune">Pune (Koregaon Park)</option>
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div className="hero-search-field">
                <label className="hero-field-label">Property Architecture</label>
                <div style={{ position: 'relative' }}>
                  <Home size={16} style={{ position: 'absolute', left: 12, top: 13, color: '#64748b' }} />
                  <select 
                    className="form-select" 
                    style={{ paddingLeft: '2.4rem' }}
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div className="hero-search-field">
                <label className="hero-field-label">Budget Bracket (INR)</label>
                <div style={{ position: 'relative' }}>
                  <IndianRupee size={16} style={{ position: 'absolute', left: 12, top: 13, color: '#64748b' }} />
                  <select 
                    className="form-select" 
                    style={{ paddingLeft: '2.4rem' }}
                    value={searchPriceRange}
                    onChange={(e) => setSearchPriceRange(e.target.value)}
                  >
                    {priceRanges.map((r) => (
                      <option key={r.label} value={r.label}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div>
                <button type="submit" className="btn btn-gold btn-lg" style={{ height: '46px', width: '100%' }}>
                  <Search size={18} />
                  <span>Search Residences</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Enclave Shortcuts */}
          <div className="hero-quick-cities">
            <span className="quick-cities-label">Signature Enclaves:</span>
            {['Worli Sea Face', 'DLF Camellias', 'Assagao Goa', 'Jubilee Hills', 'Sadashivnagar'].map((city) => (
              <button 
                key={city}
                type="button"
                className="quick-city-tag"
                onClick={() => handleQuickCityClick(city)}
              >
                <MapPin size={12} /> {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Stats Ribbon */}
      <section className="stats-ribbon">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item-box">
              <div className="stat-item-number text-gradient-gold">₹12,500 Cr+</div>
              <div className="stat-item-label">Private Portfolio Transacted</div>
            </div>
            <div className="stat-item-box">
              <div className="stat-item-number">100% RERA</div>
              <div className="stat-item-label">Verified Clear Titles</div>
            </div>
            <div className="stat-item-box">
              <div className="stat-item-number text-gradient-blue">99.4%</div>
              <div className="stat-item-label">HNI Satisfaction Rating</div>
            </div>
            <div className="stat-item-box">
              <div className="stat-item-number">8 Key Metros</div>
              <div className="stat-item-label">Ultra-Luxury Corridors</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Properties Portfolio */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag-gold">
              <Sparkles size={12} /> PRIVATE RESERVE PORTFOLIO
            </span>
            <h2 className="section-title">Signature Architectural Residences</h2>
            <p className="section-subtitle">
              Handpicked sea-facing sky villas, sprawling Chhatarpur farmhouses, and heritage Goan estates offering peerless distinction.
            </p>

            {/* Quick Filter tabs with count badges */}
            <div className="category-tabs-container">
              {[
                { key: 'All', label: 'All Featured Residences', count: properties.filter(p => p.isFeatured).length },
                { key: 'Villa', label: 'Sky & Heritage Villas', count: properties.filter(p => p.isFeatured && p.type === 'Villa').length },
                { key: 'Penthouse', label: 'Sea-Facing Penthouses', count: properties.filter(p => p.isFeatured && p.type === 'Penthouse').length },
                { key: 'Apartment', label: 'Luxury Sky Duplexes', count: properties.filter(p => p.isFeatured && p.type === 'Apartment').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`category-tab-btn ${featuredTab === tab.key ? 'active' : ''}`}
                  onClick={() => setFeaturedTab(tab.key)}
                >
                  <span>{tab.label}</span>
                  <span className="category-tab-count">{tab.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="properties-grid">
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                isCompared={compared.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onToggleCompare={onToggleCompare}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('properties')}
            >
              <span>Explore All {properties.length} Properties</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Explore by Lifestyle Category */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag-blue">Indian Lifestyles</span>
            <h2 className="section-title">Discover by Signature Living Style</h2>
            <p className="section-subtitle">
              Whether you desire the Arabian Sea breeze in Mumbai, golf greens in Gurgaon, or an Assagao holiday haven in Goa.
            </p>
          </div>

          <div className="types-grid">
            <div className="type-card" onClick={() => handleCategoryClick('Penthouse')}>
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" 
                alt="Sea-Facing Penthouses" 
                className="type-card-img" 
              />
              <div className="type-card-overlay">
                <h3 className="type-card-title">Worli Sea-Facing Penthouses</h3>
                <span className="type-card-count">Panoramic Arabian Sea & Sea Link views</span>
              </div>
            </div>

            <div className="type-card" onClick={() => handleCategoryClick('Villa')}>
              <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80" 
                alt="Goa Portuguese Villas" 
                className="type-card-img" 
              />
              <div className="type-card-overlay">
                <h3 className="type-card-title">Goa Heritage Villas</h3>
                <span className="type-card-count">Assagao private pools & orchard gardens</span>
              </div>
            </div>

            <div className="type-card" onClick={() => handleCategoryClick('Penthouse')}>
              <img 
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80" 
                alt="Golf Facing Sky Villas" 
                className="type-card-img" 
              />
              <div className="type-card-overlay">
                <h3 className="type-card-title">DLF Golf Sky Villas</h3>
                <span className="type-card-count">The Camellias, Golf Course Road</span>
              </div>
            </div>

            <div className="type-card" onClick={() => handleCategoryClick('Modern House')}>
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" 
                alt="Delhi Farmhouses" 
                className="type-card-img" 
              />
              <div className="type-card-overlay">
                <h3 className="type-card-title">South Delhi Farmhouses</h3>
                <span className="type-card-count">Chhatarpur & DLF green acreage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The LuxeHaven Advantage */}
      <section className="section-padding advantage-section">
        <div className="container">
          <div className="section-header" style={{ color: '#ffffff' }}>
            <span className="section-tag" style={{ background: 'rgba(194, 157, 89, 0.2)', color: '#fde047', borderColor: '#c29d59' }}>
              The Indian Advantage
            </span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>Setting the Standard for Indian Real Estate Advisory</h2>
            <p className="section-subtitle" style={{ color: '#94a3b8' }}>
              Discreet, institutional-grade representation across India backed by strict RERA due diligence and private wealth coordination.
            </p>
          </div>

          <div className="advantage-grid">
            <div className="advantage-card">
              <div className="advantage-icon-box">
                <Key size={26} />
              </div>
              <h3 className="advantage-title">Confidential Pocket Inventory</h3>
              <p className="advantage-desc">
                Exclusive access to unadvertised bungalows in Pali Hill, Lutyens' Delhi, and Jubilee Hills protected by iron-clad NDAs.
              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-icon-box">
                <ShieldCheck size={26} />
              </div>
              <h3 className="advantage-title">100% RERA & Title Clearance</h3>
              <p className="advantage-desc">
                Independent advocate title searches, 30-year Encumbrance Certificates (EC), and verified Occupancy Certificates (OC).
              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-icon-box">
                <TrendingUp size={26} />
              </div>
              <h3 className="advantage-title">NRI & FEMA Capital Advisory</h3>
              <p className="advantage-desc">
                Specialized advisory for Non-Resident Indians on NRE/NRO banking, RBI repatriation (15CA/15CB), and Power of Attorney.
              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-icon-box">
                <Video size={26} />
              </div>
              <h3 className="advantage-title">Architectural Drone & 3D Tours</h3>
              <p className="advantage-desc">
                Tour signature residences from anywhere in the world with millimeter-accurate 4K 3D walk-throughs and aerial views.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Top Real Estate Agents Showcase */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag-blue">RERA Accredited Partners</span>
            <h2 className="section-title">Meet Our Senior Managing Partners</h2>
            <p className="section-subtitle">
              India's most trusted luxury real estate advisors commanding billions in transactions with proven confidentiality.
            </p>
          </div>

          <div className="agents-grid-preview">
            {agents.slice(0, 3).map((agent) => (
              <div key={agent.id} className="agent-preview-card">
                <img src={agent.avatar} alt={agent.name} className="agent-preview-avatar" />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{agent.name}</h3>
                <div style={{ color: 'var(--color-accent-blue)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  {agent.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {agent.reraNumber}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: '#c29d59', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
                  <Star size={14} fill="#c29d59" /> {agent.rating} ({agent.reviewsCount} reviews)
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '0.85rem 0',
                  borderTop: '1px solid var(--color-border-subtle)',
                  borderBottom: '1px solid var(--color-border-subtle)',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{agent.salesVolume}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Career Volume</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{agent.activeListingsCount}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Active Listings</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-outline btn-sm btn-block"
                    onClick={() => onSelectAgent(agent)}
                  >
                    View Profile
                  </button>
                  <a 
                    href={`tel:${agent.phone}`} 
                    className="btn btn-primary btn-sm btn-block"
                  >
                    Contact
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="btn btn-outline" onClick={() => onNavigate('agents')}>
              <span>View All 5 Senior Advisors</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">HNI Client Endorsements</span>
            <h2 className="section-title">Endorsed by Prominent Leaders</h2>
            <p className="section-subtitle">
              Read how industrialists, unicorn tech founders, and private equity heads acquired their trophy residences with LuxeHaven.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonialsData.map((test) => (
              <div key={test.id} className="testimonial-card">
                <div>
                  <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem', color: '#c29d59' }}>
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#c29d59" />
                    ))}
                  </div>
                  <p className="testimonial-quote">"{test.quote}"</p>
                </div>

                <div className="testimonial-author">
                  <img src={test.avatar} alt={test.clientName} className="testimonial-avatar" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>
                      {test.clientName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {test.role}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-blue)', fontWeight: 600 }}>
                      Acquired: {test.propertyAcquired}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="container" style={{ paddingBottom: '5rem', paddingTop: '1rem' }}>
        <div className="sell-cta-banner">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fde047', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              <Award size={16} /> Private Client Group
            </div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '0.85rem' }}>
              Planning to Sell or Lease an Ultra-Luxury Indian Property?
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '580px', lineHeight: 1.6 }}>
              Receive an uncompromising comparative market valuation, architectural cinematography, and discreet exposure to qualified Indian industrialists and NRI buyers.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flexShrink: 0 }}>
            <button 
              className="btn btn-gold btn-lg"
              onClick={() => onNavigate('contact')}
            >
              Request Private Valuation
            </button>
            <button 
              className="btn btn-outline btn-lg"
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
              onClick={() => onNavigate('agents')}
            >
              Consult an Executive Broker
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
