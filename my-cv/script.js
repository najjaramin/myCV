"use strict";

// Liste des projets : chaque projet est un objet JavaScript.
const projects = [
  {
    title: "DevSecOps Portfolio",
    description:
      "Création d'un portfolio personnel responsive avec HTML5, CSS3 et JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript", "Git"]
  },
  {
    title: "Docker Deployment",
    description:
      "Conteneurisation et déploiement d'un site statique avec Docker et Nginx.",
    technologies: ["Docker", "Nginx", "Linux"]
  },
  {
    title: "CI/CD Pipeline",
    description:
      "Projet d'apprentissage pour découvrir l'automatisation du build et du déploiement avec Jenkins.",
    technologies: ["Jenkins", "Git", "CI/CD"]
  },
  {
    title: "IT Infrastructure Monitoring",
    description:
      "Projet de supervision des infrastructures informatiques avec Zabbix, Grafana et SNMP.",
    technologies: ["Zabbix", "Grafana", "SNMP"]
  }
];

// Génération dynamique de la section Projects.
const projectsContainer = document.getElementById("projects-container");

if (projectsContainer) {
  projectsContainer.innerHTML = projects.map((project, index) => `
    <article class="project">
      <span class="project-number">
        PROJECT ${String(index + 1).padStart(2, "0")}
      </span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.technologies.map(technology =>
          `<span>${technology}</span>`
        ).join("")}
      </div>
    </article>
  `).join("");
}

// Navigation mobile.
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      menuToggle.textContent = "☰";
    });
  });
}

// Mode clair / sombre.
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Activer le thème clair" : "Activer le thème sombre"
    );
  });
}

// Année automatique dans le footer.
const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
