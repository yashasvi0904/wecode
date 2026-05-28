import React, { useState, useEffect } from "react";
import Layout from "../../Layout1/Layout";

const WebDevScreen = () => {
  const [resourceCount, setResourceCount] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const resources = {
    HTML: [
      { title: "HTML Tutorial for Beginners | Complete HTML with Notes & Code", link: "https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=1&pp=iAQB" }
    ],
    CSS: [
      { title: "CSS Tutorial for Beginners | Complete CSS with Project, Notes & Code", link: "https://www.youtube.com/watch?v=ESnrn1kAD4E&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=2&pp=iAQB" },
      { title: "Building AMAZON Clone for Beginners | Project using HTML & CSS", link: "https://www.youtube.com/watch?v=nGhKIC_7Mkk&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=3&pp=iAQB" }
    ],
    "Git and GitHub": [
      { title: "Complete Git and GitHub Tutorial for Beginners", link: "https://www.youtube.com/watch?v=Ez8F0nW6S-w&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=4&pp=iAQB" }
    ],
    JavaScript: [
      { title: "JavaScript Full Course ❤️ | Variables & Data Types | Lecture 1", link: "https://www.youtube.com/watch?v=ajdRvxDWH4w&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=5&pp=iAQB" },
      { title: "Lecture 2 : Operators and Conditional Statements | JavaScript Full Course", link: "https://www.youtube.com/watch?v=Zg4-uSjxosE&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=6&pp=iAQB" },
      { title: "Lecture 3: Loops and Strings | JavaScript Full Course", link: "https://www.youtube.com/watch?v=UmRtFFSDSFo&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=7&pp=iAQB" },
      { title: "Lecture 4: Arrays | JavaScript Full Course", link: "https://www.youtube.com/watch?v=gFWhbjzowrM&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=8&pp=iAQB" },
      { title: "Lecture 5: Functions & Methods | JavaScript Full Course", link: "https://www.youtube.com/watch?v=P0XMXqDGttU&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=9&pp=iAQB" },
      { title: "Lecture 6 : DOM - Document Object Model | JavaScript Full Course | Part 1", link: "https://www.youtube.com/watch?v=7zcXPCt8Ck0&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=10&pp=iAQB" },
      { title: "Lecture 7 : DOM (Part 2) | Document Object Model | JavaScript Full Course", link: "https://www.youtube.com/watch?v=fXAGTOZ25H8&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=11&pp=iAQB" },
      { title: "Lecture 8 : Events in JavaScript | JavaScript Full Course", link: "https://www.youtube.com/watch?v=_i-uLJAh79U&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=12&pp=iAQB" },
      { title: "Lecture 9 : Tic Tac Toe Game in JavaScript | JS Project | JavaScript Full Course", link: "https://www.youtube.com/watch?v=SqrppLEljkY&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=13&pp=iAQB" },
      { title: "Lecture 10 : MiniProject - Stone, Paper & Scissors Game | JavaScript Full Course", link: "https://www.youtube.com/watch?v=_V33HCZWLDQ&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=14&pp=iAQB" },
      { title: "Lecture 11 : Classes & Objects | JavaScript Full Course", link: "https://www.youtube.com/watch?v=N-O4w6PynGY&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=15&pp=iAQB" },
      { title: "Lecture 12 : Callbacks, Promises & Async Await | JavaScript Full Course", link: "https://www.youtube.com/watch?v=d3jXofmQm44&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=16&pp=iAQB" },
      { title: "Last Lecture : Fetch API with Project | JavaScript Full Course", link: "https://www.youtube.com/watch?v=CyGodpqcid4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=17&pp=iAQB" }
    ],
    React: [
      { title: "React JS roadmap | chai aur react series", link: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=1&pp=iAQB" },
      { title: "Create react projects | chai aur react", link: "https://www.youtube.com/watch?v=k3KqQvywToE&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=2&pp=iAQB" },
      { title: "Understand the react flow and structure", link: "https://www.youtube.com/watch?v=yNbnA5pryMg&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=3&t=2016s&pp=iAQB" },
      { title: "Create your own react library and JSX", link: "https://www.youtube.com/watch?v=kAOuj6o7Kxs&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=4&t=2530s&pp=iAQB" },
      { title: "Why you need hooks and project", link: "https://www.youtube.com/watch?v=lI7IIOWM0Mo&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=5&t=1192s&pp=iAQB" },
      { title: "06 Virtual DOM, Fibre and reconciliation", link: "https://www.youtube.com/watch?v=MPCVGFvgVEQ&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=6&t=2s&pp=iAQB" },
      { title: "Tailwind and Props in reactjs", link: "https://www.youtube.com/watch?v=bB6707XzCNc&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=7&t=1753s&pp=iAQB" },
      { title: "A react interview question on counter", link: "https://www.youtube.com/watch?v=tOYkV6Yhrhs&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=8&t=51s&pp=iAQB" },
      { title: "Building a react project | bgChanger", link: "https://www.youtube.com/watch?v=_lJ3KNMue3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=9&t=2s&pp=iAQB" },
      { title: "useEffect, useRef and useCallback with 1 project", link: "https://www.youtube.com/watch?v=Lt4vy8hfc-s&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=10&t=3157s&pp=iAQB" },
      { title: "Custom hooks in react | currency Project", link: "https://www.youtube.com/watch?v=AFDYnd-XPa8&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=11&t=3264s&pp=iAQB" },
      { title: "React router crash course", link: "https://www.youtube.com/watch?v=VJov5QWEKE4&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=12&pp=iAQB0gcJCYQJAYcqIYzv" },
      { title: "Context API crash course with 2 projects", link: "https://www.youtube.com/watch?v=JQVBGtZMqgU&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=13&pp=iAQB" },
      { title: "Context api with local storage | project", link: "https://www.youtube.com/watch?v=6KQeopPE36I&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=14&pp=iAQB" },
      { title: "Redux toolkit crash course | Chai aur React Series", link: "https://www.youtube.com/watch?v=1i04-A7kfFI&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=15&pp=iAQB" },
      { title: "What is your choice for Mega Project in React?", link: "https://www.youtube.com/watch?v=CqNSTD9ENb0&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=16&pp=iAQB" },
      { title: "Our mega project in React | The hard way", link: "https://www.youtube.com/watch?v=P-WHzz2M5aU&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=17&pp=iAQB" }
    ],
    Backend: [
      { title: "Javascript Backend Roadmap | chai aur backend", link: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=1&pp=iAQB" },
      { title: "How to deploy backend code in production", link: "https://www.youtube.com/watch?v=pOV4EjUtl70&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=2&t=2310s&pp=iAQB0gcJCYQJAYcqIYzv" },
      { title: "How to connect frontend and backend in javascript | Fullstack Proxy and CORS", link: "https://www.youtube.com/watch?v=fFHyqhmnVfs&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=3&pp=iAQB" },
      { title: "Taking backend to next level", link: "https://www.youtube.com/watch?v=10hRlpUNeNA&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=4&t=257s&pp=iAQB0gcJCYQJAYcqIYzv" },
      { title: "Data modelling for backend with mongoose", link: "https://www.youtube.com/watch?v=VbGl3msgce8&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=5&pp=iAQB" },
      { title: "Ecommerce and Hospital management Data modelling", link: "https://www.youtube.com/watch?v=lA_mNpddN5U&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=6&t=1297s&pp=iAQB" },
      { title: "How to setup a professional backend project", link: "https://www.youtube.com/watch?v=9B4CvtzXRpc&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=7&t=6s&pp=iAQB" },
      { title: "How to connect database in MERN with debugging", link: "https://www.youtube.com/watch?v=w4z8Py-UoNk&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=8&pp=iAQB" },
      { title: "Custom api response and error handling | chai aur backend", link: "https://www.youtube.com/watch?v=S5EpsMjel-M&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=9&pp=iAQB" },
      { title: "User and video model with hooks and JWT", link: "https://www.youtube.com/watch?v=eWnZVUXMq8k&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=10&pp=iAQB0gcJCYQJAYcqIYzv" },
      { title: "How to upload file in backend | Multer", link: "https://www.youtube.com/watch?v=6KPXn2Ha0cM&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=11&t=1058s&pp=iAQB" },
      { title: "HTTP crash course | http Methods | http headers", link: "https://www.youtube.com/watch?v=qgZiUvV41TI&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=12&t=755s&pp=iAQB" },
      { title: "Complete guide for router and controller with debugging", link: "https://www.youtube.com/watch?v=HqcGLJSORaA&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=13&pp=iAQB" }
    ]
  };

  const categoryOrder = ["HTML", "CSS", "Git and GitHub", "JavaScript", "React", "Backend"];

  const categoryIcons = { HTML: "🌐", CSS: "🎨", "Git and GitHub": "🔧", JavaScript: "⚡", React: "⚛️", Backend: "🖥️" };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
      });
    }, { threshold: 0.1 });
    const sections = document.querySelectorAll(".wc-wd-section");
    sections.forEach(s => observer.observe(s));
    let total = 0;
    Object.values(resources).forEach(cat => { total += cat.length; });
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setResourceCount(count);
      if (count >= total) clearInterval(interval);
    }, 30);
    return () => {
      sections.forEach(s => observer.unobserve(s));
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <style>{`
        .wc-wd-section { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .wc-wd-section.visible { opacity: 1; transform: translateY(0); }
        .wc-wd-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 140px; transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; position: relative; overflow: hidden; }
        .wc-wd-card::before { content: ""; position: absolute; left: 0; top: 0; width: 3px; height: 0; background: linear-gradient(to bottom, #6366f1, #8b5cf6); transition: height 0.4s ease; border-radius: 0 0 2px 0; }
        .wc-wd-card:hover::before { height: 100%; }
        .wc-wd-card:hover { border-color: rgba(99,102,241,0.25) !important; box-shadow: 0 12px 32px rgba(99,102,241,0.08) !important; transform: translateY(-3px) !important; }
        .wc-wd-watch:hover { background: linear-gradient(135deg, #4f46e5, #7c3aed) !important; box-shadow: 0 6px 20px rgba(99,102,241,0.4) !important; transform: scale(1.03); }
        .wc-wd-watch:hover svg { transform: translateX(3px); }
        .wc-wd-watch svg { transition: transform 0.2s ease; }
      `}</style>

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
          border: "1px solid rgba(99,102,241,0.2)", borderRadius: "20px",
          padding: "48px 32px", textAlign: "center", marginBottom: "56px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px",
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
            borderRadius: "100px", fontSize: "11px", fontWeight: "700", color: "#a5b4fc",
            textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px",
          }}>
            ✦ Learning Path
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", letterSpacing: "-1.5px",
            background: "linear-gradient(135deg, #fafafa, #a5b4fc)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", margin: "0 0 12px", position: "relative",
          }}>
            Web Development Learning Path
          </h1>
          <p style={{ fontSize: "16px", color: "#a1a1aa", margin: "0 0 28px", position: "relative" }}>
            Comprehensive resources to master modern web development
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", position: "relative" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#a5b4fc", lineHeight: 1 }}>{resourceCount}</div>
              <div style={{ fontSize: "12px", color: "#52525b", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>Total Resources</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#a5b4fc", lineHeight: 1 }}>{categoryOrder.length}</div>
              <div style={{ fontSize: "12px", color: "#52525b", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>Learning Paths</div>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        {categoryOrder.map((category, idx) => (
          <section
            key={category}
            id={`section-${idx}`}
            className={`wc-wd-section${isVisible[`section-${idx}`] ? " visible" : ""}`}
            style={{ marginBottom: "48px" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <span style={{ fontSize: "20px" }}>{categoryIcons[category]}</span>
                <h2 style={{
                  fontSize: "22px", fontWeight: "700", color: "#fafafa", margin: 0,
                  paddingBottom: "8px", borderBottom: "2px solid rgba(99,102,241,0.3)",
                  display: "inline-block",
                }}>
                  {category}
                </h2>
              </div>
              <p style={{ fontSize: "13px", color: "#52525b", margin: "4px 0 0 30px" }}>
                {resources[category].length} resource{resources[category].length !== 1 ? "s" : ""}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {resources[category].map((resource, index) => (
                <div key={index} className="wc-wd-card">
                  <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#fafafa", lineHeight: "1.5", margin: "0 0 16px" }}>
                    {resource.title}
                  </h3>
                  <a
                    href={resource.link} target="_blank" rel="noopener noreferrer"
                    className="wc-wd-watch"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "9px 16px", borderRadius: "8px",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
                      textDecoration: "none", fontWeight: "600", fontSize: "13px",
                      transition: "all 0.2s ease", boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                    }}
                  >
                    <span>Watch Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
};

export default WebDevScreen;
