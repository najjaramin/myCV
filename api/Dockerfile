FROM node:22-bookworm-slim

WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node prisma.config.ts ./

RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm config set fetch-timeout 600000 \
 && npm ci --omit=dev --ignore-scripts

# هنا الحل: نعطيوه DATABASE_URL وهمية
RUN DATABASE_URL="postgresql://user:pass@localhost:5432/db" npx prisma generate

COPY --chown=node:node server.js projects.js skills.js profile.js ./

EXPOSE 4000
CMD ["node", "server.js"]
