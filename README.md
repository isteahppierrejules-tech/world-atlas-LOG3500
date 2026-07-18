# LOG3500 - Conception et programmation de sites Web I
## Devoir 2 : Applications Web Asynchrones & API
### Option 1 : L'Atlas Mondial Interactif

Ce projet consiste en une application web asynchrone responsive connectée à l'API réelle **REST Countries API (v3.1)**. L'utilisateur peut saisir le nom d'un pays pour générer dynamiquement sa carte d'identité sémantique et visuelle.

---

## 🚀 Fonctionnalités implémentées

- **Architecture HTML5 Sémantique** : Utilisation des balises structurantes (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **Mise en page & Responsive Design** : Alignement moderne grâce à CSS Flexbox et Grid, s'adaptant parfaitement aux smartphones, tablettes et ordinateurs.
- **Indicateur de Chargement** : Un spinner d'attente animé s'affiche pendant la requête réseau et disparaît à l'injection des données.
- **Accessibilité Numérique (a11y)** : Gestion dynamique des attributs `aria-invalid` et `aria-describedby` avec des messages d'erreur explicites pour les champs vides.
- **Asynchronisme Moderne** : Utilisation de l'API `fetch()` couplée avec l'architecture `async / await` dans un bloc `try...catch`.
- **Sécurité du DOM** : Protection stricte contre les failles XSS grâce à l'utilisation exclusive de la propriété `textContent` pour injecter les variables textuelles.
- **Gestion des Erreurs** : Interception des erreurs HTTP (ex: 404 si le pays n'existe pas) et des interruptions réseau avec des alertes adaptées à l'utilisateur.

---

## 📂 Structure du projet

Conformément aux directives, le projet respecte l'arborescence suivante :
- index.html
- css/
  - style.css
- js/
  - app.js
- README.md

---

## 🛠️ Technologies utilisées

- **HTML5** (Validé W3C)
- **CSS3** (Validé W3C, Flexbox, Grid)
- **JavaScript Modern (ES6+)** : Fetch API, Async/Await
- **API Externe** : [REST Countries](https://restcountries.com/)

---

## 🧑‍💻 Étudiant
- **Nom** : Pierre Jules Pharah
- **Programme** : DUT en TIC, ISTEAH
- **Session** : Été 2026