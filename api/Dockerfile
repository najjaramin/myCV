FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY prisma ./prisma/
COPY prisma.config.ts ./

# Valeur factice: prisma generate ne se connecte pas à la base
ARG DATABASE_URL="postgresql://user:pass@localhost:5432/db"
RUN npx prisma generate

COPY server.js projects.js skills.js profile.js ./

EXPOSE 4000
CMD ["node", "server.js"]
