import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getCyclePhase(lastPeriodDate, cycleLength) {
  if (!lastPeriodDate) return null;
  const last = new Date(lastPeriodDate);
  const today = new Date();
  const dayOfCycle = Math.floor((today - last) / (1000 * 60 * 60 * 24)) + 1;
  const day = ((dayOfCycle - 1) % cycleLength) + 1;

  if (day <= 5) return {
    phase: 'Menstrual', day,
    tagline: 'Your body is releasing. Rest is not laziness — it is healing.',
    guidance: 'Gentle walks, warm food, and extra sleep. This is your time to slow down and be kind to yourself.',
    color: '#B46595', nextIn: 5 - day + 1,
    tip: 'Iron-rich foods like lentils and spinach help replenish what your body loses this week.',
  };
  if (day <= 13) return {
    phase: 'Follicular', day,
    tagline: 'Your energy is quietly building. Something new is possible.',
    guidance: 'This is your week for starting things. Creativity is high, focus is sharp. Channel it.',
    color: '#E19FC7', nextIn: 13 - day + 1,
    tip: 'Your body responds well to strength training this week. Great time to push a little harder.',
  };
  if (day <= 16) return {
    phase: 'Ovulatory', day,
    tagline: 'You are at your most vital. This energy is real — use it.',
    guidance: 'Social, sharp, and strong. Your communication peaks now. Have important conversations.',
    color: '#E4DDCB', nextIn: 16 - day + 1,
    tip: 'Eat lighter, whole foods today. Your body is working hard even if you cannot feel it.',
  };
  return {
    phase: 'Luteal', day,
    tagline: 'Your body is preparing. Emotions may feel louder. That is okay.',
    guidance: 'Slow down intentionally. Prioritise sleep, reduce caffeine, and be gentle with yourself.',
    color: '#8B7D87', nextIn: cycleLength - day + 1,
    tip: 'Magnesium-rich foods like dark chocolate and nuts can ease PMS symptoms significantly.',
  };
}

function getDaysUntilPeriod(lastPeriodDate, cycleLength) {
  if (!lastPeriodDate) return null;
  const last = new Date(lastPeriodDate);
  const today = new Date();
  const dayOfCycle = Math.floor((today - last) / (1000 * 60 * 60 * 24)) + 1;
  const day = ((dayOfCycle - 1) % cycleLength) + 1;
  const daysLeft = cycleLength - day + 1;
  return daysLeft;
}

function MiniCalendar({ lastPeriodDate, cycleLength }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const last = lastPeriodDate ? new Date(lastPeriodDate) : null;
  const getPeriodDays = () => {
    if (!last) return [];
    const days = [];
    const dayOfCycle = Math.floor((today - last) / (1000 * 60 * 60 * 24)) + 1;
    const currentDay = ((dayOfCycle - 1) % cycleLength) + 1;
    const daysUntilNext = cycleLength - currentDay + 1;
    const nextPeriod = new Date(today);
    nextPeriod.setDate(today.getDate() + daysUntilNext);
    for (let i = 0; i < 5; i++) {
      const d = new Date(nextPeriod);
      d.setDate(nextPeriod.getDate() + i);
      if (d.getMonth() === month) days.push(d.getDate());
    }
    return days;
  };

  const periodDays = getPeriodDays();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  return (
    <div style={{ backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '16px', padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#E4DDCB', fontSize: '1rem' }}>
          {monthNames[month]} {year}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B46595' }} />
            <span style={{ color: '#8B7D87', fontSize: '0.7rem' }}>Period window</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4C042D' }} />
            <span style={{ color: '#8B7D87', fontSize: '0.7rem' }}>Today</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
        {dayNames.map(d => (
          <div key={d} style={{ color: '#4C042D', fontSize: '0.7rem', padding: '4px', fontWeight: '600' }}>{d}</div>
        ))}
        {Array(firstDay === 0 ? 6 : firstDay - 1).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate();
          const isPeriod = periodDays.includes(day);
          return (
            <div key={day} style={{
              padding: '6px 4px', borderRadius: '8px', fontSize: '0.8rem',
              backgroundColor: isToday ? '#4C042D' : isPeriod ? 'rgba(180, 101, 149, 0.2)' : 'transparent',
              color: isToday ? '#E4DDCB' : isPeriod ? '#B46595' : '#8B7D87',
              fontWeight: isToday ? '700' : '400',
              border: isPeriod && !isToday ? '1px solid rgba(180, 101, 149, 0.3)' : '1px solid transparent',
            }}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('cystasense_user');
    if (!stored) { navigate('/'); return; }
    setUser(JSON.parse(stored));
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, [navigate]);

  if (!user) return null;

  const cycleInfo = getCyclePhase(user.lastPeriod, user.cycleLength || 30);
  const daysUntil = getDaysUntilPeriod(user.lastPeriod, user.cycleLength || 30);

  const moodOptions = [
    { value: 'great', label: 'Energised' },
    { value: 'okay', label: 'Okay' },
    { value: 'rough', label: 'Rough day' },
  ];

  const quickActions = [
    { icon: '🔬', label: 'Risk Check', path: '/risk-check' },
    { icon: '📅', label: 'Cycle', path: '/cycle-tracker' },
    { icon: '🥗', label: 'Plans', path: '/plans' },
    { icon: '💬', label: 'Companion', path: '/companion' },
    { icon: '📊', label: 'Research', path: '/dashboard' },
  ];

  const facts = [
    "1 in 10 women have PCOS. You are not as alone as it feels.",
    "Rest is not laziness. For PCOS, it is part of the treatment.",
    "Small consistent changes matter far more than perfect days.",
    "Your body is not broken. It is asking for a different kind of care.",
    "Spearmint tea has been shown to reduce androgen levels in PCOS.",
    "Stress and cortisol directly worsen PCOS symptoms. Protect your peace.",
    "You deserve a doctor who takes you seriously. Don't settle.",
  ];

  const todayFact = facts[new Date().getDay() % facts.length];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 60px', borderBottom: '1px solid #231C21' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#B46595', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
          CystaSense
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#8B7D87', fontSize: '0.85rem' }}>{user.name}</span>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#4C042D', border: '1px solid #B46595', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E4DDCB', fontSize: '0.85rem', fontWeight: '600' }}>
            {user.name[0].toUpperCase()}
          </div>
        </div>
      </nav>

      <div style={{ padding: '48px 60px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Greeting + Mood */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.8rem', color: '#E4DDCB', letterSpacing: '-1px', marginBottom: '6px' }}>
            {greeting},{' '}
            <span style={{ color: '#B46595', fontStyle: 'italic' }}>{user.name}.</span>
          </h1>

          {!mood ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
              <span style={{ color: '#8B7D87', fontSize: '0.9rem' }}>How are you feeling today?</span>
              {moodOptions.map(m => (
                <button key={m.value} onClick={() => setMood(m.value)} style={{
                  backgroundColor: 'transparent', border: '1px solid #231C21',
                  borderRadius: '100px', padding: '8px 20px',
                  color: '#8B7D87', cursor: 'pointer', fontSize: '0.85rem',
                  fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#B46595'; e.currentTarget.style.color = '#B46595'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#231C21'; e.currentTarget.style.color = '#8B7D87'; }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: '16px', padding: '16px 24px', backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '12px', display: 'inline-block' }}>
              <p style={{ color: '#E4DDCB', fontSize: '0.9rem' }}>
                {mood === 'rough' && <>That's okay. PCOS days are hard.{' '}<span onClick={() => navigate('/companion')} style={{ color: '#B46595', cursor: 'pointer', textDecoration: 'underline' }}>Talk to your companion</span> — it helps.</>}
                {mood === 'great' && <>Love that energy. Channel it — maybe run your{' '}<span onClick={() => navigate('/risk-check')} style={{ color: '#B46595', cursor: 'pointer', textDecoration: 'underline' }}>risk assessment</span> today.</>}
                {mood === 'okay' && <>An okay day is enough.{' '}<span onClick={() => navigate('/cycle-tracker')} style={{ color: '#B46595', cursor: 'pointer', textDecoration: 'underline' }}>Check your cycle</span> to stay ahead.</>}
              </p>
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

          {/* Cycle Phase Card */}
          {cycleInfo ? (
            <div style={{ backgroundColor: '#1C151B', border: `1px solid ${cycleInfo.color}22`, borderRadius: '16px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', borderRadius: '50%', backgroundColor: `${cycleInfo.color}08`, transform: 'translate(30px, -30px)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <p style={{ color: '#8B7D87', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '6px' }}>CURRENT PHASE</p>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: cycleInfo.color, fontStyle: 'italic' }}>
                    {cycleInfo.phase}
                  </h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#8B7D87', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '6px' }}>CYCLE DAY</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#E4DDCB', fontWeight: '700' }}>
                    {cycleInfo.day}
                  </p>
                </div>
              </div>
              <p style={{ color: '#E4DDCB', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '12px', lineHeight: '1.5' }}>
                "{cycleInfo.tagline}"
              </p>
              <p style={{ color: '#8B7D87', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '20px' }}>
                {cycleInfo.guidance}
              </p>
              <div style={{ backgroundColor: '#130E12', borderRadius: '10px', padding: '14px 16px' }}>
                <p style={{ color: '#B46595', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '4px' }}>TODAY'S TIP</p>
                <p style={{ color: '#8B7D87', fontSize: '0.82rem', lineHeight: '1.5' }}>{cycleInfo.tip}</p>
              </div>
            </div>
          ) : (
            <div onClick={() => navigate('/')} style={{ backgroundColor: '#1C151B', border: '1px dashed #231C21', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textAlign: 'center' }}>
              <p style={{ color: '#E4DDCB', fontSize: '1rem', marginBottom: '8px' }}>Set up your cycle</p>
              <p style={{ color: '#8B7D87', fontSize: '0.85rem' }}>Add your last period date to unlock cycle phase tracking.</p>
            </div>
          )}

          {/* Calendar + Period Countdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <MiniCalendar lastPeriodDate={user.lastPeriod} cycleLength={user.cycleLength || 30} />
            {daysUntil !== null && (
              <div style={{ backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#8B7D87', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '6px' }}>NEXT PERIOD</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#E4DDCB' }}>
                    {daysUntil <= 0 ? 'Expected now' : `In ${daysUntil} days`}
                  </p>
                  <p style={{ color: '#8B7D87', fontSize: '0.8rem', marginTop: '4px' }}>
                    {daysUntil > 7 ? 'You have time. Stay consistent.' : daysUntil > 3 ? 'Getting close. Rest up.' : 'Almost here. Be gentle with yourself.'}
                  </p>
                </div>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: `3px solid #B46595`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ color: '#B46595', fontSize: '1.2rem', fontWeight: '700', fontFamily: 'Playfair Display, serif' }}>{Math.max(0, daysUntil)}</span>
                  <span style={{ color: '#8B7D87', fontSize: '0.6rem' }}>days</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {quickActions.map((action, i) => (
            <div key={i} onClick={() => navigate(action.path)} style={{
              backgroundColor: '#1C151B', border: '1px solid #231C21',
              borderRadius: '14px', padding: '20px', cursor: 'pointer',
              textAlign: 'center', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#B46595'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#231C21'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{action.icon}</div>
              <p style={{ color: '#E4DDCB', fontSize: '0.82rem', fontWeight: '500' }}>{action.label}</p>
            </div>
          ))}
        </div>

        {/* Daily Reminder */}
        <div style={{ backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '14px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#4C042D', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '6px' }}>TODAY'S REMINDER</p>
            <p style={{ color: '#E4DDCB', fontSize: '0.9rem', fontStyle: 'italic', maxWidth: '700px', lineHeight: '1.6' }}>
              "{todayFact}"
            </p>
          </div>
          <div style={{ color: '#231C21', fontSize: '2rem', marginLeft: '24px' }}>—</div>
        </div>

      </div>
    </div>
  );
}

export default Home;
