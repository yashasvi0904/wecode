import React, { useState } from "react";
import Layout from "../../Layout1/Layout";

const DevopsProjectsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectData = [
    { title: "CI/CD Pipeline with Jenkins", hint: "Set up a full CI/CD pipeline for a sample application using Jenkins.", requirements: "Jenkins, GitHub, Docker.", useCase: "Automate building, testing, and deploying applications.", targetUsers: "50K+", targetAudience: "DevOps engineers, developers." },
    { title: "Infrastructure as Code with Terraform", hint: "Create and manage cloud infrastructure using Terraform scripts.", requirements: "Terraform, AWS/GCP/Azure.", useCase: "Automate infrastructure provisioning and management.", targetUsers: "40K+", targetAudience: "Cloud engineers, DevOps teams." },
    { title: "Kubernetes Cluster Setup", hint: "Set up a Kubernetes cluster and deploy microservices on it.", requirements: "Kubernetes, Docker, Helm.", useCase: "Orchestrate containerized applications efficiently.", targetUsers: "60K+", targetAudience: "Cloud developers, infrastructure teams." },
    { title: "Monitoring System with Prometheus and Grafana", hint: "Monitor application performance using Prometheus and visualize metrics with Grafana.", requirements: "Prometheus, Grafana, Node Exporter.", useCase: "Improve system observability and monitoring.", targetUsers: "30K+", targetAudience: "System admins, DevOps teams." },
    { title: "Logging with ELK Stack", hint: "Build a centralized logging system using Elasticsearch, Logstash, and Kibana.", requirements: "ELK Stack, Filebeat, Logstash.", useCase: "Aggregate and analyze logs from multiple sources.", targetUsers: "30K+", targetAudience: "Sysadmins, security teams." },
    { title: "Containerized Application Deployment", hint: "Dockerize a full-stack application and deploy it.", requirements: "Docker, Node.js/React/MongoDB stack.", useCase: "Simplify deployment using containers.", targetUsers: "50K+", targetAudience: "Developers, DevOps engineers." },
    { title: "Load Balancer Setup with NGINX", hint: "Set up NGINX as a load balancer for a microservice architecture.", requirements: "NGINX, Docker, Kubernetes (optional).", useCase: "Distribute traffic evenly across multiple servers.", targetUsers: "20K+", targetAudience: "Cloud engineers, SREs." },
    { title: "Serverless Application with AWS Lambda", hint: "Develop a serverless function with AWS Lambda triggered by events.", requirements: "AWS Lambda, API Gateway.", useCase: "Create scalable event-driven applications.", targetUsers: "30K+", targetAudience: "Developers, architects." },
    { title: "Disaster Recovery Plan Setup", hint: "Create a disaster recovery plan and automate backups.", requirements: "AWS/GCP Backup Services, Shell Scripting.", useCase: "Ensure high availability and data recovery.", targetUsers: "10K+", targetAudience: "System admins, enterprises." },
    { title: "Self-Healing Systems", hint: "Implement auto-healing mechanisms for crashed services.", requirements: "Kubernetes, Monitoring Tools, Scripting.", useCase: "Minimize downtime and manual intervention.", targetUsers: "20K+", targetAudience: "DevOps teams, reliability engineers." },
    { title: "Jenkins HA Setup On AWS", hint: "Set up a highly available Jenkins master-slave architecture on AWS with auto-scaling.", requirements: "Jenkins, AWS EC2, Load Balancer, Auto-scaling Groups.", useCase: "Maintain continuous integration service availability.", targetUsers: "30K+", targetAudience: "DevOps engineers, cloud architects." },
    { title: "Implementing Service Discovery Using Consul", hint: "Deploy Consul to allow dynamic service discovery and health checks.", requirements: "Consul, Docker, Kubernetes.", useCase: "Enable reliable service-to-service communication in microservices architecture.", targetUsers: "20K+", targetAudience: "Backend developers, cloud engineers." },
    { title: "Deploying a Scalable Java Application on AWS", hint: "Deploy a multi-tier Java web application with load balancer and database on AWS.", requirements: "AWS EC2, RDS, Elastic Load Balancer, Auto-scaling.", useCase: "Build scalable and resilient cloud applications.", targetUsers: "40K+", targetAudience: "Java developers, cloud architects." },
    { title: "Deploy Prometheus Observability stack using Docker Compose", hint: "Set up Prometheus, Grafana, and Alertmanager using Docker Compose.", requirements: "Docker, Docker Compose, Prometheus, Grafana, Alertmanager.", useCase: "Monitor application metrics and trigger alerts.", targetUsers: "25K+", targetAudience: "DevOps teams, site reliability engineers." },
    { title: "Design and Automate AWS VPC Creation Using Terraform", hint: "Automate creation of AWS VPC, subnets, and route tables using Terraform.", requirements: "Terraform, AWS.", useCase: "Provision scalable cloud networking infrastructure.", targetUsers: "30K+", targetAudience: "Cloud engineers, DevOps architects." },
    { title: "AWS Client to Site VPN Setup", hint: "Configure a client-to-site VPN connection on AWS for secure access.", requirements: "AWS VPN, EC2 instances, VPN Client software.", useCase: "Enable secure remote access to AWS resources.", targetUsers: "20K+", targetAudience: "System admins, enterprises." },
    { title: "Self-Hosted Pritunl VPN Setup on AWS", hint: "Deploy Pritunl VPN server on AWS for self-managed secure connections.", requirements: "Pritunl, AWS EC2, SSL Certificates.", useCase: "Build a scalable and secure VPN infrastructure.", targetUsers: "15K+", targetAudience: "Small businesses, security teams." },
  ];

  const handleClickProject = (project) => { setSelectedProject(project); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedProject(null); };

  const S = {
    page: { maxWidth: "1300px", margin: "0 auto", padding: "40px 24px 80px" },
    hero: { textAlign: "center", marginBottom: "52px" },
    eyebrow: {
      display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px",
      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
      borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px",
    },
    heroTitle: { fontSize: "36px", fontWeight: "800", letterSpacing: "-1px", color: "#fafafa", margin: "0 0 12px", lineHeight: "1.1" },
    heroSub: { fontSize: "15px", color: "#a1a1aa", maxWidth: "560px", margin: "0 auto" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" },
    card: {
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", padding: "24px", cursor: "pointer", position: "relative",
      overflow: "hidden", display: "flex", flexDirection: "column",
      transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
    },
    accent: {
      position: "absolute", top: 0, left: 0, right: 0, height: "3px",
      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    },
    cardTitle: { fontSize: "17px", fontWeight: "700", color: "#fafafa", margin: "10px 0 12px", lineHeight: "1.4" },
    hintBadge: {
      display: "inline-block", padding: "2px 8px", borderRadius: "4px",
      background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
      fontSize: "10px", fontWeight: "700", color: "#a5b4fc", marginRight: "8px",
      verticalAlign: "middle",
    },
    cardHint: { fontSize: "13px", color: "#a1a1aa", lineHeight: "1.6", flex: 1 },
    cardFooter: {
      marginTop: "18px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", justifyContent: "flex-end", alignItems: "center",
      fontSize: "13px", color: "#6366f1", fontWeight: "600",
    },
    overlay: {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    },
    modal: {
      background: "#111118", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px",
      padding: "36px", maxWidth: "700px", width: "90%", maxHeight: "85vh", overflowY: "auto",
      cursor: "auto", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", position: "relative",
    },
    modalClose: {
      position: "absolute", top: "16px", right: "16px", width: "32px", height: "32px",
      borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
      color: "#a1a1aa", fontSize: "18px", cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: "inherit",
    },
    modalTitle: {
      fontSize: "22px", fontWeight: "800", color: "#fafafa", margin: "0 0 24px",
      paddingBottom: "18px", borderBottom: "1px solid rgba(255,255,255,0.07)",
    },
    sectionLabel: { fontSize: "12px", fontWeight: "700", color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" },
    infoBlock: {
      padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "10px", lineHeight: "1.6", fontSize: "14px", color: "#a1a1aa",
    },
    modalGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
    modalActions: { marginTop: "28px", display: "flex", justifyContent: "flex-end" },
    btnPrimary: {
      padding: "12px 28px", borderRadius: "10px", border: "none", cursor: "pointer",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
      fontWeight: "600", fontSize: "14px", fontFamily: "inherit",
      boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
    },
  };

  return (
    <Layout>
      <style>{`
        .dp-card:hover { border-color: rgba(99,102,241,0.3) !important; box-shadow: 0 16px 40px rgba(99,102,241,0.08) !important; transform: translateY(-4px) !important; }
        .dp-modal-overlay { animation: dpFadeIn 0.2s ease; }
        .dp-modal { animation: dpSlideUp 0.25s ease; }
        @keyframes dpFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dpSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .dp-modal::-webkit-scrollbar { width: 4px; }
        .dp-modal::-webkit-scrollbar-track { background: transparent; }
        .dp-modal::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 2px; }
      `}</style>

      <div style={S.page}>
        <div style={S.hero}>
          <div style={S.eyebrow}>✦ Project Ideas</div>
          <h1 style={S.heroTitle}>DevOps Project Ideas</h1>
          <p style={S.heroSub}>Explore innovative DevOps projects to enhance your skills and build your portfolio.</p>
        </div>

        <div style={S.grid}>
          {projectData.map((project, index) => (
            <div key={index} className="dp-card" style={S.card} onClick={() => handleClickProject(project)}>
              <div style={S.accent} />
              <h3 style={S.cardTitle}>{project.title}</h3>
              <p style={S.cardHint}>
                <span style={S.hintBadge}>HINT</span>
                {project.hint}
              </p>
              <div style={S.cardFooter}>View Details →</div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProject && (
        <div className="dp-modal-overlay" style={S.overlay} onClick={handleCloseModal}>
          <div className="dp-modal" style={S.modal} onClick={(e) => e.stopPropagation()}>
            <button style={S.modalClose} onClick={handleCloseModal}>×</button>
            <h2 style={S.modalTitle}>{selectedProject.title}</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <p style={S.sectionLabel}>Project Overview</p>
                <div style={S.infoBlock}><strong style={{ color: "#fafafa" }}>Hint: </strong>{selectedProject.hint}</div>
              </div>
              <div>
                <p style={S.sectionLabel}>Requirements</p>
                <div style={S.infoBlock}>{selectedProject.requirements}</div>
              </div>
              <div>
                <p style={S.sectionLabel}>Use Case</p>
                <div style={S.infoBlock}>{selectedProject.useCase}</div>
              </div>
              <div style={S.modalGrid}>
                <div>
                  <p style={S.sectionLabel}>Target Users</p>
                  <div style={S.infoBlock}>{selectedProject.targetUsers}</div>
                </div>
                <div>
                  <p style={S.sectionLabel}>Target Audience</p>
                  <div style={S.infoBlock}>{selectedProject.targetAudience}</div>
                </div>
              </div>
            </div>

            <div style={S.modalActions}>
              <button style={S.btnPrimary} onClick={handleCloseModal}>Close Details</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DevopsProjectsScreen;
