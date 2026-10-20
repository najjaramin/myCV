# API — DevSecOps Portfolio

## Objectif

Créer une application backend indépendante du frontend avec Node.js et Express.

## Technologies

- Node.js
- Express.js
- npm

## Structure du projet

```text
api/
├── node_modules/
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Installation

```bash
cd api
npm install
```

## Démarrage du serveur

```bash
npm start
```

L'API écoute sur le port `4000` par défaut.

## Test

```bash
curl http://localhost:4000/
```

Réponse attendue :

```json
{
  "message": "DevSecOps Portfolio API is running",
  "status": "OK"
}
```

## Capture d'écran

![Serveur Node.js Express démarré](screenshots/9-api-server.png)

## Auteur

Amin Najjar
