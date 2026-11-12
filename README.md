# DevSecOps Portfolio — Amin Najjar

Portfolio personnel réalisé dans le cadre du Master DevOps & Cloud. Le projet met en pratique toute la chaîne DevOps / DevSecOps : développement web, API sécurisée, base de données, conteneurisation, tests automatisés, CI/CD avec Jenkins, automatisation de l'infrastructure avec Vagrant et Ansible, et contrôles de sécurité intégrés au pipeline.

- Dépôt : https://github.com/najjaramin/myCV
- Frontend : Next.js (React + TypeScript)
- Backend : Node.js / Express + Prisma + PostgreSQL

---

## Table des matières

1. [Technologies utilisées](#1-technologies-utilisées)
2. [Architecture du projet](#2-architecture-du-projet)
3. [Activité 1 — Mise en place de l'environnement](#3-activité-1--mise-en-place-de-lenvironnement)
4. [Activité 2 — Évolution vers un portfolio DevSecOps](#4-activité-2--évolution-vers-un-portfolio-devsecops)
5. [Activité 3 — Dockerisation et Docker Compose](#5-activité-3--dockerisation-et-docker-compose)
6. [Activité 4 — Infrastructure avec Vagrant](#6-activité-4--infrastructure-avec-vagrant)
7. [Activité 5 — Migration vers Next.js](#7-activité-5--migration-vers-nextjs)
8. [Activité 6 — API Express et variables d'environnement](#8-activité-6--api-express-et-variables-denvironnement)
9. [Activité 7 — Déploiement automatisé avec Ansible](#9-activité-7--déploiement-automatisé-avec-ansible)
10. [Activité 8 — Sécurisation de l'API](#10-activité-8--sécurisation-de-lapi)
11. [Activité 9 — Base de données PostgreSQL et Prisma](#11-activité-9--base-de-données-postgresql-et-prisma)
12. [Activité 10 — Tests automatisés](#12-activité-10--tests-automatisés)
13. [Activité 11 — Pipeline Jenkins (CI)](#13-activité-11--pipeline-jenkins-ci)
14. [Problèmes rencontrés et solutions](#14-problèmes-rencontrés-et-solutions)
15. [Sécurité : points d'attention](#15-sécurité--points-dattention)
16. [Parcours complet : étapes 1 à 69](#16-parcours-complet--étapes-1-à-69)
17. [Commandes utiles](#17-commandes-utiles)
18. [Captures d'écran](#18-captures-décran)
19. [Auteur](#19-auteur)
20. [Phase 16 — Pipeline DevSecOps Jenkins (étapes 64 à 69)](#20-phase-16--pipeline-devsecops-jenkins-étapes-64-à-69)
21. [Publication du projet sur GitHub](#21-publication-du-projet-sur-github)

---

## 1. Technologies utilisées

| Technologie | Utilisation |
| :--- | :--- |
| Next.js 16 / React | Frontend |
| TypeScript | Typage du frontend |
| Node.js 22 / Express | API REST |
| Prisma 7 (adapter `pg`) | ORM et migrations |
| PostgreSQL 15 | Base de données |
| Zod | Validation des données |
| Helmet | En-têtes HTTP de sécurité |
| express-rate-limit | Limitation du nombre de requêtes |
| Docker / Docker Compose | Conteneurisation et orchestration |
| Jenkins | CI/CD |
| Vagrant (libvirt) / Ansible | Automatisation de l'infrastructure |
| Jest / Supertest | Tests de l'API |
| Jest / React Testing Library | Tests du frontend |
| Gitleaks | Détection de secrets |
| Semgrep | Analyse statique (SAST) |
| npm audit / OWASP Dependency-Check | Analyse des dépendances |
| Trivy | Scan des images Docker |
| Git / GitHub (SSH) | Gestion de version |

---

## 2. Architecture du projet

```text
my-cv/
├── api/                    # API Express + Prisma
│   ├── prisma/             # schéma Prisma
│   ├── prisma.config.ts
│   ├── server.js
│   ├── server.test.js
│   ├── projects.js
│   ├── skills.js
│   ├── profile.js
│   ├── Dockerfile
│   └── .dockerignore
├── my-cv-next/             # Frontend Next.js
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── __tests__/
│   ├── jest.config.js
│   ├── jest.setup.js
│   ├── .env.example
│   ├── Dockerfile
│   └── .dockerignore
├── my-cv/                  # Version initiale (HTML / CSS / JS)
├── ansible/                # Playbook et inventaire
├── vagrant/                # Vagrantfile
├── docs/                   # Captures d'écran
├── compose.yaml
├── Jenkinsfile
├── .gitignore
├── .gitleaks.toml
├── .trivyignore
└── README.md
```

---

## 3. Activité 1 — Mise en place de l'environnement

*(étapes 1 à 5)*

### 3.1 Serveur Ubuntu et accès SSH
- Ubuntu Server installé dans une machine virtuelle VMware.
- Accès distant par SSH depuis la machine physique.

### 3.2 Docker
```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
docker --version
```

### 3.3 Jenkins
Jenkins est installé comme **service systemd** directement sur le serveur (et non dans Docker). Interface : `http://<IP-serveur>:8080`.

```bash
sudo systemctl status jenkins
```

---

## 4. Activité 2 — Évolution vers un portfolio DevSecOps

*(étapes 6 à 11)*

### 4.1 Mini CV (HTML / CSS / JS)
Un CV one page statique a été créé (`my-cv/index.html`, `style.css`, `script.js`) puis versionné sur GitHub.

### 4.2 Push GitHub par SSH
```bash
git init
ssh-keygen -t ed25519 -C "email@exemple.com"
cat ~/.ssh/id_ed25519.pub        # à ajouter dans GitHub > Settings > SSH keys
ssh -T git@github.com
git remote add origin git@github.com:najjaramin/myCV.git
git push -u origin main
```

### 4.3 Évolution du CV
- Sections : About, Skills, Projects, Experience, Contact.
- Section **DevSecOps Skills** : Git, Docker, Jenkins, Kubernetes, Ansible, Terraform, ArgoCD.
- Section **Projects** générée dynamiquement en JavaScript à partir d'un tableau d'objets.

---

## 5. Activité 3 — Dockerisation et Docker Compose

*(étapes 12 à 16)*

### 5.1 Image Nginx du CV statique
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t cv-docker .
docker run -d -p 8081:80 cv-docker
```

### 5.2 Docker Compose
```yaml
services:
  web:
    build: .
    ports:
      - "8081:80"
```

```bash
docker compose up -d
docker compose ps
docker compose down
```

---

## 6. Activité 4 — Infrastructure avec Vagrant

*(étapes 17 à 23)*

Le `Vagrantfile` du dossier `vagrant/` crée une VM Ubuntu 22.04 avec le provider **libvirt** et lance le playbook Ansible.

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2204"
  config.vm.hostname = "portfolio-vm"

  config.vm.network "private_network", ip: "192.168.56.10"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 4000, host: 4000

  config.vm.provider "libvirt" do |lv|
    lv.memory = 3048
    lv.cpus   = 2
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook           = "../ansible/deploy-portfolio.yml"
    ansible.inventory_path     = "../ansible/inventory"
    ansible.limit              = "all"
    ansible.compatibility_mode = "2.0"
  end
end
```

```bash
cd vagrant
vagrant validate
vagrant up
vagrant ssh
vagrant status
vagrant halt
vagrant destroy -f
```

> Vérifier que ce bloc correspond exactement au `Vagrantfile` réellement présent dans le dépôt (RAM, CPU, réseau, chemins Ansible) avant le rendu.

---

## 7. Activité 5 — Migration vers Next.js

*(étapes 24 à 27)*

```bash
npx create-next-app@latest my-cv-next
```

- Composants réutilisables : `Header`, `About`, `Skills`, `Projects`, `Contact`, `Footer`.
- Données séparées dans `data/`.
- Pages : `/` (accueil), `/projects` (liste), `/projects/[slug]` (détail).

```bash
cd my-cv-next
npm install
npm run dev
```

---

## 8. Activité 6 — API Express et variables d'environnement

*(étapes 28 à 36)*

### 8.1 Routes

| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/health` | Vérification du fonctionnement |
| GET | `/api/profile` | Profil |
| GET | `/api/projects` | Liste des projets |
| GET | `/api/skills` | Liste des compétences |
| POST | `/api/contact` | Envoi d'un message de contact |

```bash
cd api
npm install
npm start
curl http://localhost:4000/api/health
```

Résultat attendu :
```json
{"status":"OK","message":"API Portfolio fonctionne correctement"}
```

### 8.2 Variables d'environnement
L'URL de l'API n'est pas écrite en dur dans le frontend :

```env
# my-cv-next/.env.example
API_URL=http://localhost:4000
```

- `.env.local` : configuration locale, **ignoré par Git**.
- `.env.example` : modèle versionné.

### 8.3 `.gitignore`
```gitignore
node_modules/
.next/
.env
.env.*
!.env.example
*.log
.DS_Store
reports/
*.tar.gz
demo-secret.txt
```

> Le `.gitignore` doit être créé **avant** le premier `git add .`, sinon `node_modules` finit dans le dépôt.

### 8.4 Connexion frontend → API
Le frontend Next.js lit `API_URL` pour appeler l'API Express. Dans Docker Compose, `API_URL=http://api:4000` (`api` est le nom du service).

---

## 9. Activité 7 — Déploiement automatisé avec Ansible

*(étapes 42 à 45)*

Le playbook `ansible/deploy-portfolio.yml` installe Docker sur la VM, clone le dépôt et lance `docker compose up -d`.

```bash
ansible-playbook -i ansible/inventory ansible/deploy-portfolio.yml
```

Avec Vagrant, `vagrant up` crée la VM puis exécute automatiquement ce playbook.

Test de reproductibilité :
```bash
vagrant destroy -f
vagrant up
```

**Correction importante :** la tâche `stat` du playbook doit chercher `compose.yaml` (nom réel du fichier) et non `docker-compose.yml`, sinon `docker compose up` n'est pas lancé pendant `vagrant up`.

```bash
sed -i 's#/docker-compose.yml#/compose.yaml#' ansible/deploy-portfolio.yml
grep -n "compose.yaml" ansible/deploy-portfolio.yml
```

---

## 10. Activité 8 — Sécurisation de l'API

*(étapes 37 à 41 et 46 à 52)*

### 10.1 Validation avec Zod
```js
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});
```

Réponse en cas de données invalides :
```json
{"error":"Données invalides","details":[{"field":"name","message":"Le nom doit contenir au moins 2 caractères"}]}
```

### 10.2 Helmet
`app.use(helmet())` ajoute les en-têtes de sécurité HTTP.
```bash
curl -I http://localhost:4000/api/health
```

### 10.3 Rate limiting
5 requêtes maximum par 15 minutes et par IP sur `/api/contact`. Au-delà : code **429**.

### 10.4 Gestion centralisée des erreurs
Un middleware global renvoie un message générique (code 500) sans exposer les détails internes.

### 10.5 OWASP API Security Top 10

| Risque | Mesure mise en place |
| :--- | :--- |
| API4 — Consommation de ressources non limitée | Rate limiting |
| API8 — Mauvaise configuration de sécurité | Helmet, messages d'erreur génériques |
| Validation des entrées | Zod |
| Injection SQL | Requêtes paramétrées via Prisma (testé) |

---

## 11. Activité 9 — Base de données PostgreSQL et Prisma

*(étapes 53 à 56)*

Le service PostgreSQL est défini dans `compose.yaml` avec un volume persistant et un healthcheck. L'API attend que la base soit prête (`depends_on: condition: service_healthy`).

Les messages du formulaire sont enregistrés dans la table `ContactMessage` via Prisma 7 avec l'adapter `@prisma/adapter-pg`.

```bash
cd api
npx prisma generate
npx prisma migrate dev --name init
```

Vérification :
```bash
docker exec -it portfolio-db psql -U amin -d portfolio -c 'SELECT * FROM "ContactMessage";'
```

### Docker Compose complet

```yaml
services:
  api:
    build: ./api
    image: devsecops-api:1.0
    container_name: portfolio-api
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: "postgresql://amin:amin_password@db:5432/portfolio?schema=public"
      PORT: 4000
    depends_on:
      db:
        condition: service_healthy
    networks:
      - portfolio-network

  db:
    image: postgres:15-alpine
    container_name: portfolio-db
    environment:
      POSTGRES_USER: amin
      POSTGRES_PASSWORD: amin_password
      POSTGRES_DB: portfolio
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U amin -d portfolio"]
      interval: 5s
      timeout: 5s
      retries: 5
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

volumes:
  postgres_data:

networks:
  portfolio-network:
    driver: bridge
```

> Dans Docker Compose, le frontend contacte l'API via `http://api:4000` : `api` est le nom du service.

```bash
docker compose up -d --build
docker compose ps
curl http://localhost:4000/api/health
curl -I http://localhost:3000
```

### Dockerfiles

`api/Dockerfile` :
```dockerfile
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Client Prisma généré sur l'hôte (voir section 14)
COPY node_modules/.prisma ./node_modules/.prisma
COPY node_modules/@prisma/client ./node_modules/@prisma/client

COPY prisma ./prisma/
COPY prisma.config.ts ./
COPY server.js projects.js skills.js profile.js ./

EXPOSE 4000
CMD ["node", "server.js"]
```

`api/.dockerignore` (autorise uniquement le client Prisma généré) :
```text
node_modules/*
!node_modules/@prisma
!node_modules/.prisma
npm-debug.log*
.env
.env.*
```

`my-cv-next/Dockerfile` :
```dockerfile
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm config set fetch-timeout 600000 \
 && npm ci

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 12. Activité 10 — Tests automatisés

*(étapes 57 à 60)*

### 12.1 Tests de l'API (Jest + Supertest)
Prisma est **mocké** : les tests ne nécessitent ni base de données ni `DATABASE_URL`.

```bash
cd api
npm test
```

```text
PASS ./server.test.js
  API Portfolio
    ✓ GET /api/health doit retourner 200 OK
    ✓ POST /api/contact doit accepter les données valides
    ✓ POST /api/contact doit rejeter les données invalides
    ✓ POST /api/contact doit traiter une injection SQL comme du texte
    ✓ POST /api/contact doit appliquer le rate limiting

Tests: 5 passed, 5 total
```

### 12.2 Tests du frontend (Jest + React Testing Library)
```bash
cd my-cv-next
npm test
```

```text
PASS __tests__/Header.test.js
  Header
    ✓ affiche le logo "AN."
    ✓ affiche les liens de navigation
    ✓ affiche le bouton Contact

Tests: 3 passed, 3 total
```

### 12.3 Test d'intégration frontend → API → base de données
1. `docker compose up -d`
2. `curl http://localhost:4000/api/health`
3. Envoi d'un message depuis le formulaire de contact.
4. Vérification en base avec la commande `psql` de la section 11.

---

## 13. Activité 11 — Pipeline Jenkins (CI)

*(étapes 61 à 63)*

### 13.1 Étapes du pipeline CI

1. **Checkout** : récupération du code depuis GitHub.
2. **Install Frontend** et **Install API** : `npm ci`.
3. **Generate Prisma Client** : `npx prisma generate` sur l'hôte Jenkins.
4. **Test Frontend** et **Test API** : exécution des tests.
5. **Build API Image** et **Build Frontend Image** : `docker build`.
6. **Verify Images** : `docker images | grep devsecops`.

Les images sont taguées avec le **SHA court du commit Git** (ex. `devsecops-api:52046b3`) et avec `latest`.

> La version complète du pipeline, avec les contrôles de sécurité (étapes 64 à 69), est décrite en section 20. Le `Jenkinsfile` du dépôt fait foi.

### 13.2 Résultat

```text
Tests Frontend : 3/3
Tests API      : 5/5
Pipeline réussi ! Images construites : devsecops-api:52046b3 et devsecops-portfolio:52046b3
Finished: SUCCESS
```

```text
devsecops-api:52046b3         951MB
devsecops-portfolio:52046b3   1.38GB
```

Le frontend est construit avec **Next.js 16.4.5** (mise à jour effectuée pour corriger la vulnérabilité CVE-2025-66478 présente dans la 15.1.6).

---

## 14. Problèmes rencontrés et solutions

| Problème | Cause | Solution |
| :--- | :--- | :--- |
| `node_modules` envoyé sur GitHub | `.gitignore` créé trop tard | `git rm -r --cached api/node_modules`, `.gitignore` racine, puis `git merge -s ours origin/main` |
| `docker build` : `Cannot find module 'dotenv/config'` | `prisma.config.ts` importe `dotenv`, absent avec `--omit=dev` | Mettre `dotenv`, `prisma` et `@prisma/client` dans `dependencies` |
| `SASL: client password must be a string` dans les tests | Tests lancés sans `DATABASE_URL` | Mock de Prisma dans `server.test.js` |
| `Cannot resolve environment variable: DATABASE_URL` (CI) | `prisma generate` exige la variable | `DATABASE_URL` factice dans le Jenkinsfile |
| `unexpected token: }` dans le Jenkinsfile | Accolades en trop après un copier-coller | Réécriture complète du Jenkinsfile |
| `Could not resolve host: github.com`, `EAI_AGAIN`, `ETIMEDOUT` | DNS du NAT VMware instable | Cache DNS local `dnsmasq` (127.0.0.1), DNS publics (1.1.1.1, 8.8.8.8) dans `/etc/docker/daemon.json` |
| `COPY node_modules/.prisma` : not found | `node_modules` exclu par `.dockerignore` | Exceptions `!node_modules/@prisma` et `!node_modules/.prisma` |
| `npm ci` en timeout dans Docker | Réseau instable | `fetch-retries` et `fetch-timeout` dans le Dockerfile frontend |
| Erreur YAML netplan (`inconsistent indentation`) | Lignes mal indentées | Fichier réécrit, test avec `netplan try` |
| Mot de passe Jenkins oublié | — | Compte recréé via la console de script, puis mot de passe changé |
| Jenkins ne démarre plus (`Unable to read config.xml`) | `config.xml` modifié avec `sed` | Restauration depuis la sauvegarde, validation avec `xmllint` |
| Disque `/` à 94-95 % | Images, caches Docker, boxes et VMs | `docker image prune -a`, `docker builder prune` (95 % → 77 %) ; ajout d'un disque de 30 Go monté sur `/mnt/bigdisk` (`mkfs.ext4`, `chown`, entrée `/etc/fstab` avec `nofail`, `VAGRANT_HOME` redirigé) ; vérifier avec `lsblk -f`, `findmnt /mnt/bigdisk` et `sudo mount -a` |
| `mkdir: Permission denied` sur `/mnt/bigdisk` | Point de montage appartenant à `root` | `sudo chown -R najjar:najjar /mnt/bigdisk` |
| Build Jenkins en échec sur Trivy (`zlib1g` CVE-2023-45853) | CVE CRITICAL classée `will_not_fix` par Debian | `--ignore-unfixed` et `.trivyignore` avec justification (section 20.6) |
| Fichiers parasites dans le dépôt (`api/trivy_*.tar.gz`, `LICENSE` de l'archive Gitleaks) | Archives décompressées dans le dépôt | Suppression, règle `*.tar.gz` dans `.gitignore` |
| `docker compose up` non lancé par Ansible | Le playbook cherchait `docker-compose.yml` | Remplacement par `compose.yaml` |

---

## 15. Sécurité : points d'attention

- Ne jamais versionner `.env` ni de mots de passe réels. Les identifiants de `compose.yaml` sont des valeurs de développement : à remplacer par des secrets en production.
- Changer le mot de passe temporaire du compte Jenkins et le stocker dans un gestionnaire de mots de passe.
- Ne pas utiliser `sed` directement sur `config.xml` : sauvegarder, modifier, puis valider avec `xmllint`.
- Surveiller les vulnérabilités : `npm audit` (l'API en signalait encore 20, dont 17 modérées, lors d'un audit précédent).
- Garder des sauvegardes de `/var/lib/jenkins` (jobs, credentials, `config.xml`).
- Ne jamais commiter la clé NVD ni les credentials Jenkins : la clé reste dans Jenkins Credentials (`nvd-api-key`).

---

## 16. Parcours complet : étapes 1 à 69

Les points dépendant d'un service externe ou d'une clé (NVD pour Dependency-Check) sont conditionnels : ils ne doivent être présentés comme validés que s'ils ont été réellement exécutés.

| Étape | Réalisation |
| :--- | :--- |
| 1 | Préparation de la VM Ubuntu Server |
| 2 | Installation et activation du service OpenSSH |
| 3 | Test de connexion SSH depuis la machine physique |
| 4 | Installation et vérification de Docker Engine |
| 5 | Installation de Jenkins comme service système |
| 6 | Création du mini-CV HTML/CSS/JavaScript |
| 7 | Initialisation du dépôt Git local |
| 8 | Configuration de GitHub par clé SSH |
| 9 | Organisation des sections About, Skills, Projects, Experience et Contact |
| 10 | Ajout de la section DevSecOps Skills |
| 11 | Génération dynamique de la liste des projets |
| 12 | Création du Dockerfile Nginx |
| 13 | Construction de l'image Docker du mini-CV |
| 14 | Lancement et vérification du conteneur |
| 15 | Déploiement du mini-CV avec Docker Compose |
| 16 | Publication du code sur GitHub |
| 17 | Installation et vérification de Vagrant |
| 18 | Création du Vagrantfile |
| 19 | Validation de la configuration Vagrant |
| 20 | Création et démarrage de la VM Vagrant |
| 21 | Connexion à la VM avec `vagrant ssh` |
| 22 | Vérification du hostname de la VM |
| 23 | Ajustement des ressources CPU/RAM selon le provider libvirt |
| 24 | Création de l'application frontend Next.js |
| 25 | Organisation des composants réutilisables |
| 26 | Séparation des données dans le dossier `data/` |
| 27 | Création des pages projets et des routes dynamiques |
| 28 | Création du backend Node.js / Express |
| 29 | Ajout de la route `/api/health` |
| 30 | Ajout de la route `/api/profile` |
| 31 | Ajout de la route `/api/projects` |
| 32 | Ajout de la route `/api/skills` |
| 33 | Configuration des variables d'environnement |
| 34 | Protection des fichiers locaux avec `.gitignore` |
| 35 | Connexion du frontend Next.js à l'API Express |
| 36 | Création de la route de contact `POST /api/contact` |
| 37 | Validation des données entrantes avec Zod |
| 38 | Gestion centralisée des erreurs Express |
| 39 | Ajout des en-têtes HTTP avec Helmet |
| 40 | Limitation des requêtes avec express-rate-limit |
| 41 | Documentation des risques OWASP API Security Top 10 |
| 42 | Préparation du déploiement automatisé avec Ansible |
| 43 | Création du playbook Ansible de déploiement Docker Compose |
| 44 | Intégration du provisionnement Ansible dans Vagrant |
| 45 | Test de destruction et recréation de la VM |
| 46 | Réception des messages via la route de contact |
| 47 | Connexion du formulaire Next.js à l'API |
| 48 | Validation stricte du formulaire côté backend |
| 49 | Centralisation des réponses d'erreur |
| 50 | Sécurisation des réponses HTTP avec Helmet |
| 51 | Protection contre les abus par rate limiting |
| 52 | Revue des contrôles OWASP API Security Top 10 |
| 53 | Ajout du service PostgreSQL dans Compose |
| 54 | Persistance des messages avec Prisma |
| 55 | Génération du client et migrations Prisma |
| 56 | Documentation des variables de base de données dans `.env.example` |
| 57 | Tests unitaires frontend avec Jest / Testing Library |
| 58 | Tests de l'API Express avec Jest / Supertest |
| 59 | Tests des entrées invalides et des requêtes malformées |
| 60 | Tests d'intégration de la chaîne frontend → API → base de données |
| 61 | Exécution des tests dans Jenkins |
| 62 | Construction des images Docker frontend et API |
| 63 | Tag des images avec le SHA du commit |
| 64 | Détection des secrets avec Gitleaks |
| 65 | Analyse statique SAST avec Semgrep |
| 66 | Audit des dépendances Node.js avec `npm audit` |
| 67 | Analyse CVE avec OWASP Dependency-Check (conditionnée par l'accès NVD) |
| 68 | Scan des images Docker avec Trivy |
| 69 | Mise en place des security gates Jenkins et vérification des codes de retour |

---

## 17. Commandes utiles

| Action | Commande |
| :--- | :--- |
| Construire et lancer | `docker compose up -d --build` |
| Voir les conteneurs | `docker compose ps` |
| Logs d'un service | `docker compose logs api` |
| Arrêter les services | `docker compose down` |
| Lister les images | `docker images` |
| Vérifier l'API | `curl http://localhost:4000/api/health` |
| Tester le frontend | `curl -I http://localhost:3000` |
| Espace disque | `df -h /` et `docker system df` |
| Nettoyer Docker | `docker image prune -a` |
| Lancer les tests API | `cd api && npm test` |
| Lancer les tests frontend | `cd my-cv-next && npm test` |
| Statut Jenkins | `sudo systemctl status jenkins` |

---

## 18. Captures d'écran

| Élément | Fichier |
| :--- | :--- |
| Portfolio déployé | `docs/capture-portfolio.png` |
| Tests API | `docs/tests-api.png` |
| Tests frontend | `docs/tests-frontend.png` |
| Pipeline Jenkins CI (SUCCESS) | `docs/jenkins-success.png` |
| Vue des stages Jenkins | `docs/jenkins-stages.png` |
| Images Docker taguées par SHA | `docs/jenkins-images-sha.png` |
| Pipeline DevSecOps réussi | `docs/pipeline-security-success.png` |
| Pipeline DevSecOps échoué (Gitleaks) | `docs/pipeline-security-failed.png` |
| Rapport Dependency-Check | `docs/depcheck-report.png` |
| Scan Trivy | `docs/trivy-scan.png` |

Exemple d'intégration :
```markdown
![Pipeline Jenkins](docs/jenkins-success.png)
```

---

## 19. Auteur

**Amin Najjar** — Master DevOps & Cloud
GitHub : https://github.com/najjaramin
Dépôt : https://github.com/najjaramin/myCV

---

## 20. Phase 16 — Pipeline DevSecOps Jenkins (étapes 64 à 69)

Le pipeline applique une stratégie **Shift Left Security** : les contrôles de sécurité s'exécutent à chaque commit, avant de considérer les images Docker comme prêtes. Gitleaks, Semgrep et Trivy sont appelés en ligne de commande depuis le serveur Jenkins ; OWASP Dependency-Check s'exécute dans un conteneur Docker.

| Étape | Outil | Rôle | Condition d'échec |
| :--- | :--- | :--- | :--- |
| 64 | Gitleaks | Détection de secrets (clés, jetons, mots de passe) | Au moins un secret détecté |
| 65 | Semgrep | SAST du code `api/` et `my-cv-next/` | Au moins un résultat de sévérité `ERROR` |
| 66 | `npm audit` | Vulnérabilités des dépendances Node.js (production) | Vulnérabilité `critical` |
| 67 | OWASP Dependency-Check | Analyse CVE via la base NVD | CVSS ≥ 9.0 |
| 68 | Trivy | Scan des images `devsecops-api` et `devsecops-portfolio` | Vulnérabilité `CRITICAL` corrigeable |
| 69 | Jenkins | Les codes de retour non nuls stoppent le pipeline | Tout ce qui précède |

Ordre des stages :

```text
Checkout → Prepare → Gitleaks → Install Frontend → Install API → Prisma generate
→ Test Frontend → Test API → Semgrep → npm audit → Dependency-Check
→ Build API Image → Build Frontend Image → Verify Images → Trivy
```

Les rapports (`gitleaks.json`, `semgrep.json`, `npm-audit-*.json`, `depcheck/`, `trivy-*.json`) sont archivés dans Jenkins à chaque build, même en cas d'échec.

### 20.1 Préparation du dépôt

Fichiers de configuration ajoutés à la racine :

`.gitignore` (ajouts) :
```gitignore
# Rapports et artefacts locaux
reports/
*.tar.gz
demo-secret.txt
```

`.gitleaks.toml` :
```toml
title = "DevSecOps Portfolio - Gitleaks"

[extend]
useDefault = true

[allowlist]
description = "Dossiers et fichiers générés"
paths = [
  '''(^|/)node_modules/''',
  '''(^|/)\.next/''',
  '''(^|/)\.git/''',
  '''(^|/)reports/''',
  '''package-lock\.json$''',
]
```

`.trivyignore` :
```text
# zlib1g CVE-2023-45853 : Debian 12 "will_not_fix".
# Concerne uniquement zipOpenNewFileInZip4_6 (minizip), non utilisé par l'application.
CVE-2023-45853
```

Nettoyage : suppression de `api/trivy_0.60.0_Linux-64bit.tar.gz` et de `LICENSE` (archive Gitleaks) qui polluaient le dépôt et le contexte Docker.

### 20.2 Étape 64 — Gitleaks

```bash
gitleaks detect --source . --no-git --config .gitleaks.toml --redact --verbose \
  --exit-code=1 --report-format json --report-path reports/gitleaks.json
```

Sortie attendue sans secret :
```text
INF scan completed
INF no leaks found
```

`--redact` masque les valeurs sensibles dans les logs ; le code de sortie 1 fait échouer le stage si un secret est détecté.

### 20.3 Étape 65 — Semgrep (SAST)

Règles : `p/javascript`, `p/nodejs`, `p/owasp-top-ten`. Seuls les résultats `ERROR` bloquent le pipeline.

```bash
semgrep scan --config p/javascript --config p/nodejs --config p/owasp-top-ten \
  --exclude node_modules --exclude .next --exclude reports \
  --severity ERROR --error --metrics=off \
  --json-output=reports/semgrep.json api my-cv-next
```

### 20.4 Étape 66 — npm audit

Un rapport complet non bloquant est produit, puis un contrôle bloquant limité à la production avec le seuil `critical`.

```bash
cd api
npm audit || true
npm audit --json > ../reports/npm-audit-api.json || true
npm audit --omit=dev --audit-level=critical      # bloquant

cd ../my-cv-next
npm audit || true
npm audit --json > ../reports/npm-audit-front.json || true
npm audit --omit=dev --audit-level=critical      # bloquant
```

**Exemple de dépendance vulnérable détectée**

| Champ | Valeur |
| :--- | :--- |
| Dépendance | `deepmerge` (>= 4.2.0) |
| Vulnérabilité | GHSA-gcqx-w48m-w2h4 (prototype poisoning via `mergeObject()`) |
| Sévérité | moderate |
| Chemin | `jest` > `@jest/core` > `jest-config` > `deepmerge` |
| Correctif | `npm audit fix --force` (changement majeur de `jest`, non appliqué) |
| Outil | npm audit |

Cette dépendance appartient à l'outil de test `jest` : elle n'est pas embarquée en production, donc le contrôle bloquant (`--omit=dev --audit-level=critical`) ne la retient pas.

**Exemple corrigé :** `next@15.1.6` était signalée par npm (CVE-2025-66478, 1 vulnérabilité critique). Le frontend est passé à Next.js 16.4.5. Le résultat final doit être confirmé par un nouveau rapport d'audit.

### 20.5 Étape 67 — OWASP Dependency-Check

Dependency-Check complète `npm audit` en identifiant les composants vulnérables à partir des CVE de la base NVD. Il analyse les `package-lock.json` de l'API et du frontend avec `--failOnCVSS 9`.

Configuration :

- Clé API NVD (gratuite) stockée dans Jenkins Credentials, ID `nvd-api-key`, injectée via `withCredentials` (jamais en clair dans le Jenkinsfile).
- Base conservée dans `/var/lib/jenkins/dependency-check-data` (propriétaire `jenkins`) : seul le premier lancement est long (10 à 40 minutes).
- Paramètre de build `RUN_DEPCHECK` pour désactiver le stage si la clé ou le réseau ne sont pas disponibles.

```bash
docker run --rm -u $(id -u):$(id -g) \
  -v "$WORKSPACE":/src \
  -v "$DEPCHECK_DATA":/usr/share/dependency-check/data \
  owasp/dependency-check:latest \
  --project "DevSecOps Portfolio" \
  --scan /src/api/package-lock.json \
  --scan /src/my-cv-next/package-lock.json \
  --disableNodeAudit \
  --format HTML --format JSON \
  --out /src/reports/depcheck \
  --failOnCVSS 9 \
  --nvdApiKey "$NVD_KEY"
```

Rapport : `reports/depcheck/dependency-check-report.html`.

> **À renseigner avant le rendu :** n'indiquer cette étape comme validée que si le stage a réellement terminé avec succès dans Jenkins. S'il a été désactivé (`RUN_DEPCHECK` décoché) faute de clé NVD ou de réseau stable, l'écrire explicitement ici. Ne pas inventer de CVE : s'appuyer sur le rapport réel.

### 20.6 Étape 68 — Trivy

Deux passes : des rapports JSON informatifs, puis un contrôle bloquant sur les vulnérabilités `CRITICAL` corrigeables.

```bash
# Rapports JSON (informatifs, exit-code 0)
trivy image --no-progress --scanners vuln --severity HIGH,CRITICAL \
  --format json --output reports/trivy-api.json --exit-code 0 "$IMAGE_API"
trivy image --no-progress --scanners vuln --severity HIGH,CRITICAL \
  --format json --output reports/trivy-front.json --exit-code 0 "$IMAGE_FRONT"

# Contrôle bloquant
for IMG in "$IMAGE_API" "$IMAGE_FRONT"; do
  trivy image --no-progress --scanners vuln --ignore-unfixed \
    --severity CRITICAL --exit-code 1 "$IMG"
done
```

**CVE acceptée : `zlib1g` CVE-2023-45853.** Le build #65 avait échoué à cause d'elle : Trivy la signale (CRITICAL) dans l'image de base Debian 12, mais Debian l'a classée `will_not_fix`, donc il n'existe pas de correctif. Elle ne concerne que `zipOpenNewFileInZip4_6` (minizip), que l'application n'utilise pas. Elle est ignorée via `--ignore-unfixed` et `.trivyignore`, avec cette justification.

`--ignore-unfixed` ne signifie pas que la vulnérabilité a disparu : c'est une décision de risque documentée.

### 20.7 Étape 69 — Security gates et démonstration

Chaque outil retourne un code de sortie non nul quand une règle bloquante est déclenchée ; Jenkins interrompt alors le pipeline et marque le build `FAILURE`.

**Démonstration d'un échec volontaire** avec le paramètre `DEMO_SECRET` :

1. Jenkins → *Build with Parameters* → cocher `DEMO_SECRET` → *Build*.
2. Le stage `Prepare` écrit un faux jeton non valide dans `demo-secret.txt` (jamais commité).
3. Gitleaks détecte la chaîne : le stage Gitleaks passe en rouge et les stages suivants ne sont pas lancés.
4. Relancer avec `DEMO_SECRET` décoché : le pipeline repasse au vert si les autres contrôles réussissent.

Le fichier de démonstration est supprimé dans `post { always { ... } }`. Utiliser uniquement une chaîne factice, jamais un vrai token, une clé privée ou un mot de passe.

### 20.8 Jenkinsfile complet

```groovy
pipeline {
    agent any

    options {
        timeout(time: 120, unit: 'MINUTES')
    }

    parameters {
        booleanParam(
            name: 'DEMO_SECRET',
            defaultValue: false,
            description: 'Etape 69 (demo) : ajoute un FAUX secret dans le workspace pour prouver que Gitleaks fait echouer le pipeline'
        )
        booleanParam(
            name: 'RUN_DEPCHECK',
            defaultValue: true,
            description: 'Executer OWASP Dependency-Check (long au premier lancement)'
        )
    }

    environment {
        GIT_SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        IMAGE_API = "devsecops-api:${GIT_SHA}"
        IMAGE_FRONT = "devsecops-portfolio:${GIT_SHA}"
        // Valeur factice : prisma generate ne se connecte pas a la base
        DATABASE_URL = 'postgresql://user:pass@localhost:5432/db'
        DEPCHECK_IMAGE = 'owasp/dependency-check:latest'
        DEPCHECK_DATA = '/var/lib/jenkins/dependency-check-data'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code source...'
                checkout scm
            }
        }

        stage('Prepare') {
            steps {
                sh 'rm -rf reports demo-secret.txt && mkdir -p reports'
                script {
                    if (params.DEMO_SECRET) {
                        echo 'DEMO_SECRET active : ajout d un FAUX secret (jamais commite)'
                        sh 'echo "github_token=ghp_1234567890abcdefghijklmnopqrstuvwxyz" > demo-secret.txt'
                    }
                }
            }
        }

        // ETAPE 64
        stage('Gitleaks - Scan des secrets') {
            steps {
                echo 'Scan des secrets avec Gitleaks...'
                sh 'gitleaks detect --source . --no-git --config .gitleaks.toml --redact --verbose --exit-code=1 --report-format json --report-path reports/gitleaks.json'
            }
        }

        stage('Install Frontend') {
            steps {
                echo 'Installation des dépendances du frontend...'
                dir('my-cv-next') {
                    sh '''
                        npm config set fetch-retries 5
                        npm config set fetch-retry-mintimeout 20000
                        npm config set fetch-retry-maxtimeout 120000
                        npm config set fetch-timeout 600000
                        npm ci
                    '''
                }
            }
        }

        stage('Install API') {
            steps {
                echo 'Installation des dépendances de l API...'
                dir('api') {
                    sh '''
                        npm config set fetch-retries 5
                        npm config set fetch-retry-mintimeout 20000
                        npm config set fetch-retry-maxtimeout 120000
                        npm config set fetch-timeout 600000
                        npm ci
                    '''
                }
            }
        }

        stage('Generate Prisma Client') {
            steps {
                echo 'Génération du client Prisma sur l hôte...'
                dir('api') {
                    sh 'npx prisma generate'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                echo 'Exécution des tests du frontend...'
                dir('my-cv-next') {
                    sh 'npm test'
                }
            }
        }

        stage('Test API') {
            steps {
                echo 'Exécution des tests de l API...'
                dir('api') {
                    sh 'npm test'
                }
            }
        }

        // ETAPE 65
        stage('Semgrep - SAST') {
            steps {
                echo 'Analyse SAST du backend et du frontend...'
                sh 'semgrep scan --config p/javascript --config p/nodejs --config p/owasp-top-ten --exclude node_modules --exclude .next --exclude reports --severity ERROR --error --metrics=off --json-output=reports/semgrep.json api my-cv-next'
            }
        }

        // ETAPE 66
        stage('NPM Audit - Dépendances') {
            steps {
                echo 'Contrôle des dépendances Node.js...'
                dir('api') {
                    // Rapport informatif complet (non bloquant)
                    sh 'npm audit || true'
                    sh 'npm audit --json > ../reports/npm-audit-api.json || true'
                    // Contrôle bloquant : echec si vulnerabilite critique en production
                    sh 'npm audit --omit=dev --audit-level=critical'
                }
                dir('my-cv-next') {
                    sh 'npm audit || true'
                    sh 'npm audit --json > ../reports/npm-audit-front.json || true'
                    sh 'npm audit --omit=dev --audit-level=critical'
                }
            }
        }

        // ETAPE 67
        stage('OWASP Dependency-Check') {
            when { expression { params.RUN_DEPCHECK } }
            steps {
                echo 'OWASP Dependency-Check (echec si CVSS >= 9.0)...'
                timeout(time: 90, unit: 'MINUTES') {
                    withCredentials([string(credentialsId: 'nvd-api-key', variable: 'NVD_KEY')]) {
                        sh '''
                            mkdir -p "$DEPCHECK_DATA" reports/depcheck
                            docker run --rm -u $(id -u):$(id -g) \
                              -v "$WORKSPACE":/src \
                              -v "$DEPCHECK_DATA":/usr/share/dependency-check/data \
                              $DEPCHECK_IMAGE \
                              --project "DevSecOps Portfolio" \
                              --scan /src/api/package-lock.json \
                              --scan /src/my-cv-next/package-lock.json \
                              --disableNodeAudit \
                              --format HTML --format JSON \
                              --out /src/reports/depcheck \
                              --failOnCVSS 9 \
                              --nvdApiKey "$NVD_KEY"
                        '''
                    }
                }
            }
        }

        stage('Build API Image') {
            steps {
                echo "Construction de l'image ${IMAGE_API}..."
                sh "docker build -t ${IMAGE_API} -t devsecops-api:latest ./api"
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo "Construction de l'image ${IMAGE_FRONT}..."
                sh "docker build -t ${IMAGE_FRONT} -t devsecops-portfolio:latest ./my-cv-next"
            }
        }

        stage('Verify Images') {
            steps {
                echo 'Vérification des images construites...'
                sh 'docker images | grep devsecops'
            }
        }

        // ETAPES 68 ET 69
        stage('Trivy - Scan des images') {
            steps {
                echo 'Scan des images Docker avec Trivy...'
                sh '''
                    # Rapports JSON (informatifs, exit-code 0)
                    trivy image --no-progress --scanners vuln --severity HIGH,CRITICAL --format json --output reports/trivy-api.json --exit-code 0 "$IMAGE_API"
                    trivy image --no-progress --scanners vuln --severity HIGH,CRITICAL --format json --output reports/trivy-front.json --exit-code 0 "$IMAGE_FRONT"

                    # Controle bloquant : CRITICAL avec correctif disponible
                    for IMG in "$IMAGE_API" "$IMAGE_FRONT"; do
                      echo "=== Controle bloquant CRITICAL : $IMG ==="
                      trivy image --no-progress --scanners vuln --ignore-unfixed --severity CRITICAL --exit-code 1 "$IMG"
                    done
                '''
            }
        }
    }

    post {
        always {
            sh 'rm -f demo-secret.txt'
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
        }
        success {
            echo "Pipeline réussi ! Images : ${IMAGE_API} et ${IMAGE_FRONT}"
        }
        failure {
            echo 'Pipeline échoué : secret, vulnérabilité critique ou test en erreur. Voir les rapports archivés.'
        }
    }
}
```

### 20.9 Captures d'écran

| Cas | Capture |
| :--- | :--- |
| Pipeline réussi (tous les stages verts) | `docs/pipeline-security-success.png` |
| Pipeline volontairement échoué (Gitleaks) | `docs/pipeline-security-failed.png` |
| Rapport Dependency-Check | `docs/depcheck-report.png` |
| Scan Trivy | `docs/trivy-scan.png` |

```markdown
![Pipeline réussi](docs/pipeline-security-success.png)
![Pipeline échoué (Gitleaks)](docs/pipeline-security-failed.png)
```

> Les captures doivent provenir de vrais builds Jenkins et être ajoutées dans `docs/` avant le push.

---

## 21. Publication du projet sur GitHub

Depuis la racine du dépôt :

```bash
cd ~/portfolios/my-cv
git status
git add README.md Jenkinsfile .gitignore .gitleaks.toml .trivyignore ansible/deploy-portfolio.yml docs/
git commit -m "docs: README complet étapes 1 à 69"
git push origin main
```

Vérifier ensuite le dépôt distant : https://github.com/najjaramin/myCV

Ne pas ajouter les fichiers `.env`, `.env.local`, les clés SSH, les tokens ou les credentials Jenkins au dépôt.
