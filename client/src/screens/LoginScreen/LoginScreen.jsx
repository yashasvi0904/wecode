import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../utils/FireBase";
import socket from "../../sockets/socket";
import ResetModal from "./ResetModal";

const LoginScreen = () => {
  const [message, setMessage] = useState(""), [email, setEmail] = useState(""), [password, setPassword] = useState(""), 
  [serverStatus, setServerStatus] = useState(""), [loading, setLoading] = useState(false), [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => { checkServerStatus(); }, []);

  const checkServerStatus = async () => {
    try { await axios.get(process.env.REACT_APP_SERVER_CHECK); setServerStatus("🟢 Live Server"); } 
    catch (error) { setServerStatus("🔴 Down Server"); }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN_URI, { email, password }, { withCredentials: true });
      setMessage(response.data.message);
      const { role, id } = response.data;
      localStorage.setItem("userId", id);
      socket.emit("registerUser", id);
      if (role === "admin") {
        const goToAdmin = window.confirm("You are an admin. Do you want to go to the Admin Dashboard?");
        navigate(goToAdmin ? "/admin-dashboard" : "/Feed");
      } else {
        navigate("/Feed");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh", backgroundColor: "#09090b",
      display: "flex", justifyContent: "center", alignItems: "center",
      flexDirection: "column", color: "#fafafa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
      padding: "40px 20px", position: "relative", overflow: "hidden",
    },
    logo: { width: "52px", marginBottom: "10px", filter: "drop-shadow(0 4px 12px rgba(99,102,241,0.4))" },
    title: { marginBottom: "6px", fontWeight: "800", fontSize: "26px", letterSpacing: "-0.5px", color: "#fafafa" },
    subtitle: { fontSize: "14px", color: "#a1a1aa", marginBottom: "28px" },
    card: {
      backgroundColor: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "16px", padding: "28px 28px 24px",
      width: "360px", maxWidth: "100%",
      boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
      backdropFilter: "blur(12px)",
    },
    label: { fontSize: "13px", fontWeight: "600", marginBottom: "6px", display: "block", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.4px" },
    input: {
      width: "100%", padding: "11px 14px", marginBottom: "16px",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9px",
      backgroundColor: "rgba(255,255,255,0.04)", color: "#fafafa",
      boxSizing: "border-box", fontSize: "14px", outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
      fontFamily: "inherit",
    },
    button: {
      width: "100%", padding: "12px",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "white", border: "none", borderRadius: "9px",
      fontSize: "15px", cursor: "pointer", fontWeight: "700",
      marginTop: "6px", transition: "opacity 0.2s, transform 0.2s",
      boxShadow: "0 4px 20px rgba(99,102,241,0.35)", fontFamily: "inherit",
    },
    googleButton: {
      width: "100%", padding: "11px",
      backgroundColor: "rgba(255,255,255,0.06)",
      color: "#fafafa", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "9px", fontSize: "14px", fontWeight: "600",
      marginTop: "12px", cursor: "pointer",
      display: "flex", justifyContent: "center", alignItems: "center", gap: "9px",
      transition: "background 0.2s, border-color 0.2s", fontFamily: "inherit",
    },
    forgotPassword: { fontSize: "12px", color: "#a5b4fc", textDecoration: "none", cursor: "pointer" },
    registerCard: {
      marginTop: "16px", padding: "14px 20px",
      border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px",
      backgroundColor: "rgba(255,255,255,0.025)", fontSize: "14px",
      width: "360px", maxWidth: "100%", textAlign: "center", boxSizing: "border-box",
      color: "#a1a1aa",
    },
    registerLink: { color: "#a5b4fc", cursor: "pointer", fontWeight: "600" },
    footer: { marginTop: "32px", fontSize: "12px", color: "#52525b", display: "flex", gap: "20px" },
    footerLink: { color: "#52525b", textDecoration: "none", transition: "color 0.2s" },
    errorMessage: { marginTop: "14px", color: "#fca5a5", fontWeight: "500", fontSize: "14px", textAlign: "center" },
    serverStatus: {
      position: "fixed", bottom: "14px", right: "14px", fontSize: "12px",
      color: "#a1a1aa", padding: "5px 12px", borderRadius: "100px",
      backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
    },
    divideLine: { display: "flex", alignItems: "center", margin: "18px 0", color: "#52525b" },
    divideText: { margin: "0 10px", fontSize: "12px" },
    divider: { height: "1px", flex: "1", backgroundColor: "rgba(255,255,255,0.07)" },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={{ width: "44px", height: "44px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "800", color: "white", marginBottom: "14px", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>W</div>
        <h2 style={styles.title}>Sign in to WeCode</h2>
        <p style={styles.subtitle}>Welcome back — let's keep coding.</p>

        <div style={styles.card}>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <label style={styles.label}>Email or username</label>
            <input
              type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input}
              onFocus={(e) => { e.target.style.borderColor = "rgba(99,102,241,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={styles.label}>Password</label>
              <a href="#" style={styles.forgotPassword} onClick={() => setShowResetModal(true)}>Forgot password?</a>
            </div>

            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input}
              onFocus={(e) => { e.target.style.borderColor = "rgba(99,102,241,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
            />

            <button
              type="submit"
              style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
              onMouseOver={(e) => { if (!loading) { e.target.style.opacity = "0.88"; e.target.style.transform = "translateY(-1px)"; } }}
              onMouseOut={(e) => { e.target.style.opacity = loading ? "0.7" : "1"; e.target.style.transform = "none"; }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div style={styles.divideLine}>
            <div style={styles.divider}></div>
            <div style={styles.divideText}>OR</div>
            <div style={styles.divider}></div>
          </div>

          <button
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              try {
                const result = await loginWithGoogle();
                const idToken = await result.user.getIdToken();
                const response = await axios.post(`${process.env.REACT_APP_GOOGLE_AUTH_URI}`, { idToken }, { withCredentials: true });
                setMessage("Login successful");
                const { role, id } = response.data;
                localStorage.setItem("userId", id);
                socket.emit("registerUser", id);
                if (role === "admin") {
                  const goToAdmin = window.confirm("You are an admin. Do you want to go to the Admin Dashboard?");
                  navigate(goToAdmin ? "/admin-dashboard" : "/Feed");
                } else {
                  navigate("/Feed");
                }
              } catch (error) {
                console.error("Firebase Google login error:", error);
                setMessage("Google Login Failed");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            style={{ ...styles.googleButton, opacity: loading ? 0.7 : 1 }}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3c-1.1 5.4-5.6 8.5-11.3 8.5-6.9 0-12.5-5.6-12.5-12.5S17.1 11.5 24 11.5c3 0 5.7 1.1 7.9 2.9l6.1-6.1C34.2 4.5 29.4 2.5 24 2.5 12.1 2.5 2.5 12.1 2.5 24S12.1 45.5 24 45.5c10.3 0 19.9-7.3 19.9-20 0-1.8-.2-3.5-.5-5.5z"/>
              <path fill="#FF3D00" d="M5.3 14.3l7.1 5.3c1.8-4.9 6.5-8.3 11.6-8.3 3 0 5.7 1.1 7.9 2.9l6.1-6.1C34.2 4.5 29.4 2.5 24 2.5c-8.3 0-15.4 4.9-18.7 11.8z"/>
              <path fill="#4CAF50" d="M24 45.5c5.3 0 10-1.8 13.7-5l-6.7-5.2c-1.8 1.2-4.2 2-7 2-5.6 0-10.4-3.7-12.1-8.7l-7.2 5.5C8.6 40.9 15.7 45.5 24 45.5z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.5 2.5-2 4.8-4.3 6.2l6.7 5.2C42.3 35.6 44.5 29 44.5 24c0-1.8-.2-3.5-.5-5.5z"/>
            </svg>
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>

        <div style={styles.registerCard}>
          New to WeCode?{" "}
          <span onClick={() => navigate("/register")} style={styles.registerLink}>Create an account</span>
        </div>

        {message && <div style={styles.errorMessage}>{message}</div>}

        <div style={styles.footer}>
          <a href="#" style={styles.footerLink}>Terms</a>
          <a href="#" style={styles.footerLink}>Privacy</a>
          <a href="#" style={styles.footerLink}>Security</a>
          <a href="#" style={styles.footerLink}>Contact WeCode</a>
        </div>

        <div style={styles.serverStatus}>{serverStatus}</div>
      </div>
      <ResetModal show={showResetModal} onClose={() => setShowResetModal(false)} />
    </>
  );
};

export default LoginScreen;