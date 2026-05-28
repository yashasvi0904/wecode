import React, { useState } from "react";
import Layout from "../../Layout1/Layout";

const WebDevProjectsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectData = [
    { title: "Personal Portfolio Website", hint: "A basic website to showcase your skills and projects.", requirements: "HTML, CSS, JavaScript.", useCase: "Create a polished personal portfolio.", targetUsers: "5K+", targetAudience: "Job seekers, developers." },
    { title: "Simple Calculator", hint: "A basic calculator with addition, subtraction, multiplication, and division.", requirements: "HTML, CSS, JavaScript.", useCase: "Build a simple calculator to perform basic arithmetic operations.", targetUsers: "20K+", targetAudience: "General public, students." },
    { title: "To-Do List App", hint: "A simple task management application.", requirements: "HTML, CSS, JavaScript.", useCase: "Allow users to add, edit, and delete tasks.", targetUsers: "15K+", targetAudience: "Students, working professionals." },
    { title: "Temperature Converter", hint: "A tool to convert between Celsius and Fahrenheit.", requirements: "HTML, CSS, JavaScript.", useCase: "Help users convert temperature values between Celsius and Fahrenheit.", targetUsers: "10K+", targetAudience: "General public, students." },
    { title: "Quiz App", hint: "A simple multiple-choice quiz game.", requirements: "HTML, CSS, JavaScript.", useCase: "Build a simple quiz game with multiple-choice questions.", targetUsers: "30K+", targetAudience: "Students, quiz lovers." },
    { title: "Tic-Tac-Toe Game", hint: "A classic game implemented in the browser.", requirements: "HTML, CSS, JavaScript.", useCase: "Allow two players to play Tic-Tac-Toe in the browser.", targetUsers: "20K+", targetAudience: "General public, children." },
    { title: "Random Image Feed", hint: "A web page that displays a random image on refresh.", requirements: "HTML, CSS, JavaScript, Image API.", useCase: "Display random images each time the page is refreshed.", targetUsers: "5K+", targetAudience: "General public, creative individuals." },
    { title: "Simple Timer", hint: "A basic timer application.", requirements: "HTML, CSS, JavaScript.", useCase: "Create a simple countdown timer for user-defined intervals.", targetUsers: "10K+", targetAudience: "Students, productivity enthusiasts." },
    { title: "Drawing App", hint: "A web-based drawing application using canvas.", requirements: "HTML, CSS, JavaScript (Canvas).", useCase: "Allow users to draw and save their creations.", targetUsers: "15K+", targetAudience: "Artists, creatives." },
    { title: "Alarm Clock", hint: "A basic alarm clock functionality.", requirements: "HTML, CSS, JavaScript.", useCase: "Create an alarm clock that sets off a sound at a user-defined time.", targetUsers: "20K+", targetAudience: "General public." },
    { title: "Meme Generator", hint: "A tool for creating memes.", requirements: "HTML, CSS, JavaScript, Image APIs.", useCase: "Allow users to upload images, add text, and create memes.", targetUsers: "25K+", targetAudience: "Social media users, meme creators." },
    { title: "Online Form", hint: "A simple form that collects user input.", requirements: "HTML, CSS, JavaScript.", useCase: "Allow users to submit input through a simple form.", targetUsers: "10K+", targetAudience: "General public, businesses." },
    { title: "Simple Image Gallery", hint: "A basic gallery to display a set of images.", requirements: "HTML, CSS, JavaScript.", useCase: "Create an interactive image gallery with navigation.", targetUsers: "20K+", targetAudience: "Photographers, image enthusiasts." },
    { title: "Password Strength Meter", hint: "A tool that provides feedback on password strength.", requirements: "HTML, CSS, JavaScript.", useCase: "Help users create strong passwords by providing feedback on their input.", targetUsers: "10K+", targetAudience: "General public, developers." },
    { title: "Custom Range Slider", hint: "A custom slider component.", requirements: "HTML, CSS, JavaScript.", useCase: "Allow users to select values within a specified range.", targetUsers: "5K+", targetAudience: "Developers, UI designers." },
    { title: "Netflix Mobile Navigation", hint: "A clone of the Netflix mobile navigation.", requirements: "HTML, CSS, JavaScript.", useCase: "Replicate Netflix's mobile navigation for learning purposes.", targetUsers: "30K+", targetAudience: "Web developers, UI/UX enthusiasts." },
    { title: "Expense Tracker", hint: "A more advanced app to track and manage personal expenses.", requirements: "HTML, CSS, JavaScript, Local Storage or Firebase.", useCase: "Track personal expenses and visualize them with charts.", targetUsers: "50K+", targetAudience: "Individuals, families, financial planners." },
    { title: "E-commerce Website", hint: "A simple online store with product listing, checkout, and payment options.", requirements: "HTML, CSS, JavaScript, Node.js, Stripe API.", useCase: "Create an online store to showcase products and accept payments.", targetUsers: "100K+", targetAudience: "Shoppers, online retailers." },
    { title: "Library Management System", hint: "A system to manage library books and users.", requirements: "HTML, CSS, JavaScript, MongoDB.", useCase: "Allow users to manage books, borrow, and return items.", targetUsers: "20K+", targetAudience: "Libraries, schools." },
    { title: "Online Chat Application", hint: "A basic real-time chat application.", requirements: "React, Firebase, WebSockets.", useCase: "Allow real-time communication between users.", targetUsers: "30K+", targetAudience: "Friends, communities." },
    { title: "Weather Forecasting App", hint: "An app that displays weather information for a given location.", requirements: "React, OpenWeatherMap API.", useCase: "Display live weather information based on location.", targetUsers: "50K+", targetAudience: "General public, travelers." },
    { title: "Restaurant Website", hint: "A website to showcase a restaurant's menu, location, and contact information.", requirements: "HTML, CSS, JavaScript, Google Maps API.", useCase: "Showcase restaurant details and menu items.", targetUsers: "20K+", targetAudience: "Restaurant owners, customers." },
    { title: "Online Code Editor", hint: "A web-based code editor with syntax highlighting and code completion.", requirements: "React, JavaScript, Monaco Editor, Node.js.", useCase: "Create an online code editor with syntax highlighting and code completion.", targetUsers: "50K+", targetAudience: "Developers, coders." },
    { title: "Chatbot App", hint: "A basic chatbot that can respond to user queries.", requirements: "HTML, CSS, JavaScript, Dialogflow API.", useCase: "Create an interactive chatbot for answering user questions.", targetUsers: "20K+", targetAudience: "Businesses, customer service." },
    { title: "Online Learning Management System (LMS)", hint: "A platform for online courses, lessons, and assessments.", requirements: "React, Node.js, MongoDB, JWT for authentication.", useCase: "Provide a platform for instructors and students to interact and learn.", targetUsers: "100K+", targetAudience: "Educators, students." },
    { title: "E-commerce Platform with Advanced Features", hint: "A full-fledged e-commerce platform with features like user accounts, shopping carts, payment gateways, and order management.", requirements: "React, Node.js, MongoDB, Stripe/PayPal API.", useCase: "Create a complete e-commerce platform with advanced features.", targetUsers: "200K+", targetAudience: "Shoppers, retailers." },
    { title: "Blockchain-based Application", hint: "A project that utilizes blockchain technology, such as a decentralized voting system or a digital identity platform.", requirements: "React, Node.js, Solidity (Ethereum).", useCase: "Implement a decentralized app using blockchain technology.", targetUsers: "100K+", targetAudience: "Tech enthusiasts, blockchain developers." },
    { title: "Virtual Reality Game", hint: "A web-based VR game using technologies like WebGL and 3D frameworks.", requirements: "React, WebGL, Three.js.", useCase: "Create an interactive virtual reality game experience.", targetUsers: "50K+", targetAudience: "Gamers, VR enthusiasts." },
    { title: "Forum/Bulletin Board", hint: "A web application where users can post and discuss topics.", requirements: "React, Node.js, MongoDB.", useCase: "Facilitate public discussions on various topics.", targetUsers: "40K+", targetAudience: "Communities, hobbyists." },
    { title: "Customer Relationship Manager (CRM)", hint: "A system to manage customer interactions and data.", requirements: "React, Node.js, MongoDB.", useCase: "Organize and analyze customer information for businesses.", targetUsers: "100K+", targetAudience: "Sales teams, marketing teams." },
    { title: "Resume Builder", hint: "An app that helps users create a resume online.", requirements: "React, JavaScript, HTML, CSS.", useCase: "Allow users to create a professional resume easily.", targetUsers: "25K+", targetAudience: "Job seekers, students." },
    { title: "Task Management System", hint: "A system to track and manage tasks and projects.", requirements: "React, Node.js, MongoDB.", useCase: "Organize tasks, set deadlines, and track project progress.", targetUsers: "30K+", targetAudience: "Teams, professionals." },
    { title: "Blog Website", hint: "A platform to publish and manage blog posts.", requirements: "React, Node.js, MongoDB.", useCase: "Allow users to write, edit, and share blog posts.", targetUsers: "50K+", targetAudience: "Writers, bloggers." },
    { title: "Language Learning Platform", hint: "An app for language learning with exercises and quizzes.", requirements: "React, Node.js, MongoDB.", useCase: "Help users learn new languages with interactive content.", targetUsers: "40K+", targetAudience: "Students, language learners." },
    { title: "Smart Home Control System", hint: "A system to remotely control smart home devices.", requirements: "React, Node.js, IoT devices API.", useCase: "Control lights, thermostat, and security systems remotely.", targetUsers: "20K+", targetAudience: "Homeowners, tech enthusiasts." },
    { title: "Stock Trading Simulator", hint: "A game that simulates stock market trading.", requirements: "React, Node.js, Financial data API.", useCase: "Provide a realistic stock trading experience for learning.", targetUsers: "30K+", targetAudience: "Students, finance enthusiasts." },
    { title: "Real Estate Listing Site", hint: "A website for listing and searching for real estate properties.", requirements: "React, Node.js, Google Maps API.", useCase: "Help users find and list properties for sale or rent.", targetUsers: "50K+", targetAudience: "Real estate agents, buyers, renters." },
    { title: "Language Translation App", hint: "An app that translates text between different languages.", requirements: "React, Translation API (like Google Translate API).", useCase: "Help users translate text easily between languages.", targetUsers: "30K+", targetAudience: "Travelers, language learners." },
    { title: "AI-powered Recommendation System", hint: "A system that recommends products or content to users based on their preferences.", requirements: "React, Node.js, Machine Learning API.", useCase: "Deliver personalized recommendations to users.", targetUsers: "50K+", targetAudience: "E-commerce platforms, media platforms." },
    { title: "Dynamic DNS Service", hint: "Create a dynamic DNS service.", requirements: "React, Node.js, Networking APIs.", useCase: "Allow users to update their IP addresses dynamically.", targetUsers: "20K+", targetAudience: "Developers, network administrators." },
    { title: "Cloud Backup System", hint: "Implement a system for backing up data to the cloud.", requirements: "React, Node.js, AWS S3/Cloud Storage APIs.", useCase: "Safely backup important files and data to the cloud.", targetUsers: "50K+", targetAudience: "General public, businesses." },
    { title: "API Rate Limiter", hint: "Build a rate-limiting service for APIs.", requirements: "Node.js, Redis.", useCase: "Protect APIs by limiting request rates.", targetUsers: "30K+", targetAudience: "Developers, SaaS businesses." },
    { title: "Custom CI/CD Server", hint: "Develop a CI/CD pipeline from scratch.", requirements: "Node.js, GitHub/GitLab APIs, Docker.", useCase: "Automate building, testing, and deploying software projects.", targetUsers: "20K+", targetAudience: "Software teams, DevOps engineers." },
  ];

  const handleClickProject = (project) => { setSelectedProject(project); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedProject(null); };

  const S = {
    page: { maxWidth: "1300px", margin: "0 auto", padding: "40px 24px 80px" },
    hero: { marginBottom: "48px" },
    eyebrow: {
      display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px",
      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
      borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px",
    },
    heroTitle: { fontSize: "36px", fontWeight: "800", letterSpacing: "-1px", color: "#fafafa", margin: "0 0 10px" },
    heroSub: { fontSize: "15px", color: "#a1a1aa", margin: 0 },
    sectionTitle: {
      fontSize: "18px", fontWeight: "700", color: "#fafafa", margin: "0 0 20px",
      paddingLeft: "12px", borderLeft: "3px solid #6366f1", display: "flex", alignItems: "center",
    },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "18px" },
    card: {
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "14px", padding: "22px", cursor: "pointer",
      transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
      display: "flex", flexDirection: "column",
    },
    cardTitle: { fontSize: "15px", fontWeight: "700", color: "#fafafa", margin: "0 0 10px", lineHeight: "1.4" },
    cardDesc: { fontSize: "13px", color: "#a1a1aa", lineHeight: "1.6", flex: 1 },
    cardArrow: {
      marginTop: "14px", fontSize: "12px", color: "#6366f1", fontWeight: "600",
      paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "right",
    },
    overlay: {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    },
    modal: {
      background: "#111118", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px",
      padding: "32px", maxWidth: "580px", width: "90%",
      cursor: "auto", boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
    },
    modalTitle: {
      fontSize: "20px", fontWeight: "800", color: "#fafafa", margin: "0 0 22px",
      paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.07)",
    },
    detailRow: { marginBottom: "14px" },
    detailLabel: { fontSize: "11px", fontWeight: "700", color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" },
    detailValue: { fontSize: "14px", color: "#a1a1aa", lineHeight: "1.6" },
    closeBtn: {
      marginTop: "24px", width: "100%", padding: "12px", borderRadius: "10px", border: "none",
      cursor: "pointer", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
      fontWeight: "600", fontSize: "14px", fontFamily: "inherit",
      boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
    },
  };

  return (
    <Layout>
      <style>{`
        .wp-card:hover { border-color: rgba(99,102,241,0.3) !important; box-shadow: 0 12px 32px rgba(99,102,241,0.08) !important; transform: translateY(-4px) !important; }
        .wp-modal-overlay { animation: wpFade 0.2s ease; }
        .wp-modal { animation: wpSlide 0.25s ease; }
        @keyframes wpFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes wpSlide { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={S.page}>
        <div style={S.hero}>
          <div style={S.eyebrow}>✦ Project Ideas</div>
          <h1 style={S.heroTitle}>Web Development Project Ideas</h1>
          <p style={S.heroSub}>From beginner-friendly to advanced full-stack projects — find your next build.</p>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <h2 style={S.sectionTitle}>Project Collection</h2>
        </div>
        <div style={S.grid}>
          {projectData.map((project, index) => (
            <div key={index} className="wp-card" style={S.card} onClick={() => handleClickProject(project)}>
              <h3 style={S.cardTitle}>{project.title}</h3>
              <p style={S.cardDesc}>{project.hint}</p>
              <div style={S.cardArrow}>View Details →</div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProject && (
        <div className="wp-modal-overlay" style={S.overlay} onClick={handleCloseModal}>
          <div className="wp-modal" style={S.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={S.modalTitle}>{selectedProject.title}</h3>
            <div style={S.detailRow}>
              <p style={S.detailLabel}>Description</p>
              <p style={S.detailValue}>{selectedProject.hint}</p>
            </div>
            <div style={S.detailRow}>
              <p style={S.detailLabel}>Requirements</p>
              <p style={S.detailValue}>{selectedProject.requirements}</p>
            </div>
            <div style={S.detailRow}>
              <p style={S.detailLabel}>Use Case</p>
              <p style={S.detailValue}>{selectedProject.useCase}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={S.detailRow}>
                <p style={S.detailLabel}>Target Users</p>
                <p style={S.detailValue}>{selectedProject.targetUsers}</p>
              </div>
              <div style={S.detailRow}>
                <p style={S.detailLabel}>Target Audience</p>
                <p style={S.detailValue}>{selectedProject.targetAudience}</p>
              </div>
            </div>
            <button style={S.closeBtn} onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WebDevProjectsScreen;
