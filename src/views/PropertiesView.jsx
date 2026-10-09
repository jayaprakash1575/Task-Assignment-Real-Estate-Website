import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  RotateCcw, 
  MapPin, 
  Check, 
  Home, 
  ArrowUpDown,
  Sparkles,
  IndianRupee
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { propertyTypes } from '../data/propertiesData';
import './PropertiesView.css';

const ALL_AMENITIES_OPTIONS = [
  "Sea View",
  "Private Swimming Pool",
  "Smart Home Automation",
  "100% Power Backup",
  "Golf Course View",
  "Private Elevator",
  "Vaastu Compliant",
  "Servant Quarters",
  "Private Cinema",
  "EV Charging",
  "Clubhouse & Spa"
];

export default function PropertiesView({ 
  properties = [], 
  favorites = [], 
  compared = [], 
  onToggleFavorite, 
  onToggleCompare, 
  onSelectProperty, 
  initialFilters = {} 
}) {
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(initialFilters.status || 'All');
  const [selectedType, setSelectedType] = useState(initialFilters.type || 'All Types');
  const [selectedCity, setSelectedCity] = useState(initialFilters.city || 'All');
  
  // Price limits (in INR)
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Specs filters
  const [selectedBeds, setSelectedBeds] = useState(0); // 0 = Any
  const [selectedBaths, setSelectedBaths] = useState(0); // 0 = Any

  // Amenities
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // UI state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Apply initial filters if passed from home hero
  React.useEffect(() => {
    if (initialFilters.status && initialFilters.status !== 'All') {
      setSelectedStatus(initialFilters.status);
    }
    if (initialFilters.type) {
      setSelectedType(initialFilters.type);
    }
    if (initialFilters.city) {
      setSelectedCity(initialFilters.city);
    }
    if (initialFilters.priceRange) {
      if (initialFilters.priceRange === 'Under ₹5 Cr') {
        setMinPrice('');
        setMaxPrice(50000000);
      } else if (initialFilters.priceRange === '₹5 Cr - ₹15 Cr') {
        setMinPrice(50000000);
        setMaxPrice(150000000);
      } else if (initialFilters.priceRange === '₹15 Cr - ₹30 Cr') {
        setMinPrice(150000000);
        setMaxPrice(300000000);
      } else if (initialFilters.priceRange === '₹30 Cr+') {
        setMinPrice(300000000);
        setMaxPrice('');
      }
    }
  }, [initialFilters]);

  // Toggle amenity
  const handleToggleAmenity = (amenity) => {
    setSelectedAmenities((prev) => 
      prev.includes(amenity) 
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedType('All Types');
    setSelectedCity('All');
    setMinPrice('');
    setMaxPrice('');
    setSelectedBeds(0);
    setSelectedBaths(0);
    setSelectedAmenities([]);
    setSortBy('featured');
  };

  // Filtered and Sorted list calculation
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Text Search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesText = 
          prop.title.toLowerCase().includes(query) ||
          prop.city.toLowerCase().includes(query) ||
          prop.neighborhoodName.toLowerCase().includes(query) ||
          prop.address.toLowerCase().includes(query) ||
          prop.type.toLowerCase().includes(query) ||
          (prop.reraId && prop.reraId.toLowerCase().includes(query));
        if (!matchesText) return false;
      }

      // 2. Status (For Sale / For Rent)
      if (selectedStatus !== 'All' && prop.status !== selectedStatus) {
        return false;
      }

      // 3. Property Type
      if (selectedType !== 'All Types' && prop.type !== selectedType) {
        return false;
      }

      // 4. City Location
      if (selectedCity !== 'All' && !prop.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      // 5. Price bounds
      if (minPrice && prop.price < Number(minPrice)) {
        return false;
      }
      if (maxPrice && prop.price > Number(maxPrice)) {
        return false;
      }

      // 6. Bedrooms
      if (selectedBeds > 0 && prop.bedrooms < selectedBeds) {
        return false;
      }

      // 7. Bathrooms
      if (selectedBaths > 0 && prop.bathrooms < selectedBaths) {
        return false;
      }

      // 8. Amenities (must match all selected)
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) => 
          prop.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'sqft-desc') return b.sqft - a.sqft;
      if (sortBy === 'beds-desc') return b.bedrooms - a.bedrooms;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    properties, 
    searchQuery, 
    selectedStatus, 
    selectedType, 
    selectedCity, 
    minPrice, 
    maxPrice, 
    selectedBeds, 
    selectedBaths, 
    selectedAmenities, 
    sortBy
  ]);

  // Count active filters
  const hasActiveFilters = 
    searchQuery !== '' ||
    selectedStatus !== 'All' ||
    selectedType !== 'All Types' ||
    selectedCity !== 'All' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    selectedBeds > 0 ||
    selectedBaths > 0 ||
    selectedAmenities.length > 0;

  return (
    <div className="properties-page">
      {/* Hero Header */}
      <div className="properties-hero-header">
        <div className="container">
          <h1 className="properties-hero-title">Indian Luxury Properties Portfolio</h1>
          <p className="properties-hero-desc">
            Explore verified RERA certified architectural penthouses, sea-facing duplexes, and heritage Goan villas across Mumbai, Gurgaon, Delhi, Goa, Bengaluru, and Hyderabad.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Main Filter Bar Card */}
        <div className="filter-bar-card">
          {/* Top Status Tabs */}
          <div className="properties-status-tab-wrapper">
            <div className="tab-pill-group properties-status-tabs">
              <button 
                type="button" 
                className={`tab-pill-item ${selectedStatus === 'All' ? 'active-gold' : ''}`}
                onClick={() => setSelectedStatus('All')}
              >
                All Residences ({properties.length})
              </button>
              <button 
                type="button" 
                className={`tab-pill-item ${selectedStatus === 'For Sale' ? 'active-gold' : ''}`}
                onClick={() => setSelectedStatus('For Sale')}
              >
                Buy / For Sale ({properties.filter(p => p.status === 'For Sale').length})
              </button>
              <button 
                type="button" 
                className={`tab-pill-item ${selectedStatus === 'For Rent' ? 'active-gold' : ''}`}
                onClick={() => setSelectedStatus('For Rent')}
              >
                Luxury Rentals ({properties.filter(p => p.status === 'For Rent').length})
              </button>
            </div>
          </div>

          <div className="filter-main-row">
            {/* Search Input */}
            <div className="search-input-box">
              <Search size={18} className="search-input-icon" />
              <input 
                type="text" 
                className="form-input" 
                style={{ paddingLeft: '2.6rem', paddingRight: '2rem' }}
                placeholder="Search city, locality (Worli, DLF, Assagao, Jubilee Hills), RERA ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search text"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* City Location */}
            <div>
              <select 
                className="form-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="All">All Indian Cities</option>
                <option value="Mumbai">Mumbai (Worli, Bandra)</option>
                <option value="Gurgaon">Gurgaon (DLF 5, Golf Course)</option>
                <option value="Goa">Goa (Assagao, Anjuna)</option>
                <option value="Hyderabad">Hyderabad (Jubilee Hills)</option>
                <option value="Bengaluru">Bengaluru (Sadashivnagar)</option>
                <option value="New Delhi">New Delhi (Chhatarpur)</option>
                <option value="Pune">Pune (Koregaon Park)</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <select 
                className="form-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Advanced Filters Button */}
            <div>
              <button 
                type="button" 
                className={`btn ${showAdvancedFilters ? 'btn-primary' : 'btn-outline'}`}
                style={{ width: '100%', height: '44px' }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <SlidersHorizontal size={16} />
                <span>Filters {selectedAmenities.length + (selectedBeds > 0 ? 1 : 0) + (selectedBaths > 0 ? 1 : 0) > 0 ? `(${selectedAmenities.length + (selectedBeds > 0 ? 1 : 0) + (selectedBaths > 0 ? 1 : 0)})` : ''}</span>
              </button>
            </div>
          </div>

          {/* Collapsible Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="advanced-filters-panel">
              <div className="advanced-filters-grid">
                {/* City Location */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Prime Indian City</label>
                  <select 
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="All">All Indian Cities</option>
                    <option value="Mumbai">Mumbai (Worli, Bandra, Pali Hill)</option>
                    <option value="Gurgaon">Gurgaon (Golf Course Road, DLF 5)</option>
                    <option value="Goa">Goa (Assagao, Anjuna, Candolim)</option>
                    <option value="Hyderabad">Hyderabad (Jubilee Hills)</option>
                    <option value="Bengaluru">Bengaluru (Sadashivnagar)</option>
                    <option value="New Delhi">New Delhi (Chhatarpur Farms)</option>
                    <option value="Pune">Pune (Koregaon Park)</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Price Range in INR (₹)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="Min INR" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="Max INR" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Bedrooms (BHK)</label>
                  <div className="number-selector-row">
                    {[0, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`number-pill-btn ${selectedBeds === num ? 'active' : ''}`}
                        onClick={() => setSelectedBeds(num)}
                      >
                        {num === 0 ? 'Any' : `${num}+ BHK`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Bathrooms</label>
                  <div className="number-selector-row">
                    {[0, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`number-pill-btn ${selectedBaths === num ? 'active' : ''}`}
                        onClick={() => setSelectedBaths(num)}
                      >
                        {num === 0 ? 'Any' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amenities Checkboxes */}
              <div>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Signature Inclusions & Features</label>
                <div className="amenities-filter-grid">
                  {ALL_AMENITIES_OPTIONS.map((amenity) => (
                    <label key={amenity} className="amenity-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleToggleAmenity(amenity)}
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="active-filters-row">
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Active Filters:</span>
            
            {searchQuery && (
              <span className="filter-chip">
                Search: "{searchQuery}"
                <button type="button" className="filter-chip-remove" onClick={() => setSearchQuery('')}><X size={13} /></button>
              </span>
            )}

            {selectedStatus !== 'All' && (
              <span className="filter-chip">
                Status: {selectedStatus}
                <button type="button" className="filter-chip-remove" onClick={() => setSelectedStatus('All')}><X size={13} /></button>
              </span>
            )}

            {selectedType !== 'All Types' && (
              <span className="filter-chip">
                Type: {selectedType}
                <button type="button" className="filter-chip-remove" onClick={() => setSelectedType('All Types')}><X size={13} /></button>
              </span>
            )}

            {selectedCity !== 'All' && (
              <span className="filter-chip">
                City: {selectedCity}
                <button type="button" className="filter-chip-remove" onClick={() => setSelectedCity('All')}><X size={13} /></button>
              </span>
            )}

            {(minPrice || maxPrice) && (
              <span className="filter-chip">
                Price: {minPrice ? `₹${(Number(minPrice)/10000000).toFixed(2)} Cr` : '₹0'} - {maxPrice ? `₹${(Number(maxPrice)/10000000).toFixed(2)} Cr` : 'Any'}
                <button type="button" className="filter-chip-remove" onClick={() => { setMinPrice(''); setMaxPrice(''); }}><X size={13} /></button>
              </span>
            )}

            {selectedBeds > 0 && (
              <span className="filter-chip">
                Beds: {selectedBeds}+ BHK
                <button type="button" className="filter-chip-remove" onClick={() => setSelectedBeds(0)}><X size={13} /></button>
              </span>
            )}

            {selectedBaths > 0 && (
              <span className="filter-chip">
                Baths: {selectedBaths}+
                <button type="button" className="filter-chip-remove" onClick={() => setSelectedBaths(0)}><X size={13} /></button>
              </span>
            )}

            {selectedAmenities.map((amenity) => (
              <span key={amenity} className="filter-chip">
                {amenity}
                <button type="button" className="filter-chip-remove" onClick={() => handleToggleAmenity(amenity)}><X size={13} /></button>
              </span>
            ))}

            <button 
              type="button" 
              className="btn btn-ghost btn-sm" 
              style={{ color: '#ef4444', fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}
              onClick={handleResetFilters}
            >
              <RotateCcw size={13} /> Reset All
            </button>
          </div>
        )}

        {/* Results Toolbar */}
        <div className="results-toolbar">
          <div className="results-count-text">
            Showing {filteredProperties.length} of {properties.length} Luxury Residences
          </div>

          <div className="results-toolbar-actions">
            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Sort by:</span>
              <select 
                className="form-select" 
                style={{ width: 'auto', padding: '0.45rem 2rem 0.45rem 0.75rem', fontSize: '0.875rem' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="sqft-desc">Carpet Area: Largest First</option>
                <option value="beds-desc">Bedrooms: Most First</option>
              </select>
            </div>

            {/* View Mode Switcher (Grid vs List) */}
            <div className="view-toggle-group">
              <button 
                type="button" 
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                type="button" 
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Rendering */}
        {filteredProperties.length === 0 ? (
          <div className="empty-results-box">
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'var(--color-bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              color: '#94a3b8'
            }}>
              <Search size={30} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Matching Residences Found</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              No listings matched your active criteria in this Indian market. Try adjusting your budget slider, bedroom requirement, or clearing specific amenities.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              <RotateCcw size={16} /> Reset All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'properties-grid' : ''} style={{ display: viewMode === 'list' ? 'flex' : undefined, flexDirection: viewMode === 'list' ? 'column' : undefined, gap: viewMode === 'list' ? '1.5rem' : undefined }}>
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={favorites.includes(prop.id)}
                isCompared={compared.includes(prop.id)}
                onToggleFavorite={onToggleFavorite}
                onToggleCompare={onToggleCompare}
                onSelectProperty={onSelectProperty}
                isListView={viewMode === 'list'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
