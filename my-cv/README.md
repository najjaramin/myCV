
# DevSecOps Portfolio

Portfolio personnel réalisé avec HTML, CSS et JavaScript, déployé avec Docker, Nginx et Docker Compose.

## 1. Présentation

Ce projet permet de présenter mon profil, mes compétences, mes projets et mes expériences. Il met en pratique Linux, Git, GitHub, Docker et le déploiement d'une application web statique.

## 2. Technologies utilisées

- HTML5, CSS3 et JavaScript
- Linux / Ubuntu Server
- Docker et Docker Compose
- Nginx
- Git et GitHub via SSH

## 3. Structure du projet

```text
my-cv/
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── compose.yaml
├── deploy.sh
└── README.md
```

## 4. Création du Dockerfile

Le Dockerfile utilise l'image officielle Nginx Alpine pour servir le portfolio.

```dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## 5. Construction de l'image Docker

Commande utilisée :

```bash
docker build -t cv-docker .
```

Vérification :

```bash
docker images
```

Capture d'écran : résultat de la construction et image `cv-docker`.

## 6. Exécution du conteneur Docker

Commande utilisée :

```bash
docker run -d --name cv-portfolio -p 8081:80 --restart unless-stopped cv-docker
```

Vérification :

```bash
docker ps
```

Test depuis le serveur :

```bash
curl http://localhost:8081
```

Le portfolio est accessible à l'adresse `http://IP_DU_SERVEUR:8081`.

Capture d'écran : résultat de `docker ps` et portfolio ouvert dans le navigateur.

## 7. Déploiement avec Docker Compose

Fichier `compose.yaml` :

```yaml
services:
  portfolio:
    build: .
    image: cv-docker
    container_name: cv-portfolio-compose
    ports:
      - "8082:80"
    restart: unless-stopped
```

Commande de déploiement :

```bash
docker compose up -d
```

Vérification :

```bash
docker compose ps
```

Le portfolio est accessible à l'adresse `http://IP_DU_SERVEUR:8082`.

Capture d'écran : résultat de `docker compose ps` et portfolio dans le navigateur.

## 8. Publication sur GitHub via SSH

Vérification du dépôt et de la connexion :

```bash
git status
git remote -v
ssh -T git@github.com
```

Commandes de publication :

```bash
git add Dockerfile compose.yaml deploy.sh README.md
git commit -m "Add Docker and Docker Compose deployment"
git push
```

Lien du dépôt GitHub : à compléter avec l'URL réelle du dépôt.

Capture d'écran : publication réussie et état final de Git.

## 9. Conclusion

Docker et Nginx permettent de servir le portfolio dans un conteneur. Docker Compose facilite le déploiement du service, tandis que Git et GitHub assurent le suivi et le partage des modifications.

## Point 17 : configuration automatique de la VM

Le Vagrantfile configure le nom, l'adresse IP privée, la mémoire et le nombre de CPU :

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2204"
  config.vm.boot_timeout = 1200

  config.vm.define "ubuntu-devsecops" do |vm|
    # Nom de la machine (hostname dans le système)
    vm.vm.hostname = "ubuntu-devsecops"

    # Adresse IP privée
    vm.vm.network "private_network", ip: "192.168.56.10"

    vm.vm.provider "libvirt" do |lv|
      # Nom de la VM côté libvirt (sans préfixe automatique)
      lv.default_prefix = ""

      # Émulation logicielle (pas de virtualisation imbriquée)
      lv.driver = "qemu"
      lv.cpu_mode = "custom"
      lv.cpu_model = "qemu64"

      # Ressources
      lv.memory = 1024
      lv.cpus = 2
    end

    vm.vm.provision "shell", inline: <<-SHELL
      echo "VM prête : $(hostname)"
      lsb_release -d
    SHELL
  end
end
```

### Résultat de `vagrant status`

```text
Current machine states:

ubuntu-devsecops          not created (libvirt)

The Libvirt domain is not created. Run `vagrant up` to create it.
```

![vagrant status](captures/vagrant-status.png)

| Paramètre | Valeur |
|---|---|
| Nom de la VM | ubuntu-devsecops |
| IP privée | 192.168.56.10 |
| Mémoire | 1024 Mo |
| CPU | 2 |
