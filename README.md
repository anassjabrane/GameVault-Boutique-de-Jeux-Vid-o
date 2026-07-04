# 🎮 GAMEVAULT — Boutique de Jeux Vidéo d'Élite

**GAMEVAULT** est une application web moderne et responsive de commerce électronique dédiée aux passionnés de jeux vidéo. L'application récupère dynamiquement une large liste de jeux via une API publique, intègre un système de panier interactif avec gestion des quantités, et propose l'application de codes promotionnels.

---

## 🔗 Liens du Projet

Pour suivre la conception graphique et la gestion de ce projet, voici les accès directs aux différentes plateformes :

* **🎨 Design UI/UX (Figma) :** [Consulter la maquette Figma](https://www.figma.com/design/P4KjI6TZs3vhb0pi4fIIIt/Sans-titre?node-id=0-1&t=cy4T1gaQr5ECuP5T-0)
* **📋 Gestion de Projet (Trello) :** [Suivre le tableau Kanban Trello](https://trello.com/b/DkRgGWUO/gamevault-boutique-de-jeux-video)
* **✨ Présentation & Pitch (Canva) :** [Voir le support visuel Canva](https://www.canva.com/design/DAHFyZxa_PI/LTgjd8oEkw2Mzz2fLJ4wCQ/edit)

---

## 🚀 Fonctionnalités Clés

* **Chargement Dynamique (Fetch API) :** Intégration fluide avec l'API *FreeToGame* pour récupérer les derniers jeux tendance.
* **Skeleton Loader :** Une animation visuelle de chargement (cartes fictives pulsantes) pour améliorer l'expérience utilisateur (UX) pendant la récupération des données.
* **Système de Panier Avancé :**
    * Ajout de jeux en un clic.
    * Ajustement dynamique des quantités (+/-) et suppression d'articles.
    * Persistance des données via le `localStorage`.
* **Gestion de Coupon de Réduction :** Application en temps réel du code promo `GAMER30` offrant une réduction de 30% sur le montant total.
* **Filtres par Catégorie & Recherche :** Système de filtrage par genre de jeu et barre de recherche interactive en temps réel.
* **Interface Moderne & Responsive :** Design immersif conçu avec Tailwind CSS (Vibe sombre avec accents Indigo/Slate) et icônes stylisées (Font Awesome).

---

## 🛠️ Tech Stack (Technologies Utilisez)

* **HTML5 & CSS3** (Structure et sémantique)
* **Tailwind CSS** (Framework CSS utilitaire pour un design fluide et responsive)
* **JavaScript (ES6+)** (Logique métier, Fetch API, manipulation du DOM et LocalStorage)
* **Font Awesome** (Bibliothèque d'icônes pour le gaming)
* **FreeToGame API** (Source de données externe pour les jeux)

---

## 📂 Structure du Projet

```text
GAMEVAULT-BOUTIQUE-DE-JEUX-VID-O/
│
├── images/               # Dossier contenant les assets locaux (logos, etc.)
├── index.html            # Page principale de la boutique (Structure globale)
├── app.js                # Logique JavaScript (Fetch, Panier, Recherche, Code Promo)
├── tailwind.config.js    # Configuration personnalisée de Tailwind CSS
└── README.md             # Documentation du projet (Ce fichier)