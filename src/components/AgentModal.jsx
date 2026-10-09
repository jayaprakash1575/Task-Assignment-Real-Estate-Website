import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MessageSquare, 
  Star, 
  Award, 
  CheckCircle, 
  MapPin, 
  Building,
  Send,
  ExternalLink,
  BadgeCheck
} from 'lucide-react';

export default function AgentModal({ 
  isOpen, 
  onClose, 
  agent, 
  properties = [], 
  onSelectProperty,
  onShowToast 
}) {
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen || !agent) return null;

  const agentProperties = properties.filter((p) => p.agentId === agent.id);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!senderEmail || !message) {
      if (onShowToast) onShowToast("Please enter your email and message.", "warning");
      return;
    }
    setSent(true);
    if (onShowToast) onShowToast(`Message delivered to ${agent.name}. They will reach out shortly!`, "success");
    setTimeout(() => {
      setMessage('');
      setSent(false);
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '820px', width: '95vw', padding: 0 }}
      >
        {/* Header */}
        <div style={{
          position: 'relative',
          padding: '2rem',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          color: '#ffffff'
        }}>
          <button 
            type="button" 
            className="btn btn-ghost btn-icon" 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: '#ffffff',
              backgroundColor: 'rgba(255,255,255,0.15)'
            }}
            aria-label="Close agent modal"
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <img 
              src={agent.avatar} 
              alt={agent.name} 
              style={{
                width: 110,
                height: 110,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: 'var(--shadow-lg)'
              }}
            />

            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{ color: '#ffffff', fontSize: '1.75rem' }}>{agent.name}</h2>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: 'rgba(194, 157, 89, 0.25)',
                  border: '1px solid #c29d59',
                  color: '#fde047',
                  padding: '0.2rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  <Star size={13} fill="#fde047" /> {agent.rating} ({agent.reviewsCount} reviews)
                </div>
              </div>
              <p style={{ color: '#93c5fd', fontSize: '0.95rem', marginTop: '0.25rem' }}>{agent.title}</p>
              {agent.reraNumber && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#4ade80', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.2rem' }}>
                  <BadgeCheck size={14} /> {agent.reraNumber}
                </div>
              )}
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '0.25rem' }}>{agent.office}</p>

              {/* Quick stats badges */}
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>{agent.salesVolume}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Sales Volume</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>{agent.experience}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Industry Tenor</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>{agent.activeListingsCount}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Active Listings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="agent-modal-body">
          {/* Left Column: Bio & Specialties & Listings */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 700 }}>About {agent.name.split(' ')[0]}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {agent.bio}
            </p>

            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 700 }}>Practice Specialties</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {agent.specialties.map((spec) => (
                <span 
                  key={spec}
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-subtle)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-text-main)'
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>

            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 700 }}>Honors & Accolades</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
              {agent.awards.map((award) => (
                <div key={award} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-body)' }}>
                  <Award size={16} color="#c29d59" style={{ flexShrink: 0 }} />
                  <span>{award}</span>
                </div>
              ))}
            </div>

            {/* Represented Properties snippet */}
            {agentProperties.length > 0 && (
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 700 }}>Exclusive Representation ({agentProperties.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {agentProperties.map((prop) => (
                    <div 
                      key={prop.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        backgroundColor: 'var(--color-bg-surface)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={prop.images[0]} alt={prop.title} style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{prop.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-blue)', fontWeight: 700 }}>{prop.priceFormatted}</div>
                        </div>
                      </div>
                      <button 
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Direct Contact Card & Form */}
          <div style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--color-border-subtle)',
            height: 'fit-content'
          }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 700 }}>Direct Contact</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a 
                href={`tel:${agent.phone}`} 
                className="btn btn-outline btn-block" 
                style={{ justifyContent: 'flex-start', gap: '0.75rem', backgroundColor: '#ffffff' }}
              >
                <Phone size={16} color="var(--color-accent-blue)" /> {agent.phone}
              </a>
              <a 
                href={`mailto:${agent.email}`} 
                className="btn btn-outline btn-block" 
                style={{ justifyContent: 'flex-start', gap: '0.75rem', backgroundColor: '#ffffff' }}
              >
                <Mail size={16} color="var(--color-accent-blue)" /> {agent.email}
              </a>
            </div>

            <h5 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 700 }}>Send Confidential Message</h5>

            {sent ? (
              <div style={{
                padding: '1.25rem',
                backgroundColor: 'var(--color-success-bg)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-success)',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                ✓ Message transmitted!
              </div>
            ) : (
              <form onSubmit={handleSendMessage}>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Your Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Your Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Enter your email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Inquiry Details</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder={`Hello ${agent.name.split(' ')[0]}, I am interested in...`}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  <Send size={15} /> Send Direct Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
