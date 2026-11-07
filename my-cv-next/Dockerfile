FROM node:22-alpine

WORKDIR /app

# Forcer le DNS dans le conteneur de build
RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf

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
