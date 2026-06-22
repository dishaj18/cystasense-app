import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [answers, setAnswers] = useState({
    name: '', situation: '', symptoms: [],
    intention: '', lastPeriod: '', cycleLength: 30
  });
  const [textInput, setTextInput] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('cystasense_user');
    if (user) navigate('/home');
    setTimeout(() => setVisible(true), 100);
  }, [navigate]);

  const fade = (fn) => {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 400);
  };

  const name = answers.name || 'there';

  const handleChoice = (key, value) => {
    fade(() => { setAnswers(a => ({ ...a, [key]: value })); setStep(s => s + 1); });
  };

  const handleNext = () => {
    if (step === 0 && textInput.trim()) {
      fade(() => { setAnswers(a => ({ ...a, name: textInput.trim() })); setStep(1); });
    } else if (step === 2) {
      fade(() => { setAnswers(a => ({ ...a, symptoms: selected })); setStep(3); });
    } else if (step === 4) {
      const userData = { ...answers, joinedAt: new Date().toISOString() };
      localStorage.setItem('cystasense_user', JSON.stringify(userData));
      navigate('/home');
    }
  };

  const toggleSymptom = (value) => {
    setSelected(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]);
  };

  const situationChoices = [
    { value: 'diagnosed', label: 'I have been diagnosed with PCOS' },
    { value: 'suspected', label: 'I suspect I might have PCOS' },
    { value: 'exploring', label: 'I am just starting to learn' },
    { value: 'supporter', label: 'I am here for someone I love' },
  ];

  const intentionChoices = [
    { value: 'understand', label: 'Understand my body', desc: 'Help me make sense of what\'s happening' },
    { value: 'track', label: 'Track my symptoms & cycle', desc: 'I want to see my patterns clearly' },
    { value: 'plan', label: 'Get a plan that works', desc: 'Diet, movement, and lifestyle for PCOS' },
    { value: 'support', label: 'Someone to talk to', desc: 'I just need to not feel alone in this' },
  ];

  const symptomChoices = [
    { value: 'irregular_cycles', label: 'Irregular or missing periods' },
    { value: 'weight', label: 'Unexplained weight changes' },
    { value: 'hair', label: 'Hair loss or excess hair growth' },
    { value: 'skin', label: 'Acne or skin darkening' },
    { value: 'mood', label: 'Mood swings and anxiety' },
    { value: 'fatigue', label: 'Constant fatigue' },
    { value: 'fertility', label: 'Fertility concerns' },
    { value: 'confused', label: 'Not sure yet' },
  ];

  const inputStyle = {
    width: '100%', backgroundColor: '#1C151B',
    border: '1px solid #4C042D', borderRadius: '100px',
    padding: '18px 28px', color: '#E4DDCB',
    fontSize: '1.1rem', fontFamily: 'Playfair Display, serif',
    outline: 'none', textAlign: 'center',
    marginBottom: '24px', colorScheme: 'dark',
  };

  const choiceStyle = (active) => ({
    backgroundColor: active ? '#241A23' : '#1C151B',
    border: `1px solid ${active ? '#B46595' : '#231C21'}`,
    borderRadius: '14px', padding: '18px 24px',
    cursor: 'pointer', textAlign: 'left',
    transition: 'all 0.2s', marginBottom: '10px',
  });

  const btnStyle = (enabled) => ({
    backgroundColor: enabled ? '#B46595' : '#231C21',
    color: enabled ? '#E4DDCB' : '#8B7D87',
    border: 'none', padding: '14px 48px',
    borderRadius: '100px', cursor: enabled ? 'pointer' : 'not-allowed',
    fontSize: '1rem', fontFamily: 'DM Sans, sans-serif',
    fontWeight: '600', transition: 'all 0.3s', width: '100%',
    marginTop: '8px',
  });

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#130E12',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
      opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease',
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#B46595', fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
          CystaSense
        </h2>
        <p style={{ color: '#4C042D', fontSize: '0.7rem', letterSpacing: '2px', marginTop: '4px' }}>YOUR PCOS COMPANION</p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            width: i === step ? '28px' : '8px', height: '8px',
            borderRadius: '100px',
            backgroundColor: i === step ? '#B46595' : i < step ? '#4C042D' : '#231C21',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>

        {/* Step 0 — Name */}
        {step === 0 && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#E4DDCB', marginBottom: '12px', lineHeight: '1.3' }}>
              Before we begin — what's your name?
            </h1>
            <p style={{ color: '#8B7D87', marginBottom: '36px', lineHeight: '1.6' }}>
              This space is yours. No judgment. No overwhelm. Just clarity.
            </p>
            <input
              autoFocus type="text" placeholder="Type your name..."
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNext()}
              style={inputStyle}
            />
            <button onClick={handleNext} disabled={!textInput.trim()} style={btnStyle(!!textInput.trim())}>
              Continue
            </button>
          </div>
        )}

        {/* Step 1 — Situation */}
        {step === 1 && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#E4DDCB', marginBottom: '12px', lineHeight: '1.3' }}>
              Hi {name}. Where are you in your PCOS journey?
            </h1>
            <p style={{ color: '#8B7D87', marginBottom: '36px' }}>There is no right answer.</p>
            {situationChoices.map(c => (
              <div key={c.value} onClick={() => handleChoice('situation', c.value)}
                style={choiceStyle(false)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#B46595'; e.currentTarget.style.backgroundColor = '#241A23'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#231C21'; e.currentTarget.style.backgroundColor = '#1C151B'; }}
              >
                <span style={{ color: '#E4DDCB', fontSize: '0.95rem' }}>{c.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 2 — Symptoms */}
        {step === 2 && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#E4DDCB', marginBottom: '12px', lineHeight: '1.3' }}>
              What are you struggling with most?
            </h1>
            <p style={{ color: '#8B7D87', marginBottom: '36px' }}>Select everything that feels true.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px', textAlign: 'left' }}>
              {symptomChoices.map(c => (
                <div key={c.value} onClick={() => toggleSymptom(c.value)}
                  style={{
                    ...choiceStyle(selected.includes(c.value)),
                    marginBottom: 0,
                    color: selected.includes(c.value) ? '#E4DDCB' : '#8B7D87',
                    fontSize: '0.85rem',
                  }}
                >
                  {c.label}
                </div>
              ))}
            </div>
            <button onClick={handleNext} disabled={selected.length === 0} style={btnStyle(selected.length > 0)}>
              Continue
            </button>
          </div>
        )}

        {/* Step 3 — Intention */}
        {step === 3 && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#E4DDCB', marginBottom: '12px', lineHeight: '1.3' }}>
              What do you need most right now, {name}?
            </h1>
            <p style={{ color: '#8B7D87', marginBottom: '36px' }}>CystaSense will personalise itself around your answer.</p>
            {intentionChoices.map(c => (
              <div key={c.value} onClick={() => handleChoice('intention', c.value)}
                style={choiceStyle(false)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#B46595'; e.currentTarget.style.backgroundColor = '#241A23'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#231C21'; e.currentTarget.style.backgroundColor = '#1C151B'; }}
              >
                <p style={{ color: '#E4DDCB', fontSize: '0.95rem', fontWeight: '500', marginBottom: '2px' }}>{c.label}</p>
                <p style={{ color: '#8B7D87', fontSize: '0.8rem' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Step 4 — Cycle Info */}
        {step === 4 && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#E4DDCB', marginBottom: '12px', lineHeight: '1.3' }}>
              One last thing — let's set up your cycle.
            </h1>
            <p style={{ color: '#8B7D87', marginBottom: '36px', lineHeight: '1.6' }}>
              This unlocks your cycle phase tracker and period predictions from day one.
            </p>

            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              <label style={{ color: '#8B7D87', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>
                When did your last period start?
              </label>
              <input
                type="date"
                value={answers.lastPeriod}
                onChange={e => setAnswers(a => ({ ...a, lastPeriod: e.target.value }))}
                style={{ ...inputStyle, textAlign: 'left', borderRadius: '12px', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', marginBottom: 0 }}
              />
            </div>

            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
              <label style={{ color: '#8B7D87', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>
                How long are your cycles usually?{' '}
                <span style={{ color: '#B46595' }}>{answers.cycleLength} days</span>
              </label>
              <input
                type="range" min="21" max="90"
                value={answers.cycleLength}
                onChange={e => setAnswers(a => ({ ...a, cycleLength: parseInt(e.target.value) }))}
                style={{ width: '100%', accentColor: '#B46595', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ color: '#4C042D', fontSize: '0.75rem' }}>21 days</span>
                <span style={{ color: '#4C042D', fontSize: '0.75rem' }}>90 days</span>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!answers.lastPeriod}
              style={btnStyle(!!answers.lastPeriod)}
            >
              Enter CystaSense
            </button>

            <p onClick={() => { localStorage.setItem('cystasense_user', JSON.stringify({ ...answers, joinedAt: new Date().toISOString() })); navigate('/home'); }}
              style={{ color: '#4C042D', fontSize: '0.8rem', marginTop: '16px', cursor: 'pointer' }}>
              Skip for now
            </p>
          </div>
        )}
      </div>

      <p style={{ color: '#231C21', fontSize: '0.75rem', marginTop: '48px' }}>
        Your data stays on your device. We never share it.
      </p>
    </div>
  );
}

export default Onboarding;