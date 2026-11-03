const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Point 30 : Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API Portfolio fonctionne correctement'
    });
});

// Point 31 : Profile
app.get('/api/profile', (req, res) => {
    res.json({
        name: 'Amin Najjar',
        title: 'DevOps and Cloud Engineer',
        education: 'Master DevOps',
        university: 'Institut Supérieur des Études Technologiques de Tozeur',
        skills: [
            'Linux',
            'Docker',
            'Kubernetes',
            'Jenkins',
            'Ansible',
            'Git',
            'CI/CD'
        ],
        interests: [
            'DevOps',
            'Cloud Computing',
            'Automation'
        ]
    });
});



// Point 32 : Liste des projets
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

const skills = require('./skills');



// Point 33 : Liste des compétences
app.get('/api/skills', (req, res) => {
    res.json(skills);
});
// Démarrage du serveur

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Portfolio démarrée sur le port ${PORT}`);
});


const projects = require('./projects');
