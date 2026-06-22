import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const stats = [
    { number: '541', label: 'Clinical Records' },
    { number: '91.7%', label: 'PCOS Recall Rate' },
    { number: '17', label: 'Health Markers' },
    { number: '4', label: 'Risk Levels' },
  ];

  const features = [
    { icon: '🔬', title: 'PCOS Risk Assessment', desc: 'ML model trained on 541 real patient records. Enter your health markers and get your personalised risk score instantly.' },
    { icon: '📅', title: 'Cycle Predictor', desc: 'Built specifically for irregular PCOS cycles. Not a 28-day assumption — a prediction based on your actual pattern.' },
    { icon: '🥗', title: 'Personalised Diet Plans', desc: 'Anti-inflammatory meal guidance tailored to your PCOS type. What to eat, what to avoid, and why it matters.' },
    { icon: '🏋️', title: 'Workout Plans', desc: 'PCOS-specific movement. The right balance of strength and rest — because over-training spikes cortisol and worsens symptoms.' },
    { icon: '🎥', title: 'Guided Videos', desc: 'Yoga, breathwork, and anti-inflammatory cooking — curated specifically for PCOS women.' },
    { icon: '💬', title: 'AI Companion', desc: 'Ask anything about PCOS. Get real, data-backed answers from an AI that actually understands your condition.' },
  ];

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Risk Check', path: '/risk-check' },
    { label: 'Cycle Tracker', path: '/cycle-tracker' },
    { label: 'Plans', path: '/plans' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>

      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 60px', borderBottom: '1px solid #231C21' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#B46595', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
          CystaSense
        </h2>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {navItems.map(item => (
            <span key={item.label} onClick={() => navigate(item.path)} style={{ color: '#8B7D87', cursor: 'pointer', fontSize: '0.9rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#E4DDCB'}
              onMouseLeave={e => e.target.style.color = '#8B7D87'}
            >
              {item.label}
            </span>
          ))}
          <button onClick={() => navigate('/risk-check')} style={{ backgroundColor: '#B46595', color: '#E4DDCB', border: 'none', padding: '10px 24px', borderRadius: '100px', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: '500' }}
            onMouseEnter={e => e.target.style.backgroundColor = '#C97AAB'}
            onMouseLeave={e => e.target.style.backgroundColor = '#B46595'}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '120px 60px 80px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#1C151B', border: '1px solid #4C042D', borderRadius: '100px', padding: '6px 16px', marginBottom: '32px' }}>
          <span style={{ color: '#B46595', fontSize: '0.8rem', letterSpacing: '1px' }}>BUILT FOR PCOS WOMEN • BY A PCOS WOMAN</span>
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '5rem', lineHeight: '1.1', color: '#E4DDCB', marginBottom: '24px', letterSpacing: '-2px' }}>
          Your PCOS,{' '}<span style={{ color: '#B46595', fontStyle: 'italic' }}>finally</span>{' '}making sense.
        </h1>
        <p style={{ color: '#8B7D87', fontSize: '1.2rem', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 48px' }}>
          An intelligent wellness platform that analyses your symptoms, predicts your cycles, and guides your healing — built on real clinical data from 541 patients.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/risk-check')} style={{ backgroundColor: '#B46595', color: '#E4DDCB', border: 'none', padding: '16px 40px', borderRadius: '100px', cursor: 'pointer', fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: '600', boxShadow: '0 0 40px rgba(180, 101, 149, 0.3)' }}
            onMouseEnter={e => { e.target.style.backgroundColor = '#C97AAB'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.target.style.backgroundColor = '#B46595'; e.target.style.transform = 'translateY(0)'; }}
          >
            Check My Risk →
          </button>
          <button onClick={() => navigate('/dashboard')} style={{ backgroundColor: 'transparent', color: '#E4DDCB', border: '1px solid #231C21', padding: '16px 40px', borderRadius: '100px', cursor: 'pointer', fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: '500' }}
            onMouseEnter={e => { e.target.style.borderColor = '#B46595'; e.target.style.color = '#B46595'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#231C21'; e.target.style.color = '#E4DDCB'; }}
          >
            View Dashboard
          </button>
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: 'flex', justifyContent: 'center', margin: '60px auto', backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '16px', padding: '40px', maxWidth: '800px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid #231C21' : 'none', padding: '0 24px' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#B46595', fontWeight: '700' }}>{stat.number}</div>
            <div style={{ color: '#8B7D87', fontSize: '0.85rem', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: '80px 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#E4DDCB', textAlign: 'center', marginBottom: '60px', letterSpacing: '-1px' }}>
          Everything you need,{' '}<span style={{ color: '#B46595', fontStyle: 'italic' }}>in one place.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {features.map((feature, i) => (
            <div key={i} style={{ backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '16px', padding: '32px', transition: 'all 0.3s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#B46595'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(180, 101, 149, 0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#231C21'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#E4DDCB', marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ color: '#8B7D87', fontSize: '0.9rem', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #231C21', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', color: '#B46595', fontSize: '1.2rem' }}>CystaSense</span>
        <span style={{ color: '#8B7D87', fontSize: '0.85rem' }}>Built with data. Built with purpose. Built for us. 💜</span>
      </footer>

    </div>
  );
}

export default Landing;