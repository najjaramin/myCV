# DevSecOps Portfolio

Portfolio personnel réalisé avec HTML5, CSS3 et JavaScript, puis déployé dans un conteneur Docker utilisant Nginx.

## 1. Présentation du projet

Ce projet consiste à créer et déployer un mini-CV accessible depuis un navigateur web. Il permet de mettre en pratique les bases de Git, GitHub, Linux, Docker et du déploiement web.

## 2. Technologies utilisées

- **HTML5** : structure du site web.
- **CSS3** : mise en page, design responsive et apparence du portfolio.
- **JavaScript** : interactions et fonctionnalités dynamiques.
- **Git** : gestion des versions du code source.
- **GitHub** : hébergement du dépôt.
- **Linux / Ubuntu Server** : environnement de travail et de déploiement.
- **Docker** : conteneurisation de l'application.
- **Nginx** : serveur web utilisé pour servir les fichiers statiques.

## 3. Structure du projet

```text
my-cv/
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── deploy.sh
└── README.md

Remarque : cette structure représente les fichiers attendus. Vérifiez leur présence avec ls -la.

4. Exécution locale

Depuis le répertoire du projet :

cd ~/my-cv
ls -la

Les fichiers HTML, CSS et JavaScript peuvent être testés dans un navigateur en ouvrant index.html.

5. Construction de l'image Docker

Le fichier Dockerfile utilise Nginx pour servir le site web.

docker build -t mini-cv .
docker images

6. Déploiement avec Docker

Lancement du conteneur :

docker rm -f mini-cv 2>/dev/null || true
docker run -d --name mini-cv -p 8081:80 --restart unless-stopped mini-cv

Vérification du conteneur :

docker ps
docker logs mini-cv

Le site est accessible à l'adresse suivante :

http://IP_DU_SERVEUR:8081

Remplacez IP_DU_SERVEUR par l'adresse IP réelle du serveur. Si vous utilisez le navigateur directement sur le serveur, vous pouvez tester http://localhost:8081.

7. Déploiement avec le script

Si le fichier deploy.sh existe et contient les commandes de déploiement :

chmod +x deploy.sh
./deploy.sh

Le script construit l'image Docker et relance le conteneur mini-cv.

8. Publication sur GitHub avec SSH

Vérifier la configuration Git :

git status
git remote -v
ssh -T git@github.com

Enregistrer les modifications et les publier :

git add README.md
git commit -m "Update project documentation"
git push

Le dépôt GitHub doit être créé et accessible avec le compte configuré en SSH. Si le dépôt distant n'est pas encore configuré, vérifiez son URL avant de lancer git push.

9. Vérifications et captures d'écran

Ajouter des captures réelles montrant :

Le portfolio affiché dans le navigateur.

Les fichiers du projet dans le terminal.

La construction de l'image Docker.

Le conteneur visible avec docker ps.

Les journaux du conteneur avec docker logs mini-cv.

Le site accessible depuis le navigateur.

L'état Git avec git status.

La publication réussie sur GitHub.

10. Conclusion

Ce projet met en pratique les bases du développement web et du déploiement d'une application statique. L'utilisation de Git et GitHub permet de versionner et partager le code, tandis que Docker et Nginx facilitent l'exécution du site dans un environnement isolé et reproductible.

Des étapes supplémentaires pourront être ajoutées ultérieurement pour intégrer une pipeline CI/CD, des contrôles de sécurité et des outils DevSecOps.
