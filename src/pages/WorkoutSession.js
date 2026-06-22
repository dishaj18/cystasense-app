import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const workouts = [
  {
    name: 'Gentle Squats',
    duration: 40,
    rest: 20,
    instruction: 'Stand with feet shoulder-width apart. Slowly lower yourself as if sitting into a chair. Keep your back straight. Rise back up slowly.',
    benefit: 'Builds leg strength and improves insulin sensitivity.',
    color: '#B46595',
    animation: 'squat',
  },
  {
    name: 'Standing March',
    duration: 40,
    rest: 20,
    instruction: 'Stand tall. Lift your right knee up to hip height, then lower. Alternate legs in a slow, controlled march. Hold a chair for support if needed.',
    benefit: 'Improves circulation and warms up your core.',
    color: '#E19FC7',
    animation: 'march',
  },
  {
    name: 'Wall Push-Ups',
    duration: 40,
    rest: 20,
    instruction: 'Stand arm\'s length from a wall. Place palms flat on the wall. Slowly bend elbows to bring your chest toward the wall. Push back slowly.',
    benefit: 'Strengthens arms and chest without floor work.',
    color: '#B46595',
    animation: 'pushup',
  },
  {
    name: 'Glute Bridges',
    duration: 40,
    rest: 20,
    instruction: 'Lie on your back with knees bent and feet flat. Press through your heels to lift your hips toward the ceiling. Hold 2 seconds. Lower slowly.',
    benefit: 'Activates glutes and supports hormonal balance.',
    color: '#E19FC7',
    animation: 'bridge',
  },
  {
    name: 'Seated Leg Raises',
    duration: 40,
    rest: 20,
    instruction: 'Sit tall on a chair. Straighten your right leg and hold for 3 seconds. Lower slowly. Alternate legs. Keep your back straight throughout.',
    benefit: 'Strengthens core and legs with zero joint impact.',
    color: '#B46595',
    animation: 'legrise',
  },
  {
    name: 'Deep Breathing',
    duration: 60,
    rest: 0,
    instruction: 'Inhale slowly through your nose for 4 counts. Hold for 4 counts. Exhale through your mouth for 4 counts. This is your cooldown.',
    benefit: 'Lowers cortisol — one of the most powerful things you can do for PCOS.',
    color: '#8B7D87',
    animation: 'breathe',
  },
];

function AnimatedFigure({ animation, isResting }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (isResting) return;
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 2);
    }, 800);
    return () => clearInterval(interval);
  }, [isResting]);

  const baseBlob = {
    position: 'absolute',
    borderRadius: '50%',
    transition: 'all 0.8s ease',
  };

  const figures = {
    squat: {
      body: {
        width: frame === 0 ? '70px' : '80px',
        height: frame === 0 ? '80px' : '60px',
        backgroundColor: '#B46595',
        opacity: 0.8,
        top: frame === 0 ? '80px' : '110px',
        left: '65px',
      },
      head: { width: '40px', height: '40px', backgroundColor: '#E4DDCB', top: '30px', left: '80px' },
      leg1: {
        width: '25px',
        height: frame === 0 ? '60px' : '35px',
        backgroundColor: '#4C042D',
        top: frame === 0 ? '155px' : '165px',
        left: '75px',
        borderRadius: '12px',
      },
      leg2: {
        width: '25px',
        height: frame === 0 ? '60px' : '35px',
        backgroundColor: '#4C042D',
        top: frame === 0 ? '155px' : '165px',
        left: '105px',
        borderRadius: '12px',
      },
    },
    march: {
      body: { width: '65px', height: '80px', backgroundColor: '#E19FC7', opacity: 0.8, top: '75px', left: '68px' },
      head: { width: '40px', height: '40px', backgroundColor: '#E4DDCB', top: '28px', left: '80px' },
      leg1: {
        width: '25px',
        height: '55px',
        backgroundColor: '#4C042D',
        top: frame === 0 ? '150px' : '130px',
        left: '75px',
        borderRadius: '12px',
        transform: frame === 0 ? 'rotate(0deg)' : 'rotate(-20deg)',
      },
      leg2: {
        width: '25px',
        height: '55px',
        backgroundColor: '#B46595',
        top: frame === 0 ? '130px' : '150px',
        left: '105px',
        borderRadius: '12px',
        transform: frame === 0 ? 'rotate(20deg)' : 'rotate(0deg)',
      },
    },
    pushup: {
      body: {
        width: '90px',
        height: '40px',
        backgroundColor: '#B46595',
        opacity: 0.8,
        top: frame === 0 ? '110px' : '130px',
        left: '55px',
      },
      head: { width: '38px', height: '38px', backgroundColor: '#E4DDCB', top: frame === 0 ? '90px' : '110px', left: '55px' },
      leg1: { width: '25px', height: '50px', backgroundColor: '#4C042D', top: '140px', left: '120px', borderRadius: '12px' },
      leg2: { width: '25px', height: '50px', backgroundColor: '#4C042D', top: '140px', left: '148px', borderRadius: '12px' },
    },
    bridge: {
      body: {
        width: '85px',
        height: frame === 0 ? '35px' : '45px',
        backgroundColor: '#E19FC7',
        opacity: 0.8,
        top: frame === 0 ? '120px' : '105px',
        left: '58px',
        transform: frame === 0 ? 'rotate(0deg)' : 'rotate(-5deg)',
      },
      head: { width: '38px', height: '38px', backgroundColor: '#E4DDCB', top: '130px', left: '30px' },
      leg1: { width: '28px', height: '55px', backgroundColor: '#4C042D', top: '130px', left: '115px', borderRadius: '12px', transform: 'rotate(15deg)' },
      leg2: { width: '28px', height: '55px', backgroundColor: '#B46595', top: '130px', left: '145px', borderRadius: '12px', transform: 'rotate(15deg)' },
    },
    legrise: {
      body: { width: '65px', height: '75px', backgroundColor: '#B46595', opacity: 0.8, top: '80px', left: '68px' },
      head: { width: '38px', height: '38px', backgroundColor: '#E4DDCB', top: '35px', left: '81px' },
      leg1: {
        width: '25px',
        height: '55px',
        backgroundColor: '#4C042D',
        top: frame === 0 ? '150px' : '120px',
        left: '75px',
        borderRadius: '12px',
        transform: frame === 0 ? 'rotate(0deg)' : 'rotate(-30deg)',
      },
      leg2: { width: '25px', height: '55px', backgroundColor: '#8B7D87', top: '150px', left: '105px', borderRadius: '12px' },
    },
    breathe: {
      body: {
        width: frame === 0 ? '100px' : '75px',
        height: frame === 0 ? '100px' : '75px',
        backgroundColor: '#8B7D87',
        opacity: frame === 0 ? 0.9 : 0.5,
        top: frame === 0 ? '75px' : '88px',
        left: frame === 0 ? '50px' : '63px',
        borderRadius: '50%',
      },
      head: { width: '0px', height: '0px', top: 0, left: 0, backgroundColor: 'transparent' },
      leg1: { width: '0px', height: '0px', top: 0, left: 0, backgroundColor: 'transparent' },
      leg2: { width: '0px', height: '0px', top: 0, left: 0, backgroundColor: 'transparent' },
    },
  };

  const fig = figures[animation] || figures.squat;

  return (
    <div style={{ position: 'relative', width: '200px', height: '220px', margin: '0 auto' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', width: '160px', height: '160px',
        borderRadius: '50%', backgroundColor: fig.body.backgroundColor,
        opacity: 0.08, top: '30px', left: '20px',
        filter: 'blur(20px)', transition: 'all 0.8s ease',
      }} />
      <div style={{ ...baseBlob, ...fig.head, transition: 'all 0.8s ease' }} />
      <div style={{ ...baseBlob, ...fig.body }} />
      <div style={{ ...baseBlob, ...fig.leg1, transition: 'all 0.8s ease' }} />
      <div style={{ ...baseBlob, ...fig.leg2, transition: 'all 0.8s ease' }} />
    </div>
  );
}

function CircleTimer({ seconds, total, color }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = seconds / total;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto' }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#231C21" strokeWidth="8" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)', textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#E4DDCB', fontWeight: '700', lineHeight: 1 }}>
          {seconds}
        </div>
        <div style={{ color: '#8B7D87', fontSize: '0.7rem', marginTop: '2px' }}>seconds</div>
      </div>
    </div>
  );
}

function WorkoutSession() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workouts[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef(null);

  const current = workouts[currentIndex];
  const totalTime = isResting ? current.rest : current.duration;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      if (!isResting && current.rest > 0) {
        setIsResting(true);
        setTimeLeft(current.rest);
      } else {
        const next = currentIndex + 1;
        if (next < workouts.length) {
          setCurrentIndex(next);
          setIsResting(false);
          setTimeLeft(workouts[next].duration);
        } else {
          setIsRunning(false);
          setIsDone(true);
        }
      }
    }
    return () => clearTimeout(intervalRef.current);
  }, [isRunning, timeLeft, isResting, currentIndex, current.rest]);

  const toggle = () => setIsRunning(r => !r);
  const skip = () => {
    const next = currentIndex + 1;
    if (next < workouts.length) {
      setCurrentIndex(next);
      setIsResting(false);
      setTimeLeft(workouts[next].duration);
    } else {
      setIsDone(true);
      setIsRunning(false);
    }
  };

  if (isDone) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>💜</div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#E4DDCB', marginBottom: '16px' }}>
        You did it.
      </h1>
      <p style={{ color: '#8B7D87', fontSize: '1.1rem', maxWidth: '400px', lineHeight: '1.7', marginBottom: '16px' }}>
        Every rep, every breath — it all counts. Your body and your hormones thank you.
      </p>
      <p style={{ color: '#B46595', fontSize: '0.9rem', marginBottom: '40px', fontStyle: 'italic' }}>
        "Consistency over intensity. Always."
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button onClick={() => { setCurrentIndex(0); setIsResting(false); setTimeLeft(workouts[0].duration); setIsRunning(false); setIsDone(false); }} style={{
          backgroundColor: '#B46595', color: '#E4DDCB', border: 'none',
          padding: '16px 32px', borderRadius: '100px', cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontWeight: '600', fontSize: '1rem',
        }}>
          Do it again
        </button>
        <button onClick={() => navigate('/plans')} style={{
          backgroundColor: 'transparent', color: '#8B7D87',
          border: '1px solid #231C21', padding: '16px 32px',
          borderRadius: '100px', cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontSize: '1rem',
        }}>
          Back to Plans
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12', padding: '32px 40px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <span onClick={() => navigate('/plans')} style={{ color: '#8B7D87', cursor: 'pointer', fontSize: '1rem' }}>← Back</span>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#B46595', fontSize: '1.3rem' }}>CystaSense Workout</h2>
        <span style={{ color: '#8B7D87', fontSize: '0.9rem' }}>{currentIndex + 1} of {workouts.length}</span>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '4px', backgroundColor: '#231C21', borderRadius: '4px', marginBottom: '40px' }}>
        <div style={{ height: '100%', backgroundColor: '#B46595', borderRadius: '4px', width: `${((currentIndex + 1) / workouts.length) * 100}%`, transition: 'width 0.5s ease' }} />
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Status Badge */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{
            backgroundColor: isResting ? '#1C151B' : '#4C042D',
            border: `1px solid ${isResting ? '#231C21' : '#B46595'}`,
            borderRadius: '100px', padding: '8px 24px',
            color: isResting ? '#8B7D87' : '#E4DDCB',
            fontSize: '0.85rem', letterSpacing: '1px',
          }}>
            {isResting ? 'REST' : 'EXERCISE'}
          </span>
        </div>

        {/* Exercise Name */}
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#E4DDCB', textAlign: 'center', marginBottom: '32px', letterSpacing: '-0.5px' }}>
          {isResting ? 'Take a breath' : current.name}
        </h1>

        {/* Animated Figure */}
        <div style={{ marginBottom: '32px' }}>
          <AnimatedFigure animation={current.animation} isResting={isResting} />
        </div>

        {/* Timer */}
        <div style={{ marginBottom: '32px' }}>
          <CircleTimer seconds={timeLeft} total={totalTime} color={isResting ? '#8B7D87' : current.color} />
        </div>

        {/* Instruction Box */}
        {!isResting && (
          <div style={{ backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '16px', padding: '24px 28px', marginBottom: '24px' }}>
            <p style={{ color: '#8B7D87', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '10px' }}>HOW TO DO IT</p>
            <p style={{ color: '#E4DDCB', fontSize: '1rem', lineHeight: '1.7' }}>{current.instruction}</p>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #231C21' }}>
              <p style={{ color: '#B46595', fontSize: '0.85rem', fontStyle: 'italic' }}>{current.benefit}</p>
            </div>
          </div>
        )}

        {isResting && (
          <div style={{ backgroundColor: '#1C151B', border: '1px solid #231C21', borderRadius: '16px', padding: '24px 28px', marginBottom: '24px', textAlign: 'center' }}>
            <p style={{ color: '#E4DDCB', fontSize: '1rem', lineHeight: '1.7' }}>
              Breathe. Shake out your hands. You are doing great.
            </p>
            <p style={{ color: '#8B7D87', fontSize: '0.85rem', marginTop: '8px' }}>
              Next up: <span style={{ color: '#B46595' }}>{workouts[currentIndex + 1]?.name || 'Final cooldown'}</span>
            </p>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button onClick={toggle} style={{
            backgroundColor: isRunning ? '#1C151B' : '#B46595',
            color: '#E4DDCB', border: isRunning ? '1px solid #231C21' : 'none',
            padding: '16px 48px', borderRadius: '100px', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontWeight: '600', fontSize: '1.1rem',
            minWidth: '160px', transition: 'all 0.2s',
          }}>
            {isRunning ? 'Pause' : timeLeft === totalTime ? 'Start' : 'Resume'}
          </button>
          <button onClick={skip} style={{
            backgroundColor: 'transparent', color: '#8B7D87',
            border: '1px solid #231C21', padding: '16px 32px',
            borderRadius: '100px', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '1rem',
          }}>
            Skip →
          </button>
        </div>

        {/* Accessibility note */}
        <p style={{ color: '#4C042D', fontSize: '0.8rem', textAlign: 'center', marginTop: '24px', lineHeight: '1.6' }}>
          Move at your own pace. If anything feels uncomfortable, stop and rest. Your safety comes first.
        </p>
      </div>
    </div>
  );
}

export default WorkoutSession;
