# DevSecOps Portfolio — Amin Najjar

## 1. Présentation du projet

Ce projet consiste à développer et déployer un portfolio personnel avec une architecture séparée en deux parties :

- **Frontend :** application web développée avec Next.js.
- **Backend :** API REST développée avec Node.js et Express.
- **Conteneurisation :** Docker.
- **Orchestration des conteneurs :** Docker Compose.

L'objectif est de mettre en pratique les concepts DevOps et DevSecOps : développement, gestion des configurations, construction des images Docker et communication entre les services.

## 2. Technologies utilisées

| Technologie | Utilisation |
|---|---|
| Next.js | Développement du frontend |
| React | Interface utilisateur |
| TypeScript | Typage du frontend |
| Node.js | Environnement backend |
| Express.js | Création de l'API REST |
| Docker | Conteneurisation |
| Docker Compose | Orchestration des services |
| Git / GitHub | Gestion du code source |

## 3. Architecture du projet

Le projet est organisé de la manière suivante :

```text
my-cv/
│
├── api/
│   ├── server.js
│   ├── projects.js
│   ├── skills.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── my-cv-next/
│   ├── app/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.mjs
│   ├── .env.local
│   ├── .env.example
│   ├── Dockerfile
│   └── .dockerignore
│
├── docs/
│   └── capture-portfolio.png
│
├── compose.yaml
├── .gitignore
└── README.md
```

## 4. Développement du backend avec Express

Le backend est une API REST développée avec Express.js.

### 4.1 Installation des dépendances

```bash
cd api
npm install express cors
npm install --save-dev nodemon
```

### 4.2 Configuration du serveur

Le fichier `server.js` contient le serveur Express et les routes de l'API.

Le serveur utilise le port `4000` par défaut.

### 4.3 Routes de l'API

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Vérification du fonctionnement de l'API |
| GET | `/api/profile` | Récupération du profil |
| GET | `/api/projects` | Récupération des projets |
| GET | `/api/skills` | Récupération des compétences |

### 4.4 Lancement du backend

```bash
cd api
npm start
```

Pour le mode développement :

```bash
npm run dev
```

### 4.5 Test de l'API

```bash
curl http://localhost:4000/api/health
```

Résultat attendu :

```json
{
  "status": "OK",
  "message": "API Portfolio fonctionne correctement"
}
```

Tester les projets :

```bash
curl http://localhost:4000/api/projects
```

Tester les compétences :

```bash
curl http://localhost:4000/api/skills
```

## 5. Développement du frontend avec Next.js

Le frontend est développé avec Next.js et React.

Il récupère les données dynamiques depuis l'API Express :

- Les projets.
- Les compétences.
- Les informations du portfolio.

### 5.1 Configuration de l'URL de l'API

Le frontend utilise une variable d'environnement appelée `API_URL`.

Fichier `.env.local` :

```env
API_URL=http://localhost:4000
```

Fichier `.env.example` :

```env
API_URL=http://localhost:4000
```

Le fichier `.env.local` contient la configuration locale et ne doit pas être envoyé sur GitHub.

Le fichier `.env.example` sert de modèle pour les autres développeurs.

### 5.2 Lancement du frontend

```bash
cd my-cv-next
npm install
npm run dev
```

Le frontend est accessible à l'adresse :

http://localhost:3000

## 6. Gestion des variables d'environnement et Git

Le fichier `.gitignore` permet d'exclure les fichiers et dossiers qui ne doivent pas être versionnés.

Exemple de configuration :

```gitignore
node_modules/
.next/
.env
.env.*
!.env.example
*.log
.DS_Store
```

Vérifier que le fichier local est ignoré :

```bash
git check-ignore my-cv-next/.env.local
```

Vérifier que le fichier exemple n'est pas ignoré :

```bash
git check-ignore my-cv-next/.env.example
```

Le fichier `.env.example` doit être ajouté au dépôt Git, contrairement au fichier `.env.local`.

## 7. Conteneurisation du backend avec Docker

Le backend possède son propre Dockerfile.

Fichier `api/Dockerfile` :

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY server.js projects.js skills.js ./

EXPOSE 4000

CMD ["npm", "start"]
```

### 7.1 Construction de l'image API

```bash
cd ~/portfolios/my-cv/api

docker build -t devsecops-api:1.0 .
```

Vérifier l'image :

```bash
docker images devsecops-api
```

## 8. Conteneurisation du frontend avec Docker

Le frontend possède également son propre Dockerfile.

Fichier `my-cv-next/Dockerfile` :

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 8.1 Construction de l'image frontend

```bash
cd ~/portfolios/my-cv/my-cv-next

docker build -t devsecops-portfolio:1.0 .
```

Vérifier l'image :

```bash
docker images devsecops-portfolio
```

## 9. Orchestration avec Docker Compose

Docker Compose permet de lancer le frontend et le backend ensemble.

Fichier `compose.yaml` :

```yaml
services:
  api:
    build: ./api
    image: devsecops-api:1.0
    container_name: portfolio-api
    ports:
      - "4000:4000"
    networks:
      - portfolio-network

  frontend:
    build: ./my-cv-next
    image: devsecops-portfolio:1.0
    container_name: portfolio-frontend
    ports:
      - "3000:3000"
    environment:
      API_URL: http://api:4000
    depends_on:
      - api
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge
```

### 9.1 Explication de la configuration

- `build` : indique le chemin du Dockerfile.
- `image` : définit le nom et le tag de l'image.
- `container_name` : définit le nom du conteneur.
- `ports` : expose les ports sur la machine hôte.
- `environment` : définit la variable d'environnement du frontend.
- `depends_on` : définit la dépendance du frontend envers l'API.
- `networks` : permet aux conteneurs de communiquer sur un réseau Docker commun.

**Important :** dans Docker Compose, le frontend utilise `http://api:4000` pour contacter le backend. Le nom `api` correspond au nom du service Compose.

### 9.2 Construction et démarrage des services

Depuis la racine du projet :

```bash
cd ~/portfolios/my-cv

docker compose up -d --build
```

### 9.3 Vérification des conteneurs

```bash
docker compose ps
```

Les deux conteneurs attendus sont :

- `portfolio-api`
- `portfolio-frontend`

### 9.4 Affichage des logs

```bash
docker compose logs
```

Logs du backend :

```bash
docker compose logs api
```

Logs du frontend :

```bash
docker compose logs frontend
```

### 9.5 Arrêt des services

```bash
docker compose down
```

## 10. Tests de fonctionnement et communication

### 10.1 Tester le backend

```bash
curl http://localhost:4000/api/health
```

### 10.2 Tester le frontend

```bash
curl -I http://localhost:3000
```

Le résultat attendu contient :

```text
HTTP/1.1 200 OK
```

### 10.3 Vérifier les images utilisées

```bash
docker inspect portfolio-api --format '{{.Config.Image}}'

docker inspect portfolio-frontend --format '{{.Config.Image}}'
```

Images attendues :

```text
devsecops-api:1.0
devsecops-portfolio:1.0
```

### 10.4 Accès depuis le navigateur

Sur la machine hôte Windows :

- Frontend : http://192.168.30.167:3000
- API Health : http://192.168.30.167:4000/api/health
- API Projects : http://192.168.30.167:4000/api/projects
- API Skills : http://192.168.30.167:4000/api/skills

## 11. Capture d'écran du résultat

Une capture d'écran du portfolio déployé peut être ajoutée dans le dossier `docs/`.

Chemin prévu :

```text
docs/capture-portfolio.png
```

![Capture du portfolio](docs/capture-portfolio.png)

Cette capture doit montrer le frontend fonctionnel et les données récupérées depuis l'API.

## 12. Commandes utiles

| Action | Commande |
|---|---|
| Construire et lancer | `docker compose up -d --build` |
| Voir les conteneurs | `docker compose ps` |
| Voir les logs | `docker compose logs` |
| Logs API | `docker compose logs api` |
| Logs frontend | `docker compose logs frontend` |
| Arrêter les services | `docker compose down` |
| Lister les images | `docker images` |
| Vérifier l'API | `curl http://localhost:4000/api/health` |
| Tester le frontend | `curl -I http://localhost:3000` |

## 13. Auteur

**Amin Najjar**

Projet réalisé dans le cadre de la formation Master DevOps.

GitHub : https://github.com/najjaramin

Dépôt du projet : https://github.com/najjaramin/myCV
