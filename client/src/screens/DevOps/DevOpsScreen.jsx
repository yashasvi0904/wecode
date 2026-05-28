import React, { useState } from "react";
import Layout from "../../Layout1/Layout";

const DevopsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoData = [
    { title: "Day-1 | Fundamentals of DevOps | Free DevOps Course | 45 days | #devopscourse #learning", url: "https://www.youtube.com/watch?v=Ou9j73aWgyE&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=1&pp=iAQB", uploaded: "2 years ago", views: "1.6M" },
    { title: "Day-2 | Improve SDLC with DevOps | Free DevOps Course | 45 days | #devopscourse #learning", url: "https://www.youtube.com/watch?v=jRqBIpcgO4g&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=2&pp=iAQB", uploaded: "2 years ago", views: "434K" },
    { title: "Day-3 | Virtual Machines Part-1 | Free DevOps Course | 45 days | #devopscourse #learning #vm", url: "https://www.youtube.com/watch?v=lgUwYwBozow&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=3&pp=iAQB", uploaded: "2 years ago", views: "385K" },
    { title: "Day-4 | AWS & Azure - How to Create Virtual Machines | Free DevOps Course | 45 days |#devops #aws", url: "https://www.youtube.com/watch?v=NJkMe9cdYEQ&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=4&pp=iAQB", uploaded: "2 years ago", views: "386K" },
    { title: "HOW TO CONNECT TO EC2 INSTANCE FROM WINDOWS LAPTOP | MOBAXTERM | #aws #devops #abhishekveeramalla", url: "https://www.youtube.com/watch?v=MkIRh1mi8Ms&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=5&pp=iAQB", uploaded: "1 year ago", views: "320K" },
    { title: "Day-5 | AWS CLI Full Guide | How to connect to EC2 Instance from UI & Terminal | AWS CFT walk though", url: "https://www.youtube.com/watch?v=cN4pt5KQ9eA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=6&pp=iAQB", uploaded: "2 years ago", views: "351K" },
    { title: "Day-6 | Linux & Shell Scripting | Complete Shell Scripting Playlist| #aws #azure | #devops", url: "https://www.youtube.com/watch?v=9jw9F6mcQDo&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=7&pp=iAQB", uploaded: "2 years ago", views: "321K" },
    { title: "Shell Scripting for DevOps|Shell Scripting Zero 2 Hero|Shell Scripting Interview Questions| #devops", url: "https://www.youtube.com/watch?v=zsajhz2_50g&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=8&pp=iAQB0gcJCYQJAYcqIYzv", uploaded: "2 years ago", views: "451K" },
    { title: "Shell Scripting for DevOps | Zero 2 Hero Part-2 | Shell Scripting Interview Q&A | #devops", url: "https://www.youtube.com/watch?v=CyQtk9f646Q&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=9&pp=iAQB", uploaded: "2 years ago", views: "259K" },
    { title: "Shell Scripting & Linux Interview Questions for DevOps Engineers | Bash Zero to Hero | #devops", url: "https://www.youtube.com/watch?v=0jgqMKuADX0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=10&pp=iAQB", uploaded: "2 years ago", views: "192K" },
    { title: "Day-7 | Live AWS Project using SHELL SCRIPTING for DevOps | AWS DevOps project| #devops #aws #2023", url: "https://www.youtube.com/watch?v=gx5E47R9fGk&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=11&pp=iAQB", uploaded: "2 years ago", views: "239K" },
    { title: "Day-8 | DevOps Zero to Hero | Shell Scripting Project Used In Real Time | GitHub API Integration", url: "https://www.youtube.com/watch?v=OuyNM5-r8P8&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=12&pp=iAQB", uploaded: "1 year ago", views: "190K" },
    { title: "Day-9 | Git and GitHub | What is GIT ? | What is Version Control ? | #devops #2023 #github #gitlab", url: "https://www.youtube.com/watch?v=fIMySI_gZJU&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=13&pp=iAQB", uploaded: "2 years ago", views: "229K" },
    { title: "Day-10 | Git Branching Strategy | Real World Example | DevOps Interview Question|#devops #k8s #2023", url: "https://www.youtube.com/watch?v=MCyvYT8FS5w&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=14&pp=iAQB", uploaded: "2 years ago", views: "172K" },
    { title: "Day-11 | Git Interview Q&A and Commands for DevOps | Real World Example |#devops #github #git #2023", url: "https://www.youtube.com/watch?v=mT6qrAx14O4&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=15&pp=iAQB", uploaded: "2 years ago", views: "185K" },
    { title: "Day 12 | Deploy and expose your First App to AWS | Feat. Kunal Verma | Live Project | #aws projects", url: "https://www.youtube.com/watch?v=NLmF64KdLN0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=16&pp=iAQB", uploaded: "2 years ago", views: "185K" },
    { title: "Day 13 | Top 15 AWS Services that Every DevOps Engineers should learn | #aws #devops", url: "https://www.youtube.com/watch?v=leWJypzVyQ4&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=17&pp=iAQB", uploaded: "2 years ago", views: "97K" },
    { title: "Day-14 | Configuration Management With Ansible |Puppet vs Ansible |Live Projects | #ansible #devops", url: "https://www.youtube.com/watch?v=I5_NF8nvACg&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=18&pp=iAQB", uploaded: "2 years ago", views: "134K" },
    { title: "Day-15 | Ansible Zero to Hero | #ansible #devops", url: "https://www.youtube.com/watch?v=Z6T2r3Xhk5k&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=19&pp=iAQB", uploaded: "2 years ago", views: "240K" },
    { title: "Day-16 | Infrastructure as Code | #terraform #IaC", url: "https://www.youtube.com/watch?v=G1BRnIHBBig&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=20&pp=iAQB", uploaded: "2 years ago", views: "100K" },
    { title: "Day-17 |Everything about Terraform |Write Your First Project |Remote Backend |Modules |Interview Q&A", url: "https://www.youtube.com/watch?v=CzdfdKWRDB8&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=21&pp=iAQB0gcJCYQJAYcqIYzv", uploaded: "2 years ago", views: "150K" },
    { title: "Day-18 | What is CICD ? | Introduction to CICD | How CICD works ? | #devops #abhishekveeramalla", url: "https://www.youtube.com/watch?v=CmVxoNkkACQ&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=22&pp=iAQB", uploaded: "2 years ago", views: "266K" },
    { title: "Day-19 | Jenkins ZERO to HERO | 3 Projects Live |Docker Agent |Interview Questions | #k8s #gitops", url: "https://www.youtube.com/watch?v=zZfhAXfBvVA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=23&pp=iAQB", uploaded: "2 years ago", views: "409K" },
    { title: "Day-20 | GitHub Actions | Actions vs Jenkins | 3 Projects with examples | Configure your own runner", url: "https://www.youtube.com/watch?v=K3RqgDPCjYs&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=24&pp=iAQB", uploaded: "2 years ago", views: "133K" },
    { title: "GITHUB ACTIONS SELF HOSTED RUNNERS | ADD THIS PROJECT TO YOUR RESUME | #devops #cicd #githubactions", url: "https://www.youtube.com/watch?v=Rb2pUKdmdYo&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=25&pp=iAQB", uploaded: "1 year ago", views: "57K" },
    { title: "Day-21 | CICD Interview Questions | GitHub Repo with Q&A #cicd #jenkins #github #gitlab #devops", url: "https://www.youtube.com/watch?v=LAYV7x_aIC0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=26&pp=iAQB", uploaded: "2 years ago", views: "119K" },
    { title: "Day-22 | Project Management tools for DevOps | What a DevOps Engineer does in the first week ? #2023", url: "https://www.youtube.com/watch?v=h4HdQBnEO04&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=27&pp=iAQB", uploaded: "2 years ago", views: "43K" },
    { title: "JIRA Workflow in Real Time for DevOps Projects | Agile & Scrum Explained | #abhishekveeramalla", url: "https://www.youtube.com/watch?v=pUAadFQjnvc&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=28&pp=iAQB", uploaded: "1 year ago", views: "69K" },
    { title: "Day-23 | Introduction to Containers | Learn about containers in easy way #docker #kubernetes #devops", url: "https://www.youtube.com/watch?v=7JZP345yVjw&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=29&pp=iAQB", uploaded: "2 years ago", views: "317K" },
    { title: "Day-24 | Docker Zero to Hero Part-1 | Must Watch | Basics to Best Practices | #docker #devops", url: "https://www.youtube.com/watch?v=wodLpta-hoQ&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=30&pp=iAQB0gcJCYQJAYcqIYzv", uploaded: "2 years ago", views: "244K" },
    { title: "Day-25 | Docker Containerzation for Django | #django #python #devops", url: "https://www.youtube.com/watch?v=3IAvr_O6vao&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=31&pp=iAQB", uploaded: "2 years ago", views: "142K" },
    { title: "Day-26 | Multi Stage Docker Builds | Reduce Image Size by 800 % | Distroless Container Images | #k8s", url: "https://www.youtube.com/watch?v=yyJrZgoNal0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=32&pp=iAQB", uploaded: "2 years ago", views: "166K" },
    { title: "Day-27 | Docker Volumes and Bind Mounts|Persistent Storage for Docker| #devopstutorialsforbeginners", url: "https://www.youtube.com/watch?v=r_LgmqejAkA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=33&pp=iAQB0gcJCYQJAYcqIYzv", uploaded: "2 years ago", views: "125K" },
    { title: "Day-28 | Docker Networking | Bridge vs Host vs Overlay |Secure containers with custom bridge network", url: "https://www.youtube.com/watch?v=xrUGEoUpa3s&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=34&pp=iAQB", uploaded: "2 years ago", views: "103K" },
    { title: "Day-29 | Docker Interview Questions with Answers | How many can you answer ? | Comment your score", url: "https://www.youtube.com/watch?v=I6ZBUEc4LrU&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=35&pp=iAQB", uploaded: "2 years ago", views: "120K" },
    { title: "Containerizing a MERN Stack Application and Deploying using Docker Compose | Step by Step Guide", url: "https://www.youtube.com/watch?v=IUpsu2xemrA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=36&pp=iAQB", uploaded: "7 months ago", views: "39K" },
    { title: "Day-30 | KUBERNETES IS EASY | INTRODUCTION TO KUBERNETES| #k8s #devopscourse #kubernetes #devops", url: "https://www.youtube.com/watch?v=dfxrdoEQe00&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=37&pp=iAQB", uploaded: "2 years ago", views: "349K" },
    { title: "Day-31 | KUBERNETES ARCHITECTURE USING EXAMPLES | Kubernetes is Easy #devops #k8s #devopscourse", url: "https://www.youtube.com/watch?v=gywke3XiNC0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=38&pp=iAQB", uploaded: "2 years ago", views: "144K" },
    { title: "Day-32 | How to Manage Hundreds of Kubernetes clusters ??? | KOPS | #k8s #kubernetes #devops", url: "https://www.youtube.com/watch?v=44Qk55E6CAA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=39&pp=iAQB", uploaded: "2 years ago", views: "144K" },
    { title: "Day-33 | KUBERNETES PODS | DEPLOY YOUR FIRST APP | #k8s #devopscourse #kubernetes #devops", url: "https://www.youtube.com/watch?v=-rDT9m1RKSA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=40&pp=iAQB", uploaded: "2 years ago", views: "147K" },
  ];

  const handleClickVideo = (video) => { setSelectedVideo(video); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedVideo(null); };

  const S = {
    page: { maxWidth: "1300px", margin: "0 auto", padding: "40px 24px 80px" },
    pageHeader: { marginBottom: "40px" },
    eyebrow: {
      display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px",
      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
      borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px",
    },
    pageTitle: { fontSize: "36px", fontWeight: "800", letterSpacing: "-1px", color: "#fafafa", margin: "0 0 10px", lineHeight: "1.1" },
    pageSubtitle: { fontSize: "15px", color: "#a1a1aa", margin: 0 },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
    card: {
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", overflow: "hidden", cursor: "pointer",
      transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
      display: "flex", flexDirection: "column",
    },
    cardThumb: {
      height: "140px", background: "rgba(99,102,241,0.06)", borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
    },
    playBtn: {
      width: "52px", height: "52px", borderRadius: "50%",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 20px rgba(99,102,241,0.4)", fontSize: "18px", color: "#fff",
    },
    cardBody: { padding: "16px", flex: 1, display: "flex", flexDirection: "column" },
    dayBadge: {
      display: "inline-block", padding: "3px 10px", borderRadius: "100px",
      background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
      fontSize: "11px", fontWeight: "700", color: "#a5b4fc", marginBottom: "10px", alignSelf: "flex-start",
    },
    cardTitle: {
      fontSize: "14px", fontWeight: "600", color: "#fafafa", lineHeight: "1.5",
      margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1,
    },
    cardMeta: {
      display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#52525b",
      paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    cardFooter: {
      padding: "10px 16px", textAlign: "center", fontSize: "13px", fontWeight: "600",
      background: "rgba(99,102,241,0.07)", color: "#a5b4fc",
      borderTop: "1px solid rgba(99,102,241,0.1)", transition: "background 0.3s, color 0.3s",
    },
    overlay: {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    },
    modal: {
      background: "#111118", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "20px", padding: "32px", maxWidth: "560px", width: "90%",
      cursor: "auto", boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
    },
    modalTitle: { fontSize: "20px", fontWeight: "700", color: "#fafafa", margin: "0 0 20px", lineHeight: "1.4" },
    modalMeta: {
      display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap",
    },
    modalMetaItem: {
      padding: "6px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)", fontSize: "13px", color: "#a1a1aa",
    },
    modalDesc: { fontSize: "14px", color: "#a1a1aa", lineHeight: "1.7", marginBottom: "28px" },
    modalActions: { display: "flex", gap: "12px" },
    btnPrimary: {
      flex: 1, padding: "12px 0", borderRadius: "10px", border: "none", cursor: "pointer",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "#fff", fontWeight: "600", fontSize: "14px", textDecoration: "none",
      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
      boxShadow: "0 4px 16px rgba(99,102,241,0.3)", fontFamily: "inherit",
    },
    btnGhost: {
      flex: 1, padding: "12px 0", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
      cursor: "pointer", background: "transparent", color: "#a1a1aa", fontWeight: "600",
      fontSize: "14px", fontFamily: "inherit",
    },
  };

  return (
    <Layout>
      <style>{`
        .dv-card:hover { border-color: rgba(99,102,241,0.3) !important; box-shadow: 0 16px 40px rgba(99,102,241,0.1) !important; transform: translateY(-4px) !important; }
        .dv-card:hover .dv-footer { background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15)) !important; color: #c4b5fd !important; }
        .dv-modal-overlay { animation: dvFadeIn 0.2s ease; }
        .dv-modal { animation: dvSlideUp 0.25s ease; }
        @keyframes dvFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dvSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={S.page}>
        <div style={S.pageHeader}>
          <div style={S.eyebrow}>✦ Video Series</div>
          <h1 style={S.pageTitle}>DevOps Mastery Series</h1>
          <p style={S.pageSubtitle}>Comprehensive 45-day DevOps tutorial series — fundamentals to advanced implementations.</p>
        </div>

        <div style={S.grid}>
          {videoData.map((video, index) => (
            <div key={index} className="dv-card" style={S.card} onClick={() => handleClickVideo(video)}>
              <div style={S.cardThumb}>
                <div style={S.playBtn}>▶</div>
              </div>
              <div style={S.cardBody}>
                <span style={S.dayBadge}>Day {index + 1}</span>
                <p style={S.cardTitle}>{video.title.split("|")[1]?.trim() || video.title}</p>
                <div style={S.cardMeta}>
                  <span>👁 {video.views} views</span>
                  <span>{video.uploaded}</span>
                </div>
              </div>
              <div className="dv-footer" style={S.cardFooter}>Watch Tutorial →</div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedVideo && (
        <div className="dv-modal-overlay" style={S.overlay} onClick={handleCloseModal}>
          <div className="dv-modal" style={S.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={S.modalTitle}>{selectedVideo.title}</h2>
            <div style={S.modalMeta}>
              <span style={S.modalMetaItem}>📅 {selectedVideo.uploaded}</span>
              <span style={S.modalMetaItem}>👁 {selectedVideo.views} views</span>
            </div>
            <p style={S.modalDesc}>
              Part of our comprehensive DevOps learning series. Click below to watch on YouTube.
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

export default DevopsScreen;
