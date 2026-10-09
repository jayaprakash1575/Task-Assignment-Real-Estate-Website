import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  ShieldCheck,
  BadgeCheck
} from 'lucide-react';
import { faqData } from '../data/testimonialsData';
import './ContactView.css';

export default function ContactView({ currentUser, onShowToast }) {
  // Form State
  const [firstName, setFirstName] = useState(currentUser?.name ? currentUser.name.split(' ')[0] : '');
  const [lastName, setLastName] = useState(currentUser?.name ? currentUser.name.split(' ').slice(1).join(' ') : '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [inquiryType, setInquiryType] = useState('Buying');
  const [priceBracket, setPriceBracket] = useState('₹5 Cr - ₹15 Cr');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [requestCallback, setRequestCallback] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ open items state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !email || !message) {
      if (onShowToast) onShowToast("Please fill in your name, email, and message.", "warning");
      return;
    }

    setIsSubmitted(true);
    if (onShowToast) {
      onShowToast("Your confidential inquiry has been submitted! A senior Indian partner will reach out within 2 hours.", "success");
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setMessage('');
    setSubject('');
  };

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <div className="contact-hero">
        <div className="container">
          <span className="section-tag section-tag-blue" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Mail size={14} /> Private Concierge India
          </span>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            Connect with LuxeHaven India
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '680px', lineHeight: 1.6 }}>
            Whether acquiring a sea-facing Mumbai penthouse, an Assagao holiday villa, or organizing off-market Lutyens' Delhi acquisitions, our senior partners are at your service.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Direct Contact Cards */}
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <MapPin size={22} />
            </div>
            <h3 className="contact-info-title">India Headquarters</h3>
            <p className="contact-info-text">
              Maker Chambers IV, 14th Floor<br />
              Nariman Point, Mumbai 400021
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Phone size={22} />
            </div>
            <h3 className="contact-info-title">Telephone</h3>
            <p className="contact-info-text">
              Direct: +91 (22) 6940-5800<br />
              Toll Free: 1800-266-LUXE
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Mail size={22} />
            </div>
            <h3 className="contact-info-title">Confidential Desk</h3>
            <p className="contact-info-text">
              concierge@luxehaven.in<br />
              nri.desk@luxehaven.in
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Clock size={22} />
            </div>
            <h3 className="contact-info-title">Private Consultation</h3>
            <p className="contact-info-text">
              Mon – Sat: 9:00 AM – 8:00 PM IST<br />
              Sunday: By Prior Appointment
            </p>
          </div>
        </div>

        {/* Layout Grid: Inquiry Form (Left) & Regional Offices (Right) */}
        <div className="contact-layout-grid">
          {/* Inquiry Form */}
          <div className="contact-form-card">
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontWeight: 800 }}>
              Initiate a Confidential Inquiry
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              All correspondence is protected by strict non-disclosure agreements and routed directly to executive partners.
            </p>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <CheckCircle2 size={38} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Inquiry Registered Successfully</h3>
                <p style={{ color: 'var(--color-text-body)', fontSize: '1rem', maxWidth: 460, margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                  Thank you, <strong>{firstName}</strong>. A designated senior advisory partner has been assigned to your brief and will initiate confidential contact shortly.
                </p>
                <button className="btn btn-primary" onClick={handleResetForm}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Aditya" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Mittal" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="aditya.m@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="+91 98200 00000" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nature of Inquiry</label>
                    <select 
                      className="form-select"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                    >
                      <option value="Buying">Acquiring Luxury Indian Property</option>
                      <option value="Selling">Listing / Selling an Indian Asset</option>
                      <option value="NRI">NRI / Overseas Investment & FEMA</option>
                      <option value="Leasing">Luxury Lease / Corporate Expats</option>
                      <option value="Off-Market">Confidential Pocket Inventory</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target Investment Bracket (INR)</label>
                    <select 
                      className="form-select"
                      value={priceBracket}
                      onChange={(e) => setPriceBracket(e.target.value)}
                    >
                      <option value="Under ₹5 Cr">Under ₹5 Crore</option>
                      <option value="₹5 Cr - ₹15 Cr">₹5 Crore – ₹15 Crore</option>
                      <option value="₹15 Cr - ₹30 Cr">₹15 Crore – ₹30 Crore</option>
                      <option value="₹30 Cr+">₹30 Crore+ Trophy Assets</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Worli Sea Face Penthouse or Assagao Goa Villa"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Brief or Architectural Requirements</label>
                  <textarea 
                    className="form-textarea" 
                    rows={4}
                    placeholder="Share specific localities of interest, Vaastu preferences, timeline, or family office criteria..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                    <input 
                      type="checkbox" 
                      checked={requestCallback}
                      onChange={(e) => setRequestCallback(e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: 'var(--color-accent-blue)' }}
                    />
                    <span>Request a confidential phone callback within 2 business hours</span>
                  </label>
                </div>

                <button type="submit" className="btn btn-gold btn-block btn-lg">
                  <Send size={18} />
                  <span>Transmit Confidential Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Regional Flagships Card */}
          <div className="offices-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <Building2 size={24} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>National Flagships</h3>
            </div>

            <div className="office-branch-item">
              <div className="office-city">Mumbai Flagship (Nariman Point & BKC)</div>
              <div className="office-address">
                Maker Chambers IV, 14th Floor, Nariman Point<br />
                Mumbai, Maharashtra 400021<br />
                <span style={{ color: 'var(--color-accent-blue)', fontWeight: 600 }}>+91 (22) 6940-5800</span>
              </div>
            </div>

            <div className="office-branch-item">
              <div className="office-city">Gurgaon & Delhi NCR Private Salons</div>
              <div className="office-address">
                One Horizon Center, Golf Course Road, DLF 5<br />
                Gurgaon, Haryana 122002<br />
                <span style={{ color: 'var(--color-accent-blue)', fontWeight: 600 }}>+91 (124) 480-9200</span>
              </div>
            </div>

            <div className="office-branch-item">
              <div className="office-city">Bengaluru Garden City Office</div>
              <div className="office-address">
                Concorde Tower, UB City, Lavelle Road<br />
                Bengaluru, Karnataka 560001<br />
                <span style={{ color: 'var(--color-accent-blue)', fontWeight: 600 }}>+91 (80) 4650-1100</span>
              </div>
            </div>

            <div className="office-branch-item">
              <div className="office-city">Goa Heritage Studio</div>
              <div className="office-address">
                Fontainhas Heritage Quarter, Panjim<br />
                North Goa, Goa 403001<br />
                <span style={{ color: 'var(--color-accent-blue)', fontWeight: 600 }}>+91 (832) 242-7800</span>
              </div>
            </div>

            <div style={{
              marginTop: '1.75rem',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              <BadgeCheck size={24} color="#2563eb" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.8rem', color: '#1e3a8a' }}>
                All transactions adhere strictly to state RERA regulations and AML guidelines.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="faq-section">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 2.5rem auto' }}>
            <span className="section-tag">Frequently Asked Questions</span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem' }}>
              Frequently Asked Client & NRI Inquiries
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Insights into RERA compliance, stamp duty, NRI FEMA regulations, and home loan financing.
            </p>
          </div>

          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            {faqData.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="faq-item">
                  <button 
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{item.question}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--color-accent-blue)" /> : <ChevronDown size={20} color="#64748b" />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
