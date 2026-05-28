import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from "../../Layout1/Layout";

const SolvedProblemsList = () => {
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [customlist, setcustomlist] = useState([]);
  const [showcustomlistquestions, setshowcustomlistquestions] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  const [draggedNoteIndex, setDraggedNoteIndex] = useState(null);
  const [topicGraphData, setTopicGraphData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsRes = await axios.get(process.env.REACT_APP_SOLVED_QUESTION, { withCredentials: true });
        const allQuestions = questionsRes.data.questions || [];
        setSubmittedQuestions(allQuestions.filter(q => q.important === true));
        const listsRes = await axios.get(process.env.REACT_APP_CUSTOM_LIST, { withCredentials: true });
        setcustomlist(listsRes.data.customLists);
        const graphRes = await axios.get(process.env.REACT_APP_QUESTION_GRAPH, { withCredentials: true });
        setTopicGraphData(graphRes.data.topicCount || graphRes.data.titlecount || {});
      } catch (err) { console.error("Error fetching data:", err); }
    };
    fetchData();
  }, []);

  const createnewcustomlist = async (listname) => {
    if (!listname.trim()) return;
    try {
      await axios.post(process.env.REACT_APP_CREATE_CUSTOM_LIST, { listname }, { withCredentials: true });
      getallcustomlists();
      setNewListName("");
    } catch (err) { console.error("Error creating custom list:", err); alert("Failed to create list."); }
  };

  const getallcustomlists = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_CUSTOM_LIST, { withCredentials: true });
      setcustomlist(res.data.customLists);
    } catch (err) { console.error("Error fetching custom lists:", err); }
  };

  const addquestiontocustomlist = async (listId, questionId) => {
    try {
      await axios.post(process.env.REACT_APP_ADD_QUESTION_TO_CUSTOM_LIST, { listId, questionId }, { withCredentials: true });
      if (listId === selectedListId && !showcustomlistquestions.includes(questionId)) {
        setshowcustomlistquestions(prev => [...prev, questionId]);
      }
    } catch (err) { console.error("Error adding question to list:", err); }
  };

  const viewcustomlist = async (listId) => {
    if (!listId) return;
    try {
      const res = await axios.post(process.env.REACT_APP_ALL_QUESTIONS, { listId }, { withCredentials: true });
      setshowcustomlistquestions(res.data.questions);
      setSelectedListId(listId);
    } catch (err) { console.error("Error viewing custom list:", err); }
  };

  const deletecustomlist = async (listId) => {
    try {
      await axios.post(process.env.REACT_APP_DELETE_CUSTOM_LIST, { listId }, { withCredentials: true });
      setcustomlist(customlist.filter(list => list._id !== listId));
      setSelectedListId(null);
      setshowcustomlistquestions([]);
    } catch (err) { console.error("Error deleting custom list:", err); }
  };

  const deletequestionfromcustomlist = async (listId, questionId) => {
    try {
      await axios.post(process.env.REACT_APP_DELETE_QUESTION_FROM_CUSTOM_LIST, { listId, questionId }, { withCredentials: true });
      viewcustomlist(listId);
    } catch (err) { console.error("Error deleting question from list:", err); }
  };

  const CHART_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#a78bfa", "#34d399"];

  const S = {
    page: { maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px" },
    pageHeader: { textAlign: "center", marginBottom: "40px" },
    eyebrow: {
      display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px",
      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
      borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px",
    },
    pageTitle: { fontSize: "32px", fontWeight: "800", letterSpacing: "-0.8px", color: "#fafafa", margin: "0 0 8px" },
    card: {
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", padding: "24px", marginBottom: "20px",
    },
    cardTitle: {
      fontSize: "16px", fontWeight: "700", color: "#fafafa", textAlign: "center",
      margin: "0 0 20px",
    },
    inputRow: { display: "flex", gap: "12px", flexWrap: "wrap" },
    input: {
      flex: "3 1 200px", padding: "11px 14px", borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
      color: "#fafafa", fontSize: "14px", outline: "none", fontFamily: "inherit",
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    btnPrimary: {
      flex: "1 1 120px", padding: "11px 20px", borderRadius: "10px", border: "none",
      cursor: "pointer", background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "#fff", fontWeight: "600", fontSize: "14px", fontFamily: "inherit",
      boxShadow: "0 4px 14px rgba(99,102,241,0.3)", transition: "opacity 0.2s",
    },
    table: { width: "100%", borderCollapse: "separate", borderSpacing: 0, borderRadius: "12px", overflow: "hidden" },
    tHead: { background: "rgba(99,102,241,0.12)" },
    th: {
      padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: "700",
      color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "1px",
    },
    td: { padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "14px", color: "#a1a1aa" },
    trEven: { background: "rgba(255,255,255,0.02)" },
    trOdd: { background: "rgba(255,255,255,0.01)" },
    selectEl: {
      background: "rgba(255,255,255,0.04)", color: "#fafafa",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
      padding: "7px 10px", width: "100%", cursor: "pointer", fontFamily: "inherit", fontSize: "13px",
    },
    listControlRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" },
    btnDanger: {
      flex: "1 1 140px", padding: "11px 16px", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.3)",
      cursor: "pointer", background: "rgba(239,68,68,0.08)", color: "#f87171",
      fontWeight: "600", fontSize: "14px", fontFamily: "inherit", transition: "background 0.2s",
    },
    emptyBox: {
      textAlign: "center", padding: "32px",
      background: "rgba(255,255,255,0.02)", borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    emptyText: { fontSize: "13px", color: "#52525b", margin: 0 },
    notesGrid: { display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" },
    noteCard: {
      width: "200px", padding: "16px", borderRadius: "12px",
      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
      cursor: "grab", position: "relative", transition: "box-shadow 0.2s, transform 0.2s",
    },
    noteCardDragging: {
      width: "200px", padding: "16px", borderRadius: "12px",
      background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)",
      cursor: "grabbing", position: "relative", transform: "scale(1.04)",
      boxShadow: "0 12px 32px rgba(99,102,241,0.2)",
    },
    noteLabel: { fontSize: "11px", fontWeight: "700", color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" },
    noteValue: { fontSize: "14px", color: "#fafafa", fontWeight: "500" },
    noteDeleteBtn: {
      position: "absolute", top: "8px", right: "8px",
      background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
      borderRadius: "50%", width: "24px", height: "24px",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "14px", fontWeight: "bold", cursor: "pointer", color: "#f87171",
      lineHeight: 1,
    },
  };

  return (
    <Layout>
      <style>{`
        .spl-input:focus { border-color: rgba(99,102,241,0.5) !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.1) !important; }
        .spl-select option { background: #111118; color: #fafafa; }
        .spl-danger-btn:hover { background: rgba(239,68,68,0.15) !important; }
        .spl-primary-btn:hover { opacity: 0.9; }
        .spl-note-card:hover { box-shadow: 0 8px 24px rgba(99,102,241,0.15); transform: translateY(-2px); }
      `}</style>

      <div style={S.page}>
        <div style={S.pageHeader}>
          <div style={S.eyebrow}>✦ Progress</div>
          <h1 style={S.pageTitle}>📘 Important Questions Dashboard</h1>
        </div>

        {/* Analytics */}
        {Object.keys(topicGraphData).length > 0 && (
          <div style={S.card}>
            <h3 style={S.cardTitle}>📊 Topic Analysis</h3>
            <div style={{ width: "100%", height: 360 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={Object.entries(topicGraphData).map(([name, value]) => ({ name, value }))}
                    dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    style={{ fontSize: "12px", fill: "#a1a1aa" }}
                  >
                    {Object.keys(topicGraphData).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#111118", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fafafa" }}
                    formatter={(value, name) => [`${value} question${value !== 1 ? 's' : ''}`, name]}
                  />
                  <Legend wrapperStyle={{ color: "#a1a1aa", fontSize: "13px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Create List */}
        <div style={S.card}>
          <h3 style={S.cardTitle}>📁 Create Custom List</h3>
          <div style={S.inputRow}>
            <input
              type="text" placeholder="Enter list name..." value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="spl-input" style={S.input}
            />
            <button
              onClick={() => createnewcustomlist(newListName)}
              className="spl-primary-btn" style={S.btnPrimary}
            >
              Create List
            </button>
          </div>
        </div>

        {/* Important Questions Table */}
        <div style={S.card}>
          <h3 style={S.cardTitle}>⭐ Important Questions</h3>
          {submittedQuestions.length === 0 ? (
            <div style={S.emptyBox}>
              <p style={{ fontSize: "1.5rem", margin: "0 0 10px" }}>📋</p>
              <p style={{ fontSize: "14px", color: "#a1a1aa", margin: "0 0 4px" }}>No important questions marked yet.</p>
              <p style={S.emptyText}>Questions you mark as important will appear here.</p>
            </div>
          ) : (
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table style={S.table}>
                <thead style={S.tHead}>
                  <tr>
                    <th style={S.th}>Question ID</th>
                    <th style={S.th}>Status</th>
                    <th style={S.th}>Date</th>
                    <th style={S.th}>Time</th>
                    <th style={S.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedQuestions.map((q, idx) => (
                    <tr key={idx} style={idx % 2 === 0 ? S.trEven : S.trOdd}>
                      <td style={{ ...S.td, fontWeight: "600", color: "#fafafa" }}>{q.questionId}</td>
                      <td style={S.td}>
                        <span style={{
                          padding: "3px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: "600",
                          background: q.important ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                          color: q.important ? "#34d399" : "#f87171",
                          border: `1px solid ${q.important ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                        }}>
                          {q.important ? "✓ Yes" : "✗ No"}
                        </span>
                      </td>
                      <td style={S.td}>{q.timestamp ? new Date(q.timestamp).toLocaleDateString() : "N/A"}</td>
                      <td style={S.td}>{q.timestamp ? new Date(q.timestamp).toLocaleTimeString() : "N/A"}</td>
                      <td style={S.td}>
                        <select
                          defaultValue=""
                          onChange={(e) => addquestiontocustomlist(e.target.value, q.questionId)}
                          className="spl-select" style={S.selectEl}
                        >
                          <option value="" disabled>Add to list...</option>
                          {customlist.map((list) => (
                            <option key={list._id} value={list._id}>{list.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Saved Lists */}
        <div style={S.card}>
          <h3 style={S.cardTitle}>📂 Saved Lists</h3>
          <div style={S.listControlRow}>
            <select
              id="list-view-selector" defaultValue=""
              onChange={(e) => viewcustomlist(e.target.value)}
              className="spl-select"
              style={{ ...S.selectEl, flex: "3 1 300px", padding: "11px 14px" }}
            >
              <option disabled value="">Select a list to view</option>
              {customlist.map((list) => (
                <option key={list._id} value={list._id}>{list.name}</option>
              ))}
            </select>
            {customlist.length > 0 && (
              <button
                className="spl-danger-btn" style={S.btnDanger}
                onClick={() => {
                  const listId = document.getElementById("list-view-selector").value;
                  if (listId && window.confirm("Are you sure you want to delete this list?")) {
                    deletecustomlist(listId);
                  }
                }}
              >
                Delete List
              </button>
            )}
          </div>

          {selectedListId ? (
            showcustomlistquestions.length > 0 ? (
              <div style={S.notesGrid}>
                {showcustomlistquestions.map((q, idx) => (
                  <div
                    key={idx} draggable
                    onDragStart={() => setDraggedNoteIndex(idx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (draggedNoteIndex !== null && draggedNoteIndex !== idx) {
                        const newOrder = [...showcustomlistquestions];
                        const moved = newOrder.splice(draggedNoteIndex, 1)[0];
                        newOrder.splice(idx, 0, moved);
                        setshowcustomlistquestions(newOrder);
                        setDraggedNoteIndex(null);
                      }
                    }}
                    className="spl-note-card"
                    style={draggedNoteIndex === idx ? S.noteCardDragging : S.noteCard}
                  >
                    <div style={S.noteLabel}>Question ID</div>
                    <div style={S.noteValue}>{q}</div>
                    <button
                      onClick={() => deletequestionfromcustomlist(selectedListId, q)}
                      style={S.noteDeleteBtn}
                    >×</button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={S.emptyBox}>
                <p style={S.emptyText}>This list is empty. Add questions from the table above.</p>
              </div>
            )
          ) : (
            <div style={S.emptyBox}>
              <p style={S.emptyText}>Select a list above to view its contents.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SolvedProblemsList;
