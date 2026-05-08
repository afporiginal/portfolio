import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────── CONSTANTS ───────────────────── */
const COLORS = {
  rosa: "#e8788a",
  gold: "#f5c542",
  bg: "#0a0a0f",
  card: "#12121a",
  border: "#1e1e2a",
  muted: "#6b7280",
  text: "#e2e8f0",
};

const IMGS = {
  marinWave:
    "https://raw.githubusercontent.com/afporiginal/afporiginal/main/images/marin_kitagawa_sono_bisque_doll_png_render_by_marcopolo157_dgg94pj.png",
  marinPeace:
    "https://raw.githubusercontent.com/afporiginal/afporiginal/main/images/Kitagawa_Marin-removebg-preview.png",
  marinAvatar:
    "https://images.weserv.nl/?url=https://raw.githubusercontent.com/afporiginal/afporiginal/main/images/%F0%9D%96%AC%F0%9D%96%BA%F0%9D%97%8B%F0%9D%97%82%F0%9D%97%87%20%F0%9D%96%AA%F0%9D%97%82%F0%9D%97%8D%F0%9D%96%BA%F0%9D%97%80%F0%9D%96%BA%F0%9D%97%90%F0%9D%96%BA%20%E2%9C%BF.webp&w=200&h=200&fit=cover&mask=circle&output=png",
};

const GITHUB = "https://github.com/afporiginal";

const DISCORD = "https://discord.com/users/afploriginal";

const TECHS = [
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "Lua", icon: "🌙", color: "#000080" },
  { name: "JavaScript", icon: "⚡", color: "#F7DF1E" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Blender", icon: "🎨", color: "#F5792A" },
  { name: "Git", icon: "📦", color: "#F05032" },
  { name: "VS Code", icon: "💎", color: "#007ACC" },
];

const WHAT_I_DO = [
  { icon: "🐍", title: "Python Scripts", desc: "Automations, scrapers, CLI tools — whatever makes life easier." },
  { icon: "🌐", title: "Web Dev", desc: "Interfaces with React, Node.js, and modern tooling." },
  { icon: "🎨", title: "3D Modeling", desc: "Creating models and renders in Blender." },
  { icon: "⚡", title: "Automation", desc: "Automating repetitive tasks — because life is too short." },
];

const WHAT_I_USE = [
  { icon: "💻", title: "VS Code", desc: "My daily driver for all coding." },
  { icon: "📦", title: "Git & GitHub", desc: "Version control for everything." },
  { icon: "🟢", title: "Node.js", desc: "Backend runtime for JS/TS projects." },
  { icon: "🎨", title: "Blender", desc: "3D modeling, sculpting, rendering." },
];

/* ───────────────────── PARTICLES ───────────────────── */
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 10,
    color: Math.random() > 0.5 ? COLORS.rosa : COLORS.gold,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            backgroundColor: p.color,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────── LANDING PAGE ───────────────────── */
function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.bg,
        zIndex: 100,
        animation: exiting ? "landing-zoom 0.7s ease-in forwards" : undefined,
        overflow: "hidden",
      }}
    >
      <Particles />

      {/* Centered content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            fontWeight: 800,
            background: `linear-gradient(90deg, ${COLORS.rosa}, ${COLORS.gold}, ${COLORS.rosa})`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
            lineHeight: 1.1,
          }}
        >
          AFPL
        </h1>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: COLORS.muted,
            fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
            marginTop: "12px",
            letterSpacing: "0.05em",
          }}
        >
          Automating the ordinary ⚡
        </p>

        <button
          onClick={handleEnter}
          style={{
            marginTop: "40px",
            padding: "14px 40px",
            background: `linear-gradient(135deg, ${COLORS.rosa}, ${COLORS.gold})`,
            color: "#0a0a0f",
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            animation: "pulse-glow 2s ease-in-out infinite",
            transition: "transform 0.2s ease",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Enter my world →
        </button>
      </div>

      {/* Marin — bottom-right corner, decorative */}
      <img
        src={IMGS.marinWave}
        alt="Marin Kitagawa"
        style={{
          position: "absolute",
          bottom: "-10px",
          right: "clamp(-20px, 3vw, 40px)",
          height: "clamp(180px, 35vh, 340px)",
          objectFit: "contain",
          animation: "float 5s ease-in-out infinite",
          filter: "drop-shadow(0 0 40px #e8788a1a)",
          zIndex: 1,
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ───────────────────── NAVBAR ───────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "GitHub", href: "#github" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        background: scrolled ? "rgba(10,10,15,0.8)" : "transparent",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 800,
          fontSize: "1.3rem",
          background: `linear-gradient(90deg, ${COLORS.rosa}, ${COLORS.gold})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 3s linear infinite",
          textDecoration: "none",
        }}
      >
        AFPL
      </a>

      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              color: COLORS.muted,
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              transition: "color 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.rosa)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
          >
            {l.label}
          </a>
        ))}
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 18px",
            background: `linear-gradient(135deg, ${COLORS.rosa}22, ${COLORS.gold}22)`,
            border: `1px solid ${COLORS.rosa}44`,
            borderRadius: "8px",
            color: COLORS.rosa,
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.rosa}33, ${COLORS.gold}33)`;
            e.currentTarget.style.borderColor = `${COLORS.rosa}88`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.rosa}22, ${COLORS.gold}22)`;
            e.currentTarget.style.borderColor = `${COLORS.rosa}44`;
          }}
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  );
}

/* ───────────────────── HERO SECTION ───────────────────── */
function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.rosa}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(30px, 6vw, 80px)",
          maxWidth: "1050px",
          width: "100%",
          animation: "fadeInUp 0.8s ease-out",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Left — Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            flex: "1 1 400px",
            minWidth: "280px",
          }}
        >
          {/* Avatar */}
          <img
            src={IMGS.marinAvatar}
            alt="AFPL Avatar"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: `3px solid ${COLORS.rosa}66`,
              marginBottom: "20px",
              animation: "border-glow 3s ease-in-out infinite",
            }}
          />

          {/* Greeting */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              background: `${COLORS.rosa}11`,
              border: `1px solid ${COLORS.rosa}22`,
              borderRadius: "50px",
              marginBottom: "24px",
            }}
          >
            <span style={{ animation: "wave-hand 2s ease-in-out infinite", display: "inline-block", fontSize: "1.2rem" }}>👋</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: COLORS.rosa }}>
              hey, I'm afporiginal
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            <span style={{ color: COLORS.text }}>I'm </span>
            <span
              style={{
                background: `linear-gradient(90deg, ${COLORS.rosa}, ${COLORS.gold}, ${COLORS.rosa})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
              }}
            >
              AFPL
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
              color: COLORS.muted,
              maxWidth: "440px",
              lineHeight: 1.7,
              marginBottom: "12px",
            }}
          >
            Developer & creator from Brazil.
            <br />
            Building bots, games, scripts & 3D art.
          </p>

          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: COLORS.gold,
              letterSpacing: "0.05em",
            }}
          >
            "Automating the ordinary ⚡"
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "16px", marginTop: "36px", flexWrap: "wrap" }}>
            <a
              href="#about"
              style={{
                padding: "12px 32px",
                background: `linear-gradient(135deg, ${COLORS.rosa}, ${COLORS.gold})`,
                color: "#0a0a0f",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: `0 4px 20px ${COLORS.rosa}33`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 30px ${COLORS.rosa}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 20px ${COLORS.rosa}33`;
              }}
            >
              Know more ↓
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 32px",
                background: "transparent",
                color: COLORS.text,
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                borderRadius: "12px",
                textDecoration: "none",
                border: `1px solid ${COLORS.border}`,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.rosa;
                e.currentTarget.style.color = COLORS.rosa;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.color = COLORS.text;
              }}
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Right — Marin waving */}
        <div
          style={{
            flex: "0 1 320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Glow ring behind Marin */}
          <div
            style={{
              position: "absolute",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.rosa}0c 0%, transparent 70%)`,
              border: `1px solid ${COLORS.rosa}11`,
              animation: "spin-slow 30s linear infinite",
              pointerEvents: "none",
            }}
          />
          <img
            src={IMGS.marinWave}
            alt="Marin Kitagawa"
            style={{
              height: "clamp(200px, 30vw, 340px)",
              objectFit: "contain",
              animation: "float 5s ease-in-out infinite",
              filter: "drop-shadow(0 0 50px #e8788a1a)",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── MARQUEE ───────────────────── */
function TechMarquee() {
  const items = [...TECHS, ...TECHS];
  return (
    <section style={{ overflow: "hidden", padding: "20px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
      <div
        style={{
          display: "flex",
          gap: "48px",
          animation: "marquee 25s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: COLORS.muted,
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>{t.icon}</span>
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── ABOUT SECTION ───────────────────── */
function AboutSection() {
  const [tab, setTab] = useState<"do" | "use">("do");
  const items = tab === "do" ? WHAT_I_DO : WHAT_I_USE;

  return (
    <section id="about" style={{ padding: "100px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "48px", animation: "fadeInUp 0.6s ease-out" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: COLORS.rosa,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          // about me
        </span>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 700,
            marginTop: "12px",
            color: COLORS.text,
          }}
        >
          About
        </h2>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "4px",
          marginBottom: "40px",
          background: COLORS.card,
          borderRadius: "12px",
          padding: "4px",
          maxWidth: "360px",
          margin: "0 auto 40px",
          border: `1px solid ${COLORS.border}`,
        }}
      >
        {(["do", "use"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.2s",
              background: tab === t ? `linear-gradient(135deg, ${COLORS.rosa}, ${COLORS.gold})` : "transparent",
              color: tab === t ? "#0a0a0f" : COLORS.muted,
              letterSpacing: "0.03em",
            }}
          >
            {t === "do" ? "WHAT I DO" : "WHAT I USE"}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={`${tab}-${i}`}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "16px",
              padding: "24px",
              transition: "all 0.3s ease",
              animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both`,
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.rosa}44`;
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 8px 30px ${COLORS.rosa}11`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "12px" }}>{item.icon}</span>
            <h3
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: COLORS.text,
                marginBottom: "6px",
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: COLORS.muted, lineHeight: 1.6 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── STACK SECTION ───────────────────── */
function StackSection() {
  return (
    <section id="stack" style={{ padding: "100px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: COLORS.rosa,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          // tech stack
        </span>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 700,
            marginTop: "12px",
            color: COLORS.text,
          }}
        >
          Stack
        </h2>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
        {TECHS.map((t, i) => (
          <div
            key={t.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "12px",
              cursor: "default",
              transition: "all 0.3s ease",
              animation: `fadeInUp 0.4s ease-out ${i * 0.06}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = t.color + "66";
              e.currentTarget.style.boxShadow = `0 0 20px ${t.color}22`;
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>{t.icon}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: COLORS.text, fontWeight: 500 }}>
              {t.name}
            </span>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: t.color, boxShadow: `0 0 8px ${t.color}66` }} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── ANIMATED COUNTER ───────────────────── */
function AnimatedCounter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "2.5rem",
          fontWeight: 800,
          background: `linear-gradient(90deg, ${COLORS.rosa}, ${COLORS.gold})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
        }}
      >
        {count}{suffix}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: COLORS.muted, marginTop: "4px" }}>
        {label}
      </div>
    </div>
  );
}

/* ───────────────────── GITHUB SECTION ───────────────────── */
function GitHubSection() {
  return (
    <section id="github" style={{ padding: "100px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: COLORS.rosa,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          // github
        </span>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 700,
            marginTop: "12px",
            color: COLORS.text,
          }}
        >
          GitHub Activity
        </h2>
      </div>

      {/* Counters */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginBottom: "40px",
          maxWidth: "500px",
          margin: "0 auto 40px",
        }}
      >
        <AnimatedCounter end={15} label="Repositories" suffix="+" />
        <AnimatedCounter end={3} label="Languages" />
        <AnimatedCounter end={365} label="Days coding" suffix="+" />
      </div>

      {/* GitHub Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "16px",
            padding: "8px",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="https://github-readme-stats.vercel.app/api?username=afporiginal&show_icons=true&theme=radical&hide_border=true&bg_color=12121a&title_color=e8788a&icon_color=f5c542&text_color=e2e8f0&ring_color=e8788a"
            alt="GitHub Stats"
            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
            loading="lazy"
          />
        </div>
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "16px",
            padding: "8px",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=afporiginal&theme=radical&hide_border=true&background=12121a&ring=e8788a&fire=f5c542&currStreakLabel=e8788a&sideLabels=e2e8f0&dates=6b7280"
            alt="GitHub Streak"
            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Top Languages */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "16px",
          padding: "8px",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          maxWidth: "420px",
          margin: "0 auto",
        }}
      >
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=afporiginal&layout=compact&theme=radical&hide_border=true&bg_color=12121a&title_color=e8788a&text_color=e2e8f0"
          alt="Top Languages"
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          loading="lazy"
        />
      </div>

      {/* Contribution Graph */}
      <div
        style={{
          marginTop: "20px",
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "16px",
          padding: "8px",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://github-readme-activity-graph.vercel.app/graph?username=afporiginal&theme=react-dark&hide_border=true&bg_color=12121a&color=e8788a&line=f5c542&point=e8788a&area=true&area_color=e8788a"
          alt="Contribution Graph"
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          loading="lazy"
        />
      </div>

      {/* View Profile Button */}
      <div style={{ textAlign: "center", marginTop: "36px" }}>
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 30px",
            background: `linear-gradient(135deg, ${COLORS.rosa}22, ${COLORS.gold}22)`,
            border: `1px solid ${COLORS.rosa}44`,
            borderRadius: "12px",
            color: COLORS.rosa,
            textDecoration: "none",
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.rosa}33, ${COLORS.gold}33)`;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.rosa}22, ${COLORS.gold}22)`;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View Full Profile ↗
        </a>
      </div>
    </section>
  );
}

/* ───────────────────── FOOTER ───────────────────── */
function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: "60px 24px 40px",
        textAlign: "center",
      }}
    >
      <img
        src={IMGS.marinPeace}
        alt="Marin Peace"
        style={{
          height: "140px",
          objectFit: "contain",
          margin: "0 auto 24px",
          display: "block",
          animation: "floatSlow 5s ease-in-out infinite",
          filter: "drop-shadow(0 0 20px #e8788a22)",
        }}
      />

      <h3
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          background: `linear-gradient(90deg, ${COLORS.rosa}, ${COLORS.gold})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "8px",
        }}
      >
        AFPL
      </h3>

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.8rem",
          color: COLORS.muted,
          marginBottom: "24px",
        }}
      >
        Automating the ordinary ⚡
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
        {/* GitHub */}
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            fontSize: "1.2rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = COLORS.rosa;
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = COLORS.border;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        {/* Discord */}
        <a
          href={DISCORD}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            fontSize: "1.2rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#5865F2";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = COLORS.border;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text}>
            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
          </svg>
        </a>
      </div>

      <div
        style={{
          width: "60px",
          height: "2px",
          background: `linear-gradient(90deg, ${COLORS.rosa}, ${COLORS.gold})`,
          margin: "0 auto 20px",
          borderRadius: "2px",
        }}
      />

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: COLORS.muted }}>
        © {new Date().getFullYear()} AFPL — Built with ❤️ and React
      </p>

      {/* Visitor Counter */}
      <div style={{ marginTop: "20px" }}>
        <img
          src="https://komarev.com/ghpvc/?username=afporiginal&style=for-the-badge&color=e8788a&label=VISITORS"
          alt="Visitor Counter"
          style={{ opacity: 0.7 }}
        />
      </div>
    </footer>
  );
}

/* ───────────────────── MAIN APP ───────────────────── */
export default function App() {
  const [showSite, setShowSite] = useState(false);

  const handleEnter = useCallback(() => {
    setShowSite(true);
  }, []);

  if (!showSite) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", position: "relative" }}>
      <Particles />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <StackSection />
        <GitHubSection />
      </main>
      <Footer />
    </div>
  );
}
