# FrançaisPro - Application d'entraînement au français avec IA

Une application éducative moderne pour collégiens (11-15 ans) qui utilise l'intelligence artificielle pour générer des exercices personnalisés de français.

## 🚀 Fonctionnalités

### Modules d'exercices
- **Orthographe** : Accords, conjugaisons, homophones
- **Grammaire** : Nature des mots, fonctions, syntaxe  
- **Vocabulaire** : Synonymes, antonymes, expressions
- **Compréhension** : Analyse de textes

### Intelligence Artificielle (APIs Gratuites)
- **Gemini Flash** : API gratuite de Google
- Génération automatique d'exercices personnalisés
- Adaptation du niveau de difficulté en temps réel
- Analyse des erreurs pour cibler les lacunes
- Explications pédagogiques détaillées
- Système anti-rate limit avec délais entre requêtes

### Système de progression
- Profils utilisateur avec authentification
- Suivi détaillé des performances
- Système de badges et récompenses
- Graphiques de progression par compétence

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd francais-pro
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des APIs IA (Gratuites)**
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env et ajouter votre clé API gratuite
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Obtenir la clé API gratuite**

**Gemini (Google) :**
- Aller sur [Google AI Studio](https://makersuite.google.com/app/apikey)
- Créer un compte Google ou se connecter
- Générer une clé API gratuite
- Copier la clé dans `VITE_GEMINI_API_KEY`

5. **Lancer l'application**
```bash
npm run dev
```

## 📊 Base de données

L'application utilise SQLite avec les tables suivantes :
- `users` : Profils utilisateur et statistiques
- `user_progress` : Progression par module
- `user_badges` : Badges obtenus
- `exercises` : Historique des exercices

La base de données est créée automatiquement au premier lancement.

## 🎯 Utilisation

1. **Inscription/Connexion**
   - Créer un compte avec nom d'utilisateur, email et mot de passe
   - Se connecter pour accéder au tableau de bord

2. **Exercices classiques**
   - Choisir un module (orthographe, grammaire, etc.)
   - Réaliser les exercices prédéfinis
   - Consulter les explications détaillées

3. **Exercices IA personnalisés**
   - Cliquer sur "Exercices IA personnalisés"
   - L'IA génère des exercices adaptés à votre niveau
   - Les exercices s'adaptent à vos erreurs précédentes

4. **Suivi des progrès**
   - Consulter les statistiques détaillées
   - Voir la progression par module
   - Débloquer des badges de réussite

## 🔧 Technologies utilisées

- **Frontend** : React 18, TypeScript, Tailwind CSS
- **Base de données** : SQLite avec better-sqlite3
- **IA** : Gemini Flash (API gratuite) pour la génération d'exercices
- **Authentification** : bcryptjs pour le hachage des mots de passe
- **Build** : Vite

## 📝 Structure du projet

```
src/
├── components/          # Composants React
│   ├── AuthModal.tsx   # Modal de connexion/inscription
│   ├── Dashboard.tsx   # Tableau de bord principal
│   ├── ExerciseModule.tsx    # Exercices prédéfinis
│   ├── ExerciseGenerator.tsx # Exercices générés par IA
│   ├── ProgressTracking.tsx  # Suivi des progrès
│   └── BadgeSystem.tsx      # Système de badges
├── context/            # Contextes React
│   └── UserContext.tsx # Gestion de l'état utilisateur
├── services/           # Services
│   ├── database.ts     # Interface base de données
│   └── aiService.ts    # Service IA (Gemini + Mistral)
└── data/              # Données statiques
    └── exerciseData.ts # Exercices prédéfinis
```

## 🎨 Design

Interface moderne et colorée adaptée aux collégiens :
- Palette de couleurs engageante
- Animations et micro-interactions
- Design responsive (mobile, tablette, desktop)
- Gamification avec badges et niveaux

## 🔒 Sécurité

- Mots de passe hachés avec bcryptjs
- Validation des données côté client et serveur
- Sessions utilisateur sécurisées
- Clés API IA protégées

## 📈 Évolutions futures

- Intégration de nouveaux modules (conjugaison, dictée)
- Système de classes pour les enseignants
- Rapports détaillés pour les parents
- Mode hors ligne
- Application mobile native

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Optimiser les performances

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.