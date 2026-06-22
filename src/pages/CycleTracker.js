import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CycleTracker() {
  const navigate = useNavigate();
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycles, setCycles] = useState(['', '', '', '']);
  const [result, setResult] = useState(null);

  const updateCycle = (i, val) => {
    const updated = [...cycles];
    updated[i] = val;
    setCycles(updated);
  };

  const predict = () => {
    const validCycles = cycles.map(Number).filter(n => n > 0);
    if (!lastPeriod || validCycles.length < 2) return;

    const avg = validCycles.reduce((a, b) => a + b, 0) / validCycles.length;
    const std = Math.sqrt(validCycles.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / validCycles.length);

    const last = new Date(lastPeriod);
    const mostLikely = new Date(last);
    mostLikely.setDate(last.getDate() + Math.round(avg));

    const earliest = new Date(last);
    earliest.setDate(last.getDate() + Math.round(avg - std));

    const latest = new Date(last);
    latest.setDate(last.getDate() + Math.round(avg + std * 1.5));

    const today = new Date();
    const daysUntil = Math.round((mostLikely - today) / (1000 * 60 * 60 * 24));

    const confidence = Math.min(95, Math.round(Math.max(0, 100 - std * 3) + validCycles.length * 2));

    let regularity, regNote;
    if (std <= 3) { regularity = 'Fairly Regular'; regNote = 'Low variation — good prediction accuracy.'; }
    else if (std <= 7) { regularity = 'Mildly Irregular'; regNote = 'Moderate variation — common with PCOS.'; }
    else if (std <= 12) { regularity = 'Irregular'; regNote = 'High variation — typical of PCOS cycles.'; }
    else { regularity = 'Highly Irregular'; regNote = 'Very high variation — consider speaking with your doctor.'; }

    setResult({
      mostLikely: mostLikely.toDateString(),
      earliest: earliest.toDateString(),
      latest: latest.toDateString(),
      daysUntil,
      avg: avg.toFixed(1),
      std: std.toFixed(1),
      confidence,
      regularity,
      regNote,
    });
  };

  const fmt = (label, val) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #231C21' }}>
      <span style={{ color: '#8B7D87', fontSize: '0.9rem' }}>{label}</span>
      <span style={{ color: '#E4DDCB', fontSize: '0.9rem', fontWeight: '500' }}>{val}</span>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12', padding: '40px 60px' }}>
      <span onClick={() => navigate('/')} style={{ color: '#8B7D87', cursor: 'pointer', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}>
        ← Back
      </span>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#E4DDCB', marginBottom: '8px', letterSpacing: '-1px' }}>
          Cycle Predictor
        </h1>
        <p style={{ color: '#8B7D87', marginBottom: '40px', lineHeight: '1.6' }}>
          Built for irregular PCOS cycles. Not a 28-day assumption — a prediction based on your actual pattern.
        </p>

        {/* Input Card */}
        <div style={{ backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '20px', padding: '40px', marginBottom: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#8B7D87', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>
              Date of Last Period
            </label>
            <input
              type="date"
              value={lastPeriod}
              onChange={e => setLastPeriod(e.target.value)}
              style={{
                width: '100%', backgroundColor: '#130E12', border: '1px solid #231C21',
                borderRadius: '10px', padding: '12px 16px', color: '#E4DDCB',
                fontSize: '0.95rem', fontFamily: 'DM Sans, sans-serif', outline: 'none',
                colorScheme: 'dark',
              }}
            />
          </div>

          <div>
            <label style={{ color: '#8B7D87', fontSize: '0.85rem', display: 'block', marginBottom: '12px' }}>
              Your Last 4 Cycle Lengths (days)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {cycles.map((c, i) => (
                <div key={i}>
                  <label style={{ color: '#4C042D', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>
                    Cycle {i + 1}
                  </label>
                  <input
                    type="number"
                    placeholder={`e.g. ${28 + i * 4}`}
                    value={c}
                    onChange={e => updateCycle(i, e.target.value)}
                    style={{
                      width: '100%', backgroundColor: '#130E12', border: '1px solid #231C21',
                      borderRadius: '10px', padding: '12px 16px', color: '#E4DDCB',
                      fontSize: '0.95rem', fontFamily: 'DM Sans, sans-serif', outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={predict}
            style={{
              marginTop: '32px', width: '100%', backgroundColor: '#B46595',
              color: '#E4DDCB', border: 'none', padding: '14px',
              borderRadius: '100px', cursor: 'pointer', fontSize: '0.95rem',
              fontFamily: 'DM Sans, sans-serif', fontWeight: '600',
            }}
          >
            Predict My Next Period →
          </button>
        </div>

        {/* Results Card */}
        {result && (
          <div style={{ backgroundColor: '#1C151B', border: '1px solid #B46595', borderRadius: '20px', padding: '40px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#E4DDCB', marginBottom: '24px' }}>
              Your Prediction
            </h2>

            {/* Most Likely Date — Big */}
            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#130E12', borderRadius: '12px', marginBottom: '24px' }}>
              <p style={{ color: '#8B7D87', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '8px' }}>MOST LIKELY</p>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#B46595', fontWeight: '700' }}>
                {result.mostLikely}
              </p>
              <p style={{ color: '#8B7D87', fontSize: '0.9rem', marginTop: '8px' }}>
                {result.daysUntil > 0
                  ? `~${result.daysUntil} days away`
                  : result.daysUntil === 0
                  ? 'May arrive today'
                  : `May be ${Math.abs(result.daysUntil)} days late — normal for PCOS`}
              </p>
            </div>

            {fmt('Earliest Possible', result.earliest)}
            {fmt('Latest Possible', result.latest)}
            {fmt('Your Avg Cycle', `${result.avg} days`)}
            {fmt('Cycle Variation', `± ${result.std} days`)}
            {fmt('Prediction Confidence', `${result.confidence}%`)}

            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#130E12', borderRadius: '12px' }}>
              <p style={{ color: '#B46595', fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px' }}>{result.regularity}</p>
              <p style={{ color: '#8B7D87', fontSize: '0.85rem' }}>{result.regNote}</p>
            </div>

            <p style={{ color: '#4C042D', fontSize: '0.8rem', marginTop: '20px', textAlign: 'center' }}>
              ⚠️ Estimates only. Not medical advice.
            </p>

            <button onClick={() => navigate('/plans')} style={{
              marginTop: '24px', width: '100%', backgroundColor: 'transparent',
              color: '#B46595', border: '1px solid #B46595', padding: '14px',
              borderRadius: '100px', cursor: 'pointer', fontSize: '0.95rem',
              fontFamily: 'DM Sans, sans-serif', fontWeight: '600',
            }}>
              See My Personalised Plans →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CycleTracker;