import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle, 
  ShieldCheck,
  BadgeCheck
} from 'lucide-react';
import './AgentsView.css';

export default function AgentsView({ 
  agents = [], 
  onSelectAgent, 
  onNavigate 
}) {
  const [searchAgent, setSearchAgent] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  const specialtiesList = [
    'All',
    'South Mumbai',
    'Delhi NCR',
    'Goa Heritage',
    'Hyderabad',
    'Bengaluru'
  ];

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      if (searchAgent.trim() !== '') {
        const query = searchAgent.toLowerCase();
        const matchesName = 
          agent.name.toLowerCase().includes(query) ||
          agent.title.toLowerCase().includes(query) ||
          agent.office.toLowerCase().includes(query) ||
          (agent.reraNumber && agent.reraNumber.toLowerCase().includes(query));
        if (!matchesName) return false;
      }

      if (specialtyFilter !== 'All') {
        const matchesSpec = 
          agent.office.toLowerCase().includes(specialtyFilter.toLowerCase()) ||
          agent.title.toLowerCase().includes(specialtyFilter.toLowerCase()) ||
          agent.specialties.some(s => s.toLowerCase().includes(specialtyFilter.toLowerCase()));
        if (!matchesSpec) return false;
      }

      return true;
    });
  }, [agents, searchAgent, specialtyFilter]);

  return (
    <div className="agents-page">
      {/* Hero Header */}
      <div className="agents-hero">
        <div className="container">
          <span className="section-tag section-tag-blue" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Users size={14} /> RERA Accredited Senior Partners
          </span>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            India's Leading Luxury Real Estate Advisors
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '680px', lineHeight: 1.6 }}>
            Senior partners commanding decades of tenure across South Mumbai, DLF Golf Course Road, Lutyens' Delhi, Goa, Bengaluru, and Hyderabad.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Search & Filter Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)',
          padding: '1.25rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '420px' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: 12, color: '#64748b' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search advisor by name, city, or RERA Reg No..." 
              style={{ paddingLeft: '2.6rem' }}
              value={searchAgent}
              onChange={(e) => setSearchAgent(e.target.value)}
            />
          </div>

          {/* Specialty Filter Pills */}
          <div className="tab-pill-group agents-specialty-tabs">
            {specialtiesList.map((spec) => (
              <button
                key={spec}
                type="button"
                className={`tab-pill-item ${specialtyFilter === spec ? 'active-gold' : ''}`}
                onClick={() => setSpecialtyFilter(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="agents-grid">
          {filteredAgents.map((agent) => (
            <article key={agent.id} className="agent-card-full">
              <div className="agent-card-image-wrapper">
                <img src={agent.avatar} alt={agent.name} className="agent-card-image" />
                <div className="agent-card-floating-badge">
                  <Star size={13} fill="#fde047" /> {agent.rating} ({agent.reviewsCount})
                </div>
              </div>

              <div className="agent-card-content">
                <h3 className="agent-card-name">{agent.name}</h3>
                <div className="agent-card-title">{agent.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <BadgeCheck size={14} /> {agent.reraNumber}
                </div>
                <div className="agent-card-office">
                  <MapPin size={13} /> {agent.office}
                </div>

                {/* Metrics Row */}
                <div className="agent-metrics-row">
                  <div>
                    <div className="agent-metric-val">{agent.salesVolume}</div>
                    <div className="agent-metric-lbl">Volume</div>
                  </div>
                  <div>
                    <div className="agent-metric-val">{agent.experience.split(' ')[0]} Yrs</div>
                    <div className="agent-metric-lbl">Tenor</div>
                  </div>
                  <div>
                    <div className="agent-metric-val">{agent.activeListingsCount}</div>
                    <div className="agent-metric-lbl">Listings</div>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="agent-specialties-wrap">
                  {agent.specialties.slice(0, 2).map((s) => (
                    <span key={s} className="agent-spec-tag">{s}</span>
                  ))}
                  {agent.specialties.length > 2 && (
                    <span className="agent-spec-tag">+{agent.specialties.length - 2} more</span>
                  )}
                </div>

                {/* Actions */}
                <div className="agent-card-actions">
                  <button 
                    className="btn btn-primary btn-sm btn-block"
                    onClick={() => onSelectAgent(agent)}
                  >
                    View Dossier & Listings
                  </button>
                  <a 
                    href={`tel:${agent.phone}`} 
                    className="btn btn-outline btn-sm btn-icon"
                    title="Call Advisor"
                  >
                    <Phone size={16} />
                  </a>
                  <a 
                    href={`mailto:${agent.email}`} 
                    className="btn btn-outline btn-sm btn-icon"
                    title="Email Advisor"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Value Proposition Box */}
        <div style={{
          marginTop: '4rem',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)',
          padding: '3rem 2.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div>
            <span className="section-tag">
              <Award size={13} /> Institutional Integrity
            </span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '1rem' }}>
              Why Indian HNIs Choose LuxeHaven Partners
            </h2>
            <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Every LuxeHaven advisor is vetted for exceptional transactional tenure, rigorous legal compliance under state RERAs, and direct relationships with marquee industrial family offices.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                <CheckCircle size={18} color="#10b981" /> 100% Confidential Non-Disclosure Agreement (NDA)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                <CheckCircle size={18} color="#10b981" /> Thorough 30-Year Title Search & Encumbrance Audits
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                <CheckCircle size={18} color="#10b981" /> Comprehensive NRI Repatriation & FEMA Documentation
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #090e17 0%, #1e3a8a 100%)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.4rem', marginBottom: '0.75rem' }}>Are You a Top Producing Indian Broker?</h3>
            <p style={{ color: '#93c5fd', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Join our exclusive national collective and represent India's most extraordinary architectural and residential assets.
            </p>
            <button className="btn btn-gold" onClick={() => onNavigate('contact')}>
              Inquire About Partnership
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
