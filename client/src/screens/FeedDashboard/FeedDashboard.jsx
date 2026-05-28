import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout1/Layout";
import { formatDistanceToNow } from "date-fns";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_FETCH_FEED, { withCredentials: true });
        setPosts(Array.isArray(res.data?.posts) ? res.data.posts : []);
        setName(res.data?.name || "");
      } catch (e) { console.error("Error fetching feed:", e); }
    };
    fetchFeed();
  }, []);

  const S = {
    page: {
      maxWidth: "680px", margin: "0 auto", padding: "40px 20px 80px",
    },
    pageHeader: {
      marginBottom: "36px",
    },
    eyebrow: {
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "5px 12px",
      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
      borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px",
    },
    pageTitle: {
      fontSize: "32px", fontWeight: "800", letterSpacing: "-1px",
      color: "#fafafa", margin: "0 0 8px",
      lineHeight: "1.1",
    },
    pageSubtitle: {
      fontSize: "15px", color: "#a1a1aa", margin: 0,
    },
    emptyState: {
      padding: "60px 32px", textAlign: "center",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
    },
    emptyIcon: {
      fontSize: "3rem", marginBottom: "16px",
    },
    emptyTitle: {
      fontSize: "18px", fontWeight: "600", color: "#fafafa",
      marginBottom: "8px",
    },
    emptySubtitle: {
      fontSize: "14px", color: "#a1a1aa", lineHeight: "1.6",
    },
    card: {
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", padding: "24px",
      marginBottom: "18px",
      transition: "border-color 0.3s, box-shadow 0.3s",
    },
    userRow: {
      display: "flex", alignItems: "center", marginBottom: "18px",
    },
    avatarRing: {
      width: "44px", height: "44px", borderRadius: "50%",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      padding: "2px", flexShrink: 0, marginRight: "12px",
    },
    avatarInner: {
      width: "100%", height: "100%", borderRadius: "50%",
      overflow: "hidden", border: "2px solid #09090b",
    },
    userName: {
      fontSize: "15px", fontWeight: "600", color: "#fafafa",
      margin: "0 0 2px",
    },
    timestamp: {
      fontSize: "12px", color: "#52525b", fontStyle: "italic", margin: 0,
    },
    postTitle: {
      fontSize: "18px", fontWeight: "700", color: "#fafafa",
      margin: "0 0 10px", letterSpacing: "-0.3px",
    },
    postDesc: {
      fontSize: "14px", color: "#a1a1aa", lineHeight: "1.7", margin: "0 0 16px",
    },
    mediaWrap: {
      borderRadius: "10px", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.07)", marginBottom: "18px",
    },
    actionsRow: {
      display: "flex", justifyContent: "space-between",
      paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.07)",
    },
    actionGroup: { display: "flex", gap: "4px" },
    actionBtn: {
      background: "none", border: "none", color: "#a1a1aa",
      display: "flex", alignItems: "center", gap: "7px",
      padding: "7px 12px", borderRadius: "8px", cursor: "pointer",
      transition: "background 0.2s, color 0.2s",
      fontWeight: "500", fontSize: "13px", fontFamily: "inherit",
    },
  };

  const ActionBtn = ({ icon, text }) => (
    <button
      style={S.actionBtn}
      onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fafafa"; }}
      onMouseOut={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#a1a1aa"; }}
    >
      <span style={{ fontSize: "15px" }}>{icon}</span>
      {text}
    </button>
  );

  return (
    <Layout>
      <style>{`
        .wc-feed-card:hover {
          border-color: rgba(99,102,241,0.2) !important;
          box-shadow: 0 8px 32px rgba(99,102,241,0.08) !important;
        }
        .wc-feed-media { width: 100%; max-height: 480px; object-fit: cover; display: block; transition: transform 0.3s ease; }
        .wc-feed-media:hover { transform: scale(1.015); }
      `}</style>

      <div style={S.page}>

        {/* Header */}
        <div style={S.pageHeader}>
          <div style={S.eyebrow}>✦ Social Feed</div>
          <h1 style={S.pageTitle}>
            {name ? `Welcome back, ${name}` : "Your Feed"}
          </h1>
          <p style={S.pageSubtitle}>Posts from developers you follow</p>
        </div>

        {/* Empty state */}
        {posts.length === 0 ? (
          <div style={S.emptyState}>
            <div style={S.emptyIcon}>📭</div>
            <p style={S.emptyTitle}>Your feed is empty</p>
            <p style={S.emptySubtitle}>
              Follow developers to see their posts here.<br />
              Connect with the community to get started.
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="wc-feed-card"
              style={S.card}
            >
              {/* User info */}
              <div style={S.userRow}>
                <div style={S.avatarRing}>
                  <div style={S.avatarInner}>
                    <img
                      src={post.user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user.name?.charAt(0) || "U")}&background=6366f1&color=ffffff&size=44`}
                      alt={post.user?.username || "User"}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div>
                  <p style={S.userName}>{post.user.username}</p>
                  <p style={S.timestamp}>
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              {post.title && <h3 style={S.postTitle}>{post.title}</h3>}
              <p style={S.postDesc}>{post.description}</p>

              {post.mediaUrl && (
                <div style={S.mediaWrap}>
                  <img
                    className="wc-feed-media"
                    src={post.mediaUrl}
                    alt="post media"
                    onError={(e) => { e.target.parentNode.style.display = "none"; }}
                  />
                </div>
              )}

              <div style={S.actionsRow}>
                <div style={S.actionGroup}>
                  <ActionBtn icon="👍" text="Like" />
                  <ActionBtn icon="💬" text="Comment" />
                </div>
                <ActionBtn icon="↗️" text="Share" />
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Feed;
