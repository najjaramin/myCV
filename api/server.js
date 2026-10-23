
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Route principale
app.get("/", (req, res) => {
  res.status(200).json({
    message: "DevSecOps Portfolio API is running",
    status: "OK"
  });
});

// 30. Vérifier l'état de l'API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running"
  });
});

// 31. Informations du profil
app.get("/api/profile", (req, res) => {
  res.status(200).json({
    name: "Amin Najjar",
    title: "Étudiant en Master DevOps",
    education: [
      "Licence en Réseaux et Services Informatiques",
      "Master DevOps"
    ],
    interests: [
      "DevOps",
      "Cloud Computing",
      "CI/CD",
      "Kubernetes",
      "Automatisation"
    ]
  });
});

// 32. Liste des projets
app.get("/api/projects", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "DevSecOps Portfolio",
      description:
        "Portfolio personnel avec intégration des outils DevOps et DevSecOps.",
      technologies: ["Node.js", "Express", "Docker", "Jenkins"],
      status: "In progress"
    },
    {
      id: 2,
      name: "Supervision des infrastructures IT de la BNA",
      description:
        "Plateforme de supervision basée sur Zabbix et Grafana.",
      technologies: ["Zabbix", "Grafana", "SNMP", "VPN IPsec"],
      status: "Completed"
    },
    {
      id: 3,
      name: "E-learning Platform",
      description:
        "Plateforme e-learning basée sur une architecture microservices.",
      technologies: ["Next.js", "FastAPI", "Node.js", "Docker"],
      status: "In progress"
    }
  ]);
});

// 33. Liste des compétences
app.get("/api/skills", (req, res) => {
  res.status(200).json([
    { id: 1, name: "Git", category: "Version Control" },
    { id: 2, name: "Docker", category: "Containerization" },
    { id: 3, name: "Jenkins", category: "CI/CD" },
    { id: 4, name: "Kubernetes", category: "Orchestration" },
    { id: 5, name: "Ansible", category: "Automation" },
    { id: 6, name: "Terraform", category: "Infrastructure as Code" },
    { id: 7, name: "Argo CD", category: "GitOps" }
  ]);
});

// Démarrer le serveur après la déclaration de toutes les routes
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
