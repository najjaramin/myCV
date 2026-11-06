FROM node:22-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances SANS exécuter les scripts
RUN npm ci --omit=dev --ignore-scripts

# Copier la configuration Prisma
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Désactiver le téléchargement du moteur Prisma (variable d'environnement)
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=library
ENV PRISMA_CLIENT_ENGINE_TYPE=library

# Générer le client Prisma avec une URL factice
ARG DATABASE_URL="postgresql://user:password@localhost:5432/db"
ENV DATABASE_URL=$DATABASE_URL

# Générer le client (le moteur est déjà dans l'image node:22-alpine)
RUN npx prisma generate

# Copier le reste des fichiers
COPY server.js projects.js skills.js profile.js ./

EXPOSE 4000
CMD ["npm", "start"]
