import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';

const symptomData = [
  { name: 'Weight Gain', value: 87 },
  { name: 'Excess Hair', value: 72 },
  { name: 'Skin Darkening', value: 68 },
  { name: 'Hormonal Acne', value: 65 },
  { name: 'Hair Loss', value: 58 },
  { name: 'Fast Food', value: 78 },
];

const hormoneData = [
  { name: 'FSH', pcos: 5.1, control: 6.8 },
  { name: 'LH', pcos: 9.2, control: 5.4 },
  { name: 'AMH', pcos: 6.8, control: 2.9 },
  { name: 'TSH', pcos: 3.2, control: 2.8 },
];

const cycleData = [
  { name: 'PCOS — Irregular', value: 148 },
  { name: 'PCOS — Regular', value: 29 },
  { name: 'Control — Regular', value: 301 },
  { name: 'Control — Irregular', value: 63 },
];

const modelData = [
  { metric: 'Accuracy', value: 82.6 },
  { metric: 'PCOS Recall', value: 91.7 },
  { metric: 'Precision', value: 67.3 },
  { metric: 'F1 Score', value: 77.1 },
];

const COLORS = ['#B46595', '#E19FC7', '#4C042D', '#340417'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#1C151B', border: '1px solid #B46595',
        borderRadius: '10px', padding: '12px 16px',
      }}>
        <p style={{ color: '#E4DDCB', fontSize: '0.85rem', marginBottom: '4px' }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: '0.85rem' }}>
            {p.name}: {p.value}{typeof p.value === 'number' && p.name !== 'value' ? '' : '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function StatCard({ number, label, sub }) {
  return (
    <div style={{
      backgroundColor: '#1C151B', border: '1px solid #231C21',
      borderRadius: '16px', padding: '28px', flex: 1,
    }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#B46595', fontWeight: '700' }}>
        {number}
      </div>
      <div style={{ color: '#E4DDCB', fontSize: '0.9rem', marginTop: '4px', fontWeight: '500' }}>{label}</div>
      {sub && <div style={{ color: '#8B7D87', fontSize: '0.8rem', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

function ChartCard({ title, desc, children }) {
  return (
    <div style={{
      backgroundColor: '#1C151B', border: '1px solid #231C21',
      borderRadius: '16px', padding: '32px',
    }}>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#E4DDCB', marginBottom: '6px' }}>
        {title}
      </h3>
      <p style={{ color: '#8B7D87', fontSize: '0.8rem', marginBottom: '24px' }}>{desc}</p>
      {children}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12', padding: '40px 60px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div>
          <span onClick={() => navigate('/')} style={{ color: '#8B7D87', cursor: 'pointer', fontSize: '0.9rem', display: 'block', marginBottom: '12px' }}>
            ← Back
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#E4DDCB', letterSpacing: '-1px' }}>
            Research Dashboard
          </h1>
          <p style={{ color: '#8B7D87', marginTop: '8px' }}>
            Clinical insights from 541 real patient records — the data behind CystaSense.
          </p>
        </div>
        <div style={{
          backgroundColor: '#1C151B', border: '1px solid #4C042D',
          borderRadius: '12px', padding: '16px 24px', textAlign: 'right',
        }}>
          <p style={{ color: '#B46595', fontSize: '0.75rem', letterSpacing: '1px' }}>MODEL VERSION</p>
          <p style={{ color: '#E4DDCB', fontWeight: '600', marginTop: '4px' }}>Random Forest v1.0</p>
          <p style={{ color: '#8B7D87', fontSize: '0.8rem' }}>Threshold: 0.30</p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
        <StatCard number="541" label="Clinical Records" sub="Kaggle PCOS Dataset" />
        <StatCard number="91.7%" label="PCOS Recall" sub="Catches 33 of 36 cases" />
        <StatCard number="82.6%" label="Model Accuracy" sub="On unseen test data" />
        <StatCard number="17" label="Features Used" sub="Clinical + symptomatic" />
        <StatCard number="0.30" label="Decision Threshold" sub="Optimised for recall" />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

        {/* Symptom Chart */}
        <ChartCard
          title="Symptom Prevalence in PCOS Patients"
          desc="% of PCOS-positive patients experiencing each symptom"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={symptomData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#8B7D87', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#8B7D87', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#B46595" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Hormone Chart */}
        <ChartCard
          title="Hormonal Signatures: PCOS vs Control"
          desc="Average hormone levels — key diagnostic markers"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hormoneData}>
              <XAxis dataKey="name" tick={{ fill: '#8B7D87', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8B7D87', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pcos" name="PCOS" fill="#B46595" radius={[4, 4, 0, 0]} />
              <Bar dataKey="control" name="Control" fill="#4C042D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Cycle Pie Chart */}
        <ChartCard
          title="Cycle Regularity Distribution"
          desc="Regular vs irregular cycles across both groups"
        >
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={cycleData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {cycleData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
            {cycleData.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[i] }} />
                <span style={{ color: '#8B7D87', fontSize: '0.75rem' }}>{d.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Model Performance Radar */}
        <ChartCard
          title="Model Performance Metrics"
          desc="Evaluation scores on 109 unseen test patients"
        >
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={modelData}>
              <PolarGrid stroke="#231C21" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#8B7D87', fontSize: 11 }} />
              <Radar dataKey="value" stroke="#B46595" fill="#B46595" fillOpacity={0.3} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Model Explanation Card */}
      <div style={{
        backgroundColor: '#1C151B', border: '1px solid #231C21',
        borderRadius: '16px', padding: '40px',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px',
      }}>
        <div>
          <p style={{ color: '#B46595', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '12px' }}>ALGORITHM</p>
          <p style={{ color: '#E4DDCB', fontWeight: '600', marginBottom: '8px' }}>Random Forest Classifier</p>
          <p style={{ color: '#8B7D87', fontSize: '0.85rem', lineHeight: '1.6' }}>
            100 decision trees voting together. Each tree sees the data slightly differently — majority vote wins. More robust than any single model.
          </p>
        </div>
        <div>
          <p style={{ color: '#B46595', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '12px' }}>OPTIMISATION</p>
          <p style={{ color: '#E4DDCB', fontWeight: '600', marginBottom: '8px' }}>Threshold Tuning at 0.30</p>
          <p style={{ color: '#8B7D87', fontSize: '0.85rem', lineHeight: '1.6' }}>
            Default threshold is 0.50. We lowered it to 0.30 to prioritise recall — catching real PCOS cases matters more than avoiding false alarms.
          </p>
        </div>
        <div>
          <p style={{ color: '#B46595', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '12px' }}>CLASS IMBALANCE</p>
          <p style={{ color: '#E4DDCB', fontWeight: '600', marginBottom: '8px' }}>Handled via class_weight</p>
          <p style={{ color: '#8B7D87', fontSize: '0.85rem', lineHeight: '1.6' }}>
            Dataset had 364 non-PCOS vs 177 PCOS patients. We used balanced class weights so the model doesn't favour the majority class.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;