import React, { useState } from 'react';
import { 
  Building2, 
  Heart, 
  SlidersHorizontal, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown, 
  PlusCircle,
  Home,
  Compass,
  Users,
  Mail
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({ 
  currentView, 
  onNavigate, 
  favoritesCount = 0, 
  compareCount = 0,
  currentUser, 
  onOpenAuth, 
  onLogout,
  onOpenFavorites,
  onOpenCompare
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => handleNavClick('home')} role="button" tabIndex={0}>
          <div className="brand-icon">
            <Building2 size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">LuxeHaven</span>
            <span className="brand-tagline">Real Estate & Living</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-menu">
            <li>
              <button 
                className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${currentView === 'properties' ? 'active' : ''}`}
                onClick={() => handleNavClick('properties')}
              >
                Properties
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${currentView === 'agents' ? 'active' : ''}`}
                onClick={() => handleNavClick('agents')}
              >
                Agents
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Compare Button */}
          <button 
            className="nav-icon-btn" 
            title="Compare Properties"
            onClick={onOpenCompare}
          >
            <SlidersHorizontal size={18} />
            {compareCount > 0 && <span className="nav-badge-count">{compareCount}</span>}
          </button>

          {/* Saved / Favorites Button */}
          <button 
            className="nav-icon-btn" 
            title="Saved Favorites"
            onClick={onOpenFavorites}
          >
            <Heart size={18} fill={favoritesCount > 0 ? "#ef4444" : "none"} color={favoritesCount > 0 ? "#ef4444" : "currentColor"} />
            {favoritesCount > 0 && <span className="nav-badge-count">{favoritesCount}</span>}
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button 
                className="user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar-small" />
                <span className="user-name-small">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={14} color="#64748b" />
              </button>

              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  backgroundColor: '#ffffff',
                  boxShadow: 'var(--shadow-xl)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem',
                  minWidth: '200px',
                  zIndex: 950,
                  border: '1px solid var(--color-border-subtle)',
                  animation: 'fadeIn 0.15s ease-out'
                }}>
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--color-border-subtle)', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{currentUser.email}</div>
                  </div>
                  <button 
                    className="btn btn-ghost btn-sm btn-block" 
                    style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.25rem' }}
                    onClick={() => {
                      onOpenFavorites();
                      setUserDropdownOpen(false);
                    }}
                  >
                    <Heart size={14} /> My Saved Homes ({favoritesCount})
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm btn-block" 
                    style={{ justifyContent: 'flex-start', gap: '0.5rem', color: '#ef4444' }}
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="btn btn-primary btn-sm"
              onClick={onOpenAuth}
            >
              <User size={16} /> Sign In
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <button 
            className={`mobile-nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Home size={18} /> Home Portfolio</span>
            <ChevronRight size={16} color="#94a3b8" />
          </button>
          <button 
            className={`mobile-nav-link ${currentView === 'properties' ? 'active' : ''}`}
            onClick={() => handleNavClick('properties')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Compass size={18} /> Explore Residences</span>
            <ChevronRight size={16} color="#94a3b8" />
          </button>
          <button 
            className={`mobile-nav-link ${currentView === 'agents' ? 'active' : ''}`}
            onClick={() => handleNavClick('agents')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Users size={18} /> Executive Advisors</span>
            <ChevronRight size={16} color="#94a3b8" />
          </button>
          <button 
            className={`mobile-nav-link ${currentView === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Mail size={18} /> Contact & Inquiries</span>
            <ChevronRight size={16} color="#94a3b8" />
          </button>
          
          <div style={{ paddingTop: '0.75rem', display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline btn-block" onClick={() => { onOpenFavorites(); setMobileMenuOpen(false); }}>
              <Heart size={16} /> Saved ({favoritesCount})
            </button>
            <button className="btn btn-outline btn-block" onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}>
              <SlidersHorizontal size={16} /> Compare ({compareCount})
            </button>
          </div>

          <div className="mobile-nav-concierge-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.8rem' }}>
              <span>Bespoke Concierge:</span>
              <strong style={{ color: 'var(--color-primary)' }}>+91 (22) 6940-5800</strong>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
