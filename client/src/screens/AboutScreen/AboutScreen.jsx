import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../Layout1/Navbar";
import Footer from "../../Layout1/Footer";
import "./AboutScreen.css";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AboutScreen = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Yashasvi",
      role: "Lead Backend Engineer & Project Coordinator",
      bio: "Passionate about building scalable backend systems and ensuring smooth project coordination, Yashasvi is the powerhouse behind WeCode's real-time collaboration engine.",
      github: "https://github.com/yashasvi0904",
      image: "yashasvi pic.jpeg",
    },
  ];

  const timelineItems = [
    { date: "December 2024", event: "Initial idea generation and project brainstorming for WeCode." },
    { date: "January 2025",  event: "Architecture design and technology stack finalization." },
    { date: "February 2025", event: "Core backend and frontend development begins." },
    { date: "March 2025",    event: "Integration of real-time collaboration and live coding features." },
    { date: "April 2025",    event: "Testing, bug fixing, and preparation for early access release." },
  ];

  const platformStats = [
    { number: "500+",   text: "Rooms Created" },
    { number: "1200+",  text: "Collaborations" },
    { number: "800+",   text: "Users Connected" },
    { number: "99.9%",  text: "Server Uptime" },
    { number: "50+",    text: "Countries Reached" },
    { number: "150+",   text: "Open Source PRs" },
  ];

  const whyCards = [
    { icon: "🎥", title: "Video-First Collaboration",       desc: "Connect face-to-face while coding together in real-time with built-in WebRTC video." },
    { icon: "📚", title: "All-in-One Learning Hub",         desc: "Resources, tools, and guidance all in one seamless platform." },
    { icon: "⚡", title: "Real-Time Collaboration Engine",  desc: "Work on code simultaneously with zero latency." },
    { icon: "🌐", title: "Build, Connect, and Grow",        desc: "Join a global community of like-minded developers." },
    { icon: "🔒", title: "Secure Sessions",                 desc: "End-to-end encrypted rooms with fine-grained privacy controls." },
    { icon: "📱", title: "Fully Responsive",                desc: "A polished experience on every screen — mobile, tablet, and desktop." },
  ];

  const achievements = [
    { icon: "🏆", title: "Top 10 Collaboration Tools", desc: "Recognized among top 10 collaboration platforms for coders." },
    { icon: "🌍", title: "Global Expansion",            desc: "Users across 50+ countries actively collaborating every day." },
    { icon: "🎯", title: "Innovation Award 2025",       desc: "Awarded for excellence in real-time communication solutions." },
  ];

  const techStack = ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "Socket.IO", "WebRTC", "Firebase"];

  return (
    <div className="ab-body">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="ab-hero">
        <div className="ab-hero-glow" />
        <div className="ab-hero-grid" />
        <motion.div
          className="ab-hero-inner"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ab-hero-eyebrow">✦ Our Story</div>
          <h1 className="ab-hero-title">
            About <span className="ab-gradient-text">WeCode</span>
          </h1>
          <p className="ab-hero-subtitle">
            Empowering developers to collaborate, learn, and innovate — together,
            in a seamless and futuristic environment.
          </p>
        </motion.div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <FadeIn>
            <div className="ab-section-header center">
              <div className="ab-eyebrow">✦ Our Mission</div>
              <h2 className="ab-title">Why we built WeCode</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="ab-mission-block">
              <div className="ab-mission-glow" />
              <p className="ab-mission-text">
                At WeCode, our mission is to <strong>empower developers</strong> around the world to
                collaborate, learn, and innovate seamlessly. We believe that coding should be
                <strong> accessible, interactive, and fun.</strong> By combining real-time collaboration,
                video conferencing, and structured learning resources, we aim to build a
                <strong> global community of passionate coders</strong>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <hr className="ab-divider" />

      {/* ===== TEAM ===== */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <FadeIn>
            <div className="ab-section-header center">
              <div className="ab-eyebrow">✦ The Team</div>
              <h2 className="ab-title">Meet the builders</h2>
              <p className="ab-subtitle" style={{ margin: "0 auto" }}>
                Passionate engineers who turned an idea into a platform used by developers worldwide.
              </p>
            </div>
          </FadeIn>

          <div className="ab-team-grid">
            {team.map((member, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="ab-team-card">
                  <div className="ab-avatar-ring">
                    <div className="ab-avatar-inner">
                      <img
                        src={member.image || "/default-image.jpg"}
                        alt={member.name}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                  </div>
                  <h3 className="ab-team-name">{member.name}</h3>
                  <p className="ab-team-role">{member.role}</p>
                  <p className="ab-team-bio">{member.bio}</p>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="ab-team-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub Profile
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="ab-divider" />

      {/* ===== WHY WECODE ===== */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <FadeIn>
            <div className="ab-section-header">
              <div className="ab-eyebrow">✦ Why WeCode</div>
              <h2 className="ab-title">Built for modern developers</h2>
              <p className="ab-subtitle">
                A complete suite of tools designed for developers who want to collaborate,
                practice, and level up together.
              </p>
            </div>
          </FadeIn>

          <div className="ab-cards-grid">
            {whyCards.map((card, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="ab-card">
                  <div className="ab-card-icon">{card.icon}</div>
                  <h3 className="ab-card-title">{card.title}</h3>
                  <p className="ab-card-desc">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="ab-divider" />

      {/* ===== PLATFORM STATS ===== */}
      <section className="ab-section" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="ab-section-inner">
          <FadeIn>
            <div className="ab-section-header center">
              <div className="ab-eyebrow">✦ By the Numbers</div>
              <h2 className="ab-title">Platform highlights</h2>
            </div>
          </FadeIn>

          <div className="ab-stats-grid">
            {platformStats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="ab-stat-card">
                  <div className="ab-stat-num">{s.number}</div>
                  <div className="ab-stat-label">{s.text}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="ab-divider" />

      {/* ===== TIMELINE ===== */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <FadeIn>
            <div className="ab-section-header center">
              <div className="ab-eyebrow">✦ Journey</div>
              <h2 className="ab-title">Project timeline</h2>
              <p className="ab-subtitle" style={{ margin: "0 auto" }}>
                From idea to launch — every milestone that brought WeCode to life.
              </p>
            </div>
          </FadeIn>

          <div className="ab-timeline" style={{ marginTop: "60px" }}>
            <div className="ab-timeline-line" />
            {timelineItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="ab-timeline-item">
                  <div className="ab-timeline-dot" />
                  <div className="ab-timeline-card">
                    <div className="ab-timeline-date">{item.date}</div>
                    <p className="ab-timeline-event">{item.event}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="ab-divider" />

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <FadeIn>
            <div className="ab-section-header center">
              <div className="ab-eyebrow">✦ Recognition</div>
              <h2 className="ab-title">Key achievements</h2>
            </div>
          </FadeIn>

          <div className="ab-cards-grid">
            {achievements.map((a, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="ab-card" style={{ textAlign: "center", paddingTop: "36px" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>{a.icon}</div>
                  <h3 className="ab-card-title" style={{ fontSize: "17px" }}>{a.title}</h3>
                  <p className="ab-card-desc">{a.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="ab-divider" />

      {/* ===== TECH STACK ===== */}
      <section className="ab-section" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="ab-section-inner">
          <FadeIn>
            <div className="ab-section-header center">
              <div className="ab-eyebrow">✦ Stack</div>
              <h2 className="ab-title">Technology stack</h2>
              <p className="ab-subtitle" style={{ margin: "0 auto" }}>
                Built on battle-tested open-source technologies.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="ab-tech-grid" style={{ marginTop: "48px" }}>
              {techStack.map((tech, i) => (
                <div key={i} className="ab-tech-pill">{tech}</div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="ab-cta-section">
        <div className="ab-cta-glow" />
        <div className="ab-hero-grid" style={{ opacity: 0.6 }} />
        <FadeIn>
          <div className="ab-cta-inner">
            <div className="ab-eyebrow" style={{ margin: "0 auto 20px" }}>✦ Community</div>
            <h2 className="ab-cta-title">
              Join our <span className="ab-gradient-text">community</span>
            </h2>
            <p className="ab-cta-subtitle">
              WeCode is committed to giving back. Through free mentorship programs,
              open-source contributions, and global hackathons, we build an inclusive
              environment where every coder finds opportunities to grow.
            </p>
            <button className="ab-cta-btn" onClick={() => navigate("/login")}>
              Get Started — It's Free
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
};

export default AboutScreen;
