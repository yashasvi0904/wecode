import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Layout from "../../Layout1/Layout.jsx";
import { motion, AnimatePresence } from "framer-motion";

const FollowDashboard = () => {
  const [followingName, setFollowingName] = useState(""), [followedName, setFollowedName] = useState(""), [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false), [followingCount, setFollowingCount] = useState(0), [followerCount, setFollowerCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false), [searchResults, setSearchResults] = useState([]), [selectedUser, setSelectedUser] = useState(null);
  const dropdownRef = useRef(null), [profileimage, setProfileimage] = useState(""), [recentSearches, setRecentSearches] = useState([]);

  const sampleUsers = [
    { _id: "sample1", name: "APJ Abdul Kalam", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=APJAbdulKalam" },
    { _id: "sample2", name: "Sachin Tendulkar", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=SachinTendulkar" },
    { _id: "sample3", name: "Kalpana Chawla", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=KalpanaChawla" },
    { _id: "sample4", name: "Virat Kohli", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=ViratKohli" },
    { _id: "sample5", name: "Ratan Tata", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=RatanTata" },
    { _id: "sample6", name: "MS Dhoni", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=MSDhoni" },
    { _id: "sample7", name: "PV Sindhu", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=PVSindhu" },
    { _id: "sample8", name: "Neeraj Chopra", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=NeerajChopra" },
    { _id: "sample9", name: "Sundar Pichai", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=SundarPichai" },
    { _id: "sample10", name: "Lata Mangeshkar", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=LataMangeshkar" }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_PROFILE, { withCredentials: true });
        const user = res.data.user;
        setFollowingName(user.name);
        setFollowerCount(user.followed_count || 0);
        setFollowingCount(user.following_count || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data");
      }
    };
    fetchUserData();
    if (followedName) checkFollowingStatus();
  }, [followedName]);

  const checkFollowingStatus = async () => {
    if (!followingName || !followedName) return;
    try {
      const response = await axios.post(process.env.REACT_APP_CHECK_FOLLOWING,
        { following_name: followingName, followed_name: followedName }, { withCredentials: true });
      setIsFollowing(response.data.isFollowing);
    } catch (error) { console.error("Error checking following status:", error); }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_FOLLOW,
        { following_name: followingName, followed_name: followedName }, { withCredentials: true });
      setMessage(response.data.message);
      setIsFollowing(true);
    } catch (error) { setMessage(error.response?.data?.message || "Error following user"); }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_UNFOLLOW,
        { following_name: followingName, followed_name: followedName }, { withCredentials: true });
      setMessage(response.data.message);
      checkFollowingStatus();
    } catch (error) { setMessage(error.response?.data?.message || "Error unfollowing user"); }
  };

  const debouncedSearchUsers = useCallback(debounce(async (query) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SEARCH_USERS}?searchQuery=${query}`, { withCredentials: true });
      setSearchResults(res.data?.users || []);
    } catch (error) { console.error("Error searching users:", error); }
  }, 400), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setSearchResults([]);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserSelect = (user) => {
    setFollowedName(user.name);
    setSelectedUser(user);
    setProfileimage(user.profileimage);
    setShowProfile(true);
    setSearchResults([]);
    setRecentSearches((prev) => {
      const updated = [user, ...prev.filter((u) => u._id !== user._id)];
      return updated.slice(0, 5);
    });
    checkFollowingStatus();
  };

  const renderUserCard = (user, isSearchResult = false) => (
    <motion.div
      key={user._id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.17 }}
      onClick={() => handleUserSelect(user)}
      whileHover={{ scale: 1.03 }}
      style={{
        background: isSearchResult ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px", padding: isSearchResult ? "10px" : "18px",
        textAlign: "center", cursor: "pointer", display: "flex",
        flexDirection: "column", alignItems: "center",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      className="fd-user-card"
    >
      <img
        src={user.profileimage || `https://api.dicebear.com/7.x/micah/svg?seed=${user.name}`}
        alt={user.name}
        style={{
          width: isSearchResult ? "44px" : "60px", height: isSearchResult ? "44px" : "60px",
          borderRadius: "50%", objectFit: "cover", marginBottom: "8px",
          border: "2px solid rgba(99,102,241,0.3)",
        }}
      />
      <div style={{ fontSize: isSearchResult ? "12px" : "14px", fontWeight: "600", color: "#fafafa", marginBottom: isSearchResult ? "2px" : "10px" }}>
        {user.name}
      </div>
      {!isSearchResult && (
        <button
          style={{
            padding: "5px 14px", background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)", borderRadius: "6px",
            color: "#a5b4fc", fontSize: "12px", fontWeight: "600", cursor: "pointer",
            fontFamily: "inherit", transition: "background 0.2s",
          }}
          className="fd-view-btn"
        >
          View Profile
        </button>
      )}
    </motion.div>
  );

  return (
    <Layout>
      <style>{`
        .fd-user-card:hover { border-color: rgba(99,102,241,0.3) !important; box-shadow: 0 8px 24px rgba(99,102,241,0.08) !important; }
        .fd-view-btn:hover { background: rgba(99,102,241,0.2) !important; }
        .fd-search-input:focus { border-color: rgba(99,102,241,0.5) !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.1) !important; }
        .fd-search-wrap.focused { border-color: rgba(99,102,241,0.5) !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.1) !important; }
        .fd-follow-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .fd-unfollow-btn:hover { background: rgba(239,68,68,0.15) !important; border-color: rgba(239,68,68,0.4) !important; }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px",
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
            borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
            textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px",
          }}>
            ✦ Community
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-0.8px", color: "#fafafa", margin: "0 0 8px" }}>
            Connect with Developers
          </h1>
          <p style={{ fontSize: "15px", color: "#a1a1aa", margin: 0 }}>Search and follow amazing people in the community</p>
        </div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div ref={dropdownRef} style={{ width: "100%", maxWidth: "480px", position: "relative" }}>
              <div
                className="fd-search-wrap"
                style={{
                  position: "relative", display: "flex", alignItems: "center",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px", transition: "border-color 0.2s, box-shadow 0.2s",
                  minHeight: "52px",
                }}
              >
                <span style={{ position: "absolute", left: "14px", fontSize: "16px", pointerEvents: "none", color: "#52525b" }}>🔍</span>
                <input
                  type="text"
                  id="follow-search-input"
                  className="fd-search-input"
                  value={followedName}
                  autoComplete="off"
                  placeholder="Find people to connect with..."
                  onChange={(e) => {
                    const value = e.target.value;
                    setFollowedName(value);
                    setShowProfile(false);
                    if (value.trim() !== "") debouncedSearchUsers(value);
                    else setSearchResults([]);
                  }}
                  style={{
                    width: "100%", padding: "14px 14px 14px 42px",
                    border: "none", outline: "none", background: "transparent",
                    color: "#fafafa", fontSize: "15px", borderRadius: "12px", fontFamily: "inherit",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {searchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "rgba(17,17,24,0.98)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px", padding: "14px",
                  display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: "10px", marginBottom: "24px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                }}
              >
                {searchResults.map((user) => renderUserCard(user, true))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recommendations */}
          <div style={{
            background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px", padding: "24px",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fafafa", margin: "0 0 18px", textAlign: "center" }}>
              Connect with Amazing People!
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
              {(!showProfile && !selectedUser ? sampleUsers : recentSearches).map(user => renderUserCard(user))}
            </div>
          </div>

          {/* Profile Card */}
          {showProfile && selectedUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px", padding: "32px", marginTop: "24px",
                maxWidth: "700px", marginInline: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
                <img
                  src={profileimage || `https://api.dicebear.com/7.x/micah/svg?seed=${selectedUser.name}`}
                  alt="Profile"
                  style={{
                    borderRadius: "50%", width: "110px", height: "110px", objectFit: "cover",
                    border: "3px solid rgba(99,102,241,0.4)", boxShadow: "0 0 0 4px rgba(99,102,241,0.1)",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#fafafa", margin: 0 }}>{selectedUser.name}</h2>
                    <span style={{ color: "#6366f1", fontSize: "16px" }}>✔️</span>
                  </div>
                  <div style={{ marginBottom: "14px" }}>
                    <button
                      onClick={isFollowing ? handleUnfollow : handleFollow}
                      className={isFollowing ? "fd-unfollow-btn" : "fd-follow-btn"}
                      style={{
                        padding: "9px 22px", borderRadius: "8px", cursor: "pointer",
                        fontWeight: "600", fontSize: "14px", fontFamily: "inherit",
                        transition: "all 0.2s",
                        ...(isFollowing ? {
                          background: "transparent", border: "1px solid rgba(239,68,68,0.3)",
                          color: "#f87171",
                        } : {
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none",
                          color: "#fff", boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                        })
                      }}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: "24px", fontSize: "14px", color: "#a1a1aa" }}>
                    <span><strong style={{ color: "#fafafa" }}>{followerCount}</strong> followers</span>
                    <span><strong style={{ color: "#fafafa" }}>{followingCount}</strong> following</span>
                  </div>
                  {message && (
                    <p style={{ fontSize: "13px", color: "#10b981", marginTop: "10px", margin: "10px 0 0" }}>{message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default FollowDashboard;
