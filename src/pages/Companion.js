import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SYSTEM_PROMPT = `
You are CystaSense's AI companion — a warm, knowledgeable, and empathetic health assistant built specifically for women with PCOS (Polycystic Ovary Syndrome). You have deep knowledge about:
- PCOS symptoms, types, and diagnosis
- Hormonal imbalances (FSH, LH, AMH, insulin resistance)
- PCOS-friendly diet and nutrition
- Exercise and movement recommendations for PCOS
- Menstrual cycle irregularities
- Mental health aspects of living with PCOS
- Medications commonly used for PCOS (metformin, birth control, etc.)
- Natural remedies and lifestyle changes

Your tone is:
- Warm, supportive, and non-judgmental
- Clear and easy to understand (no overwhelming medical jargon)
- Honest — you always remind users to consult a doctor for diagnosis
- Empowering — you help women understand their bodies

Always end responses with a gentle reminder to consult a healthcare provider for medical decisions. Keep responses concise but thorough — 3 to 5 sentences max unless a detailed explanation is needed.
`;

function Companion() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm your CystaSense companion 💜 I'm here to help you understand your PCOS, answer your questions, and support your wellness journey. What's on your mind today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      // Calls the local proxy setup in setupProxy.js
      const response = await fetch('/api/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_ACTUAL_API_KEY_HERE', // 👈 Put your real sk-ant-... key inside these quotes
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022', 
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "I'm having trouble responding right now. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong connecting to the AI. Please check your connection and try again." }]);
    }
    setLoading(false);
  };

  const suggestions = [
    "Why is my cycle so irregular?",
    "What should I eat for PCOS?",
    "Does stress make PCOS worse?",
    "What is AMH and why does it matter?",
  ];

  return (
    <div style={{ minHeight : '100vh', backgroundColor : '#130E12', display : 'flex', flexDirection : 'column' }}>
      {/* Header */}
      <div style={{ padding : '24px 40px', borderBottom : '1px solid #231C21', display : 'flex', alignItems : 'center', gap : '16px' }}>
        <span onClick={() => navigate('/')} style={{ color : '#8B7D87', cursor : 'pointer', fontSize : '0.9rem' }}>←</span>
        <div style={{ width : '40px', height : '40px', borderRadius : '50%', backgroundColor : '#4C042D', border : '1px solid #B46595', display : 'flex', alignItems : 'center', justifyContent : 'center', fontSize : '1.2rem' }}>💜</div>
        <div>
          <p style={{ color : '#E4DDCB', fontWeight : '600', fontSize : '0.95rem' }}>CystaSense Companion</p>
          <p style={{ color : '#B46595', fontSize : '0.75rem' }}>PCOS-aware AI • Always here</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex : 1, overflowY : 'auto', padding : '32px 40px', display : 'flex', flexDirection : 'column', gap : '20px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display : 'flex', justifyContent : msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth : '70%', backgroundColor : msg.role === 'user' ? '#B46595' : '#1C151B', border : msg.role === 'assistant' ? '1px solid #231C21' : 'none', borderRadius : msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px', padding : '14px 18px', color : '#E4DDCB', fontSize : '0.9rem', lineHeight : '1.6' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display : 'flex', justifyContent : 'flex-start' }}>
            <div style={{ backgroundColor : '#1C151B', border : '1px solid #231C21', borderRadius : '20px 20px 20px 4px', padding : '14px 18px' }}>
              <div style={{ display : 'flex', gap : '4px', alignItems : 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width : '6px', height : '6px', borderRadius : '50%', backgroundColor : '#B46595', animation : 'pulse 1.2s ease-in-out infinite', animationDelay : `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{ padding : '0 40px 16px', display : 'flex', gap : '10px', flexWrap : 'wrap' }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => setInput(s)} style={{ backgroundColor : 'transparent', border : '1px solid #231C21', borderRadius : '100px', padding : '8px 16px', color : '#8B7D87', cursor : 'pointer', fontSize : '0.8rem', fontFamily : 'DM Sans, sans-serif', transition : 'all 0.2s' }} onMouseEnter={e => { e.target.style.borderColor = '#B46595'; e.target.style.color = '#B46595'; }} onMouseLeave={e => { e.target.style.borderColor = '#231C21'; e.target.style.color = '#8B7D87'; }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input section */}
      <div style={{ padding : '20px 40px', borderTop : '1px solid #231C21', display : 'flex', gap : '12px', alignItems : 'center' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask anything about PCOS..." style={{ flex : 1, backgroundColor : '#1C151B', border : '1px solid #231C21', borderRadius : '100px', padding : '14px 24px', color : '#E4DDCB', fontSize : '0.9rem', fontFamily : 'DM Sans, sans-serif', outline : 'none' }} />
        <button onClick={send} disabled={loading} style={{ width : '48px', height : '48px', borderRadius : '50%', backgroundColor : loading ? '#231C21' : '#B46595', border : 'none', cursor : loading ? 'not-allowed' : 'pointer', fontSize : '1.1rem', transition : 'all 0.2s', display : 'flex', alignItems : 'center', justifyContent : 'center' }}>
          →
        </button>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default Companion;