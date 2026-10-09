import React, { useState } from 'react';
import { X, Calendar, Clock, Video, UserCheck, CheckCircle2, Phone, Mail } from 'lucide-react';

export default function ScheduleTourModal({ 
  isOpen, 
  onClose, 
  property, 
  agent,
  currentUser, 
  onShowToast 
}) {
  const [tourType, setTourType] = useState('in-person'); // 'in-person' or 'video'
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      if (onShowToast) onShowToast("Please provide your name and contact email.", "warning");
      return;
    }

    setIsSubmitted(true);
    if (onShowToast) {
      onShowToast(`Tour confirmed with ${agent?.name || 'Listing Agent'} for ${selectedDate} at ${selectedTime}!`, "success");
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleResetAndClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Schedule a Private Tour</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              VIP viewing at {property.title}
            </p>
          </div>
          <button 
            type="button" 
            className="btn btn-ghost btn-icon" 
            onClick={handleResetAndClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Property Brief Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 1.5rem',
          background: 'var(--color-bg-surface)',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}>
          <img 
            src={property.images[0]} 
            alt={property.title} 
            style={{ width: 68, height: 50, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>{property.title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{property.address}, {property.city}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-blue)' }}>{property.priceFormatted}</div>
          </div>
        </div>

        {isSubmitted ? (
          <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Viewing Request Reserved!</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem', maxWidth: 400, margin: '0 auto 1.5rem auto' }}>
              Your private <strong>{tourType === 'in-person' ? 'In-Person Tour' : 'Live Video Tour'}</strong> is registered for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
            </p>
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'left',
              fontSize: '0.85rem'
            }}>
              <div><strong>Senior Advisory Partner:</strong> {agent?.name || 'Rajesh Singhania'}</div>
              <div><strong>Advisor Phone:</strong> {agent?.phone || '+91 98201 44820'}</div>
              <div><strong>RERA Registration:</strong> {agent?.reraNumber || 'MahaRERA: A51900028912'}</div>
              <div><strong>Confirmation sent to:</strong> {email}</div>
            </div>
            <button className="btn btn-primary" onClick={handleResetAndClose}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            {/* Tour Type Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Select Viewing Format</label>
              <div className="tab-pill-group tab-pill-group-full">
                <button
                  type="button"
                  className={`tab-pill-item ${tourType === 'in-person' ? 'active-gold' : ''}`}
                  onClick={() => setTourType('in-person')}
                >
                  <UserCheck size={16} /> In-Person Site Visit
                </button>
                <button
                  type="button"
                  className={`tab-pill-item ${tourType === 'video' ? 'active-gold' : ''}`}
                  onClick={() => setTourType('video')}
                >
                  <Video size={16} /> Live HD Video Tour
                </button>
              </div>
            </div>

            {/* Date and Time slots */}
            <div className="modal-form-grid-2col">
              <div>
                <label className="form-label">Preferred Date</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Time Window</label>
                <select 
                  className="form-select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buyer Contact details */}
            <div className="modal-form-grid-2col">
              <div>
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Full name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="form-label">Contact Phone</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="+91 98200 00000" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="name@domain.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Special Inquiries or Access Requirements (Optional)</label>
              <textarea 
                className="form-textarea" 
                placeholder="e.g. Interested in parking facilities, viewing at sunset, etc."
                style={{ minHeight: 70 }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Confirm Private Viewing
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
