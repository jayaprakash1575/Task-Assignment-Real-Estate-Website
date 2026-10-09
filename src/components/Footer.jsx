import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck,
  BadgeCheck
} from 'lucide-react';
import './Footer.css';

export default function Footer({ onNavigate, onShowToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      if (onShowToast) onShowToast("Please enter a valid email address.", "warning");
      return;
    }
    setSubscribed(true);
    if (onShowToast) onShowToast("Thank you for subscribing to LuxeHaven India Private Portfolio Alerts!", "success");
    setNewsletterEmail('');
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-top">
        <div className="footer-grid">
          {/* Col 1: Brand & Philosophy */}
          <div className="footer-brand footer-panel">
            <div className="footer-logo">
              <div className="brand-icon" style={{ width: 38, height: 38 }}>
                <Building2 size={20} />
              </div>
              <div className="brand-text">
                <span className="brand-name" style={{ color: '#ffffff', fontSize: '1.25rem' }}>LuxeHaven</span>
                <span className="brand-tagline">India Luxury Real Estate</span>
              </div>
            </div>

            <p className="footer-desc">
              Pioneering institutional luxury real estate representation across India. From sea-facing South Mumbai penthouses to historic Portuguese estates in Goa, we advise discerning families and global leaders.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#94a3b8', fontSize: '0.85rem', flexWrap: 'wrap', wordBreak: 'break-word' }}>
              <BadgeCheck size={18} color="#16a34a" style={{ flexShrink: 0 }} />
              <span style={{ wordBreak: 'break-word' }}>100% RERA Registered Luxury Brokerage Collective</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-panel">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <button className="footer-link-btn" onClick={() => onNavigate('home')}>Home Portfolio</button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => onNavigate('properties')}>All Residences</button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => onNavigate('agents')}>Executive Advisors</button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => onNavigate('contact')}>Contact & Private Desk</button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => onNavigate('properties')}>Sea-Facing Penthouses</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Prime Indian Markets */}
          <div className="footer-panel">
            <h4 className="footer-col-title">Prime Markets</h4>
            <ul className="footer-links-list">
              <li><button className="footer-link-btn" onClick={() => onNavigate('properties')}>Mumbai (Worli & Pali Hill)</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('properties')}>Gurgaon (DLF Golf Course Rd)</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('properties')}>Goa (Assagao & Anjuna)</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('properties')}>Bengaluru (Sadashivnagar)</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('properties')}>Hyderabad (Jubilee Hills)</button></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-newsletter-box footer-panel">
            <h4 className="footer-col-title">VIP Private Portfolio</h4>
            <p className="footer-newsletter-text">
              Receive confidential off-market invitations and quarterly Indian luxury market intelligence directly in your inbox.
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} /> Subscribed to Private VIP alerts.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="footer-newsletter-input" 
                  required
                />
                <button type="submit" className="footer-newsletter-submit-btn" aria-label="Subscribe to VIP Portfolio">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.65rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-word', color: '#94a3b8' }}>
                <Phone size={14} color="#64748b" style={{ flexShrink: 0 }} /> <span>+91 (22) 6940-5800</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-word', color: '#94a3b8' }}>
                <Mail size={14} color="#64748b" style={{ flexShrink: 0 }} /> <span>concierge@luxehaven.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div>
            © {new Date().getFullYear()} LuxeHaven India Real Estate Advisory Pvt. Ltd. All Rights Reserved. RERA Compliant.
          </div>

          <div className="footer-social-row">
            {/* Instagram SVG */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* LinkedIn SVG */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            {/* X / Twitter SVG */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Twitter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
