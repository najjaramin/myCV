This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Point 20 — Données séparées

Les données des compétences sont stockées dans `data/skills.ts`.
Les données des projets sont stockées dans `data/projects.ts`.

Exemple :

```ts
{ name: "Docker", category: "Containers" }
```

Exemple de projet :

```ts
{
  slug: "devsecops-portfolio",
  title: "DevSecOps Portfolio",
  tags: ["Next.js", "React", "TypeScript"]
}
```

## Point 21 — Pages projets

- `/projects` : affiche la liste des projets.
- `/projects/devsecops-portfolio` : affiche les détails du projet.
- `/projects/it-infrastructure-monitoring` : affiche les détails du projet de supervision.

Les pages dynamiques récupèrent leurs informations depuis `data/projects.ts`.

### Captures d'écran

Après avoir lancé le site, prendre de vraies captures d'écran des pages `/projects` et `/projects/devsecops-portfolio`.

Les enregistrer dans `docs/screenshots/`, puis ajouter :

![Liste des projets](docs/screenshots/projects.png)

![Détail d'un projet](docs/screenshots/project-detail.png)


## VI. CI/CD avec Jenkins

### 22. Création du pipeline Jenkins

Un pipeline Jenkins a été configuré pour récupérer automatiquement le dépôt GitHub du projet DevSecOps Portfolio.

- **Repository :** `git@github.com:najjaramin/myCV.git`
- **Branche :** `main`
- **Jenkinsfile :** fichier de configuration du pipeline situé à la racine du dépôt.
- **Authentification :** connexion SSH à GitHub via des credentials Jenkins.

Le stage `Checkout` permet de récupérer le code source depuis GitHub.

![Checkout GitHub](docs/screenshots/pipeline-checkout.png)

### 23. Installation des dépendances

Le pipeline utilise la commande `npm ci` dans le répertoire `my-cv-next` pour installer les dépendances définies dans `package-lock.json`.

Les versions utilisées pendant l'exécution sont :

- **Node.js :** `v22.23.3`
- **npm :** `10.9.9`
- **Dépendances installées :** 350 packages

![Installation des dépendances](docs/screenshots/pipeline-install.png)

### 24. Construction automatique de l'application Next.js

Le stage `Build Next.js` exécute la commande `npm run build` afin de compiler l'application et de vérifier sa préparation pour la production.

Le build s'est terminé avec succès. Next.js a compilé l'application, vérifié le code TypeScript et généré les pages statiques.

Commande exécutée :

```bash
npm run build
```

Résultat Jenkins : `Finished: SUCCESS`

![Build Next.js](docs/screenshots/pipeline-build.png)
