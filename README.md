# DevSecOps Portfolio

Portfolio personnel développé avec Next.js et une API REST Express, conteneurisé avec Docker et Docker Compose.

## 40. Construction des images Docker

Deux images Docker sont utilisées :

- `devsecops-portfolio:1.0` : frontend Next.js.
- `devsecops-api:1.0` : backend Express.

### Construction de l'image API

```bash
cd api
docker build -t devsecops-api:1.0 .

