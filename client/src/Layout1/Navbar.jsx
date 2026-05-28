import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleLogout } from "../utils/Logout.js";
import { createroom, joinroom } from "../Rooms/room.jsx";
import axios from "axios";

const S = {
  nav: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "68px",
    backgroundColor: "rgba(9, 9, 11, 0.88)",
    backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0 24px", color: "#fafafa", zIndex: 1000,
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
  },
  logo: {
    display: "flex", alignItems: "center", gap: "10px",
    cursor: "pointer", flexShrink: 0,
  },
  logoIcon: {
    width: "34px", height: "34px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    borderRadius: "9px", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "15px", fontWeight: "800",
    color: "white", letterSpacing: "-0.5px",
    boxShadow: "0 2px 16px rgba(99,102,241,0.35)", flexShrink: 0,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  logoText: {
    fontSize: "18px", fontWeight: "700", color: "#fafafa", letterSpacing: "-0.4px",
  },
  menuContainer: { display: "flex", alignItems: "center", gap: "2px" },
  link: {
    color: "#a1a1aa", textDecoration: "none", fontSize: "14px", fontWeight: "500",
    padding: "7px 13px", borderRadius: "7px", cursor: "pointer", border: "none",
    background: "none", fontFamily: "inherit", transition: "color 0.2s, background 0.2s",
    whiteSpace: "nowrap",
  },
  activeLink: {
    color: "#fafafa", textDecoration: "none", fontSize: "14px", fontWeight: "500",
    padding: "7px 13px", borderRadius: "7px", cursor: "pointer", border: "none",
    background: "rgba(255,255,255,0.08)", fontFamily: "inherit",
    transition: "color 0.2s, background 0.2s", whiteSpace: "nowrap",
  },
  dropdownContainer: { position: "relative" },
  dropdownButton: {
    background: "none", border: "none", color: "#a1a1aa", fontSize: "14px",
    fontWeight: "500", cursor: "pointer", padding: "7px 13px",
    display: "flex", alignItems: "center", gap: "5px", borderRadius: "7px",
    transition: "color 0.2s, background 0.2s", fontFamily: "inherit",
  },
  dropdownMenu: {
    position: "absolute", top: "calc(100% + 8px)", left: 0,
    backgroundColor: "rgba(9, 9, 11, 0.97)", backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)", borderRadius: "12px", padding: "6px",
    boxShadow: "0 16px 48px rgba(0,0,0,0.55)", zIndex: 200, minWidth: "185px",
    border: "1px solid rgba(255,255,255,0.09)",
  },
  dropdownItem: {
    display: "block", width: "100%", padding: "9px 12px", background: "none",
    color: "#a1a1aa", border: "none", textAlign: "left", cursor: "pointer",
    borderRadius: "7px", transition: "background 0.2s, color 0.2s",
    fontSize: "14px", fontFamily: "inherit",
  },
  points: {
    color: "#a5b4fc", fontWeight: "600", padding: "6px 14px",
    backgroundColor: "rgba(99,102,241,0.1)", borderRadius: "100px",
    fontSize: "13px", display: "flex", alignItems: "center", gap: "6px",
    border: "1px solid rgba(99,102,241,0.22)",
    transition: "transform 0.2s, background 0.2s",
  },
  profileButton: {
    background: "rgba(255,255,255,0.05)", padding: "7px 15px", borderRadius: "8px",
    color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
    display: "flex", alignItems: "center", gap: "7px", fontSize: "14px", fontWeight: "500",
    transition: "all 0.2s ease", fontFamily: "inherit",
  },
  roomButton: {
    padding: "7px 14px", color: "white",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer",
    boxShadow: "0 2px 12px rgba(99,102,241,0.3)", transition: "all 0.2s ease",
    fontSize: "13px", display: "flex", alignItems: "center", gap: "5px",
    fontFamily: "inherit", whiteSpace: "nowrap",
  },
  modalOverlay: {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", zIndex: 9999,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#111118", padding: "28px 24px", borderRadius: "16px",
    display: "flex", flexDirection: "column", alignItems: "stretch", gap: "16px",
    border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
    maxWidth: "340px", width: "90%",
  },
  modalInput: {
    backgroundColor: "rgba(255,255,255,0.04)", color: "#fafafa",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
    padding: "12px 16px", outline: "none", width: "100%", fontSize: "14px",
    transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "inherit",
    boxSizing: "border-box",
  },
  mobileMenu: {
    position: "fixed", top: "68px", left: 0, right: 0,
    backgroundColor: "rgba(9, 9, 11, 0.97)", backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    padding: "10px 16px 20px", zIndex: 999,
    display: "flex", flexDirection: "column", gap: "2px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
  },
  mobileMenuDivider: { height: "1px", backgroundColor: "rgba(255,255,255,0.07)", margin: "6px 0" },
  rightSection: { display: "flex", alignItems: "center", gap: "10px" },
};

const Navbar = () => {
  const [state, setState] = useState({
    showMenu: false,
    joinRoomId: "",
    showJoinModal: false,
    userPoints: 0,
    showCoursesMenu: false,
    windowWidth: window.innerWidth,
    showMobileMenu: false,
    hoverLogo: false,
    focusedInput: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isDsaDashboard = location.pathname.startsWith("/dsadashboard");
  const isMobile = state.windowWidth <= 768;
  const updateState = (newState) => setState(prev => ({ ...prev, ...newState }));

  useEffect(() => {
    const handleResize = () => updateState({ windowWidth: window.innerWidth });
    window.addEventListener("resize", handleResize);

    const fetchUserPoints = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_POINTS_VIEW, { withCredentials: true });
        if (res.data && typeof res.data.points === "number") updateState({ userPoints: res.data.points });
      } catch (e) { /* silently ignore */ }
    };
    fetchUserPoints();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navTo = (path) => () => { navigate(path); updateState({ showMobileMenu: false }); };
  const toggleMenu = (key) => () => updateState({ [key]: !state[key] });

  const handleCreateRoom = async () => {
    try {
      const roomId = await createroom({ isReadOnly: true, fromNavbar: true });
      navigate(`/room/${roomId}`, { state: { isReadOnly: true, fromNavbar: true } });
    } catch (e) { console.error("Failed to create room:", e); }
  };

  const handleJoinRoom = async () => {
    if (!state.joinRoomId) { alert("Please enter a Room ID!"); return; }
    try {
      const roomId = await joinroom(state.joinRoomId);
      updateState({ showJoinModal: false });
      navigate(`/room/${roomId}`, { state: { isReadOnly: true, fromNavbar: true } });
    } catch (e) {
      alert("Failed to join the room. Please check the Room ID and try again.");
    }
  };

  const handleLogoutClick = () => { updateState({ showMenu: false }); handleLogout(navigate); };

  const courseItems = [
    { label: "DSA Course",    action: navTo("/dsacourses") },
    { label: "Web Dev Course", action: navTo("/webdev") },
    { label: "DevOps Course",  action: navTo("/devops") },
  ];

  const profileItems = [
    { label: "User Details",       action: navTo("/userdetails") },
    { label: "Follow Dashboard",   action: navTo("/follow-dashboard") },
    { label: "Upload Post",        action: navTo("/upload-post") },
    { label: "Problem Solved",     action: navTo("/solvedproblemslist") },
    { label: "Logout",             action: handleLogoutClick },
  ];

  const navLinks = [
    { label: "Home",    path: "/Feed",           action: navTo("/Feed") },
    { label: "About",   path: "/about",          action: navTo("/about") },
    { label: "Web Dev", path: "/webdevprojects",  action: navTo("/webdevprojects") },
    { label: "DSA",     path: "/dsadashboard",   action: navTo("/dsadashboard") },
    { label: "DevOps",  path: "/devopsprojects",  action: navTo("/devopsprojects") },
  ];

  const renderDropdown = (items) => (
    <div style={S.dropdownMenu}>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.action}
          style={S.dropdownItem}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fafafa"; }}
          onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#a1a1aa"; }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  const ChevronDown = () => (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ flexShrink: 0, transition: "transform 0.2s" }}>
      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const ProfileIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const PointsIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );

  return (
    <>
      <style>{`
        @keyframes wc-nav-slide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wc-fade-in   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes wc-nav-pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.04); } }
        .wc-nav-link-item:hover { color: #fafafa !important; background: rgba(255,255,255,0.06) !important; }
        .wc-dropdown-btn:hover  { color: #fafafa !important; background: rgba(255,255,255,0.06) !important; }
        .wc-profile-btn:hover   { color: #fafafa !important; background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.18) !important; }
        .wc-room-btn:hover      { transform: translateY(-1px) !important; box-shadow: 0 6px 24px rgba(99,102,241,0.5) !important; }
        .wc-points-badge:hover  { background: rgba(99,102,241,0.18) !important; transform: scale(1.05); }
        .wc-logo-wrap:hover .wc-logo-icon { transform: rotate(-6deg) scale(1.08); box-shadow: 0 4px 24px rgba(99,102,241,0.55) !important; }
        .wc-mobile-item:hover { color: #fafafa !important; background: rgba(255,255,255,0.06) !important; padding-left: 18px !important; }
      `}</style>

      <nav style={S.nav}>
        {/* Logo */}
        <div
          className="wc-logo-wrap"
          onClick={navTo("/Feed")}
          style={S.logo}
        >
          <div className="wc-logo-icon" style={S.logoIcon}>W</div>
          <span style={S.logoText}>WeCode</span>
        </div>

        {/* Mobile hamburger */}
        {isMobile && (
          <div style={{ position: "relative" }}>
            <button
              onClick={toggleMenu("showMobileMenu")}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", justifyContent: "center",
                gap: "5px", padding: "6px 8px", borderRadius: "6px",
              }}
              aria-label="Toggle navigation"
            >
              <span style={{ display: "block", width: "22px", height: "2px", background: "#fafafa", borderRadius: "2px", transition: "all 0.3s", transform: state.showMobileMenu ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "#fafafa", borderRadius: "2px", transition: "all 0.3s", opacity: state.showMobileMenu ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "#fafafa", borderRadius: "2px", transition: "all 0.3s", transform: state.showMobileMenu ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>

            {state.showMobileMenu && (
              <div style={{ ...S.mobileMenu, animation: "wc-nav-slide 0.25s ease" }}>
                <div style={{ padding: "6px 12px 4px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontWeight: "600", color: "#fafafa", fontSize: "14px" }}>Navigation</span>
                  <div style={{ ...S.points, fontSize: "12px", padding: "4px 10px" }}>
                    <PointsIcon /> {state.userPoints}
                  </div>
                </div>
                <div style={S.mobileMenuDivider} />
                {isDsaDashboard && (
                  <>
                    <div style={{ display: "flex", gap: "8px", padding: "4px 4px" }}>
                      <button onClick={handleCreateRoom} className="wc-room-btn" style={S.roomButton}>Create Room</button>
                      <button onClick={() => updateState({ showJoinModal: true, showMobileMenu: false })} className="wc-room-btn" style={S.roomButton}>Join Room</button>
                    </div>
                    <div style={S.mobileMenuDivider} />
                  </>
                )}
                {[...navLinks, ...courseItems, ...profileItems].map((item, i) => (
                  <button key={i} onClick={item.action} className="wc-mobile-item" style={{ ...S.dropdownItem, padding: "10px 12px", fontSize: "14.5px", width: "100%", transition: "color 0.2s, background 0.2s, padding-left 0.2s" }}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Desktop navigation */}
        {!isMobile && (
          <>
            <div style={S.menuContainer}>
              {navLinks.map((link, i) => (
                <button
                  key={i}
                  className="wc-nav-link-item"
                  onClick={link.action}
                  style={location.pathname === link.path ? S.activeLink : S.link}
                >
                  {link.label}
                </button>
              ))}

              {/* Courses dropdown */}
              <div style={S.dropdownContainer}>
                <button
                  className="wc-dropdown-btn"
                  onClick={toggleMenu("showCoursesMenu")}
                  style={S.dropdownButton}
                >
                  Courses <ChevronDown />
                </button>
                {state.showCoursesMenu && renderDropdown(courseItems)}
              </div>
            </div>

            <div style={S.rightSection}>
              {/* Profile dropdown */}
              <div style={S.dropdownContainer}>
                <button className="wc-profile-btn" onClick={toggleMenu("showMenu")} style={S.profileButton}>
                  <ProfileIcon /> Profile
                </button>
                {state.showMenu && renderDropdown(profileItems)}
              </div>

              {/* Room buttons — DSA dashboard only */}
              {isDsaDashboard && (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="wc-room-btn" onClick={handleCreateRoom} style={S.roomButton}>Create Room</button>
                  <button className="wc-room-btn" onClick={() => updateState({ showJoinModal: true })} style={S.roomButton}>Join Room</button>
                </div>
              )}

              {/* Points badge */}
              <div className="wc-points-badge" style={S.points}>
                <PointsIcon /> {state.userPoints}
              </div>
            </div>
          </>
        )}

        {/* Join Room Modal */}
        {state.showJoinModal && (
          <div style={{ ...S.modalOverlay, animation: "wc-fade-in 0.2s ease" }} onClick={() => updateState({ showJoinModal: false })}>
            <div style={{ ...S.modalContent, animation: "wc-nav-slide 0.25s ease" }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ margin: 0, color: "#fafafa", fontSize: "18px", fontWeight: "700", letterSpacing: "-0.3px" }}>Join a Room</h3>
              <input
                type="text"
                placeholder="Enter Room ID"
                value={state.joinRoomId}
                onChange={(e) => updateState({ joinRoomId: e.target.value })}
                style={{
                  ...S.modalInput,
                  borderColor: state.focusedInput ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)",
                  boxShadow: state.focusedInput ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
                }}
                onFocus={() => updateState({ focusedInput: true })}
                onBlur={() => updateState({ focusedInput: false })}
                onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="wc-room-btn" onClick={handleJoinRoom} style={{ ...S.roomButton, flex: 1, justifyContent: "center" }}>
                  Join
                </button>
                <button
                  onClick={() => updateState({ showJoinModal: false })}
                  style={{ ...S.roomButton, flex: 1, justifyContent: "center", background: "rgba(255,255,255,0.06)", boxShadow: "none", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
