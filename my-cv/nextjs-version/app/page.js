const skills = [
  "Git",
  "Docker",
  "Jenkins",
  "Kubernetes",
  "Ansible",
  "Terraform",
  "Argo CD",
];

const projects = [
  {
    name: "DevSecOps Portfolio",
    description:
      "Portfolio personnel développé avec Next.js pour présenter mes compétences et projets.",
    technologies: "Next.js, JavaScript, CSS",
  },
  {
    name: "Infrastructure Monitoring",
    description:
      "Supervision des infrastructures IT avec des outils de monitoring.",
    technologies: "Zabbix, Grafana, SNMP",
  },
  {
    name: "Containerized Web Application",
    description:
      "Application web conteneurisée et exécutée avec Docker.",
    technologies: "Docker, Nginx, Linux",
  },
];

export default function Home() {
  return (
    <main>
      <header className="header">
        <a className="logo" href="#home">DevSecOps Portfolio</a>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <p className="eyebrow">WELCOME TO MY PORTFOLIO</p>
        <h1>Hi, I'm <span>Amin Najjar</span></h1>
        <h2>DevOps & Cloud Enthusiast</h2>
        <p>
          I am passionate about automation, cloud technologies,
          infrastructure monitoring and secure software delivery.
        </p>
        <a className="button" href="#projects">Explore my projects</a>
      </section>

      <section id="about" className="section">
        <p className="eyebrow">INTRODUCTION</p>
        <h2>About Me</h2>
        <p>
          I am an IT student specializing in Networks and IT Services,
          currently pursuing a Master's degree in DevOps. I am interested
          in Linux, automation, CI/CD, cloud computing and cybersecurity.
        </p>
      </section>

      <section id="skills" className="section alternate">
        <p className="eyebrow">WHAT I USE</p>
        <h2>Technical Skills</h2>
        <div className="skills">
          {skills.map((skill) => (
            <span className="skill" key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <p className="eyebrow">MY WORK</p>
        <h2>Projects</h2>
        <div className="projects">
          {projects.map((project) => (
            <article className="project" key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className="technology">{project.technologies}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section alternate">
        <p className="eyebrow">MY JOURNEY</p>
        <h2>Experience & Education</h2>
        <div className="project">
          <h3>Master's Degree — DevOps</h3>
          <p>Current studies in DevOps, automation and infrastructure.</p>
        </div>
        <div className="project">
          <h3>Licence — Networks and IT Services</h3>
          <p>Institut Supérieur des Études Technologiques de Tozeur.</p>
        </div>
        <div className="project">
          <h3>IT Internship — BNA</h3>
          <p>
            Academic project focused on IT infrastructure monitoring
            with Zabbix.
          </p>
        </div>
      </section>

      <section id="contact" className="section contact">
        <p className="eyebrow">GET IN TOUCH</p>
        <h2>Contact Me</h2>
        <p>Interested in DevOps, Cloud or collaboration on IT projects?</p>
        <a className="button" href="mailto:amin.najjar@example.com">
          Send me an email
        </a>
        <p className="note">
          Replace this example email with your real email address.
        </p>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Amin Najjar — DevSecOps Portfolio</p>
      </footer>
    </main>
  );
}
