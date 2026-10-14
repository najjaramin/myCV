
import Image from "next/image";

const skills = [
  ["Git & GitHub", "Version control"],
  ["Docker", "Containers"],
  ["Jenkins", "CI/CD"],
  ["Kubernetes", "Orchestration"],
  ["Ansible", "Automation"],
  ["Terraform", "Infrastructure as Code"],
  ["Argo CD", "GitOps"],
  ["Linux", "System administration"],
  ["Zabbix & Grafana", "Monitoring"],
  ["Networking", "Infrastructure"],
];

const projects = [
  {
    number: "01",
    title: "IT Infrastructure Monitoring",
    type: "FINAL YEAR PROJECT",
    description:
      "Deployment of an IT infrastructure monitoring platform using Zabbix, Grafana and SNMP in a banking environment.",
    tags: ["Zabbix", "Grafana", "SNMP"],
  },
  {
    number: "02",
    title: "DevSecOps Portfolio",
    type: "WEB & DEVOPS",
    description:
      "A personal portfolio built with Next.js, TypeScript and responsive CSS, designed to present my technical skills and projects.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    number: "03",
    title: "Dockerized Web Application",
    type: "CONTAINERIZATION",
    description:
      "Containerization of a web portfolio with Docker and Nginx, with a workflow designed for reproducible deployment.",
    tags: ["Docker", "Nginx", "Compose"],
  },
  {
    number: "04",
    title: "Kubernetes Practice Lab",
    type: "INFRASTRUCTURE LAB",
    description:
      "Hands-on learning with a multi-node Kubernetes cluster, Pods, Deployments, Services and application troubleshooting.",
    tags: ["Kubernetes", "Linux", "VMware"],
  },
];

const education = [
  {
    date: "2025 — PRESENT",
    title: "Master's in DevOps",
    place: "Higher education",
    detail:
      "Developing skills in automation, infrastructure, containers, deployment and modern IT operations.",
  },
  {
    date: "2024 — 2025",
    title: "Applied Bachelor's Degree in IT",
    place: "ISET Tozeur · Networks and IT Services",
    detail:
      "Academic foundation in computer networks, IT systems and infrastructure services.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav wrap">
        <a className="logo" href="#home">AN<span>.</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a className="nav-cta" href="#contact">Contact ↗</a>
        </div>
      </nav>

      <section className="hero wrap" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="dot" /> MASTER'S STUDENT · DEVOPS</p>
          <p className="overline">NETWORKS · CLOUD · AUTOMATION</p>
          <h1>
            Amin
            <br />
            <span>Najjar.</span>
          </h1>
          <h2 className="hero-role">Aspiring DevOps Engineer</h2>
          <p className="hero-text">
            I am an IT graduate currently pursuing a Master&apos;s in DevOps.
            I enjoy exploring Linux, cloud technologies, infrastructure
            automation and reliable application deployment.
          </p>
          <div className="actions">
            <a className="btn primary" href="#projects">Explore projects ↗</a>
            <a className="btn secondary" href="#contact">Get in touch</a>
          </div>
          <div className="hero-meta">
            <span><span className="dot" /> Tunisia</span>
            <span>Learning by building</span>
          </div>
        </div>

        <div className="portrait-column">
          <div className="portrait">
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />
            <Image
              src="/amin-profile.png"
              alt="Portrait of Amin Najjar"
              fill
              priority
              sizes="(max-width: 700px) 85vw, 420px"
              className="portrait-img"
            />
            <div className="portrait-badge">
              <span className="dot" />
              <div>
                <strong>AMIN NAJJAR</strong>
                <small>DEVOPS · IT INFRASTRUCTURE</small>
              </div>
            </div>
          </div>
          <p className="portrait-caption">FIG. 01 — PERSONAL PORTFOLIO</p>
          <div className="floating-card">
            <span className="floating-icon">⌘</span>
            <div><strong>Build.</strong><small>Automate. Improve.</small></div>
          </div>
        </div>
      </section>

      <div className="tech-strip">
        <div className="wrap tech-items">
          <span>LINUX</span><i>✳</i><span>DOCKER</span><i>✳</i>
          <span>CI/CD</span><i>✳</i><span>KUBERNETES</span><i>✳</i>
          <span>CLOUD</span><i>✳</i><span>MONITORING</span>
        </div>
      </div>

      <section className="section wrap" id="about">
        <div className="section-heading">
          <p className="section-label">01 / ABOUT ME</p>
          <h2>Curious mind.<br /><span>Infrastructure mindset.</span></h2>
        </div>
        <div className="about-content">
          <p className="lead">
            Connecting systems, automation and software delivery.
          </p>
          <p className="muted">
            My background in Networks and IT Services gave me a foundation
            in IT infrastructure. I am now building on that experience through
            practical DevOps labs and projects, exploring containerization,
            continuous integration, monitoring and infrastructure automation.
          </p>
          <div className="principles">
            <div><b>01</b><span>Learn continuously</span></div>
            <div><b>02</b><span>Automate repetitive work</span></div>
            <div><b>03</b><span>Build reliable systems</span></div>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="wrap">
          <div className="section-heading">
            <p className="section-label">02 / TECH STACK</p>
            <h2>Tools I&apos;m <span>working with.</span></h2>
            <p className="muted">
              Technologies I study and practise through coursework and personal labs.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map(([name, category], index) => (
              <article className="skill-card" key={name}>
                <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{category}</p>
                </div>
                <span className="skill-arrow">↗</span>
              </article>
            ))}
          </div>
          <p className="skill-disclaimer">
            <span className="dot" />
            Skills reflect my learning areas; proficiency grows through practice.
          </p>
        </div>
      </section>

      <section className="section wrap" id="projects">
        <div className="section-heading projects-heading">
          <div>
            <p className="section-label">03 / SELECTED WORK</p>
            <h2>Projects &amp; <span>practice.</span></h2>
          </div>
          <span className="project-total">04 PROJECTS</span>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-top">
                <span>{project.number} / 04</span>
                <span className="project-icon">↗</span>
              </div>
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section education-section" id="education">
        <div className="wrap">
          <div className="section-heading">
            <p className="section-label">04 / EDUCATION</p>
            <h2>Learning is <span>a journey.</span></h2>
          </div>
          <div className="timeline">
            {education.map((item) => (
              <article className="timeline-item" key={item.title}>
                <p className="timeline-date">{item.date}</p>
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p className="timeline-place">{item.place}</p>
                  <p className="muted">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section wrap" id="contact">
        <p className="section-label">05 / CONTACT</p>
        <h2>Let&apos;s build something<br /><span>reliable together.</span></h2>
        <p className="muted contact-text">
          Interested in DevOps, infrastructure or automation?
          Feel free to connect and exchange ideas.
        </p>
        <div className="actions">
          <a className="btn primary" href="mailto:YOUR_EMAIL@example.com">
            Send me an email ↗
          </a>
          <a
            className="btn secondary"
            href="https://github.com/najjaramin"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
        <p className="email-note">
          Replace YOUR_EMAIL@example.com with your real email before publishing.
        </p>
      </section>

      <footer className="footer wrap">
        <a className="logo" href="#home">AN<span>.</span></a>
        <p>Designed with curiosity. Built to keep improving.</p>
         <span>© 2026 Amin Najjar</span>
      </footer>
    </main>
  );
}
