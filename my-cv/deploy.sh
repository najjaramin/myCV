#!/bin/bash
set -e

docker build -t cv-docker .
docker rm -f cv-portfolio 2>/dev/null || true
docker run -d \
  --name cv-portfolio \
  -p 8081:80 \
  --restart unless-stopped \
  cv-docker
