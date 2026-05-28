import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './HomeScreen.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PlayIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function HomeScreen() {
  const [liveStats, setLiveStats] = useState({ users: 2847, sessions: 156, problems: 23, minutes: 1432 });
  const [counters, setCounters] = useState({ users: 0, sessions: 0, problems: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Counting animation for hero stats
    const targets = { users: 10000, sessions: 50000, problems: 1000 };
    Object.keys(targets).forEach(key => {
      const steps = 80;
      const increment = targets[key] / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          setCounters(prev => ({ ...prev, [key]: targets[key] }));
          clearInterval(timer);
        } else {
          setCounters(prev => ({ ...prev, [key]: Math.ceil(current) }));
        }
      }, 18);
    });

    // Live platform stats pulse
    const statsInterval = setInterval(() => {
      setLiveStats({
        users: Math.floor(Math.random() * 100) + 2800,
        sessions: Math.floor(Math.random() * 50) + 150,
        problems: Math.floor(Math.random() * 10) + 20,
        minutes: Math.floor(Math.random() * 200) + 1400,
      });
    }, 5000);

    // Navbar scroll effect
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);

    return () => {
      clearInterval(statsInterval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleEmailSubmit = () => {
    const input = document.getElementById('hs-email-input');
    const email = input?.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert('Please enter a valid email address');
    }
    axios
      .post(process.env.REACT_APP_FORGOT_PASSWORD_SEND_URI, { email, type: 'contact' })
      .then(res => {
        alert(res.data.message || "Thanks for signing up! We'll be in touch soon.");
        input.value = '';
      })
      .catch(err => {
        console.error('Email submit error:', err);
        alert('There was a problem submitting your request. Please try again later.');
      });
  };

  const navSections = ['features', 'stats', 'demo', 'testimonials'];

  const features = [
    {
      icon: '⚡',
      title: 'Real-time Collaboration',
      desc: 'Code together with synchronized editing, cursor tracking, and instant updates across all participants.',
    },
    {
      icon: '🎥',
      title: 'Video & Audio Calls',
      desc: 'Built-in WebRTC video conferencing with screen sharing and crystal-clear audio for seamless sessions.',
    },
    {
      icon: '📚',
      title: 'DSA Learning Hub',
      desc: 'Comprehensive data structures and algorithms content with interactive examples and curated problems.',
    },
    {
      icon: '🚀',
      title: 'Code Execution',
      desc: 'Run and test your code instantly with multi-language support and real-time output.',
    },
    {
      icon: '🔒',
      title: 'Secure Sessions',
      desc: 'End-to-end encrypted sessions with secure authentication and privacy controls for your code.',
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      desc: 'Fully responsive design that works seamlessly across desktop, tablet, and mobile devices.',
    },
  ];

  const statBlocks = [
    { label: 'Active Users',         value: liveStats.users },
    { label: 'Live Sessions',        value: liveStats.sessions },
    { label: 'Problems Solved Today', value: liveStats.problems },
    { label: 'Minutes Coded',        value: liveStats.minutes },
  ];

  const testimonials = [
    {
      text: 'WeCode transformed how our team practices coding interviews. The real-time collaboration is absolutely seamless!',
      author: 'Sarah Chen',
      role: 'Software Engineer at Google',
      initials: 'SC',
      color: '#6366f1',
    },
    {
      text: "Perfect for remote pair programming. The video integration makes it feel like we're in the same room together.",
      author: 'Mike Rodriguez',
      role: 'Tech Lead at Microsoft',
      initials: 'MR',
      color: '#8b5cf6',
    },
    {
      text: "The DSA content is incredibly well-structured. It's our go-to platform for algorithm practice and interview prep.",
      author: 'Priya Patel',
      role: 'CS Student at MIT',
      initials: 'PP',
      color: '#06b6d4',
    },
  ];

  const footerCols = {
    Product:  ['Features', 'Demo', 'Statistics', 'Changelog'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Blog'],
    Company:  ['About', 'Careers', 'Contact', 'Privacy'],
  };

  return (
    <div className="hs-body">

      {/* ===== NAVBAR ===== */}
      <nav className={`hs-navbar${scrolled ? ' hs-scrolled' : ''}`}>
        <div className="hs-nav-inner">

          {/* Logo */}
          <div className="hs-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="hs-logo-icon">W</div>
            <span className="hs-logo-text">WeCode</span>
          </div>

          {/* Desktop nav links */}
          <ul className="hs-nav-links">
            {navSections.map(s => (
              <li key={s} style={{ listStyle: 'none' }}>
                <button className="hs-nav-link" onClick={() => scrollTo(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hs-nav-right">
            <button className="hs-nav-signin" onClick={() => navigate('/login')}>Sign in</button>
            <button className="hs-nav-cta"    onClick={() => navigate('/login')}>Get Started</button>

            {/* Hamburger */}
            <button
              className="hs-hamburger"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle navigation"
            >
              <span style={mobileMenuOpen ? { transform: 'rotate(45deg) translateY(7px)' } : {}} />
              <span style={mobileMenuOpen ? { opacity: 0 } : {}} />
              <span style={mobileMenuOpen ? { transform: 'rotate(-45deg) translateY(-7px)' } : {}} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="hs-mobile-menu">
            {navSections.map(s => (
              <button key={s} className="hs-mobile-link" onClick={() => scrollTo(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <button className="hs-mobile-link" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
              Sign In
            </button>
            <button className="hs-mobile-cta" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
              Get Started — Free
            </button>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="hs-hero">
        <div className="hs-grid-overlay" />
        <div className="hs-glow-primary" />
        <div className="hs-glow-secondary" />

        <div className="hs-hero-inner">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hs-badge">
              <span className="hs-badge-dot" />
              Collaborative Coding Platform
            </div>

            <h1 className="hs-hero-title">
              Code Together,<br />
              <span className="hs-gradient-text">Learn Together</span>
            </h1>

            <p className="hs-hero-subtitle">
              The ultimate platform for developers — real-time collaborative editing, built-in video calls,
              and comprehensive DSA practice all in one place.
            </p>

            <div className="hs-hero-stats">
              {[
                { label: 'Active Users',   value: counters.users.toLocaleString() + '+' },
                { label: 'Code Sessions',  value: counters.sessions.toLocaleString() + '+' },
                { label: 'Problems',       value: counters.problems.toLocaleString() + '+' },
              ].map((s, i) => (
                <div key={i} className="hs-stat-chip">
                  <span className="hs-stat-chip-number">{s.value}</span>
                  <span className="hs-stat-chip-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="hs-hero-btns">
              <button className="hs-btn-primary" onClick={() => navigate('/login')}>
                Start Coding Free <ArrowRight />
              </button>
              <button className="hs-btn-secondary" onClick={() => scrollTo('demo')}>
                <PlayIcon /> Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Right column — code window */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hs-code-window">
              <div className="hs-window-bar">
                <div className="hs-win-dot hs-win-dot-red" />
                <div className="hs-win-dot hs-win-dot-yellow" />
                <div className="hs-win-dot hs-win-dot-green" />
                <span className="hs-window-title-text">collaborative-session.js</span>
              </div>

              <div className="hs-window-pills">
                <span className="hs-user-pill hs-pill-alice">● Alice</span>
                <span className="hs-user-pill hs-pill-bob">● Bob is typing…</span>
              </div>

              <div className="hs-code-body">
                {[
                  { n: 1, line: <><span className="hs-kw">function</span> <span className="hs-fn">collaborativeCode</span><span className="hs-op">()</span> <span className="hs-op">{'{'}</span></> },
                  { n: 2, line: <><span className="hs-cmt">{'  // Real-time sync across all users'}</span></> },
                  { n: 3, line: <><span className="hs-kw">  const</span> <span className="hs-var"> session</span> <span className="hs-op">=</span> <span className="hs-fn">connectToRoom</span><span className="hs-op">();</span></> },
                  { n: 4, line: <><span className="hs-kw">  const</span> <span className="hs-var"> users</span>   <span className="hs-op">=</span> <span className="hs-fn">getActiveUsers</span><span className="hs-op">();</span></> },
                  { n: 5, line: <></> },
                  { n: 6, line: <><span className="hs-kw">  return</span> <span className="hs-fn">shareKnowledge</span><span className="hs-op">(</span><span className="hs-var">users</span><span className="hs-op">);</span></> },
                  { n: 7, line: <><span className="hs-op">{'}'}</span><span className="hs-cursor" /></> },
                ].map(({ n, line }) => (
                  <div key={n} className="hs-code-line">
                    <span className="hs-ln">{n}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <div className="hs-trust-bar">
        <p className="hs-trust-text">
          Trusted by developers from leading companies worldwide
        </p>
      </div>

      {/* ===== FEATURES ===== */}
      <section id="features" className="hs-section">
        <div className="hs-section-inner">
          <FadeIn>
            <div className="hs-section-eyebrow">✦ Features</div>
            <h2 className="hs-section-title">
              Everything you need<br />to code better
            </h2>
            <p className="hs-section-subtitle">
              A complete suite of tools built for modern developers who want to collaborate,
              practice, and grow together.
            </p>
          </FadeIn>

          <div className="hs-features-grid">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="hs-feature-card">
                  <div className="hs-feature-icon-wrap">{f.icon}</div>
                  <h3 className="hs-feature-title">{f.title}</h3>
                  <p className="hs-feature-desc">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="hs-section-divider" />

      {/* ===== LIVE STATS ===== */}
      <section id="stats" className="hs-stats-section">
        <div className="hs-stats-glow" />
        <div className="hs-section-inner">
          <FadeIn>
            <div className="hs-stats-header">
              <div className="hs-section-eyebrow">✦ Live Stats</div>
              <h2 className="hs-section-title">Growing every day</h2>
            </div>
          </FadeIn>

          <div className="hs-stats-grid">
            {statBlocks.map((s, i) => (
              <FadeIn key={i} delay={i * 0.09}>
                <div className="hs-stat-block">
                  <div className="hs-stat-big-num">{s.value.toLocaleString()}</div>
                  <div className="hs-stat-big-label">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="hs-section-divider" />

      {/* ===== DEMO ===== */}
      <section id="demo" className="hs-section">
        <div className="hs-section-inner">
          <div className="hs-demo-grid">

            <FadeIn>
              <div className="hs-demo-text">
                <div className="hs-section-eyebrow">✦ See It Live</div>
                <h2>WeCode in action</h2>
                <p>
                  Start a collaborative session in seconds. Create a room, share the link,
                  and code together with real-time synchronization across every participant.
                </p>
                <p>
                  Our editor supports syntax highlighting, auto-completion, and live cursor
                  tracking — so you always know who's doing what.
                </p>
                <button className="hs-btn-primary" onClick={() => navigate('/login')}>
                  Try It Now — It's Free <ArrowRight />
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="hs-code-window">
                <div className="hs-window-bar">
                  <div className="hs-win-dot hs-win-dot-red" />
                  <div className="hs-win-dot hs-win-dot-yellow" />
                  <div className="hs-win-dot hs-win-dot-green" />
                  <span className="hs-window-title-text">quickSort.js — Live Session</span>
                </div>
                <div className="hs-code-body">
                  {[
                    { n: 1, line: <><span className="hs-cmt">{'// Alice joined the session'}</span></> },
                    { n: 2, line: <><span className="hs-kw">function</span> <span className="hs-fn">quickSort</span><span className="hs-op">(arr)</span> <span className="hs-op">{'{'}</span></> },
                    { n: 3, line: <><span className="hs-kw">  if</span> <span className="hs-op">(arr.length</span> <span className="hs-op">{'<='}</span> <span className="hs-num">1</span><span className="hs-op">)</span></> },
                    { n: 4, line: <><span className="hs-kw">    return</span> <span className="hs-var">arr</span><span className="hs-op">;</span></> },
                    { n: 5, line: <><span className="hs-cmt">{'  // Bob is typing...'}</span></> },
                    { n: 6, line: <><span className="hs-kw">  const</span> <span className="hs-var"> pivot</span> <span className="hs-op">=</span> <span className="hs-var">arr</span><span className="hs-op">[</span><span className="hs-num">0</span><span className="hs-op">];</span><span className="hs-cursor" /></> },
                  ].map(({ n, line }) => (
                    <div key={n} className="hs-code-line">
                      <span className="hs-ln">{n}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      <hr className="hs-section-divider" />

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="hs-section hs-testi-section">
        <div className="hs-section-inner">
          <FadeIn>
            <div className="hs-testi-header">
              <div className="hs-section-eyebrow">✦ Testimonials</div>
              <h2 className="hs-section-title">Loved by developers</h2>
              <p className="hs-section-subtitle">
                See what developers around the world say about their WeCode experience.
              </p>
            </div>
          </FadeIn>

          <div className="hs-testi-grid">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="hs-testi-card">
                  <div className="hs-stars">
                    {[1, 2, 3, 4, 5].map(s => <span key={s} className="hs-star">★</span>)}
                  </div>
                  <p className="hs-testi-text">"{t.text}"</p>
                  <div className="hs-testi-author">
                    <div
                      className="hs-author-avatar"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="hs-author-name">{t.author}</div>
                      <div className="hs-author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="hs-section-divider" />

      {/* ===== CTA ===== */}
      <section id="contact" className="hs-cta-section">
        <div className="hs-grid-overlay" style={{ opacity: 0.6 }} />
        <div className="hs-cta-glow" />
        <FadeIn>
          <div className="hs-cta-inner">
            <h2 className="hs-cta-title">
              Ready to start<br />
              <span className="hs-gradient-text">coding together?</span>
            </h2>
            <p className="hs-cta-subtitle">
              Join thousands of developers already using WeCode to collaborate, practice,
              and level up their skills.
            </p>
            <div className="hs-email-form">
              <input
                id="hs-email-input"
                type="email"
                placeholder="Enter your email"
                className="hs-email-input"
              />
              <button className="hs-btn-primary" onClick={handleEmailSubmit}
                style={{ flexShrink: 0 }}>
                Get Started
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="hs-footer">
        <div className="hs-footer-inner">
          <div className="hs-footer-grid">

            {/* Brand */}
            <div>
              <div className="hs-footer-logo-row">
                <div className="hs-logo" style={{ cursor: 'default' }}>
                  <div className="hs-logo-icon" style={{ pointerEvents: 'none' }}>W</div>
                  <span className="hs-logo-text">WeCode</span>
                </div>
              </div>
              <p className="hs-footer-brand-desc">
                The collaborative coding platform that brings developers together to learn, practice, and grow.
              </p>
              <div className="hs-footer-social">
                {/* GitHub */}
                <a href="#" className="hs-social-icon" aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="#" className="hs-social-icon" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="hs-social-icon" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerCols).map(([title, links]) => (
              <div key={title}>
                <h4 className="hs-footer-col-title">{title}</h4>
                {links.map(link => (
                  <button key={link} className="hs-footer-link">{link}</button>
                ))}
              </div>
            ))}
          </div>

          <hr className="hs-footer-divider" />

          <div className="hs-footer-bottom">
            <p className="hs-footer-copy">© {new Date().getFullYear()} WeCode. All rights reserved.</p>
            <div className="hs-footer-bottom-links">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
                <a key={item} href="#" className="hs-footer-link" style={{ padding: 0 }}>{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ===== ONLINE USERS WIDGET ===== */}
      <div className="hs-online-widget">
        <div className="hs-online-dot" />
        <span>{liveStats.users.toLocaleString()} users online</span>
      </div>

    </div>
  );
}
