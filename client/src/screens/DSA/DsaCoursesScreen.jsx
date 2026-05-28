import React, { useState } from "react";
import Layout from "../../Layout1/Layout";

const DsaCoursesScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const videoData = [
    { title: "Don't watch my A2Z DSA Course", url: "https://www.youtube.com/embed/0bHoB32fuj0?rel=0", uploaded: "1 year ago", views: "1.3M" },
    { title: "How to setup VS code for DSA and CP | Input / Output split format", url: "https://www.youtube.com/embed/h3uDCJ5mvgw?rel=0", uploaded: "1 year ago", views: "847K" },
    { title: "C++ Basics in One Shot - Strivers A2Z DSA Course - L1", url: "https://www.youtube.com/embed/EAR7De6Goz4?rel=0", uploaded: "2 years ago", views: "2M" },
    { title: "Time and Space Complexity - Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/FPu9Uld7W-E?rel=0", uploaded: "2 years ago", views: "905K" },
    { title: "Solve any Pattern Question - Trick Explained | 22 Patterns in 1 Shot | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/tNm_NNSB3_w?rel=0", uploaded: "2 years ago", views: "1.6M" },
    { title: "Complete C++ STL in 1 Video | Time Complexity and Notes", url: "https://www.youtube.com/embed/RRVYpIET_RU?rel=0", uploaded: "2 years ago", views: "1.5M" },
    { title: "Basic Maths for DSA | Euclidean Algorithm | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/1xNbjMdbjug?rel=0", uploaded: "2 years ago", views: "1.1M" },
    { title: "Re 1. Introduction to Recursion | Recursion Tree | Stack Space | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/yVdKa8dnKiE?rel=0", uploaded: "3 years ago", views: "1.8M" },
    { title: "Re 2. Problems on Recursion | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/un6PLygfXrA?rel=0", uploaded: "3 years ago", views: "902K" },
    { title: "Re 3. Parameterised and Functional Recursion | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/69ZCDFy-OUo?rel=0", uploaded: "3 years ago", views: "725K" },
    { title: "Re 4. Problems on Functional Recursion | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/twuC1F6gLI8?rel=0", uploaded: "3 years ago", views: "701K" },
    { title: "Re 5. Multiple Recursion Calls | Problems | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/kvRjNm4rVBE?rel=0", uploaded: "3 years ago", views: "574K" },
    { title: "Hashing | Maps | Time Complexity | Collisions | Division Rule of Hashing | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/KEs5UyBJ39g?rel=0", uploaded: "2 years ago", views: "982K" },
    { title: "Sorting - Part 1 | Selection Sort, Bubble Sort, Insertion Sort | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/HGk_ypEuS24?rel=0", uploaded: "2 years ago", views: "926K" },
    { title: "Merge Sort | Algorithm | Pseudocode | Dry Run | Code | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/ogjf7ORKfd8?rel=0", uploaded: "2 years ago", views: "836K" },
    { title: "Quick Sort For Beginners | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/WIrA4YexLRQ?rel=0", uploaded: "2 years ago", views: "605K" },
    { title: "Find Second Largest Element in Array | Remove duplicates from Sorted Array | Arrays Intro Video", url: "https://www.youtube.com/embed/37E9ckMDdTk?rel=0", uploaded: "2 years ago", views: "1.9M" },
    { title: "Rotate Array by K places | Union, Intersection of Sorted Arrays | Move Zeros to End | Arrays Part-2", url: "https://www.youtube.com/embed/wvcQg43_V8U?rel=0", uploaded: "2 years ago", views: "1.2M" },
    { title: "Find element that appears once | Find missing number | Max Consecutive number of 1's | Arrays Part-3", url: "https://www.youtube.com/embed/bYWLJb3vCWY?rel=0", uploaded: "2 years ago", views: "572K" },
    { title: "Longest Subarray with sum K | Brute - Better - Optimal | Generate Subarrays", url: "https://www.youtube.com/embed/frf7qxiN2qU?rel=0", uploaded: "2 years ago", views: "898K" },
    { title: "Binary Search | Algorithm | Code | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/m4nEnsavl6w?rel=0", uploaded: "2 years ago", views: "1.1M" },
    { title: "Lower Bound and Upper Bound | Binary Search Variations | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/9YcXjV4lQKU?rel=0", uploaded: "2 years ago", views: "710K" },
    { title: "Find Peak Element | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/9Jry5-82I68?rel=0", uploaded: "2 years ago", views: "1.2M" },
    { title: "Search in Rotated Sorted Array | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/f4fB9Xg2JEY?rel=0", uploaded: "2 years ago", views: "1.3M" },
    { title: "Find Minimum in Rotated Sorted Array | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/5B5xQ0wE0aA?rel=0", uploaded: "2 years ago", views: "1M" },
    { title: "Find Element in Infinite Sorted Array | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/5k2p5-7f1Q8?rel=0", uploaded: "2 years ago", views: "650K" },
    { title: "Matrix Search | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/7k2dL6rA4yM?rel=0", uploaded: "2 years ago", views: "900K" },
    { title: "Find First and Last Position of Element in Sorted Array | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/sxFp9FY9i3o?rel=0", uploaded: "2 years ago", views: "1.1M" },
    { title: "Find Square Root of Number | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/5g3J2dH9WbM?rel=0", uploaded: "2 years ago", views: "720K" },
    { title: "Aggressive Cows Problem | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/3E4x6hYlU3I?rel=0", uploaded: "2 years ago", views: "680K" },
    { title: "Painter's Partition Problem | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/7eL0W4kG3wY?rel=0", uploaded: "2 years ago", views: "710K" },
    { title: "Book Allocation Problem | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/2h0s8mL0bM8?rel=0", uploaded: "2 years ago", views: "690K" },
    { title: "Median of Two Sorted Arrays | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/LPFhl65R7ww?rel=0", uploaded: "2 years ago", views: "1.4M" },
    { title: "Find the Duplicate Number | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/1b6XH2tXf0A?rel=0", uploaded: "2 years ago", views: "720K" },
    { title: "Find the Missing Number | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/7t0D8k1l6Tk?rel=0", uploaded: "2 years ago", views: "600K" },
    { title: "Count Occurrences in Sorted Array | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/8hGzW9E0Z3k?rel=0", uploaded: "2 years ago", views: "550K" },
    { title: "Floor and Ceil in Sorted Array | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/6rG6JzN6v6s?rel=0", uploaded: "2 years ago", views: "500K" },
    { title: "Find K Closest Elements | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/4y4BqJZ9cB0?rel=0", uploaded: "2 years ago", views: "480K" },
    { title: "Find Peak Element in Mountain Array | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/9Jry5-82I68?rel=0", uploaded: "2 years ago", views: "1.2M" },
    { title: "Find Pivot Index | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/2i2Khp_npdE?rel=0", uploaded: "2 years ago", views: "470K" },
    { title: "Find Minimum in Rotated Sorted Array II | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/5B5xQ0wE0aA?rel=0", uploaded: "2 years ago", views: "650K" },
    { title: "Find Element in Rotated Sorted Array II | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/7eL0W4kG3wY?rel=0", uploaded: "2 years ago", views: "600K" },
    { title: "Find Median in Row Wise Sorted Matrix | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/LPFhl65R7ww?rel=0", uploaded: "2 years ago", views: "720K" },
    { title: "Find Kth Smallest Element in Sorted Matrix | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/1b6XH2tXf0A?rel=0", uploaded: "2 years ago", views: "540K" },
    { title: "Find Kth Smallest Number in Multiplication Table | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/7t0D8k1l6Tk?rel=0", uploaded: "2 years ago", views: "530K" },
    { title: "Find the Duplicate Number IV | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/8hGzW9E0Z3k?rel=0", uploaded: "2 years ago", views: "510K" },
    { title: "Find Missing Number IV | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/6rG6JzN6v6s?rel=0", uploaded: "2 years ago", views: "490K" },
    { title: "Find the Number of Occurrences II | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/9Jry5-82I68?rel=0", uploaded: "2 years ago", views: "260K" },
    { title: "Find Floor and Ceil in Sorted Array III | Binary Search | Strivers A2Z DSA Course", url: "https://www.youtube.com/embed/2i2Khp_npdE?rel=0", uploaded: "2 years ago", views: "250K" },
  ];

  const categories = ["All", ...new Set(videoData.map(video => video.category))];

  const filteredVideos = videoData.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleClickVideo = (video) => { setSelectedVideo(video); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedVideo(null); };

  const S = {
    page: { maxWidth: "1300px", margin: "0 auto", padding: "40px 24px 80px" },
    header: {
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      marginBottom: "36px", flexWrap: "wrap", gap: "16px",
    },
    titleBlock: {},
    eyebrow: {
      display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px",
      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
      borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px",
    },
    pageTitle: { fontSize: "32px", fontWeight: "800", letterSpacing: "-0.8px", color: "#fafafa", margin: 0 },
    controls: { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" },
    searchWrap: { position: "relative" },
    searchIcon: {
      position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
      fontSize: "14px", pointerEvents: "none", zIndex: 1,
    },
    searchInput: {
      padding: "10px 14px 10px 36px", borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
      color: "#fafafa", fontSize: "14px", width: "220px", outline: "none", fontFamily: "inherit",
    },
    selectEl: {
      padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
      background: "rgba(255,255,255,0.04)", color: "#fafafa", fontSize: "14px",
      outline: "none", cursor: "pointer", fontFamily: "inherit",
    },
    emptyState: {
      textAlign: "center", padding: "60px 32px",
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
    },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
    card: {
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", overflow: "hidden", cursor: "pointer",
      transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
      display: "flex", flexDirection: "column",
    },
    cardThumb: {
      height: "130px", background: "rgba(99,102,241,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    playBtn: {
      width: "48px", height: "48px", borderRadius: "50%",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 20px rgba(99,102,241,0.4)", fontSize: "16px", color: "#fff",
    },
    cardBody: { padding: "16px", flex: 1, display: "flex", flexDirection: "column" },
    cardTitle: {
      fontSize: "14px", fontWeight: "600", color: "#fafafa", lineHeight: "1.5",
      margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1,
    },
    cardMeta: {
      display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#52525b",
      paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    overlay: {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    },
    modal: {
      background: "#111118", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px",
      padding: "32px", maxWidth: "600px", width: "90%",
      cursor: "auto", boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
    },
    modalHeader: {
      display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px",
    },
    modalTitle: { fontSize: "18px", fontWeight: "700", color: "#fafafa", margin: 0, lineHeight: "1.4", flex: 1, marginRight: "16px" },
    closeBtn: {
      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px", color: "#a1a1aa", fontSize: "18px", cursor: "pointer",
      width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, fontFamily: "inherit",
    },
    modalMeta: { display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" },
    metaPill: {
      padding: "5px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)", fontSize: "13px", color: "#a1a1aa",
    },
    modalDesc: { fontSize: "13px", color: "#a1a1aa", lineHeight: "1.6", marginBottom: "24px" },
    modalActions: { display: "flex", gap: "12px" },
    btnPrimary: {
      flex: 1, padding: "12px 0", borderRadius: "10px", border: "none", cursor: "pointer",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontWeight: "600",
      fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center",
      justifyContent: "center", gap: "6px", fontFamily: "inherit",
      boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
    },
    btnGhost: {
      flex: 1, padding: "12px 0", borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
      background: "transparent", color: "#a1a1aa", fontWeight: "600", fontSize: "14px", fontFamily: "inherit",
    },
  };

  return (
    <Layout>
      <style>{`
        .dc-card:hover { border-color: rgba(99,102,241,0.3) !important; box-shadow: 0 16px 40px rgba(99,102,241,0.1) !important; transform: translateY(-4px) !important; }
        .dc-search:focus { border-color: rgba(99,102,241,0.4) !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.1) !important; }
        .dc-select:focus { border-color: rgba(99,102,241,0.4) !important; }
        .dc-select option { background: #111118; color: #fafafa; }
      `}</style>

      <div style={S.page}>
        <div style={S.header}>
          <div style={S.titleBlock}>
            <div style={S.eyebrow}>✦ DSA Course</div>
            <h1 style={S.pageTitle}>Striver's A2Z DSA Course</h1>
          </div>
          <div style={S.controls}>
            <div style={S.searchWrap}>
              <span style={S.searchIcon}>🔍</span>
              <input
                type="text" placeholder="Search videos..." value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="dc-search" style={S.searchInput}
              />
            </div>
            <select
              value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="dc-select" style={S.selectEl}
            >
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {filteredVideos.length === 0 ? (
          <div style={S.emptyState}>
            <p style={{ fontSize: "2rem", marginBottom: "12px" }}>🔍</p>
            <p style={{ fontSize: "17px", fontWeight: "600", color: "#fafafa", margin: "0 0 8px" }}>No videos found</p>
            <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>Try adjusting your search or category.</p>
          </div>
        ) : (
          <div style={S.grid}>
            {filteredVideos.map((video, index) => (
              <div key={index} className="dc-card" style={S.card} onClick={() => handleClickVideo(video)}>
                <div style={S.cardThumb}>
                  <div style={S.playBtn}>▶</div>
                </div>
                <div style={S.cardBody}>
                  <p style={S.cardTitle}>{video.title}</p>
                  <div style={S.cardMeta}>
                    <span>👁 {video.views}</span>
                    <span>{video.uploaded}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedVideo && (
        <div style={S.overlay} onClick={handleCloseModal}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <h2 style={S.modalTitle}>{selectedVideo.title}</h2>
              <button style={S.closeBtn} onClick={handleCloseModal}>×</button>
            </div>
            <div style={S.modalMeta}>
              <span style={S.metaPill}>📅 {selectedVideo.uploaded}</span>
              <span style={S.metaPill}>👁 {selectedVideo.views} views</span>
            </div>
            <p style={S.modalDesc}>
              Part of Striver's A2Z DSA Course — a comprehensive series covering data structures and algorithms from basics to advanced.
            </p>
            <div style={S.modalActions}>
              <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer" style={S.btnPrimary}>
                ▶ Watch on YouTube
              </a>
              <button onClick={handleCloseModal} style={S.btnGhost}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DsaCoursesScreen;
