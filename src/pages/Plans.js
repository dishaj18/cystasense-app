import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getUserPlans = (user) => {
  const symptoms = user?.symptoms || [];
  const hasSymptom = (s) => symptoms.includes(s);
  const diet = [];
  const workout = [];

  diet.push({
    icon: '🌅', title: 'Start your morning right', tag: 'Daily',
    desc: 'Warm lemon water within 10 minutes of waking. This kickstarts digestion and balances blood sugar before your first meal — critical for insulin-resistant PCOS.',
  });

  if (hasSymptom('weight') || hasSymptom('irregular_cycles')) {
    diet.push({
      icon: '⚖️', title: 'Blood sugar first — always', tag: 'Priority',
      desc: 'Every meal needs protein + complex carb + healthy fat together. Never eat refined carbs alone. This is the single most impactful dietary change for PCOS.',
    });
  }

  if (hasSymptom('skin')) {
    diet.push({
      icon: '✨', title: 'Anti-acne nutrition', tag: 'Skin',
      desc: 'Cut dairy and high-glycemic foods for 4 weeks. Add zinc-rich foods — pumpkin seeds, chickpeas, lentils. Zinc directly reduces androgen-driven acne in PCOS.',
    });
  }

  if (hasSymptom('fatigue')) {
    diet.push({
      icon: '⚡', title: 'Fight the fatigue', tag: 'Energy',
      desc: 'Iron and B12 deficiency are common in PCOS. Add spinach, lentils, and eggs daily. Avoid caffeine after 2pm — it disrupts the cortisol rhythm that already struggles in PCOS.',
    });
  }

  if (hasSymptom('mood')) {
    diet.push({
      icon: '🧠', title: 'Feed your mood', tag: 'Mood',
      desc: 'Omega-3 rich foods — walnuts, flaxseed, salmon — directly reduce inflammation that drives mood instability in PCOS. Magnesium from dark leafy greens calms the nervous system.',
    });
  }

  if (hasSymptom('hair')) {
    diet.push({
      icon: '💇', title: 'Nourish from within', tag: 'Hair',
      desc: 'Biotin, iron, and zinc are your hair allies. Add eggs, sweet potato, and almonds daily. Spearmint tea twice a day has clinical evidence for reducing androgen-driven hair loss.',
    });
  }

  diet.push({
    icon: '⭐', title: 'Your PCOS superfoods', tag: 'Always',
    desc: 'Turmeric (anti-inflammatory), cinnamon (insulin regulation), flaxseeds (hormone balance), spearmint tea (androgen reduction). Small additions, significant impact over time.',
  });

  diet.push({
    icon: '⚠️', title: 'What to avoid', tag: 'Avoid',
    desc: 'Refined sugar, white bread, fried foods, sugary drinks, and excess dairy. These spike insulin and directly worsen every PCOS symptom. No need to be perfect — just consistent.',
  });

  if (hasSymptom('weight') || hasSymptom('fatigue') || hasSymptom('irregular_cycles')) {
    workout.push({
      icon: '🏋️', title: 'Strength training — your #1 tool', tag: '45 min',
      desc: 'Monday and Thursday. Squats, deadlifts, lunges, push-ups. 3 sets of 10–12 reps. Strength training improves insulin sensitivity more than any other exercise type for PCOS.',
    });
  }

  workout.push({
    icon: '🚶', title: 'Low-impact cardio', tag: '30 min',
    desc: 'Tuesday and Friday. Walking, swimming, or cycling at a pace where you can hold a conversation. Keep heart rate at 60–70% max. Avoid HIIT — it spikes cortisol and worsens PCOS.',
  });

  workout.push({
    icon: '🧘', title: 'Yoga for PCOS', tag: '30 min',
    desc: 'Wednesday. Focus on Supta Baddha Konasana, Viparita Karani, and Setu Bandhasana. These specifically support ovarian function and bring cortisol down.',
  });

  if (hasSymptom('mood') || hasSymptom('fatigue')) {
    workout.push({
      icon: '🌬️', title: 'Breathwork for cortisol', tag: 'Daily',
      desc: '5 minutes of box breathing every morning — inhale 4 counts, hold 4, exhale 4, hold 4. Chronically elevated cortisol is one of the most overlooked drivers of PCOS symptoms.',
    });
  }

  workout.push({
    icon: '💤', title: 'Rest is treatment', tag: 'Weekend',
    desc: 'Weekend rest is not optional. PCOS women often have elevated cortisol. Over-training is one of the most common mistakes — it directly worsens hormonal imbalance. Rest heals.',
  });

  workout.push({
    icon: '⚠️', title: 'What to avoid', tag: 'Avoid',
    desc: 'Daily high-intensity workouts, marathon training, extreme calorie restriction alongside exercise. More is not better with PCOS. Consistent and moderate beats intense every time.',
  });

  return { diet, workout };
};

const videos = [
  { title: 'Yoga for PCOS — 20 min flow', channel: 'Search on YouTube', duration: '20 min', tag: 'Yoga', icon: '🧘' },
  { title: 'Anti-inflammatory PCOS meals', channel: 'Search on YouTube', duration: '15 min', tag: 'Nutrition', icon: '🥗' },
  { title: 'PCOS friendly strength workout', channel: 'Search on YouTube', duration: '35 min', tag: 'Workout', icon: '🏋️' },
  { title: 'Breathwork for hormone balance', channel: 'Search on YouTube', duration: '10 min', tag: 'Wellness', icon: '🌬️' },
  { title: 'Understanding your PCOS type', channel: 'Search on YouTube', duration: '12 min', tag: 'Education', icon: '📚' },
  { title: 'Spearmint tea & PCOS benefits', channel: 'Search on YouTube', duration: '8 min', tag: 'Nutrition', icon: '🍵' },
];

function PlanCard({ item }) {
  return (
    <div style={{ backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '16px', padding: '28px', transition: 'all 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#B46595'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#231C21'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
        <span style={{ backgroundColor: '#130E12', border: '1px solid #4C042D', borderRadius: '100px', padding: '4px 12px', color: '#B46595', fontSize: '0.75rem' }}>
          {item.tag}
        </span>
      </div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: '#E4DDCB', marginBottom: '10px' }}>
        {item.title}
      </h3>
      <p style={{ color: '#8B7D87', fontSize: '0.85rem', lineHeight: '1.6' }}>
        {item.desc || item.channel}
      </p>
      {item.duration && (
        <p style={{ color: '#4C042D', fontSize: '0.8rem', marginTop: '10px' }}>⏱ {item.duration}</p>
      )}
    </div>
  );
}

function Plans() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('diet');
  const [user, setUser] = useState(null);
  const [personalPlans, setPersonalPlans] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('cystasense_user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setPersonalPlans(getUserPlans(u));
    }
  }, []);

  const tabs = [
    { key: 'diet', label: 'Diet Plan' },
    { key: 'workout', label: 'Workout Plan' },
    { key: 'videos', label: 'Guided Videos' },
  ];

  const currentItems = tab === 'videos'
    ? videos
    : personalPlans ? personalPlans[tab] : [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12', padding: '40px 60px' }}>
      <span onClick={() => navigate('/home')} style={{ color: '#8B7D87', cursor: 'pointer', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}>
        ← Back
      </span>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#E4DDCB', marginBottom: '8px', letterSpacing: '-1px' }}>
          Your PCOS Plans
        </h1>
        <p style={{ color: '#8B7D87', marginBottom: '40px' }}>
          Evidence-based diet, movement, and content — built specifically around PCOS physiology.
        </p>

        {/* Personalised badge */}
        {user && (
          <div style={{ backgroundColor: '#1C151B', border: '1px solid #4C042D', borderRadius: '12px', padding: '14px 20px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B46595', flexShrink: 0 }} />
            <p style={{ color: '#8B7D87', fontSize: '0.85rem' }}>
              Personalised for{' '}
              <span style={{ color: '#E4DDCB', fontWeight: '600' }}>{user.name}</span>
              {' '}based on your symptoms and health profile.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              backgroundColor: tab === t.key ? '#B46595' : '#1C151B',
              color: tab === t.key ? '#E4DDCB' : '#8B7D87',
              border: `1px solid ${tab === t.key ? '#B46595' : '#231C21'}`,
              padding: '10px 24px', borderRadius: '100px', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', transition: 'all 0.2s',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {currentItems.map((item, i) => <PlanCard key={i} item={item} />)}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
  <div onClick={() => navigate('/workout')} style={{
    backgroundColor: '#1C151B', border: '1px solid #231C21',
    borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'all 0.3s',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#B46595'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#231C21'; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    <p style={{ color: '#B46595', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '8px' }}>START NOW</p>
    <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#E4DDCB', marginBottom: '8px', fontSize: '1.2rem' }}>
      Live Workout Session
    </h3>
    <p style={{ color: '#8B7D87', fontSize: '0.85rem', lineHeight: '1.6' }}>
      Guided exercises with timer, animations, and step-by-step instructions. Built for all fitness levels.
    </p>
  </div>

  <div onClick={() => navigate('/videos')} style={{
    backgroundColor: '#1C151B', border: '1px solid #231C21',
    borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'all 0.3s',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#B46595'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#231C21'; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    <p style={{ color: '#B46595', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '8px' }}>WATCH INSIDE THE APP</p>
    <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#E4DDCB', marginBottom: '8px', fontSize: '1.2rem' }}>
      Wellness Video Library
    </h3>
    <p style={{ color: '#8B7D87', fontSize: '0.85rem', lineHeight: '1.6' }}>
      Yoga, breathwork, nutrition, and PCOS education — all playing inside CystaSense. No redirects.
    </p>
  </div>
</div>
      </div>
    </div>
  );
}

export default Plans;
