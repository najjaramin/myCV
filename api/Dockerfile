FROM node:22-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances (avec les scripts désactivés)
RUN npm ci --omit=dev --ignore-scripts

# Copier le client Prisma généré sur l'hôte Jenkins
COPY node_modules/.prisma ./node_modules/.prisma
COPY node_modules/@prisma/client ./node_modules/@prisma/client

# Copier la config et le schéma
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Copier le reste des fichiers
COPY server.js projects.js skills.js profile.js ./

EXPOSE 4000
CMD ["node", "server.js"]
