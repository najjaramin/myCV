#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

docker build -t mini-cv .
docker rm -f mini-cv || true
docker run -d --name mini-cv -p 8081:80 --restart unless-stopped mini-cv
