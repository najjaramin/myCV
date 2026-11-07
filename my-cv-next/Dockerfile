FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Retry + timeouts akbar (el DNS/réseau yتقطّع)
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
