# CloudVision - Backend

Ce dossier contient l'API backend de CloudVision, développée en TypeScript (Node.js, Express, TSOA, Drizzle ORM, MariaDB/MySQL).

## Fonctionnalités principales
- Authentification JWT (inscription, connexion, récupération user par token ou id)
- API RESTful pour l'historique des analyses (CRUD)
- Documentation Swagger auto-générée (/docs)
- Architecture modulaire (domain, infrastructure, repository)

## Prérequis
- Node.js >= 18
- pnpm ou npm
- MariaDB ou MySQL (ou utiliser le service Docker inclus)

## Installation

```sh
pnpm install # ou npm install
```

## Configuration

Crée un fichier `.env` à la racine de `back/` avec par exemple :
```
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=waste_db
DB_PORT=3306
JWT_SECRET=un_secret_au_hasard
PORT=8001
```

## Lancer le backend en développement

```sh
pnpm run dev # ou npm run dev
```

L'API sera accessible sur http://localhost:8001

## Documentation API

La documentation Swagger est disponible sur http://localhost:8001/docs

## Structure des dossiers
- `src/domain/` : logique métier (user, history, logger)
- `src/infrastructure/` : Express, config, routes, middlewares
- `src/infrastructure/shared/db/` : schéma Drizzle ORM
- `src/infrastructure/shared/HTTP/controllers/` : contrôleurs TSOA

## Tests

### Lancer les tests unitaires
```sh
pnpm run test
```

## Lancer avec Docker (recommandé)

Le backend est prêt à être lancé avec Docker Compose (voir le fichier `docker-compose.yml` à la racine du monorepo) :

```sh
docker-compose up --build
```

---