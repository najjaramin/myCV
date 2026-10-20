const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DevSecOps Portfolio API is running",
    status: "OK"
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running"
  });
});

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
app.get("/api/projects", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "DevSecOps Portfolio",
      description: "Portfolio personnel avec intégration des outils DevOps et DevSecOps.",
      technologies: ["Node.js", "Express", "Docker", "Jenkins"],
      status: "In progress"
    },
    {
      id: 2,
      name: "Supervision des infrastructures IT de la BNA",
      description: "Plateforme de supervision basée sur Zabbix et Grafana.",
      technologies: ["Zabbix", "Grafana", "SNMP", "VPN IPsec"],
      status: "Completed"
    },
    {
      id: 3,
      name: "E-learning Platform",
      description: "Plateforme e-learning basée sur une architecture microservices.",
      technologies: ["Next.js", "FastAPI", "Node.js", "Docker"],
      status: "In progress"
    }
  ]);
});
