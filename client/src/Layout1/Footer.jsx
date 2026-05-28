import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Product:   ["Features", "Demo", "Statistics", "Changelog"],
    Resources: ["Documentation", "Help Center", "Community", "Blog"],
    Company:   ["About", "Careers", "Contact", "Privacy"],
  };

  return (
    <>
      <style>{`
        .wc-footer-link-item:hover { color: #a1a1aa !important; }
        .wc-footer-social-btn:hover { background: rgba(99,102,241,0.1) !important; border-color: rgba(99,102,241,0.3) !important; color: #a5b4fc !important; transform: translateY(-2px); }
      `}</style>

      <footer style={{
        padding: "64px 28px 36px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        backgroundColor: "rgba(0,0,0,0.3)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "52px",
            marginBottom: "52px",
          }}>
            {/* Brand column */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{
                  width: "32px", height: "32px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  borderRadius: "8px", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "14px", fontWeight: "800", color: "white",
                  boxShadow: "0 2px 12px rgba(99,102,241,0.35)",
                }}>W</div>
                <span style={{ fontSize: "17px", fontWeight: "700", color: "#fafafa", letterSpacing: "-0.3px" }}>WeCode</span>
              </div>
              <p style={{ fontSize: "14px", color: "#52525b", lineHeight: "1.75", marginBottom: "22px", maxWidth: "230px" }}>
                The collaborative coding platform that brings developers together to learn, practice, and grow.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { label: "GitHub", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg> },
                  { label: "Twitter", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> },
                  { label: "LinkedIn", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                ].map(({ label, icon }) => (
                  <a key={label} href="#" className="wc-footer-social-btn" aria-label={label} style={{
                    width: "34px", height: "34px", borderRadius: "8px",
                    background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#52525b", textDecoration: "none", cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <h4 style={{
                  fontSize: "11px", fontWeight: "700", color: "#fafafa",
                  textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "16px",
                }}>
                  {title}
                </h4>
                {items.map((item) => (
                  <a key={item} href="#" className="wc-footer-link-item" style={{
                    display: "block", fontSize: "14px", color: "#52525b",
                    textDecoration: "none", padding: "4px 0",
                    transition: "color 0.2s ease",
                  }}>
                    {item}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Divider */}
          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.07)", margin: "0 0 24px" }} />

          {/* Bottom row */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "12px",
          }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#52525b" }}>
              © {currentYear} WeCode. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
                <a key={item} href="#" className="wc-footer-link-item" style={{
                  color: "#52525b", textDecoration: "none", fontSize: "13px",
                  transition: "color 0.2s ease",
                }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .wc-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .wc-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .wc-footer-bottom { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </>
  );
};

export default Footer;
