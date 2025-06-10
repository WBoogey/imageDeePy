# CloudVision - Frontend

CloudVision est une application web Vue 3 permettant d'analyser des déchets à partir d'une image, d'obtenir la poubelle appropriée, une suggestion de réutilisation, et de suivre son historique d'analyses. Ce frontend communique avec une API Node.js (back) et une API Python (imagePy).

## Fonctionnalités principales
- Authentification (inscription, connexion, déconnexion)
- Analyse d'image (upload, drag & drop, preview, résultat IA)
- Historique des analyses (CRUD)
- Profil utilisateur (infos, avatar, empreinte carbone)
- Responsive et moderne (Vue 3, Vite, Pinia, Tailwind)

## Prérequis
- Node.js >= 18
- pnpm ou npm
- Le backend (API Node) doit tourner sur http://localhost:8001
- L'API Python (imagePy) doit tourner sur http://localhost:7071

## Installation

```sh
pnpm install # ou npm install
```

## Lancer le projet en développement

```sh
pnpm run dev # ou npm run dev
```

L'application sera accessible sur http://localhost:5173

## Structure des dossiers

- `src/views/` : Pages principales (Analyse, Historique, Profil, Auth)
- `src/components/` : Composants réutilisables (Header, Sidebar, etc.)
- `src/services/` : Appels API (analyse, historique...)
- `src/stores/` : Stores Pinia (auth, etc.)
- `src/types/` : Types TypeScript partagés

## Tests

### Tests unitaires (Vitest)

```sh
pnpm run test:unit
```
- Les tests sont dans `src/stores/tests/` et autres dossiers `__tests__`.

### Tests end-to-end (Cypress)

```sh
pnpm run test:e2e:dev
```
- Les tests e2e sont dans `cypress/e2e/`.
- Pour lancer les tests sur la build de prod :
  ```sh
  pnpm run build
  pnpm run test:e2e
  ```

## Fonctionnement général

- **Authentification** : Les utilisateurs peuvent s'inscrire, se connecter, se déconnecter. Le token JWT est stocké en cookie.
- **Analyse d'image** : L'utilisateur upload une image, l'API Python retourne la catégorie, la poubelle, la suggestion de réutilisation et l'empreinte carbone.
- **Historique** : Chaque analyse est enregistrée, l'utilisateur peut consulter et supprimer ses analyses.
- **Profil** : Affiche les infos de l'utilisateur connecté, son avatar, son email, et des stats.

## Lancer avec Docker (optionnel)

Si tu utilises le monorepo avec docker-compose, le front sera accessible sur http://localhost:5173 automatiquement.

---
- Projet CloudVision 2025
