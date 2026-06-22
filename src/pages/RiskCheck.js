import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Basics', 'Hormones', 'Symptoms', 'Results'];

const inputStyle = {
  width: '100%',
  backgroundColor: '#1C151B',
  border: '1px solid #231C21',
  borderRadius: '10px',
  padding: '12px 16px',
  color: '#E4DDCB',
  fontSize: '0.95rem',
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none',
};

const labelStyle = {
  color: '#8B7D87',
  fontSize: '0.85rem',
  marginBottom: '8px',
  display: 'block',
};

function RiskCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    age: '', bmi: '', cycle_type: 'irregular', cycle_length: '',
    fsh: '', lh: '', amh: '', waist_hip_ratio: '',
    weight_gain: 0, hair_growth: 0, skin_darkening: 0,
    hair_loss: 0, pimples: 0,
    follicle_left: '', follicle_right: '', endometrium: '',
  });
  const [result, setResult] = useState(null);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const calculateRisk = () => {
    const { age, bmi, cycle_type, cycle_length, fsh, lh, amh,
      waist_hip_ratio, weight_gain, hair_growth, skin_darkening,
      hair_loss, pimples, follicle_left, follicle_right } = form;

    let score = 0;
    if (cycle_type === 'irregular') score += 25;
    if (parseFloat(amh) > 4.0) score += 20;
    if (parseFloat(lh) > parseFloat(fsh)) score += 15;
    if (parseFloat(follicle_left) > 12 || parseFloat(follicle_right) > 12) score += 15;
    if (parseFloat(waist_hip_ratio) > 0.85) score += 5;
    score += (weight_gain + hair_growth + skin_darkening + hair_loss + pimples) * 3;
    if (parseFloat(bmi) > 25) score += 5;
    if (parseInt(cycle_length) > 35) score += 7;

    score = Math.min(score, 99);

    let risk_level, message, color;
    if (score >= 70) {
      risk_level = 'HIGH'; color = '#B46595';
      message = 'Your profile shows distinct PCOS indicators. We strongly recommend consulting a gynaecologist.';
    } else if (score >= 50) {
      risk_level = 'MODERATE-HIGH'; color = '#E19FC7';
      message = 'Moderate-high correlation with PCOS markers. Consider tracking symptoms and speaking with a doctor.';
    } else if (score >= 30) {
      risk_level = 'MODERATE'; color = '#E4DDCB';
      message = 'Some PCOS indicators present. Keep monitoring your cycle and symptoms with CystaSense.';
    } else {
      risk_level = 'LOW'; color = '#8B7D87';
      message = 'Low PCOS indicators detected. Keep maintaining healthy habits.';
    }

    const symptoms = [];
    if (cycle_type === 'irregular') symptoms.push('Irregular Cycles');
    if (parseFloat(amh) > 4.0) symptoms.push('Elevated AMH');
    if (parseFloat(lh) > parseFloat(fsh)) symptoms.push('LH/FSH Imbalance');
    if (parseFloat(follicle_left) > 12 || parseFloat(follicle_right) > 12) symptoms.push('High Follicle Count');
    if (weight_gain) symptoms.push('Weight Gain');
    if (hair_growth) symptoms.push('Excess Hair Growth');
    if (skin_darkening) symptoms.push('Skin Darkening');
    if (hair_loss) symptoms.push('Hair Loss');
    if (pimples) symptoms.push('Hormonal Acne');

    setResult({ score, risk_level, message, color, symptoms });
    setStep(3);
  };

  const SymptomToggle = ({ label, field }) => (
    <div
      onClick={() => update(field, form[field] ? 0 : 1)}
      style={{
        padding: '14px 20px',
        borderRadius: '10px',
        border: `1px solid ${form[field] ? '#B46595' : '#231C21'}`,
        backgroundColor: form[field] ? '#1C151B' : 'transparent',
        color: form[field] ? '#B46595' : '#8B7D87',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.2s',
        userSelect: 'none',
      }}
    >
      {form[field] ? '✓ ' : '+ '}{label}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12', padding: '40px 60px' }}>

      {/* Back */}
      <span onClick={() => navigate('/')} style={{
        color: '#8B7D87', cursor: 'pointer', fontSize: '0.9rem',
        display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '40px'
      }}>
        ← Back
      </span>

      {/* Progress */}
      <div style={{ maxWidth: '600px', margin: '0 auto 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          {STEPS.map((s, i) => (
            <span key={i} style={{
              fontSize: '0.8rem',
              color: i <= step ? '#B46595' : '#8B7D87',
              fontWeight: i === step ? '600' : '400',
            }}>{s}</span>
          ))}
        </div>
        <div style={{ height: '2px', backgroundColor: '#231C21', borderRadius: '2px' }}>
          <div style={{
            height: '100%', borderRadius: '2px',
            backgroundColor: '#B46595',
            width: `${((step + 1) / STEPS.length) * 100}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Card */}
      <div style={{
        maxWidth: '600px', margin: '0 auto',
        backgroundColor: '#1C151B',
        border: '1px solid #231C21',
        borderRadius: '20px', padding: '48px',
      }}>

        {/* Step 0 — Basics */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#E4DDCB', marginBottom: '8px' }}>
              Basic Information
            </h2>
            <p style={{ color: '#8B7D87', fontSize: '0.9rem', marginBottom: '32px' }}>
              Let's start with your general health metrics.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Age (years)', key: 'age', placeholder: 'e.g. 24' },
                { label: 'BMI', key: 'bmi', placeholder: 'e.g. 22.5' },
                { label: 'Average Cycle Length (days)', key: 'cycle_length', placeholder: 'e.g. 32' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type="number" placeholder={placeholder}
                    value={form[key]}
                    onChange={e => update(key, e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Cycle Type</label>
                <select
                  value={form.cycle_type}
                  onChange={e => update('cycle_type', e.target.value)}
                  style={inputStyle}
                >
                  <option value="irregular">Irregular</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 1 — Hormones */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#E4DDCB', marginBottom: '8px' }}>
              Hormone Levels
            </h2>
            <p style={{ color: '#8B7D87', fontSize: '0.9rem', marginBottom: '32px' }}>
              From your blood test results. Leave blank if unavailable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'FSH (mIU/mL)', key: 'fsh', placeholder: 'e.g. 5.2' },
                { label: 'LH (mIU/mL)', key: 'lh', placeholder: 'e.g. 8.1' },
                { label: 'AMH (ng/mL)', key: 'amh', placeholder: 'e.g. 4.5' },
                { label: 'Waist-to-Hip Ratio', key: 'waist_hip_ratio', placeholder: 'e.g. 0.82' },
                { label: 'Follicles — Left Ovary', key: 'follicle_left', placeholder: 'e.g. 10' },
                { label: 'Follicles — Right Ovary', key: 'follicle_right', placeholder: 'e.g. 12' },
                { label: 'Endometrium (mm)', key: 'endometrium', placeholder: 'e.g. 8.5' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type="number" placeholder={placeholder}
                    value={form[key]}
                    onChange={e => update(key, e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Symptoms */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#E4DDCB', marginBottom: '8px' }}>
              Your Symptoms
            </h2>
            <p style={{ color: '#8B7D87', fontSize: '0.9rem', marginBottom: '32px' }}>
              Select everything you're currently experiencing.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <SymptomToggle label="Weight Gain" field="weight_gain" />
              <SymptomToggle label="Excess Hair Growth (face/body)" field="hair_growth" />
              <SymptomToggle label="Skin Darkening" field="skin_darkening" />
              <SymptomToggle label="Hair Loss (scalp)" field="hair_loss" />
              <SymptomToggle label="Hormonal Acne" field="pimples" />
            </div>
          </div>
        )}

        {/* Step 3 — Results */}
        {step === 3 && result && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#8B7D87', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '16px' }}>
              PCOS RISK SCORE
            </p>
            <div style={{
              fontSize: '5rem', fontFamily: 'Playfair Display, serif',
              color: result.color, fontWeight: '700', lineHeight: '1',
              marginBottom: '8px',
            }}>
              {result.score}%
            </div>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#130E12',
              border: `1px solid ${result.color}`,
              borderRadius: '100px', padding: '6px 20px',
              color: result.color, fontSize: '0.85rem',
              letterSpacing: '1px', marginBottom: '24px',
            }}>
              {result.risk_level} RISK
            </div>
            <p style={{ color: '#8B7D87', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '32px' }}>
              {result.message}
            </p>

            {result.symptoms.length > 0 && (
              <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                <p style={{ color: '#8B7D87', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '12px' }}>
                  INDICATORS DETECTED
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {result.symptoms.map((s, i) => (
                    <span key={i} style={{
                      backgroundColor: '#130E12',
                      border: '1px solid #4C042D',
                      borderRadius: '100px', padding: '6px 14px',
                      color: '#B46595', fontSize: '0.8rem',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            <p style={{ color: '#4C042D', fontSize: '0.8rem', marginBottom: '24px' }}>
              ⚠️ This is a wellness tool, not a medical diagnosis. Always consult a doctor.
            </p>

            <button onClick={() => navigate('/cycle-tracker')} style={{
              backgroundColor: '#B46595', color: '#E4DDCB', border: 'none',
              padding: '14px 32px', borderRadius: '100px', cursor: 'pointer',
              fontSize: '0.95rem', fontFamily: 'DM Sans, sans-serif', fontWeight: '600',
              width: '100%',
            }}>
              Track Your Cycle →
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 3 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} style={{
                backgroundColor: 'transparent', color: '#8B7D87',
                border: '1px solid #231C21', padding: '12px 28px',
                borderRadius: '100px', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
              }}>
                Back
              </button>
            ) : <div />}
            <button
              onClick={() => step === 2 ? calculateRisk() : setStep(s => s + 1)}
              style={{
                backgroundColor: '#B46595', color: '#E4DDCB', border: 'none',
                padding: '12px 28px', borderRadius: '100px', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontWeight: '600',
              }}
            >
              {step === 2 ? 'Calculate My Risk →' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiskCheck;