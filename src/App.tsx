import { useState, useEffect, useRef, useCallback, type CSSProperties, type ReactNode } from 'react';
/* ─── IMAGES ─── */
const MARIN_WAVE = 'https://raw.githubusercontent.com/afporiginal/afporiginal/main/images/marin_kitagawa_sono_bisque_doll_png_render_by_marcopolo157_dgg94pj.png';
const MARIN_PEACE = 'https://raw.githubusercontent.com/afporiginal/afporiginal/main/images/Kitagawa_Marin-removebg-preview.png';
const MARIN_ICON = 'https://images.weserv.nl/?url=https://raw.githubusercontent.com/afporiginal/afporiginal/main/images/%F0%9D%96%AC%F0%9D%96%BA%F0%9D%97%8B%F0%9D%97%82%F0%9D%97%87%20%F0%9D%96%AA%F0%9D%97%82%F0%9D%97%8D%F0%9D%96%BA%F0%9D%97%80%F0%9D%96%BA%F0%9D%97%90%F0%9D%96%BA%20%E2%9C%BF.webp&w=200&h=200&fit=cover&mask=circle&output=png';
/* ─── COLORS ─── */
const C = { rose: '#e8788a', gold: '#f5c542', bg: '#0a0a0f', card: '#12121a', border: '#1e1e2a', muted: '#6b7280', text: '#e2e8f0' };
/* ─── GLOBAL CSS ─── */
const GCSS = `
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
html{scroll-behavior:smooth}
`;
const mono: CSSProperties = { fontFamily: "'JetBrains Mono',monospace" };
const shimmerStyle: CSSProperties = {
  background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose},${C.gold},${C.rose})`,
  backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', animation: 'shimmer 3s linear infinite',
};
/* ═══ PARTICLES ═══ */
function Particles({ count = 60 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    let w = (c.width = innerWidth), h = (c.height = innerHeight);
    const ps = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 0.3,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3, p: Math.random() > 0.45,
    }));
    const onR = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    addEventListener('resize', onR);
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of ps) {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.28);
        ctx.fillStyle = d.p ? 'rgba(232,120,138,0.25)' : 'rgba(245,197,66,0.18)';
        ctx.fill(); d.x += d.dx; d.y += d.dy;
        if (d.x < 0 || d.x > w) d.dx *= -1;
        if (d.y < 0 || d.y > h) d.dy *= -1;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onR); };
  }, [count]);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}
/* ═══ SCROLL REVEAL ═══ */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(40px)', transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}
/* ═══ COUNTER ═══ */
function Counter({ label, end, suffix = '' }: { label: string; end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let cur = 0; const step = Math.max(1, Math.floor(end / 35));
      const iv = setInterval(() => { cur = Math.min(cur + step, end); setVal(cur); if (cur >= end) clearInterval(iv); }, 30);
      obs.disconnect();
    }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, [end]);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <p style={{ ...shimmerStyle, fontSize: 'clamp(1.5rem,5vw,2.2rem)', fontWeight: 800, margin: 0 }}>{val}{suffix}</p>
      <p style={{ color: C.muted, fontSize: 11, ...mono, marginTop: 4 }}>{label}</p>
    </div>
  );
}
/* ═══ MARQUEE ═══ */
function Marquee() {
  const items = ['Python 🐍', 'Lua 🌙', 'JavaScript ⚡', 'Blender 🧊', 'Roblox 🎮', 'Discord 🤖', 'Node.js 🟢', 'Git', 'VS Code', 'Linux 🐧'];
  const row = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', padding: '20px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: `${C.card}80` }}>
      <div style={{ display: 'flex', gap: 48, animation: 'marquee 25s linear infinite', width: 'max-content' }}>
        {row.map((t, i) => (
          <span key={i} style={{ fontSize: 14, fontWeight: 600, color: C.muted, whiteSpace: 'nowrap', ...mono }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
/* ═══ LANDING ═══ */
function Landing({ onEnter }: { onEnter: () => void }) {
  const [hov, setHov] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Particles count={45} />
      {/* Radial glow */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.rose}08 0%, transparent 70%)`, top: '30%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(20px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1)' }}>
        <img src={MARIN_WAVE} alt="" style={{ width: 200, maxWidth: '55vw', margin: '0 auto 20px', display: 'block', animation: 'float 4.5s ease-in-out infinite', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7))' }} />
        <h1 style={{ ...shimmerStyle, fontSize: 'clamp(3rem,10vw,4.5rem)', fontWeight: 900, margin: '0 0 2px', fontFamily: 'Sora,sans-serif', letterSpacing: '-0.02em' }}>AFPL</h1>
        <p style={{ color: C.muted, fontSize: 13, ...mono, letterSpacing: '0.15em', margin: '0 0 48px' }}>afporiginal</p>
        <button
          onClick={onEnter}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            padding: '16px 52px', borderRadius: 50, border: 'none', fontSize: 14, fontWeight: 700,
            color: '#fff', cursor: 'pointer', fontFamily: 'Sora,sans-serif', letterSpacing: '0.04em',
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            background: hov ? `linear-gradient(135deg,${C.rose},${C.gold})` : `linear-gradient(135deg,${C.rose}66,${C.gold}55)`,
            boxShadow: hov ? `0 0 60px ${C.rose}55, 0 0 120px ${C.gold}22, 0 4px 30px rgba(0,0,0,0.4)` : `0 0 30px ${C.rose}18, 0 4px 20px rgba(0,0,0,0.3)`,
            transform: hov ? 'scale(1.06) translateY(-2px)' : 'scale(1)',
          }}
        >
          Enter my world &nbsp;→
        </button>
        <p style={{ color: `${C.muted}50`, fontSize: 10, ...mono, marginTop: 32, animation: 'pulse 2s ease-in-out infinite' }}>click to continue</p>
      </div>
    </div>
  );
}
/* ═══ NAVBAR ═══ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(scrollY > 60);
    addEventListener('scroll', onS); return () => removeEventListener('scroll', onS);
  }, []);
  const links = [{ l: 'About', h: '#about' }, { l: 'Stack', h: '#stack' }, { l: 'GitHub', h: '#github' }];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
      padding: '0 24px', transition: 'all 0.3s',
      background: scrolled ? `${C.bg}ee` : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={MARIN_ICON} style={{ width: 28, height: 28, borderRadius: '50%' }} alt="" />
          <span style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: 15, ...shimmerStyle }}>AFPL</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {links.map(l => (
            <a key={l.l} href={l.h} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, color: C.muted, textDecoration: 'none', transition: 'all 0.2s', ...mono }}
              onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.background = `${C.rose}12`; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}
            >{l.l}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
/* ═══ HERO ═══ */
function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '120px 24px 80px' }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${C.rose}06 0%, transparent 70%)`, top: '20%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ animation: 'fadeUp 0.8s ease-out' }}>
          <p style={{ ...mono, fontSize: 13, color: C.rose, marginBottom: 16, letterSpacing: '0.08em' }}>👋 Hey there, I'm</p>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(2.5rem,7vw,4rem)', fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <span style={shimmerStyle}>AFPL</span>
          </h1>
          <p style={{ fontSize: 17, color: C.muted, margin: '0 0 28px', lineHeight: 1.7, maxWidth: 440 }}>
            Brazilian developer building <span style={{ color: C.rose, fontWeight: 600 }}>immersive games</span>, <span style={{ color: C.gold, fontWeight: 600 }}>advanced bots</span>, and <span style={{ color: '#c084fc', fontWeight: 600 }}>3D worlds</span>.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#about" style={{ padding: '12px 32px', borderRadius: 50, fontSize: 13, fontWeight: 700, color: '#fff', textDecoration: 'none', background: `linear-gradient(135deg,${C.rose},${C.gold})`, boxShadow: `0 4px 20px ${C.rose}33`, transition: 'all 0.3s', fontFamily: 'Sora,sans-serif' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${C.rose}55`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 20px ${C.rose}33`; }}
            >Explore</a>
            <a href="https://github.com/afporiginal" target="_blank" rel="noreferrer" style={{ padding: '12px 32px', borderRadius: 50, fontSize: 13, fontWeight: 600, color: C.muted, textDecoration: 'none', border: `1px solid ${C.border}`, transition: 'all 0.3s', ...mono }}
              onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.rose + '44'; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}
            >GitHub ↗</a>
          </div>
        </div>
        <div style={{ animation: 'fadeUp 0.8s ease-out 0.2s both' }}>
          <img src={MARIN_WAVE} alt="" style={{ width: 280, maxWidth: '40vw', animation: 'float 5s ease-in-out infinite', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }} />
        </div>
      </div>
    </section>
  );
}
/* ═══ ABOUT ═══ */
function About() {
  const [tab, setTab] = useState<'do' | 'use'>('do');
  const data = {
    do: [
      { i: '🎮', n: 'Roblox Games', d: 'Immersive experiences with complex mechanics and custom engines' },
      { i: '🤖', n: 'Discord Bots', d: 'Advanced bots with AI moderation, music systems & slash commands' },
      { i: '🧊', n: '3D Modeling', d: 'Characters, scenes & game assets crafted in Blender' },
      { i: '⚡', n: 'Automation', d: 'Python scripts that handle the boring stuff so I don\'t have to' },
    ],
    use: [
      { i: '🐍', n: 'Python', d: 'My go-to for bots, automation, APIs and data processing' },
      { i: '🌙', n: 'Lua', d: 'Roblox game scripting, complex game logic & networking' },
      { i: '⚡', n: 'JavaScript', d: 'Full-stack web development with Node.js backend' },
      { i: '🧊', n: 'Blender', d: '3D modeling, rendering, animation & asset creation' },
    ],
  };
  return (
    <section id="about" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <p style={{ ...mono, fontSize: 12, color: C.rose, letterSpacing: '0.15em', marginBottom: 8 }}>ABOUT</p>
          <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(1.8rem,5vw,2.5rem)', fontWeight: 800, color: '#fff', margin: '0 0 40px' }}>What I bring to the table</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
              {(['do', 'use'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex: 1, padding: '16px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  ...mono, letterSpacing: '0.12em', border: 'none',
                  borderBottom: tab === t ? `2px solid ${t === 'do' ? C.rose : C.gold}` : '2px solid transparent',
                  color: tab === t ? (t === 'do' ? C.rose : C.gold) : C.muted,
                  background: tab === t ? (t === 'do' ? `${C.rose}08` : `${C.gold}08`) : 'transparent',
                  transition: 'all 0.25s',
                }}>
                  {t === 'do' ? 'WHAT I DO' : 'WHAT I USE'}
                </button>
              ))}
            </div>
            <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
              {data[tab].map((c, idx) => (
                <div key={c.n + tab} style={{
                  background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20,
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  animation: `scaleIn 0.4s ease-out ${idx * 0.06}s both`, cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.rose}44`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${C.rose}10`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <span style={{ fontSize: 28 }}>{c.i}</span>
                  <h3 style={{ margin: '10px 0 6px', fontSize: 14, fontWeight: 700, color: '#fff' }}>{c.n}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
/* ═══ STACK ═══ */
function Stack() {
  const items = [
    { n: 'Python', c: '#3776AB' }, { n: 'Lua', c: '#2C2D72' }, { n: 'JavaScript', c: '#F7DF1E' },
    { n: 'Blender', c: '#E87D0D' }, { n: 'Discord.py', c: '#5865F2' }, { n: 'Roblox Studio', c: '#D22215' },
    { n: 'Node.js', c: '#339933' }, { n: 'Git', c: '#F05032' }, { n: 'VS Code', c: '#007ACC' }, { n: 'Linux', c: '#FCC624' },
  ];
  return (
    <section id="stack" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <p style={{ ...mono, fontSize: 12, color: C.gold, letterSpacing: '0.15em', marginBottom: 8 }}>STACK</p>
          <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(1.8rem,5vw,2.5rem)', fontWeight: 800, color: '#fff', margin: '0 0 32px' }}>Tools I work with</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {items.map((s, i) => (
              <span key={s.n} style={{
                padding: '10px 22px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                border: `1px solid ${s.c}35`, color: s.c, background: `${s.c}0a`,
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', cursor: 'default',
                animation: `fadeUp 0.4s ease-out ${i * 0.04}s both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)'; e.currentTarget.style.background = `${s.c}1a`; e.currentTarget.style.boxShadow = `0 8px 25px ${s.c}15`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = `${s.c}0a`; e.currentTarget.style.boxShadow = 'none'; }}
              >{s.n}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
/* ═══ GITHUB ═══ */
function GitHub() {
  return (
    <section id="github" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <p style={{ ...mono, fontSize: 12, color: C.rose, letterSpacing: '0.15em', marginBottom: 8 }}>GITHUB</p>
          <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(1.8rem,5vw,2.5rem)', fontWeight: 800, color: '#fff', margin: '0 0 32px' }}>My activity</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 28, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
            <Counter label="commits" end={247} />
            <Counter label="repos" end={12} />
            <Counter label="stars" end={34} />
            <Counter label="contribs" end={580} suffix="+" />
          </div>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Reveal delay={0.15}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <img src={`https://github-readme-stats.vercel.app/api?username=afporiginal&show_icons=true&hide_border=true&bg_color=${C.card.slice(1)}&title_color=${C.rose.slice(1)}&icon_color=${C.gold.slice(1)}&text_color=C9D1D9&ring_color=${C.rose.slice(1)}&count_private=true&include_all_commits=true`} style={{ flex: 1, minWidth: 0, borderRadius: 16, border: `1px solid ${C.border}` }} alt="" />
              <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=afporiginal&layout=compact&hide_border=true&bg_color=${C.card.slice(1)}&title_color=${C.rose.slice(1)}&text_color=C9D1D9&langs_count=6`} style={{ flex: 1, minWidth: 0, borderRadius: 16, border: `1px solid ${C.border}` }} alt="" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <img src={`https://github-readme-streak-stats.herokuapp.com/?user=afporiginal&hide_border=true&background=${C.card.slice(1)}&stroke=${C.rose.slice(1)}&ring=${C.rose.slice(1)}&fire=${C.gold.slice(1)}&currStreakLabel=${C.rose.slice(1)}&sideLabels=${C.rose.slice(1)}&currStreakNum=C9D1D9&sideNums=C9D1D9&dates=555555`} style={{ width: '100%', borderRadius: 16, border: `1px solid ${C.border}` }} alt="" />
          </Reveal>
          <Reveal delay={0.25}>
            <img src={`https://github-readme-activity-graph.vercel.app/graph?username=afporiginal&bg_color=${C.card.slice(1)}&color=${C.rose.slice(1)}&line=${C.gold.slice(1)}&point=${C.rose.slice(1)}&area=true&area_color=${C.rose.slice(1)}&hide_border=true&custom_title=contributions`} style={{ width: '100%', borderRadius: 16, border: `1px solid ${C.border}` }} alt="" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer style={{ padding: '60px 24px', borderTop: `1px solid ${C.border}`, position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <p style={{ ...mono, fontSize: 13, color: C.muted, margin: 0 }}>⚡ Automating the ordinary, one line of code at a time.</p>
          <p style={{ ...mono, fontSize: 10, color: `${C.muted}55`, marginTop: 6 }}>built by afpl</p>
        </div>
        <img src={MARIN_PEACE} alt="✌️" style={{ width: 80, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))', animation: 'float 4s ease-in-out infinite' }} />
      </div>
    </footer>
  );
}
/* ═══ SCROLL PROGRESS ═══ */
function ScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const onS = () => { const h = document.documentElement; setProg(h.scrollTop / (h.scrollHeight - h.clientHeight)); };
    addEventListener('scroll', onS); return () => removeEventListener('scroll', onS);
  }, []);
  return <div style={{ position: 'fixed', top: 0, left: 0, height: 2, width: `${prog * 100}%`, background: `linear-gradient(90deg,${C.rose},${C.gold})`, zIndex: 50, transition: 'width 0.1s' }} />;
}
/* ═══ APP ═══ */
export default function App() {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const enter = useCallback(() => {
    setLeaving(true);
    setTimeout(() => { setEntered(true); setLeaving(false); }, 700);
  }, []);
  return (
    <>
      <style>{GCSS}</style>
      {!entered ? (
        <div style={{ transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)', opacity: leaving ? 0 : 1, transform: leaving ? 'scale(1.08)' : 'scale(1)', filter: leaving ? 'blur(12px)' : 'blur(0)' }}>
          <Landing onEnter={enter} />
        </div>
      ) : (
        <div style={{ animation: 'fadeUp 0.7s ease-out' }}>
          <Particles count={35} />
          <ScrollProgress />
          <Navbar />
          <Hero />
          <Marquee />
          <About />
          <Stack />
          <GitHub />
          <Footer />
        </div>
      )}
    </>
  );
}
