# Soukly — Boutique e-commerce

Application React construite avec Vite, Redux Toolkit, React Router et Bootstrap.

## Démarrer

```sh
npm install
npm run dev
```

## Fonctionnalités

- Catalogue chargé depuis FakeStore API avec états de chargement et d’erreur.
- Recherche par intitulé et filtre par catégorie.
- Ajout, modification et suppression de produits.
- Panier avec gestion des quantités et totaux séparés par devise (FakeStore en USD, produits saisis dans l’application en MAD).

Le catalogue et le panier sont gérés par les slices Redux dans `src/features`. Les produits de démonstration existants restent disponibles si l’API est indisponible.

## Tests

```sh
npm test
npm run test:watch
npm run test:coverage
```

Les tests utilisent Vitest, jsdom et React Testing Library. Le rapport LCOV est généré dans `coverage/lcov.info`.

## SonarQube

La configuration du projet se trouve dans `sonar-project.properties`. Avec SonarScanner installé et un serveur SonarQube configuré, lancez `sonar-scanner` depuis la racine du projet. Le jeton d’accès doit être fourni par l’environnement ou par la configuration locale, jamais enregistré dans le dépôt.
