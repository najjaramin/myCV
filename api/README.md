# DevSecOps Portfolio API

API backend du projet **DevSecOps Portfolio**, développée avec Node.js et Express.js. Elle expose les informations du portfolio sous forme de données JSON et peut être utilisée indépendamment du frontend Next.js.

## Objectifs

- Développer une API REST avec Express.js.
- Vérifier la disponibilité du service avec une route de santé.
- Exposer le profil, les projets et les compétences.
- Tester les endpoints avec `curl`.
- Conteneuriser l'application avec Docker.
- Intégrer l'API au frontend avec Docker Compose.

## Technologies

- Node.js 22
- Express.js 5
- npm
- REST API / JSON
- Docker
- Docker Compose
- Git et GitHub

## Structure du projet

```text
api/
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
├── server.js
├── README.md
└── screenshots/
    ├── 9-api-server.png
    ├── 10-api-health.png
    ├── 32-api-projects.png
    └── 33-api-skills.png
```

Les captures d'écran sont facultatives. Les noms affichés ci-dessus correspondent aux captures prévues dans la documentation.

## Prérequis

- Node.js 22 ou version compatible.
- npm.
- Git.
- Docker pour l'exécution conteneurisée.

## Installation

Depuis le dossier du dépôt:

```bash
cd api
npm ci
```

## Démarrage en développement

```bash
npm start
```

Le serveur écoute sur le port `4000` par défaut, selon la configuration de `server.js`.

Si le port est déjà utilisé, vérifie la variable `PORT` prise en charge par l'application avant de choisir un autre port.

## Endpoints disponibles

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/` | Vérifier que l'API répond |
| GET | `/api/health` | Vérifier l'état du service |
| GET | `/api/profile` | Récupérer les informations du profil |
| GET | `/api/projects` | Récupérer la liste des projets |
| GET | `/api/skills` | Récupérer les compétences techniques |

## Tests des endpoints

Avec l'API démarrée sur le port `4000`:

```bash
curl -i http://localhost:4000/
curl -i http://localhost:4000/api/health
curl -i http://localhost:4000/api/profile
curl -i http://localhost:4000/api/projects
curl -i http://localhost:4000/api/skills
```

Les routes doivent retourner une réponse HTTP appropriée et des données JSON selon leur implémentation dans `server.js`.

### Exemple de réponse de santé

La réponse attendue pour `/api/health`, selon l'implémentation documentée, est:

```json
{
  "status": "OK",
  "message": "API is running"
}
```

## Variables d'environnement

La variable `PORT` permet de configurer le port d'écoute du serveur.

Exemple:

```bash
PORT=4000 npm start
```

En environnement Docker Compose, le frontend utilise l'adresse interne du service API:

```text
http://api:4000
```

Le port `4001` peut être exposé sur la machine hôte pour accéder à l'API sans entrer dans le conteneur.

## Conteneurisation avec Docker

### Construire l'image

Depuis le dossier `api`:

```bash
docker build -t amin-portfolio-api:1.0 .
```

### Lancer un conteneur indépendant

```bash
docker run -d \
  --name portfolio-api-test \
  -p 4001:4000 \
  -e PORT=4000 \
  amin-portfolio-api:1.0
```

Tester ensuite:

```bash
curl -i http://localhost:4001/api/health
```

Pour arrêter et supprimer ce conteneur de test:

```bash
docker stop portfolio-api-test
docker rm portfolio-api-test
```

Ne lance pas ce conteneur de test si `portfolio-api` est déjà géré par Docker Compose et utilise le même port hôte.

## Docker Compose

Le fichier `docker-compose.yml` situé à la racine du dépôt permet de coordonner le frontend et l'API.

Depuis la racine du projet:

```bash
cd ~/myCV-repo
docker compose config
docker compose up -d --build
docker compose ps
```

Pour consulter les logs:

```bash
docker compose logs -f api
```

Pour arrêter les services:

```bash
docker compose down
```

## Captures d'écran

Les captures permettent de documenter les tests réalisés:

- `screenshots/9-api-server.png` — démarrage du serveur.
- `screenshots/10-api-health.png` — test de la route de santé.
- `screenshots/32-api-projects.png` — récupération des projets.
- `screenshots/33-api-skills.png` — récupération des compétences.

## Auteur

**Amin Najjar**

## Licence

Projet réalisé dans un cadre pédagogique.
