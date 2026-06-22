import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const videoCategories = [
  {
    category: 'Yoga & Movement',
    videos: [
      { id: 'FEkDET8RqQI', title: 'Yoga for PCOS — Full Body Flow', duration: '22 min', level: 'Beginner' },
      { id: '4vTJHUDB5ak', title: 'Gentle Yoga for Hormone Balance', duration: '18 min', level: 'Beginner' },
      { id: 'v7AYKMP6rOE', title: 'Yin Yoga for Stress & PCOS', duration: '30 min', level: 'All levels' },
    ],
  },
  {
    category: 'Breathwork & Calm',
    videos: [
      { id: 'tybOi4hjZFQ', title: 'Box Breathing for Cortisol Relief', duration: '10 min', level: 'All levels' },
      { id: 'odADwWzHR24', title: 'Breathwork for Anxiety & PCOS', duration: '15 min', level: 'All levels' },
    ],
  },
  {
    category: 'Understanding PCOS',
    videos: [
      { id: 'xIAAlnDXDnQ', title: 'What is PCOS? A Clear Explanation', duration: '12 min', level: 'Educational' },
      { id: 'JfoDsXrFzz8', title: 'PCOS & Insulin Resistance Explained', duration: '14 min', level: 'Educational' },
      { id: 'UUFEpAbYdn4', title: 'PCOS Types — Which One Are You?', duration: '16 min', level: 'Educational' },
    ],
  },
  {
    category: 'Nutrition & Cooking',
    videos: [
      { id: '6R1H4sXiOh8', title: 'Anti-Inflammatory Meals for PCOS', duration: '20 min', level: 'Practical' },
      { id: 'M2Rl6nAkRXE', title: 'PCOS Friendly Indian Cooking', duration: '18 min', level: 'Practical' },
    ],
  },
];

function VideoLibrary() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [playingId, setPlayingId] = useState(null);

  const categories = ['All', ...videoCategories.map(c => c.category)];

  const allVideos = activeCategory === 'All'
    ? videoCategories.flatMap(c => c.videos.map(v => ({ ...v, category: c.category })))
    : videoCategories.find(c => c.category === activeCategory)?.videos.map(v => ({ ...v, category: activeCategory })) || [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#130E12', padding: '40px 60px' }}>
      <span onClick={() => navigate('/plans')} style={{ color: '#8B7D87', cursor: 'pointer', fontSize: '1rem', display: 'block', marginBottom: '32px' }}>
        ← Back to Plans
      </span>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#E4DDCB', marginBottom: '8px', letterSpacing: '-1px' }}>
          Wellness Library
        </h1>
        <p style={{ color: '#8B7D87', marginBottom: '40px', fontSize: '1rem' }}>
          Curated videos for PCOS women — yoga, nutrition, education, and breathwork. All in one place.
        </p>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              backgroundColor: activeCategory === cat ? '#B46595' : '#1C151B',
              color: activeCategory === cat ? '#E4DDCB' : '#8B7D87',
              border: `1px solid ${activeCategory === cat ? '#B46595' : '#231C21'}`,
              padding: '10px 20px', borderRadius: '100px', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', transition: 'all 0.2s',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {allVideos.map((video) => (
            <div key={video.id} style={{ backgroundColor: '#1C151B', border: `1px solid ${playingId === video.id ? '#B46595' : '#231C21'}`, borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s' }}>

              {/* Video Player or Thumbnail */}
              {playingId === video.id ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div
                  onClick={() => setPlayingId(video.id)}
                  style={{ position: 'relative', paddingBottom: '56.25%', height: 0, cursor: 'pointer', backgroundColor: '#130E12' }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                  />
                  {/* Play Button */}
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px', height: '60px', borderRadius: '50%',
                    backgroundColor: '#B46595', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(180,101,149,0.5)',
                  }}>
                    <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid #E4DDCB', marginLeft: '4px' }} />
                  </div>
                  {/* Duration badge */}
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(19,14,18,0.9)', borderRadius: '6px', padding: '4px 10px' }}>
                    <span style={{ color: '#E4DDCB', fontSize: '0.8rem' }}>{video.duration}</span>
                  </div>
                </div>
              )}

              {/* Video Info */}
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: '#E4DDCB', lineHeight: '1.4', flex: 1, marginRight: '12px' }}>
                    {video.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ backgroundColor: '#130E12', border: '1px solid #4C042D', borderRadius: '100px', padding: '4px 12px', color: '#B46595', fontSize: '0.75rem' }}>
                    {video.category}
                  </span>
                  <span style={{ backgroundColor: '#130E12', border: '1px solid #231C21', borderRadius: '100px', padding: '4px 12px', color: '#8B7D87', fontSize: '0.75rem' }}>
                    {video.level}
                  </span>
                </div>
                {playingId === video.id && (
                  <button onClick={() => setPlayingId(null)} style={{ marginTop: '12px', backgroundColor: 'transparent', color: '#8B7D87', border: '1px solid #231C21', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>
                    Close video
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoLibrary;
