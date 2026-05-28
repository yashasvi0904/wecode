import socket from "../../sockets/socket";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CodeEditor from "../../Rooms/CodeEditor";
import VideoConferencing from "../../Rooms/VideoConferencing";
import Layout from "../../Layout1/Layout";
import axios from "axios";

// ── Language config (Judge0 IDs) ───────────────────────────────────────────────
const LANGUAGES = [
  { id: 54, name: "C++",        icon: "⚡", ext: "cpp"  },
  { id: 50, name: "C",          icon: "🔩", ext: "c"    },
  { id: 62, name: "Java",       icon: "☕", ext: "java" },
  { id: 71, name: "Python",     icon: "🐍", ext: "py"   },
  { id: 63, name: "JavaScript", icon: "🌐", ext: "js"   },
];

const DIFF_STYLE = {
  Easy:   { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  glow: "rgba(74,222,128,0.15)"  },
  Medium: { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  glow: "rgba(251,146,60,0.15)"  },
  Hard:   { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", glow: "rgba(248,113,113,0.15)" },
};

// ── CSS ────────────────────────────────────────────────────────────────────────
const WS_CSS = `
  .ws-root {
    display: flex; flex-direction: column;
    height: calc(100vh - 64px);
    background: #09090b; color: #fafafa;
    overflow: hidden; font-family: inherit;
  }

  /* ── Topbar ── */
  .ws-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 18px; height: 50px; flex-shrink: 0;
    background: rgba(255,255,255,0.018);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    gap: 12px; z-index: 10;
  }
  .ws-topbar-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .ws-crumb-back {
    display: flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 600; color: #52525b;
    text-decoration: none; padding: 4px 8px; border-radius: 6px;
    transition: color .15s, background .15s; flex-shrink: 0;
    border: none; background: transparent; cursor: pointer;
  }
  .ws-crumb-back:hover { color: #a1a1aa; background: rgba(255,255,255,0.04); }
  .ws-crumb-sep { color: #27272a; font-size: 16px; }
  .ws-crumb-title {
    font-size: 13px; font-weight: 600; color: #a1a1aa;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .ws-topbar-mid { display: flex; align-items: center; flex: 1; justify-content: center; }
  .ws-topbar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .ws-live-badge {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: .4px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 100px; padding: 3px 10px;
  }
  .ws-live-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
    box-shadow: 0 0 7px rgba(74,222,128,0.7);
    animation: wsDotPulse 2s infinite;
  }
  @keyframes wsDotPulse { 0%,100%{opacity:1} 50%{opacity:.4} }

  .ws-end-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 8px; cursor: pointer;
    font-size: 12px; font-weight: 700; font-family: inherit;
    background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.28);
    color: #f87171; transition: background .15s, border-color .15s, transform .15s;
  }
  .ws-end-btn:hover { background: rgba(239,68,68,0.16); border-color: rgba(239,68,68,0.5); transform: translateY(-1px); }

  .ws-mobile-toggle {
    display: flex; background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden;
  }
  .ws-mtoggle {
    padding: 5px 14px; background: transparent; border: none;
    color: #52525b; font-size: 12px; font-weight: 700; cursor: pointer;
    font-family: inherit; transition: color .15s, background .15s;
  }
  .ws-mtoggle.active { color: #fafafa; background: rgba(99,102,241,0.22); }

  /* ── Split body ── */
  .ws-body {
    flex: 1; display: flex; overflow: hidden; min-height: 0;
    height: calc(100vh - 114px);
  }
  .ws-hidden { display: none !important; }

  /* ── Left panel ── */
  .ws-left {
    display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0;
    background: rgba(255,255,255,0.008);
    border-right: 1px solid rgba(255,255,255,0.07);
  }

  .prob-tabs-bar {
    display: flex; align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 0 16px; height: 42px; flex-shrink: 0;
    background: rgba(255,255,255,0.015); gap: 4px;
  }
  .prob-tab {
    padding: 6px 14px; border-radius: 7px; border: none;
    background: transparent; color: #52525b; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: color .15s, background .15s;
  }
  .prob-tab.active { color: #fafafa; background: rgba(255,255,255,0.06); }
  .prob-tab:hover:not(.active) { color: #a1a1aa; background: rgba(255,255,255,0.03); }

  .prob-header {
    padding: 18px 20px 14px; border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .prob-title-row { display: flex; align-items: flex-start; gap: 10px; flex-wrap: wrap; }
  .prob-title {
    font-size: 17px; font-weight: 800; color: #fafafa;
    letter-spacing: -.4px; margin: 0; flex: 1; line-height: 1.3;
  }
  .prob-diff-badge {
    font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 100px;
    flex-shrink: 0; margin-top: 2px; letter-spacing: .3px;
    border: 1px solid; text-transform: uppercase;
  }
  .prob-meta { display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap; }
  .prob-room-id { font-size: 11px; color: #3f3f46; font-family: monospace; margin-top: 6px; }

  .prob-content {
    flex: 1; overflow-y: auto; padding: 20px;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent;
  }
  .prob-content::-webkit-scrollbar { width: 5px; }
  .prob-content::-webkit-scrollbar-track { background: transparent; }
  .prob-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }

  .prob-section { margin-bottom: 24px; }
  .prob-section-label {
    font-size: 10px; font-weight: 800; color: #3f3f46;
    text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;
  }
  .prob-statement { font-size: 14px; color: #d4d4d8; line-height: 1.85; margin: 0; }

  .prob-example-card {
    background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; overflow: hidden;
  }
  .prob-example-row {
    padding: 10px 14px; display: flex; flex-direction: column; gap: 4px;
  }
  .prob-example-row + .prob-example-row { border-top: 1px solid rgba(255,255,255,0.05); }
  .prob-ex-label { font-size: 10px; font-weight: 700; color: #52525b; text-transform: uppercase; letter-spacing: .5px; }
  .prob-ex-code {
    font-size: 13px; font-family: 'Fira Code', monospace; color: #a5b4fc; margin: 0;
    white-space: pre-wrap; word-break: break-all; line-height: 1.6;
  }
  .prob-constraints-text {
    font-size: 13px; color: #a1a1aa; line-height: 1.8; margin: 0;
    font-family: 'Fira Code', monospace;
  }

  .prob-video-section { flex-shrink: 0; border-top: 1px solid rgba(255,255,255,0.07); }
  .prob-video-hdr {
    display: flex; align-items: center; gap: 8px; padding: 10px 16px;
    font-size: 12px; font-weight: 700; color: #52525b;
    background: rgba(255,255,255,0.018);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  /* ── Resize handle ── */
  .ws-divider {
    width: 5px; cursor: col-resize; flex-shrink: 0;
    background: transparent; display: flex; align-items: center; justify-content: center;
    transition: background .15s; position: relative; z-index: 5;
  }
  .ws-divider:hover { background: rgba(99,102,241,0.12); }
  .ws-divider::after {
    content: ''; position: absolute; top: 50%; transform: translateY(-50%);
    width: 2px; height: 40px; border-radius: 2px;
    background: rgba(99,102,241,0.2); opacity: 0; transition: opacity .15s;
  }
  .ws-divider:hover::after { opacity: 1; }

  /* ── Right panel ── */
  .ws-right {
    flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0;
  }

  /* ── Editor toolbar ── */
  .editor-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 14px; height: 46px; flex-shrink: 0;
    background: rgba(255,255,255,0.025);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    gap: 10px;
  }
  .editor-toolbar-left, .editor-toolbar-right {
    display: flex; align-items: center; gap: 10px;
  }
  .editor-wdots { display: flex; gap: 5px; align-items: center; }
  .wd { width: 10px; height: 10px; border-radius: 50%; }
  .wd-r { background: #ff5f57; }
  .wd-y { background: #febc2e; }
  .wd-g { background: #28c840; }

  .lang-selector-wrap { position: relative; display: flex; align-items: center; }
  .lang-select {
    appearance: none; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
    color: #e4e4e7; font-size: 13px; font-weight: 700;
    padding: 5px 30px 5px 10px; cursor: pointer; outline: none;
    font-family: inherit; transition: border-color .2s, background .2s;
  }
  .lang-select:hover { background: rgba(255,255,255,0.08); border-color: rgba(99,102,241,0.4); }
  .lang-select:focus { border-color: rgba(99,102,241,0.6); box-shadow: 0 0 0 2px rgba(99,102,241,0.12); }
  .lang-select option { background: #111118; color: #fafafa; }
  .lang-select-chevron {
    position: absolute; right: 9px; color: #52525b; pointer-events: none;
  }

  .editor-file-tag {
    font-size: 12px; color: #3f3f46; font-family: 'Fira Code', monospace;
    padding: 3px 8px; background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06); border-radius: 5px;
  }

  .btn-run {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 18px; border-radius: 8px; cursor: pointer;
    font-size: 13px; font-weight: 700; font-family: inherit; border: none;
    background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff;
    box-shadow: 0 3px 14px rgba(99,102,241,0.32); transition: opacity .2s, transform .2s, box-shadow .2s;
  }
  .btn-run:hover { opacity: .88; transform: translateY(-1px); box-shadow: 0 5px 20px rgba(99,102,241,0.42); }
  .btn-run:disabled { opacity: .55; cursor: not-allowed; transform: none; }

  .btn-submit {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 16px; border-radius: 8px; cursor: pointer;
    font-size: 13px; font-weight: 700; font-family: inherit;
    background: transparent; border: 1px solid rgba(16,185,129,0.38); color: #4ade80;
    transition: background .2s, transform .2s;
  }
  .btn-submit:hover { background: rgba(16,185,129,0.1); transform: translateY(-1px); }

  .run-spin {
    width: 12px; height: 12px; display: inline-block;
    border: 2px solid rgba(255,255,255,0.25); border-top-color: #fff;
    border-radius: 50%; animation: wsSpin .7s linear infinite;
  }
  @keyframes wsSpin { to { transform: rotate(360deg); } }

  /* ── Editor body ── */
  .editor-body { flex: 1; overflow: hidden; min-height: 0; }

  /* ── Console panel ── */
  .console-panel {
    flex-shrink: 0; background: #080810;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex; flex-direction: column;
    min-height: 38px; max-height: 280px; transition: max-height .22s ease;
  }
  .console-panel.open { max-height: 280px; }
  .console-panel.closed { max-height: 38px; }

  .console-hdr {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 14px; height: 38px; flex-shrink: 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .console-tabs { display: flex; gap: 2px; align-items: center; }
  .c-tab {
    display: flex; align-items: center; gap: 6px; padding: 4px 12px;
    background: transparent; border: none; border-radius: 6px; cursor: pointer;
    font-size: 12px; font-weight: 700; color: #52525b; font-family: inherit;
    transition: color .12s, background .12s;
  }
  .c-tab:hover { color: #a1a1aa; background: rgba(255,255,255,0.04); }
  .c-tab.active { color: #fafafa; background: rgba(255,255,255,0.06); }

  .c-badge {
    font-size: 10px; padding: 1px 7px; border-radius: 100px; font-weight: 800;
  }
  .c-badge.pass { background: rgba(74,222,128,0.15); color: #4ade80; }
  .c-badge.fail { background: rgba(248,113,113,0.15); color: #f87171; }

  .console-toggle {
    background: transparent; border: none; color: #3f3f46; cursor: pointer;
    font-size: 9px; padding: 4px 6px; border-radius: 4px; transition: color .15s, background .15s;
    line-height: 1;
  }
  .console-toggle:hover { color: #a1a1aa; background: rgba(255,255,255,0.05); }

  .console-body {
    flex: 1; overflow-y: auto; padding: 12px 14px;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.07) transparent;
  }
  .console-body::-webkit-scrollbar { width: 5px; }
  .console-body::-webkit-scrollbar-track { background: transparent; }
  .console-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 3px; }

  /* Testcase */
  .tc-view { display: flex; flex-direction: column; gap: 12px; }
  .tc-block { display: flex; flex-direction: column; gap: 5px; }
  .tc-label { font-size: 10px; font-weight: 800; color: #3f3f46; text-transform: uppercase; letter-spacing: .7px; }
  .tc-code {
    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 7px; padding: 8px 12px; font-size: 13px;
    font-family: 'Fira Code', monospace; color: #a5b4fc; margin: 0;
    white-space: pre-wrap; word-break: break-all; line-height: 1.6;
  }
  .tc-empty { font-size: 12px; color: #3f3f46; text-align: center; padding: 12px 0; margin: 0; }

  /* Console output */
  .co-view { display: flex; flex-direction: column; gap: 8px; }
  .co-empty { text-align: center; padding: 18px 0; }
  .co-empty-icon { font-family: monospace; font-size: 22px; color: #1c1c27; margin-bottom: 6px; }
  .co-empty p { font-size: 12px; color: #3f3f46; margin: 0; }

  .co-loading { display: flex; align-items: center; gap: 10px; padding: 16px 0; color: #52525b; font-size: 12px; }
  .co-loading-dots { display: flex; gap: 4px; }
  .co-loading-dots span {
    width: 6px; height: 6px; border-radius: 50%; background: #6366f1;
    animation: wsBounce 1.2s infinite;
  }
  .co-loading-dots span:nth-child(2) { animation-delay: .15s; }
  .co-loading-dots span:nth-child(3) { animation-delay: .3s; }
  @keyframes wsBounce { 0%,80%,100%{transform:scale(.8);opacity:.5} 40%{transform:scale(1.1);opacity:1} }

  .co-result {
    border-radius: 10px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.015);
  }
  .co-result.pass { border-color: rgba(74,222,128,0.18); }
  .co-result.fail { border-color: rgba(248,113,113,0.18); }
  .co-result.error { border-color: rgba(248,113,113,0.25); }

  .co-result-hdr {
    display: flex; align-items: center; gap: 8px; padding: 8px 12px;
    background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .co-result-icon { font-size: 13px; font-weight: 800; }
  .co-result-icon.pass { color: #4ade80; }
  .co-result-icon.fail { color: #f87171; }
  .co-result-name { font-size: 12px; font-weight: 700; color: #d4d4d8; }
  .co-result-verdict { font-size: 11px; font-weight: 800; margin-left: auto; letter-spacing: .3px; }
  .co-result-verdict.pass { color: #4ade80; }
  .co-result-verdict.fail { color: #f87171; }

  .co-result-body { padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; }
  .co-row { display: flex; align-items: flex-start; gap: 10px; }
  .co-key { font-size: 10px; font-weight: 800; color: #3f3f46; text-transform: uppercase; letter-spacing: .5px; min-width: 64px; flex-shrink: 0; padding-top: 1px; }
  .co-val { font-family: 'Fira Code', monospace; color: #a1a1aa; font-size: 12px; word-break: break-all; line-height: 1.5; }
  .co-val.pass { color: #4ade80; }
  .co-val.fail { color: #f87171; }
  .co-error-msg { padding: 10px 12px; font-size: 12px; color: #f87171; font-family: monospace; }

  /* Video-only layout */
  .ws-video-only { padding: 24px; max-width: 960px; margin: 0 auto; }
  .ws-video-card {
    background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.4);
  }
  .ws-video-card-hdr {
    padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03); font-size: 14px; font-weight: 700; color: #fafafa;
    display: flex; align-items: center; gap: 8px;
  }
  .ws-video-card-body { padding: 20px; }

  /* Mobile responsive */
  @media (max-width: 1023px) {
    .ws-left { width: 100% !important; min-height: calc(100vh - 110px); }
    .ws-right { width: 100%; min-height: calc(100vh - 110px); }
    .ws-divider { display: none; }
    .ws-body { flex-direction: column; height: auto; overflow-y: auto; }
  }
`;

// ── Component ──────────────────────────────────────────────────────────────────
const CustomRoom = () => {
  const { publicRoomId, privateRoomId, roomId } = useParams();
  const location  = useLocation();
  const navigate  = useNavigate();
  const { question = {} } = location.state || {};

  const isReadOnly     = location.state?.isReadOnly    || false;
  const fromNavbar     = location.state?.fromNavbar    || false;
  const hideRoomId     = location.state?.hideRoomId;
  const hideVideoTitle = location.state?.hideVideoTitle || false;

  const [testResults, setTestResults] = useState(null);
  const [languageId,  setLanguageId]  = useState(54);
  const [initialCode, setInitialCode] = useState("");
  const [isRunning,   setIsRunning]   = useState(false);
  const [consoleTab,  setConsoleTab]  = useState("testcase");
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [splitPos,    setSplitPos]    = useState(42);
  const [mobileView,  setMobileView]  = useState("problem");
  const [isMobile,    setIsMobile]    = useState(false);

  const editorRef    = useRef(null);
  const videoRoomRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging   = useRef(false);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fetch default code for the question
  useEffect(() => {
    const title = question?.title || publicRoomId?.replace(/-/g, " ");
    if (!title) return;
    axios.get(`${process.env.REACT_APP_TESTCASE_API}/default/${title}`)
      .then(res => {
        const code = res.data.defaultCode;
        if (code) {
          setInitialCode(code);
          if (!window.defaultQuestionCode) window.defaultQuestionCode = {};
          window.defaultQuestionCode[title.toLowerCase()] = { javascript: code };
        }
      })
      .catch(() => {});
  }, [question?.title, publicRoomId]);

  // Resizable split panel (desktop only)
  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct  = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPos(Math.max(22, Math.min(58, pct)));
    };
    const onUp = () => { isDragging.current = false; };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Socket: room ended by host
  useEffect(() => {
    socket.on("roomEnded", () => {
      if (videoRoomRef.current?.disconnectRoom) videoRoomRef.current.disconnectRoom();
      alert("The host has ended the session.");
      navigate("/dsadashboard");
    });
    return () => socket.off("roomEnded");
  }, [navigate]);

  const handleRunCode = async () => {
    const code  = editorRef.current?.getValue();
    const title = question?.title || publicRoomId?.replace(/-/g, " ");
    if (!code || !title) return;
    setIsRunning(true);
    setConsoleTab("console");
    setConsoleOpen(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_CODE_SUBMIT,
        { code, language: languageId, title },
        { withCredentials: true }
      );
      const raw = res.data.testResults;
      if (Array.isArray(raw)) {
        setTestResults(raw.map(r => ({
          ...r,
          passed: Array.isArray(r.expectedOutput)
            ? r.expectedOutput.map(o => o.trim()).includes(r.actualOutput?.trim())
            : r.actualOutput?.trim() === r.expectedOutput?.trim(),
        })));
      } else {
        setTestResults([{ error: true, message: "No test results returned from server." }]);
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Error running code.";
      setTestResults([{ error: true, message: msg }]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleEndCall = async () => {
    const cid = publicRoomId || roomId;
    if (videoRoomRef.current?.disconnectRoom) videoRoomRef.current.disconnectRoom();
    socket.emit("roomEnded", { roomId: cid, identity: localStorage.getItem("userId") || "guest" });
    try { await axios.post(process.env.REACT_APP_CALL_ENDPOINT, { roomId: cid }, { withCredentials: true }); }
    catch { /* navigate regardless */ }
    navigate("/dsadashboard");
  };

  const diff = DIFF_STYLE[question.difficulty];
  const activeLang = LANGUAGES.find(l => l.id === languageId) || LANGUAGES[0];
  const passCount  = testResults ? testResults.filter(r => r.passed).length : 0;

  return (
    <Layout>
      <style>{WS_CSS}</style>

      <div className="ws-root">

        {/* ── WORKSPACE TOPBAR ── */}
        <header className="ws-topbar">
          <div className="ws-topbar-left">
            <button className="ws-crumb-back" onClick={() => navigate("/dsadashboard")}>
              ← Back
            </button>
            {question.title && (
              <>
                <span className="ws-crumb-sep">/</span>
                <span className="ws-crumb-title">{question.title}</span>
              </>
            )}
          </div>

          <div className="ws-topbar-mid">
            {(!publicRoomId && !privateRoomId) && roomId && (
              <div className="ws-live-badge">
                <span className="ws-live-dot" />
                {roomId}
              </div>
            )}
            {(publicRoomId || privateRoomId) && (
              <div className="ws-live-badge">
                <span className="ws-live-dot" />
                Live Session
              </div>
            )}
          </div>

          <div className="ws-topbar-right">
            {isMobile && (
              <div className="ws-mobile-toggle">
                <button
                  className={`ws-mtoggle${mobileView === "problem" ? " active" : ""}`}
                  onClick={() => setMobileView("problem")}
                >Problem</button>
                <button
                  className={`ws-mtoggle${mobileView === "editor" ? " active" : ""}`}
                  onClick={() => setMobileView("editor")}
                >Editor</button>
              </div>
            )}
            <button className="ws-end-btn" onClick={handleEndCall}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 3C13.4 3 11 5.4 11 8.5c0 1.2.4 2.3 1 3.2L3.7 20.3l1.4 1.4 8.3-8.3c1 .6 2.1 1 3.2 1 3.1 0 5.5-2.4 5.5-5.5S19.6 3 16.5 3zm0 9c-1.9 0-3.5-1.6-3.5-3.5S14.6 5 16.5 5 20 6.6 20 8.5 18.4 12 16.5 12z"/>
              </svg>
              End Room
            </button>
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        {!isReadOnly && !fromNavbar && (
          <div className="ws-body" ref={containerRef}>

            {/* ─── LEFT: Problem panel ─── */}
            <div
              className={`ws-left${isMobile && mobileView !== "problem" ? " ws-hidden" : ""}`}
              style={isMobile ? {} : { width: `${splitPos}%` }}
            >
              {/* Tab bar */}
              <div className="prob-tabs-bar">
                <button className="prob-tab active">Description</button>
              </div>

              {/* Problem header */}
              <div className="prob-header">
                <div className="prob-title-row">
                  <h1 className="prob-title">{question.title || "Custom Room"}</h1>
                  {diff && (
                    <span
                      className="prob-diff-badge"
                      style={{
                        color: diff.color, background: diff.bg,
                        borderColor: diff.border,
                        boxShadow: `0 0 14px ${diff.glow}`,
                      }}
                    >
                      {question.difficulty}
                    </span>
                  )}
                </div>
                {!hideRoomId && publicRoomId && (
                  <div className="prob-room-id">Room ID: {publicRoomId}</div>
                )}
              </div>

              {/* Scrollable problem body */}
              <div className="prob-content">

                {question.statement && (
                  <div className="prob-section">
                    <h3 className="prob-section-label">Problem</h3>
                    <p className="prob-statement">{question.statement}</p>
                  </div>
                )}

                {(question.sampleInput || question.sampleOutput) && (
                  <div className="prob-section">
                    <h3 className="prob-section-label">Example</h3>
                    <div className="prob-example-card">
                      {question.sampleInput && (
                        <div className="prob-example-row">
                          <span className="prob-ex-label">Input</span>
                          <pre className="prob-ex-code">{question.sampleInput}</pre>
                        </div>
                      )}
                      {question.sampleOutput && (
                        <div className="prob-example-row">
                          <span className="prob-ex-label">Output</span>
                          <pre className="prob-ex-code">{question.sampleOutput}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {question.constraints && (
                  <div className="prob-section">
                    <h3 className="prob-section-label">Constraints</h3>
                    <p className="prob-constraints-text">{question.constraints}</p>
                  </div>
                )}

              </div>

              {/* Video conferencing */}
              {!hideVideoTitle && (
                <div className="prob-video-section">
                  <div className="prob-video-hdr">
                    <span className="ws-live-dot" style={{ width: 5, height: 5 }} />
                    Video Conference
                  </div>
                  <VideoConferencing
                    ref={videoRoomRef}
                    roomId={publicRoomId || privateRoomId || roomId}
                    identity={localStorage.getItem("userId") || "guest"}
                  />
                </div>
              )}
            </div>

            {/* ─── RESIZE HANDLE ─── */}
            {!isMobile && (
              <div
                className="ws-divider"
                onMouseDown={(e) => { isDragging.current = true; e.preventDefault(); }}
              />
            )}

            {/* ─── RIGHT: Editor panel ─── */}
            <div className={`ws-right${isMobile && mobileView !== "editor" ? " ws-hidden" : ""}`}>

              {/* Editor toolbar */}
              <div className="editor-toolbar">
                <div className="editor-toolbar-left">
                  <div className="editor-wdots">
                    <span className="wd wd-r" />
                    <span className="wd wd-y" />
                    <span className="wd wd-g" />
                  </div>

                  {/* Language selector */}
                  <div className="lang-selector-wrap">
                    <select
                      className="lang-select"
                      value={languageId}
                      onChange={(e) => setLanguageId(Number(e.target.value))}
                    >
                      {LANGUAGES.map(l => (
                        <option key={l.id} value={l.id}>{l.icon} {l.name}</option>
                      ))}
                    </select>
                    <svg className="lang-select-chevron" width="10" height="6" viewBox="0 0 10 6">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>

                  <span className="editor-file-tag">solution.{activeLang.ext}</span>
                </div>

                <div className="editor-toolbar-right">
                  <button
                    className="btn-run"
                    onClick={handleRunCode}
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <><span className="run-spin" />Running…</>
                    ) : (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        Run
                      </>
                    )}
                  </button>
                  <button className="btn-submit" onClick={handleRunCode}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    Submit
                  </button>
                </div>
              </div>

              {/* Monaco editor */}
              <div className="editor-body">
                <CodeEditor
                  editorRef={editorRef}
                  languageId={languageId}
                  setLanguageId={setLanguageId}
                  initialCode={initialCode}
                />
              </div>

              {/* ── Console panel ── */}
              <div className={`console-panel ${consoleOpen ? "open" : "closed"}`}>
                <div className="console-hdr">
                  <div className="console-tabs">
                    <button
                      className={`c-tab${consoleTab === "testcase" ? " active" : ""}`}
                      onClick={() => { setConsoleTab("testcase"); setConsoleOpen(true); }}
                    >
                      Testcase
                    </button>
                    <button
                      className={`c-tab${consoleTab === "console" ? " active" : ""}`}
                      onClick={() => { setConsoleTab("console"); setConsoleOpen(true); }}
                    >
                      Console
                      {testResults && !isRunning && (
                        <span className={`c-badge ${passCount === testResults.length ? "pass" : "fail"}`}>
                          {passCount}/{testResults.length}
                        </span>
                      )}
                    </button>
                  </div>
                  <button className="console-toggle" onClick={() => setConsoleOpen(p => !p)}>
                    {consoleOpen ? "▼" : "▲"}
                  </button>
                </div>

                {consoleOpen && (
                  <div className="console-body">

                    {/* Testcase tab */}
                    {consoleTab === "testcase" && (
                      <div className="tc-view">
                        {question.sampleInput ? (
                          <>
                            <div className="tc-block">
                              <div className="tc-label">Input</div>
                              <pre className="tc-code">{question.sampleInput}</pre>
                            </div>
                            {question.sampleOutput && (
                              <div className="tc-block">
                                <div className="tc-label">Expected Output</div>
                                <pre className="tc-code">{question.sampleOutput}</pre>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="tc-empty">No testcase data loaded for this problem.</p>
                        )}
                      </div>
                    )}

                    {/* Console tab */}
                    {consoleTab === "console" && (
                      <div className="co-view">
                        {!testResults && !isRunning && (
                          <div className="co-empty">
                            <div className="co-empty-icon">›_</div>
                            <p>Click <strong style={{ color: "#818cf8" }}>Run</strong> to execute your code against test cases</p>
                          </div>
                        )}

                        {isRunning && (
                          <div className="co-loading">
                            <div className="co-loading-dots">
                              <span /><span /><span />
                            </div>
                            Compiling and executing…
                          </div>
                        )}

                        {testResults && !isRunning && testResults.map((r, i) => (
                          <div key={i} className={`co-result${r.error ? " error" : r.passed ? " pass" : " fail"}`}>
                            {r.error ? (
                              <div className="co-error-msg">⚠ {r.message}</div>
                            ) : (
                              <>
                                <div className="co-result-hdr">
                                  <span className={`co-result-icon ${r.passed ? "pass" : "fail"}`}>
                                    {r.passed ? "✓" : "✗"}
                                  </span>
                                  <span className="co-result-name">Case {i + 1}</span>
                                  <span className={`co-result-verdict ${r.passed ? "pass" : "fail"}`}>
                                    {r.passed ? "Accepted" : "Wrong Answer"}
                                  </span>
                                </div>
                                <div className="co-result-body">
                                  <div className="co-row">
                                    <span className="co-key">Input</span>
                                    <code className="co-val">{r.input}</code>
                                  </div>
                                  <div className="co-row">
                                    <span className="co-key">Expected</span>
                                    <code className="co-val">{r.expectedOutput}</code>
                                  </div>
                                  <div className="co-row">
                                    <span className="co-key">Output</span>
                                    <code className={`co-val ${r.passed ? "pass" : "fail"}`}>{r.actualOutput}</code>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── VIDEO-ONLY MODE (fromNavbar) ── */}
        {fromNavbar && (
          <div className="ws-video-only">
            <div className="ws-video-card">
              <div className="ws-video-card-hdr">
                <span className="ws-live-dot" />
                Video Conference
              </div>
              <div className="ws-video-card-body">
                <VideoConferencing
                  ref={videoRoomRef}
                  roomId={publicRoomId || privateRoomId || roomId}
                  identity={localStorage.getItem("userId") || "guest"}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default CustomRoom;
