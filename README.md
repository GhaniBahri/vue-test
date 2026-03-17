# 🚀 Plateforme de Gestion de Recrutement

> Application Vue 3 de gestion de candidatures — Test Technique Junior/Mid-Level

---

## 📋 Présentation

Application moderne de gestion de candidatures conçue pour aider les recruteurs à trier,
filtrer et suivre les candidats efficacement. Interface réactive avec support du mode sombre.

---

## 🛠 Stack Technique

| Technologie | Version | Rôle |
|---|---|---|
| Vue 3 | ^3.5 | Framework principal |
| Pinia | ^3.0 | Gestion d'état |
| Vue Router | ^5.0 | Navigation |
| Axios | ^1.13 | Requêtes HTTP |
| Tailwind CSS | v4 | Styles & thème |
| JSON Server | ^1.0 | API REST simulée |
| Vite | ^7.0 | Build tool |
| ESLint + Prettier | latest | Qualité & formatage du code |
| concurrently | latest | Lancement simultané API + App |
| Lucide Vue Next | ^0.577 | Bibliothèque d'icônes |

---

## 🏗 Architecture
```
src/
├── api/           # Couche HTTP (axios + endpoints)
├── components/
│   ├── elements/  # Composants atomiques (Card, Widget)
│   └── layout/    # Structure globale (Sidebar, Footer)
├── router/        # Définition des routes
├── store/         # État global Pinia
└── views/         # Pages (Dashboard, Liste, Détail, 404)
```

**Flux de données :**
```
Vue Component → Pinia Action → API Layer (Axios) → JSON Server
                     ↑                                    |
                     └──────────── state update ──────────┘
```

---

## ✨ Fonctionnalités

### 💹 Dashboard
- Statistiques dynamiques
- Taux de recrutement et volume de candidatures en temps réel

### 🔍 Gestion des Candidatures
- Recherche textuelle full-text (`?q=`) et filtres par statut et salaire
- Double affichage : vue **Grille** (Flip Cards) / vue **Liste**
- Pagination côté serveur (`_page`, `_limit`)

### 👤 Détail Candidat
- Page dédiée — données chargées via `GET /candidatures/:id`
- Modification du statut avec persistance via `PATCH`
- Journal de commentaires collaboratif

### 🌙 Mode Sombre 
- Intégration native Tailwind v4 via variables CSS
- Persistance du choix via `localStorage`

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js >= 18
- npm >= 9

### Installation
```bash
npm install
```

### Lancement (API + App simultanément)
```bash
npm run start
```

> Utilise `concurrently` pour lancer JSON Server sur `http://localhost:3000`
> et l'application Vue sur `http://localhost:5173` en une seule commande.

### Ou séparément
```bash
# Terminal 1 — API
npm run api

# Terminal 2 — App
npm run dev
```

---

## 📝 Choix Techniques

**Vite** — Choisi pour sa rapidité de démarrage et son rechargement à chaud (HMR)
quasi-instantané, ce qui améliore significativement l'expérience de développement
par rapport à des bundlers plus traditionnels.

**Tailwind CSS v4** — Choisi pour sa flexibilité, sa documentation exhaustive et sa
prise en main rapide. La v4 élimine le besoin d'un `tailwind.config.js` en définissant
le thème directement via des variables CSS natives, ce qui simplifie considérablement
la gestion du mode sombre.

**Pinia** — Préféré à Vuex pour sa syntaxe plus simple et intuitive, sa configuration
minimale et son intégration native avec Vue 3 et la Composition API. Utilisé ici pour
centraliser la logique de filtrage et éviter le props drilling entre composants.

**Axios** — Utilisé pour sa gestion centralisée des requêtes via une instance partagée
(`axios.create`). Les intercepteurs permettent une gestion uniforme des erreurs réseau
et des réponses HTTP, évitant la duplication de code dans chaque composant.

**ESLint + Prettier** — Combinés pour assurer la qualité du code et un formatage
uniforme à travers tout le projet. Les règles sont appliquées automatiquement via
les scripts `lint` et `format`.

**GitHub Actions** — Pipeline CI configuré pour exécuter automatiquement les vérifications
de formatage (`prettier --check`) et de linting (`eslint`) à chaque Pull Request,
garantissant qu'aucun code non conforme n'est intégré à la branche principale.

**Lucide Vue Next** — Bibliothèque d'icônes SVG légère et tree-shakeable,
chaque icône est importée individuellement ce qui évite d'alourdir le bundle final.

---

## 🤖 Utilisation des Outils IA

Des outils d'IA (Gemini) ont été utilisés comme assistants durant
ce projet pour la **revue de code** (identifier les anti-patterns, valider les
choix d'architecture) et l'**amélioration de la rédaction** de la documentation.
Tout le code produit a été compris, adapté et validé manuellement.

---

## ⏱ Temps de Réalisation

| Partie | Durée |
|---|---|
| Analyse & Diagnostic | 45 min |
| Configuration & API Layer | 45 min |
| Store / Logique de filtrage | 2h 00 |
| UI/UX — Composants & Animations | 2h 00 |
| Documentation & Finalisation | 30 min |
| **Total** | **~6h** |

---

## 🔧 Scripts disponibles
```bash
npm run start     # Lance API + App simultanément (via concurrently)
npm run dev       # App Vue uniquement
npm run api       # JSON Server uniquement
npm run build     # Build de production
npm run lint      # ESLint --fix
npm run format    # Prettier --write
```

---

## 📸 Captures d'écran

> *Petits écrans*

| Dashboard | Liste des candidatures | Détail candidat | Détail candidat |
|---|---|---|---|
| ![dashboard](/test_technique_fonrtend/images/dashboard_sm.PNG) | ![liste](/test_technique_fonrtend/images/candidats_liste_sm.PNG) | ![detail](/test_technique_fonrtend/images/detail_sm_1.PNG) | ![detail](/test_technique_fonrtend/images/detail_sm_2.PNG) |

> *Grands écrans*

| Dashboard | Liste des candidatures | Vue Grille | Détail candidat |
|---|---|---|---|
| ![dashboard](/test_technique_fonrtend/images/dashboard.PNG) | ![liste](/test_technique_fonrtend/images/candidats_liste_gm.PNG) | ![grille](/test_technique_fonrtend/images/candidats_grille_gm.PNG) | ![detail](/test_technique_fonrtend/images/detail_lg.PNG) |

---

## 🔮 Améliorations Possibles

- Drag & drop pour changer le statut (vue Kanban)
- Tests unitaires avec Vitest (mocking des appels API)
- Optimistic UI updates avec rollback en cas d'erreur
- WebSocket ou polling pour les mises à jour temps réel
- Export CSV des candidatures filtrées

---

## ⚠️ Notes

- Le fichier `db.json` doit être présent à la racine du projet
- JSON Server doit être lancé **avant** l'application Vue
- Les modifications sont persistées dans `db.json` en temps réel