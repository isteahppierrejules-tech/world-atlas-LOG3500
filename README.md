# Weather Dashboard - LOG3500

Ce projet consiste en une application web moderne, asynchrone et responsive qui interroge les API d'Open-Meteo pour afficher les conditions météorologiques actuelles d'une ville recherchée.

## Fonctionnalités Implémentées

- **Architecture Sémantique HTML5** : Utilisation stricte des balises structurelles (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **Asynchronisme Avancé** : Intégration de `fetch()` combiné avec `async / await` au sein d'un bloc `try...catch`.
- **Enchaînement de Requêtes (Chaining)** : 
  1. Étape 1 : Appel à l'API Geocoding pour obtenir la latitude et la longitude de la ville.
  2. Étape 2 : Appel à l'API Forecast avec les coordonnées obtenues pour récupérer les données météo en temps réel.
- **Sécurité du DOM** : Utilisation stricte de `textContent` pour l'injection des variables textuelles afin de bloquer les failles XSS.
- **Accessibilité Numérique (a11y)** : Gestion dynamique des attributs `aria-invalid` et `aria-describedby` en cas de saisie vide.
- **Design Responsive** : Layout flexible géré avec Flexbox et adapté aux supports mobiles via des Media Queries.

## Structure des Dossiers

```text
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md