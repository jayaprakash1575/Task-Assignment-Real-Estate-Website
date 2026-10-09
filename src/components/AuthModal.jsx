import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Check, Shield } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, onShowToast }) {
  const [tab, setTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      if (onShowToast) onShowToast("Please fill in all required fields.", "warning");
      return;
    }

    const userData = {
      name: tab === 'login' ? (email.split('@')[0] || 'Aditya Mittal') : name || 'Aditya Mittal',
      email: email,
      phone: phone || '+91 98201 55678',
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      role: 'Verified Private Client'
    };

    onLoginSuccess(userData);
    if (onShowToast) onShowToast(`Welcome back, ${userData.name}!`, "success");
    onClose();
  };

  const handleQuickDemoLogin = (role) => {
    const demoUser = role === 'buyer' 
      ? {
          name: "Aditya Mittal",
          email: "aditya.m@privateequity.in",
          phone: "+91 98201 98765",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          role: "Verified HNI Buyer"
        }
      : {
          name: "Devika Oberoi",
          email: "devika.oberoi@venturecapital.in",
          phone: "+91 98110 44321",
          avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
          role: "Angel Investor / Family Office"
        };
    
    onLoginSuccess(demoUser);
    if (onShowToast) onShowToast(`Logged in as ${demoUser.name} (${demoUser.role})`, "success");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 1.5rem 1rem 1.5rem',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              {tab === 'login' ? 'Welcome to LuxeHaven India' : 'Create Client Account'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {tab === 'login' ? 'Access your saved residences & private site bookings' : 'Join our private network of luxury properties across India'}
            </p>
          </div>
          <button 
            type="button"
            className="btn btn-ghost btn-icon" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switch */}
        <div style={{
          padding: '0.75rem 1.5rem',
          background: '#f8fafc',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}>
          <div className="tab-pill-group tab-pill-group-full">
            <button
              type="button"
              className={`tab-pill-item ${tab === 'login' ? 'active-gold' : ''}`}
              onClick={() => setTab('login')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-pill-item ${tab === 'signup' ? 'active-gold' : ''}`}
              onClick={() => setTab('signup')}
            >
              Create Client Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem' }}>
          {/* Quick Demo Login Helpers */}
          <div style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '0.785rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Shield size={14} /> 1-CLICK INSTANT DEMO LOGIN
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                type="button"
                className="btn btn-light btn-sm" 
                style={{ flex: 1, fontSize: '0.8rem', borderColor: '#bfdbfe' }}
                onClick={() => handleQuickDemoLogin('buyer')}
              >
                Demo HNI Buyer
              </button>
              <button 
                type="button"
                className="btn btn-light btn-sm" 
                style={{ flex: 1, fontSize: '0.8rem', borderColor: '#bfdbfe' }}
                onClick={() => handleQuickDemoLogin('investor')}
              >
                Demo Investor
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {tab === 'signup' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="e.g. Aditya Mittal" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input 
                  type="email" 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {tab === 'signup' && (
              <div className="form-group">
                <label className="form-label">Mobile Number (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input 
                    type="tel" 
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="+91 98200 00000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input 
                  type="password" 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', color: 'var(--color-text-body)' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                />
                Remember me
              </label>
              {tab === 'login' && (
                <button 
                  type="button" 
                  style={{ background: 'none', border: 'none', color: 'var(--color-accent-blue)', cursor: 'pointer', fontWeight: 600 }}
                  onClick={() => onShowToast && onShowToast("Password reset link sent to demo email.", "info")}
                >
                  Forgot password?
                </button>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginBottom: '1rem' }}>
              {tab === 'login' ? 'Sign In' : 'Create Free Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            By continuing, you agree to LuxeHaven India's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
