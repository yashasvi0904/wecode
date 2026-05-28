import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../Layout1/Layout";

// ─── LeetCode-style heatmap ───────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CELL = 13;
const GAP = 3;

const getCellColor = (value) => {
  if (value === 0) return 'rgba(255,255,255,0.06)';
  if (value === 1) return 'rgba(99,102,241,0.28)';
  if (value <= 3) return 'rgba(99,102,241,0.52)';
  if (value <= 6) return 'rgba(99,102,241,0.78)';
  return '#6366f1';
};

const LeetCodeHeatmap = ({ activityData, year }) => {
  const [tooltip, setTooltip] = useState(null);

  const dataMap = {};
  activityData.forEach(({ day, value }) => { dataMap[day] = value; });

  const yearInt = parseInt(year);
  const jan1 = new Date(yearInt, 0, 1);
  const dec31 = new Date(yearInt, 11, 31);

  // Start from the Sunday on or before Jan 1
  const startDate = new Date(jan1);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks = [];
  const monthLabels = {};
  let cur = new Date(startDate);

  while (cur <= dec31) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const inYear = cur.getFullYear() === yearInt;
      const m = cur.getMonth();
      const dom = cur.getDate();
      const dateStr = inYear
        ? `${yearInt}-${String(m + 1).padStart(2, '0')}-${String(dom).padStart(2, '0')}`
        : null;
      if (inYear && dom === 1) monthLabels[weeks.length] = MONTHS[m];
      week.push({ date: dateStr, value: dateStr ? (dataMap[dateStr] || 0) : -1, inYear });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }

  const totalLogins = activityData.reduce((sum, { value }) => sum + value, 0);
  const activeDays = activityData.filter(({ value }) => value > 0).length;

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0 }}>
          <strong style={{ color: '#fafafa' }}>{totalLogins}</strong> total logins in {year}
        </p>
        <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0 }}>
          <strong style={{ color: '#fafafa' }}>{activeDays}</strong> active days
        </p>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>

          {/* Day labels column */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: `${GAP}px`,
            marginRight: '8px', paddingTop: `${18 + 2}px`,
          }}>
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => (
              <div key={i} style={{
                height: `${CELL}px`, fontSize: '10px', color: '#52525b',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                whiteSpace: 'nowrap', minWidth: '22px',
              }}>
                {label}
              </div>
            ))}
          </div>

          {/* Weeks grid */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Month labels */}
            <div style={{ display: 'flex', gap: `${GAP}px`, height: '18px', marginBottom: '2px' }}>
              {weeks.map((_, wi) => (
                <div key={wi} style={{
                  width: `${CELL}px`, flexShrink: 0, fontSize: '10px', color: '#a1a1aa',
                  overflow: 'visible', whiteSpace: 'nowrap', lineHeight: '18px',
                }}>
                  {monthLabels[wi] || ''}
                </div>
              ))}
            </div>

            {/* Cells */}
            <div style={{ display: 'flex', gap: `${GAP}px` }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      style={{
                        width: `${CELL}px`, height: `${CELL}px`, borderRadius: '3px',
                        background: day.value < 0 ? 'transparent' : getCellColor(day.value),
                        cursor: day.inYear ? 'pointer' : 'default',
                        border: day.value === 0 && day.inYear ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        if (!day.inYear || !day.date) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({ date: day.date, value: day.value, x: rect.left + CELL / 2, y: rect.top });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '11px', color: '#52525b', marginRight: '4px' }}>Less</span>
        {[0, 1, 3, 5, 8].map((val, i) => (
          <div key={i} style={{
            width: `${CELL}px`, height: `${CELL}px`, borderRadius: '3px',
            background: getCellColor(val),
            border: val === 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }} />
        ))}
        <span style={{ fontSize: '11px', color: '#52525b', marginLeft: '4px' }}>More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: 'fixed', zIndex: 9999, pointerEvents: 'none',
          background: '#1c1c27', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '8px', padding: '7px 12px', fontSize: '12px', color: '#fafafa',
          left: tooltip.x, top: tooltip.y,
          transform: 'translate(-50%, calc(-100% - 8px))',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)', whiteSpace: 'nowrap',
        }}>
          <strong style={{ color: '#a5b4fc' }}>{tooltip.value}</strong>
          {' '}login{tooltip.value !== 1 ? 's' : ''} on {tooltip.date}
        </div>
      )}
    </div>
  );
};

// ─── UserDetails ──────────────────────────────────────────────────────────────

const UserDetails = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(""), [email, setEmail] = useState("");
  const [bio, setBio] = useState(""), [profileImage, setProfileImage] = useState("");
  const [userPosts, setUserPosts] = useState([]), [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0), [followers_name, setFollowers_name] = useState([]);
  const [following_name, setFollowing_name] = useState([]), [showFollowersPopup, setShowFollowersPopup] = useState(false);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false), [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_PROFILE, { withCredentials: true });
        const data = res.data.user;
        setName(data.name || ""); setEmail(data.email || ""); setBio(data.bio || "");
        setProfileImage(data.profileimage || ""); setUserPosts(data.posts || []);
      } catch (error) { console.error("Error fetching profile:", error); }
    };
    const fetchFollowDashboard = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FOLLOW_DASHBOARD, { withCredentials: true });
        setFollowersCount(response.data.followed_count || 0);
        setFollowingCount(response.data.following_count || 0);
        setFollowers_name(response.data.Followers_user_names || []);
        setFollowing_name(response.data.Following_user_names || []);
      } catch (error) { console.error("Error fetching follow dashboard:", error); }
    };
    fetchUserProfile(); fetchFollowDashboard();
  }, []);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_ACTIVITY_LOG, { withCredentials: true });
        const logins = res.data.logins || {};
        setActivityData(Object.entries(logins).map(([day, value]) => ({ day, value })));
      } catch (error) { console.error("Error fetching activity data:", error); }
    };
    fetchActivityData();
  }, []);

  const toggleFollowersPopup = () => setShowFollowersPopup(!showFollowersPopup);
  const toggleFollowingPopup = () => setShowFollowingPopup(!showFollowingPopup);

  const chartYear = activityData.length > 0
    ? activityData[0].day.split("-")[0]
    : new Date().getFullYear().toString();

  const S = {
    page: { maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 80px" },
    profileCard: {
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "20px", padding: "32px", marginBottom: "24px",
      display: "flex", alignItems: "flex-start", gap: "28px", flexWrap: "wrap",
    },
    avatarWrap: { position: "relative", flexShrink: 0 },
    avatar: {
      borderRadius: "50%", width: "120px", height: "120px", objectFit: "cover",
      border: "3px solid rgba(99,102,241,0.4)", boxShadow: "0 0 0 4px rgba(99,102,241,0.1)",
    },
    editBadge: {
      position: "absolute", bottom: 0, right: 0, width: "34px", height: "34px",
      borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      border: "2px solid #09090b", fontSize: "14px",
    },
    profileInfo: { flex: 1, minWidth: 0 },
    profileTopRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "10px" },
    profileName: { fontSize: "26px", fontWeight: "800", color: "#fafafa", margin: 0 },
    editBtn: {
      padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
      fontWeight: "600", fontSize: "13px", fontFamily: "inherit",
      boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
    },
    profileMeta: { display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "14px" },
    emailText: { fontSize: "14px", color: "#a1a1aa", margin: 0 },
    statsDivider: { width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" },
    statBtn: {
      fontSize: "14px", color: "#a1a1aa", background: "none", border: "none",
      cursor: "pointer", padding: 0, fontFamily: "inherit", transition: "color 0.2s",
    },
    bioBox: {
      fontSize: "14px", color: "#a1a1aa", lineHeight: "1.6", padding: "12px 16px",
      background: "rgba(255,255,255,0.03)", borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.07)", maxWidth: "700px",
    },
    sectionCard: {
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "20px", padding: "24px", marginBottom: "24px",
    },
    sectionHeader: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.07)",
    },
    sectionTitle: { fontSize: "17px", fontWeight: "700", color: "#fafafa", margin: 0 },
    countBadge: {
      padding: "4px 12px", borderRadius: "100px",
      background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
      fontSize: "12px", fontWeight: "700", color: "#a5b4fc",
    },
    postGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "16px", maxHeight: "800px", overflowY: "auto",
    },
    postCard: {
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "12px", overflow: "hidden", transition: "transform 0.2s, border-color 0.3s",
      display: "flex", flexDirection: "column",
    },
    postHeader: { padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" },
    postAvatarRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" },
    postAuthor: { fontSize: "13px", fontWeight: "600", color: "#a5b4fc" },
    postCaption: { fontSize: "13px", color: "#a1a1aa", lineHeight: "1.4", margin: 0 },
    postImgWrap: { flex: 1, position: "relative", minHeight: "180px" },
    emptyState: {
      gridColumn: "1/-1", textAlign: "center", padding: "40px",
      background: "rgba(255,255,255,0.02)", borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    overlay: {
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999,
    },
    popup: {
      background: "#111118", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "16px", padding: "24px", minWidth: "320px", maxWidth: "400px",
      width: "90%", maxHeight: "500px", overflowY: "auto",
      boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
    },
    popupHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" },
    popupTitle: { fontSize: "16px", fontWeight: "700", color: "#fafafa", margin: 0 },
    popupClose: {
      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "6px", color: "#a1a1aa", fontSize: "16px", cursor: "pointer",
      width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "inherit",
    },
    popupDivider: { height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "8px" },
    popupItem: {
      padding: "10px 12px", display: "flex", alignItems: "center", gap: "12px",
      borderBottom: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px",
      transition: "background 0.2s",
    },
    popupAvatar: { width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 },
    popupName: { fontSize: "14px", color: "#fafafa", margin: 0, fontWeight: "500" },
  };

  const yearBadgeStyle = {
    padding: "3px 10px", borderRadius: "6px",
    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
    fontSize: "12px", color: "#a5b4fc", fontWeight: "600",
  };

  return (
    <Layout>
      <style>{`
        .ud-post-card:hover { transform: translateY(-3px); border-color: rgba(99,102,241,0.2) !important; }
        .ud-popup-item:hover { background: rgba(255,255,255,0.04); }
        .ud-stat-btn:hover { color: #fafafa !important; }
        .ud-popup::-webkit-scrollbar { width: 4px; }
        .ud-popup::-webkit-scrollbar-track { background: transparent; }
        .ud-popup::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 2px; }
        .ud-post-grid::-webkit-scrollbar { width: 4px; }
        .ud-post-grid::-webkit-scrollbar-track { background: transparent; }
        .ud-post-grid::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      <div style={S.page}>
        {/* Profile Card */}
        <div style={S.profileCard}>
          <div style={S.avatarWrap}>
            <img
              src={profileImage && profileImage.trim() !== "" ? profileImage : `https://api.dicebear.com/7.x/micah/svg?seed=${name}`}
              alt="Profile" style={S.avatar}
            />
            <div style={S.editBadge} onClick={() => navigate("/userupdatedetails")}>✏️</div>
          </div>
          <div style={S.profileInfo}>
            <div style={S.profileTopRow}>
              <h2 style={S.profileName}>{name}</h2>
              <button onClick={() => navigate("/userupdatedetails")} style={S.editBtn}>Edit Profile</button>
            </div>
            <div style={S.profileMeta}>
              <p style={S.emailText}>{email}</p>
              <div style={S.statsDivider} />
              <button className="ud-stat-btn" style={S.statBtn} onClick={toggleFollowersPopup}>
                <strong style={{ color: "#fafafa" }}>{followersCount}</strong> Followers
              </button>
              <button className="ud-stat-btn" style={S.statBtn} onClick={toggleFollowingPopup}>
                <strong style={{ color: "#fafafa" }}>{followingCount}</strong> Following
              </button>
            </div>
            <div style={S.bioBox}>{bio || "No bio available"}</div>
          </div>
        </div>

        {/* Activity Heatmap — LeetCode style */}
        <div style={S.sectionCard}>
          <div style={S.sectionHeader}>
            <h3 style={S.sectionTitle}>📅 Login Activity</h3>
            <span style={yearBadgeStyle}>{chartYear}</span>
          </div>
          <LeetCodeHeatmap activityData={activityData} year={chartYear} />
        </div>

        {/* Posts */}
        <div style={S.sectionCard}>
          <div style={S.sectionHeader}>
            <h3 style={S.sectionTitle}>Your Posts</h3>
            <span style={S.countBadge}>{userPosts.length} posts</span>
          </div>
          <div className="ud-post-grid" style={S.postGrid}>
            {userPosts.length > 0 ? userPosts.map((item, idx) => (
              <div key={idx} className="ud-post-card" style={S.postCard}>
                <div style={S.postHeader}>
                  <div style={S.postAvatarRow}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(99,102,241,0.3)", flexShrink: 0 }}>
                      <img src={profileImage || `https://api.dicebear.com/7.x/micah/svg?seed=${name}`}
                        alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span style={S.postAuthor}>{name}</span>
                  </div>
                  <p style={S.postCaption}>{item.caption}</p>
                </div>
                <div style={S.postImgWrap}>
                  <img src={item.post?.mediaUrl} alt="post" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                </div>
              </div>
            )) : (
              <div style={S.emptyState}>
                <p style={{ fontSize: "1.8rem", margin: "0 0 10px" }}>📝</p>
                <p style={{ fontSize: "15px", fontWeight: "600", color: "#fafafa", margin: "0 0 6px" }}>No posts yet</p>
                <p style={{ fontSize: "13px", color: "#a1a1aa", margin: 0 }}>Share your first post!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Followers Popup */}
      {showFollowersPopup && (
        <div style={S.overlay} onClick={() => setShowFollowersPopup(false)}>
          <div className="ud-popup" style={S.popup} onClick={(e) => e.stopPropagation()}>
            <div style={S.popupHeader}>
              <h4 style={S.popupTitle}>Followers</h4>
              <button style={S.popupClose} onClick={() => setShowFollowersPopup(false)}>✕</button>
            </div>
            <div style={S.popupDivider} />
            {followers_name.length > 0 ? followers_name.map((follower, idx) => (
              <div key={idx} className="ud-popup-item" style={S.popupItem}>
                <div style={S.popupAvatar}>
                  <img src={`https://api.dicebear.com/7.x/micah/svg?seed=${follower?.following_id?.name || "unknown"}`}
                    alt="Follower" style={{ width: "100%", height: "100%" }} />
                </div>
                <p style={S.popupName}>{follower?.following_id?.name || "Unknown"}</p>
              </div>
            )) : (
              <div style={{ padding: "24px 0", textAlign: "center" }}>
                <p style={{ color: "#52525b", fontSize: "14px", margin: 0 }}>No followers yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Following Popup */}
      {showFollowingPopup && (
        <div style={S.overlay} onClick={() => setShowFollowingPopup(false)}>
          <div className="ud-popup" style={S.popup} onClick={(e) => e.stopPropagation()}>
            <div style={S.popupHeader}>
              <h4 style={S.popupTitle}>Following</h4>
              <button style={S.popupClose} onClick={() => setShowFollowingPopup(false)}>✕</button>
            </div>
            <div style={S.popupDivider} />
            {following_name.length > 0 ? following_name.map((followed, idx) => (
              <div key={idx} className="ud-popup-item" style={S.popupItem}>
                <div style={S.popupAvatar}>
                  <img src={`https://api.dicebear.com/7.x/micah/svg?seed=${followed?.followed_id?.name || "unknown"}`}
                    alt="Following" style={{ width: "100%", height: "100%" }} />
                </div>
                <p style={S.popupName}>{followed?.followed_id?.name || "Unknown"}</p>
              </div>
            )) : (
              <div style={{ padding: "24px 0", textAlign: "center" }}>
                <p style={{ color: "#52525b", fontSize: "14px", margin: 0 }}>Not following anyone.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserDetails;
