FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY node_modules/.prisma ./node_modules/.prisma
COPY node_modules/@prisma/client ./node_modules/@prisma/client

COPY prisma ./prisma/
COPY prisma.config.ts ./

COPY server.js projects.js skills.js profile.js ./

EXPOSE 4000
CMD ["node", "server.js"]
