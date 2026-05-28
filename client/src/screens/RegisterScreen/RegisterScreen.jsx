import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../utils/FireBase";

const RegisterUserScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_REGISTER_URI,
        { name, email, password },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleGoogleSignup = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      const idToken = await result.user.getIdToken();
      await axios.post(
        `${process.env.REACT_APP_GOOGLE_AUTH_URI}`,
        { idToken },
        { withCredentials: true }
      );
      setMessage("Registration successful");
      navigate("/Feed");
    } catch (error) {
      console.error("Firebase Google signup error:", error);
      setMessage("Google Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  const S = {
    page: { minHeight: "100vh", backgroundColor: "#09090b", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "#fafafa", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif", padding: "40px 20px" },
    card: { maxWidth: "380px", width: "100%", backgroundColor: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "16px", boxShadow: "0 16px 48px rgba(0,0,0,0.4)", overflow: "hidden" },
    body: { padding: "28px 28px 24px", textAlign: "center" },
    label: { display: "block", fontWeight: "600", fontSize: "13px", marginBottom: "6px", textAlign: "left", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.4px" },
    input: { width: "100%", padding: "11px 14px", fontSize: "14px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)", color: "#fafafa", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s, box-shadow 0.2s" },
    submitBtn: { width: "100%", padding: "12px", fontSize: "15px", borderRadius: "9px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", fontWeight: "700", cursor: "pointer", transition: "opacity 0.2s, transform 0.2s", boxShadow: "0 4px 20px rgba(99,102,241,0.35)", fontFamily: "inherit", marginBottom: "12px" },
    googleBtn: { width: "100%", padding: "11px", backgroundColor: "rgba(255,255,255,0.06)", color: "#fafafa", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", transition: "background 0.2s", fontFamily: "inherit" },
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.body}>
          <div style={{ width: "44px", height: "44px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "800", color: "white", margin: "0 auto 16px", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>W</div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.5px", marginBottom: "5px", color: "#fafafa" }}>Create your account</h1>
          <p style={{ fontSize: "14px", color: "#a1a1aa", marginBottom: "24px" }}>Start your coding journey with WeCode</p>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: "14px", textAlign: "left" }}>
              <label style={S.label}>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={S.input}
                onFocus={(e) => { e.target.style.borderColor = "rgba(99,102,241,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div style={{ marginBottom: "14px", textAlign: "left" }}>
              <label style={S.label}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={S.input}
                onFocus={(e) => { e.target.style.borderColor = "rgba(99,102,241,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div style={{ marginBottom: "20px", textAlign: "left" }}>
              <label style={S.label}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={S.input}
                onFocus={(e) => { e.target.style.borderColor = "rgba(99,102,241,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <button type="submit" style={S.submitBtn}
              onMouseOver={(e) => { e.target.style.opacity = "0.88"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseOut={(e) => { e.target.style.opacity = "1"; e.target.style.transform = "none"; }}
            >
              Create Account
            </button>
            
            <div style={{ display: "flex", alignItems: "center", margin: "15px 0" }}>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#ECEFCA", opacity: 0.3 }}></div>
              <span style={{ margin: "0 10px", color: "#ECEFCA", fontSize: "14px", opacity: 0.8 }}>or</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#ECEFCA", opacity: 0.3 }}></div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
              <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.07)" }} />
              <span style={{ margin: "0 12px", color: "#52525b", fontSize: "12px", fontWeight: "500" }}>OR</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.07)" }} />
            </div>

            <button type="button" onClick={handleGoogleSignup} disabled={loading} style={S.googleBtn}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20H24v8h11.3c-1.1 5.4-5.6 8.5-11.3 8.5-6.9 0-12.5-5.6-12.5-12.5S17.1 11.5 24 11.5c3 0 5.7 1.1 7.9 2.9l6.1-6.1C34.2 4.5 29.4 2.5 24 2.5 12.1 2.5 2.5 12.1 2.5 24S12.1 45.5 24 45.5c10.3 0 19.9-7.3 19.9-20 0-1.8-.2-3.5-.5-5.5z" />
                <path fill="#FF3D00" d="M5.3 14.3l7.1 5.3c1.8-4.9 6.5-8.3 11.6-8.3 3 0 5.7 1.1 7.9 2.9l6.1-6.1C34.2 4.5 29.4 2.5 24 2.5c-8.3 0-15.4 4.9-18.7 11.8z" />
                <path fill="#4CAF50" d="M24 45.5c5.3 0 10-1.8 13.7-5l-6.7-5.2c-1.8 1.2-4.2 2-7 2-5.6 0-10.4-3.7-12.1-8.7l-7.2 5.5C8.6 40.9 15.7 45.5 24 45.5z" />
                <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.5 2.5-2 4.8-4.3 6.2l6.7 5.2C42.3 35.6 44.5 29 44.5 24c0-1.8-.2-3.5-.5-5.5z" />
              </svg>
              {loading ? "Signing up…" : "Sign up with Google"}
            </button>
          </form>

          {message && (
            <div style={{ marginTop: "14px", color: message.toLowerCase().includes("fail") ? "#fca5a5" : "#6ee7b7", backgroundColor: "rgba(255,255,255,0.04)", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: "500", border: "1px solid rgba(255,255,255,0.07)" }}>
              {message}
            </div>
          )}

          <div style={{ marginTop: "20px", fontSize: "14px", textAlign: "center", color: "#a1a1aa" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "#a5b4fc", fontWeight: "600", cursor: "pointer" }}>
              Sign in
            </span>
          </div>
        </div>
      </div>

      <p style={{ marginTop: "24px", fontSize: "12px", color: "#52525b" }}>
        © {new Date().getFullYear()} WeCode. All rights reserved.
      </p>
    </div>
  );
};

export default RegisterUserScreen;