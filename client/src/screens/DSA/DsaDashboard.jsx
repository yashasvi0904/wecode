import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import quoteList from "../../utils/quotes.js";
import { handleLogout } from "../../utils/Logout.js";
import Layout from "../../Layout1/Layout.jsx";
import Navbar from "../../Layout1/Navbar.jsx";

const Dashboard = () => {
  const [topic, setTopic] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [quote, setQuote] = useState("");
  const [showmenu, setshowmenu] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleSortByClick = () => setShowTopics(!showTopics);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current  && !buttonRef.current.contains(event.target)
      ) setShowTopics(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => setQuote(quoteList[Math.floor(Math.random() * quoteList.length)]), []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_GET_ALL_QUESTIONS, { withCredentials: true });
        const list = Array.isArray(res.data?.questions) ? res.data.questions : [];
        if (!list.length) return;

        const dash = await axios.get(process.env.REACT_APP_FETCH_DASHBOARD, { withCredentials: true });
        const { importantQuestions = [], revisionQuestions = [] } = dash.data || {};

        const cleaned = list.map((q) => ({
          Topic: q.topic || "Miscellaneous",
          Title: q.title,
          Difficulty: q.difficulty,
          Revision: revisionQuestions.some((r) => r.questionId === q.title) ? "Yes" : "No",
          Important: importantQuestions.some((r) => r.questionId === q.title) ? "Yes" : "No",
          Link: q.link,
          "Problem Statement": q.problemStatement,
          "Sample Input": q.sampleInput,
          "Sample Output": q.sampleOutput,
          Constraints: q.constraints,
        }));

        const sorted = cleaned.sort((a, b) => a.Difficulty.localeCompare(b.Difficulty));
        setQuestions(sorted); setSortedQuestions(sorted); setFilteredData(sorted);
        setTopics(Array.from(new Set(sorted.map((q) => q.Topic))));
      } catch (e) { console.error("Error fetching questions:", e); }
    };
    fetchQuestions();
  }, []);

  const handleCreateRoom = async (question, customState = {}) => {
    const roomId = slugify(question.Title);
    const roomData = {
      roomId, title: question.Title, statement: question["Problem Statement"],
      difficulty: question.Difficulty, sampleInput: question["Sample Input"],
      sampleOutput: question["Sample Output"], constraints: question.Constraints,
    };
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(process.env.REACT_APP_ROOM_CREATE, {
        withCredentials: true,
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      navigate(`/customroom/${roomId}/${res.data.roomId}`, { state: { question: roomData, ...customState } });
    } catch (e) { console.error("Failed to create room:", e); }
  };

  const handleJoinRoom = async (question) => {
    const privateRoomId = prompt(`Enter private room ID for "${question.Title}"`);
    if (!privateRoomId) return;
    try {
      await axios.post(process.env.REACT_APP_ROOM_JOIN, { roomId: privateRoomId }, { withCredentials: true });
      const publicRoomId = slugify(question.Title);
      navigate(`/customroom/${publicRoomId}/${privateRoomId}`, {
        state: { question: { title: question.Title, statement: question["Problem Statement"], difficulty: question.Difficulty, sampleInput: question["Sample Input"], sampleOutput: question["Sample Output"], constraints: question.Constraints } },
      });
    } catch (e) { console.log("Room join failed:", e?.response?.data?.message); }
  };

  const handleUpdateQuestion = async (index, field, value) => {
    const updated = [...questions];
    const newValue = value === "Yes" ? "No" : "Yes";
    try {
      await axios.post(process.env.REACT_APP_UPDATE_QUESTION_URI, {
        title: updated[index].Topic, questionId: updated[index].Title, field, value: newValue,
      }, { withCredentials: true });
      updated[index][field] = newValue;
      setQuestions(updated); setSortedQuestions(updated); setFilteredData(updated);
    } catch (e) { console.error(e); }
  };

  const handleLogoutClick = () => { setshowmenu(false); handleLogout(navigate); };
  const handleToggleMenu = () => setshowmenu(!showmenu);
  const handleNavigateToDashboard = () => navigate("/dsadashboard");
  const slugify = (s) => s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  const handleJoinQuestionRoom = (title) => navigate(`/questionroom/${slugify(title)}`);
  const handleSolveQuestion = (q) => handleCreateRoom(q, { hideRoomId: true, hideVideoTitle: true });

  const handleTopicClick = (sel) => {
    if (topic === sel) { setTopic(""); setFilteredData(sortedQuestions); }
    else { setTopic(sel); setFilteredData(sortedQuestions.filter((q) => q.Topic === sel)); }
    setShowTopics(false);
  };

  const diffBadgeStyle = (level) => {
    const map = {
      Easy:   { background: "rgba(16,185,129,0.15)",  color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.25)" },
      Medium: { background: "rgba(245,158,11,0.15)",  color: "#fcd34d", border: "1px solid rgba(245,158,11,0.25)" },
      Hard:   { background: "rgba(239,68,68,0.15)",   color: "#fca5a5", border: "1px solid rgba(239,68,68,0.25)" },
    };
    return {
      display: "inline-flex", alignItems: "center", padding: "3px 10px",
      borderRadius: "100px", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap",
      ...(map[level] || map["Medium"]),
    };
  };

  const displayData = topic ? filteredData : sortedQuestions;

  return (
    <Layout>
      <style>{`
        .dsa-row:hover { background: rgba(99,102,241,0.05) !important; }
        .dsa-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.4) !important; }
        .dsa-btn-ghost:hover { background: rgba(255,255,255,0.08) !important; color: #fafafa !important; }
        .dsa-topic-item:hover { background: rgba(255,255,255,0.06) !important; color: #fafafa !important; }
        .dsa-filter-btn:hover { background: rgba(99,102,241,0.18) !important; border-color: rgba(99,102,241,0.4) !important; }
        input[type="checkbox"].dsa-check { accent-color: #6366f1; }
      `}</style>

      <Navbar showMenu={showmenu} onToggleMenu={handleToggleMenu} onLogout={handleLogoutClick} onDashboard={handleNavigateToDashboard} />

      <div style={{ padding: "28px 28px 80px", maxWidth: "1360px", margin: "0 auto" }}>

        {/* Quote */}
        {quote && (
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{
              fontSize: "16px", color: "#a1a1aa", fontStyle: "italic", lineHeight: "1.75",
              maxWidth: "700px", margin: "0 auto",
              padding: "20px 28px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
            }}>
              "{quote}"
            </p>
          </div>
        )}

        {/* Page header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px",
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
            borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
            textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px",
          }}>✦ Practice</div>
          <h1 style={{
            fontSize: "36px", fontWeight: "800", letterSpacing: "-1.2px",
            color: "#fafafa", margin: "0 0 8px", lineHeight: "1.1",
          }}>
            DSA Question Bank
          </h1>
          <p style={{ fontSize: "15px", color: "#a1a1aa", margin: 0 }}>
            Practice data structures and algorithms with real-time collaborative rooms.
          </p>
        </div>

        {/* Controls row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          {/* Filter button */}
          <div style={{ position: "relative" }}>
            <button
              ref={buttonRef}
              onClick={handleSortByClick}
              className="dsa-filter-btn"
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "9px 16px",
                background: topic ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${topic ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "9px", color: topic ? "#a5b4fc" : "#a1a1aa",
                fontSize: "14px", fontWeight: "600", cursor: "pointer",
                transition: "all 0.2s", fontFamily: "inherit",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              {topic ? `Topic: ${topic}` : "Filter by Topic"}
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ marginLeft: "2px", transition: "transform 0.2s", transform: showTopics ? "rotate(180deg)" : "none" }}>
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {showTopics && (
              <div
                ref={dropdownRef}
                style={{
                  position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 100,
                  background: "rgba(9,9,11,0.97)", backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.09)", borderRadius: "12px",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.5)", minWidth: "220px", padding: "6px",
                }}
              >
                {topics.map((t) => (
                  <div
                    key={t}
                    className="dsa-topic-item"
                    onClick={() => handleTopicClick(t)}
                    style={{
                      padding: "9px 12px", cursor: "pointer", borderRadius: "7px",
                      color: topic === t ? "#a5b4fc" : "#a1a1aa",
                      background: topic === t ? "rgba(99,102,241,0.1)" : "transparent",
                      fontWeight: topic === t ? "600" : "400", fontSize: "14px",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Count badge */}
          <span style={{
            padding: "6px 14px", borderRadius: "100px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: "13px", color: "#52525b", fontWeight: "500",
          }}>
            {displayData.length} questions{topic && ` · ${topic}`}
          </span>
        </div>

        {/* Table */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px", overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "980px" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["Topic", "Title", "Difficulty", "Revision", "Important", "Solve", "Join Room", "Create Room", "Join Private"].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        padding: "14px 16px", textAlign: "left", fontSize: "11px",
                        fontWeight: "700", color: "#52525b", textTransform: "uppercase",
                        letterSpacing: "0.6px", whiteSpace: "nowrap",
                        borderRight: i < 8 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayData.map((q, idx) => (
                  <tr
                    key={idx}
                    className="dsa-row"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      transition: "background 0.15s",
                    }}
                  >
                    <td style={{ padding: "13px 16px", fontSize: "13px", color: "#a1a1aa", whiteSpace: "nowrap" }}>
                      {q.Topic || "—"}
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: "14px", fontWeight: "600", color: "#fafafa" }}>
                      {q.Title}
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={diffBadgeStyle(q.Difficulty)}>{q.Difficulty}</span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <input
                        type="checkbox"
                        className="dsa-check"
                        checked={q.Revision === "Yes"}
                        onChange={() => handleUpdateQuestion(idx, "Revision", q.Revision)}
                        style={{ width: "17px", height: "17px", cursor: "pointer" }}
                      />
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <input
                        type="checkbox"
                        className="dsa-check"
                        checked={q.Important === "Yes"}
                        onChange={() => handleUpdateQuestion(idx, "Important", q.Important)}
                        style={{ width: "17px", height: "17px", cursor: "pointer" }}
                      />
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <button
                        className="dsa-btn"
                        onClick={() => handleSolveQuestion(q)}
                        style={{
                          padding: "7px 13px",
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          color: "white", border: "none", borderRadius: "7px",
                          fontSize: "12px", fontWeight: "600", cursor: "pointer",
                          boxShadow: "0 2px 10px rgba(99,102,241,0.3)",
                          transition: "all 0.2s", fontFamily: "inherit", whiteSpace: "nowrap",
                        }}
                      >
                        Solve
                      </button>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <button
                        className="dsa-btn"
                        onClick={() => handleJoinQuestionRoom(q.Title)}
                        style={{
                          padding: "7px 13px",
                          background: "rgba(6,182,212,0.12)",
                          color: "#67e8f9",
                          border: "1px solid rgba(6,182,212,0.25)",
                          borderRadius: "7px", fontSize: "12px", fontWeight: "600",
                          cursor: "pointer", transition: "all 0.2s",
                          fontFamily: "inherit", whiteSpace: "nowrap",
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(6,182,212,0.2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = "rgba(6,182,212,0.12)"; e.currentTarget.style.transform = "none"; }}
                      >
                        Join Room
                      </button>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <button
                        className="dsa-btn"
                        onClick={() => handleCreateRoom(q)}
                        style={{
                          padding: "7px 13px",
                          background: "rgba(139,92,246,0.12)",
                          color: "#c4b5fd",
                          border: "1px solid rgba(139,92,246,0.25)",
                          borderRadius: "7px", fontSize: "12px", fontWeight: "600",
                          cursor: "pointer", transition: "all 0.2s",
                          fontFamily: "inherit", whiteSpace: "nowrap",
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.12)"; e.currentTarget.style.transform = "none"; }}
                      >
                        Create
                      </button>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <button
                        className="dsa-btn-ghost"
                        onClick={() => handleJoinRoom(q)}
                        style={{
                          padding: "7px 13px",
                          background: "rgba(255,255,255,0.04)",
                          color: "#a1a1aa",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "7px", fontSize: "12px", fontWeight: "600",
                          cursor: "pointer", transition: "all 0.2s",
                          fontFamily: "inherit", whiteSpace: "nowrap",
                        }}
                      >
                        Join Private
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
