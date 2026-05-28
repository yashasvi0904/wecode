// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const layoutStyle = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
  minHeight: "100vh",
  backgroundColor: "#09090b",
  color: "#fafafa",
  paddingTop: "70px",
  overflowX: "hidden",
};

const Layout = ({ children }) => {
  return (
    
    <div style={layoutStyle}>
      {children}
      <Navbar />
      <Footer />
    </div>
  );
};

export default Layout;