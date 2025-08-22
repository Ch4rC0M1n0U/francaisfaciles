<!--
FrançaisPro - Guide de déploiement Easypanel
Instructions détaillées pour la mise en production

@author FrançaisPro Team
@version 1.0.0
@license MIT
-->

# 🚀 Guide de déploiement Easypanel

## Configuration requise

### 1. Clé API Gemini (gratuite)
1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Créez une nouvelle clé API
4. Copiez la clé (format : `AIzaSy...`)

## 📦 Déploiement sur Easypanel

### Étape 1 : Créer un nouveau service
1. Connectez-vous à votre dashboard Easypanel
2. Cliquez sur "Create Service"
3. Sélectionnez "GitHub Repository"
4. Connectez votre compte GitHub
5. Choisissez votre repository `francais-pro`
6. Branche : `main`

### Étape 2 : Configuration du service
- **Type** : Dockerfile
- **Port** : 80
- **Health Check** : `/health`

### Étape 3 : Variables d'environnement
Dans Easypanel, ajoutez cette variable :

| Variable | Valeur | Type |
|----------|---------|------|
| `VITE_GEMINI_API_KEY` | `votre_cle_api_gemini` | **Secret + Build Time** |

⚠️ **Important** : La variable doit être marquée comme **Secret** ET **Build Time**.

### Étape 4 : Ressources recommandées
- **CPU** : 500m
- **Memory** : 512Mi

## 🔍 Vérification du déploiement

### Tests après déploiement
1. **Page principale** : `https://votre-app.easypanel.app/`
2. **Health check** : `https://votre-app.easypanel.app/health`
3. **Fonctionnalités** :
   - ✅ Inscription/Connexion
   - ✅ Génération d'exercices IA
   - ✅ Sauvegarde des progrès
   - ✅ Système de badges

## 🚨 Dépannage

### Erreur de build
- Vérifiez que `VITE_GEMINI_API_KEY` est bien configurée
- Vérifiez que la variable est marquée "Build Time"

### Problème d'API Gemini
- Vérifiez que la clé API est correcte
- Vérifiez les quotas sur Google AI Studio

### Logs de déploiement
- Dans Easypanel : onglet "Logs" pour voir les logs en temps réel
- Onglet "Events" pour l'historique des déploiements

## 🎉 Félicitations !

Votre application FrançaisPro est maintenant déployée et accessible en ligne ! 🚀📚