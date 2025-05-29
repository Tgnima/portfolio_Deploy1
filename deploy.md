# Guide de déploiement détaillé sur GitHub Pages

## Qu'est-ce que GitHub Pages?

GitHub Pages est un service d'hébergement gratuit proposé par GitHub qui permet de publier facilement des sites web directement à partir d'un dépôt GitHub. C'est une solution parfaite pour héberger un portfolio, un site personnel ou des documentations de projets.

## Prérequis détaillés

1. **Compte GitHub**:
   - Si vous n'avez pas de compte, inscrivez-vous sur [GitHub](https://github.com/join)
   - Vérifiez votre adresse e-mail après l'inscription

2. **Git installé sur votre ordinateur**:
   - Windows: Téléchargez et installez depuis [git-scm.com](https://git-scm.com/download/win)
   - Mac: Utilisez Homebrew avec `brew install git` ou téléchargez depuis [git-scm.com](https://git-scm.com/download/mac)
   - Linux: Utilisez votre gestionnaire de paquets (par exemple `sudo apt-get install git` pour Ubuntu/Debian)

3. **Vérification de l'installation Git**:
   - Ouvrez votre terminal ou invite de commandes
   - Tapez `git --version` pour vérifier que Git est bien installé

## Guide pas à pas pour déployer votre portfolio

### 1. Préparer votre dossier de portfolio

1. **Ouvrir votre terminal ou invite de commandes**

2. **Naviguer vers votre dossier de portfolio**:
   ```bash
   # Par exemple:
   cd "c:\Users\gnima\OneDrive\Bureau\Perso\portfolio"
   ```

3. **Vérifier le contenu du dossier** (facultatif mais recommandé):
   ```bash
   # Sur Windows:
   dir
   # Sur Mac/Linux:
   ls -la
   ```
   ✔️ Assurez-vous que tous vos fichiers HTML, CSS, JavaScript et images sont présents

### 2. Initialiser Git dans votre dossier

1. **Créer un nouveau dépôt Git local**:
   ```bash
   git init
   ```
   ✔️ Vous devriez voir un message confirmant la création d'un dépôt Git vide

2. **Vérifier que le dépôt a bien été créé** (facultatif):
   ```bash
   # Sur Windows/Mac/Linux:
   git status
   ```
   ✔️ Vous devriez voir un message indiquant que vous êtes sur la branche master/main avec des fichiers non suivis

### 3. Ajouter vos fichiers au suivi Git

1. **Ajouter tous les fichiers**:
   ```bash
   git add .
   ```
   ✔️ Cette commande ne produira pas de sortie visible si elle fonctionne correctement

2. **Vérifier que les fichiers ont bien été ajoutés** (recommandé):
   ```bash
   git status
   ```
   ✔️ Vous devriez maintenant voir tous vos fichiers listés en vert, prêts à être committés

### 4. Créer votre premier commit

1. **Enregistrer les modifications dans un commit**:
   ```bash
   git commit -m "Version initiale du portfolio profesionnel"
   ```
   ✔️ Vous devriez voir un résumé des fichiers ajoutés

### 5. Créer un nouveau dépôt sur GitHub

1. **Ouvrir GitHub dans votre navigateur**:
   - Rendez-vous sur [GitHub](https://github.com) et connectez-vous

2. **Créer un nouveau dépôt**:
   - Cliquez sur le bouton "+" en haut à droite, puis sélectionnez "New repository"
   - OU allez directement à l'URL: [https://github.com/new](https://github.com/new)

3. **Configurer le nouveau dépôt**:
   - **Nom du dépôt**: Entrez `portfolio`
     (Alternative: entrez `<votre-username>.github.io` si vous souhaitez un site à cette adresse précise)
   - **Description**: "Portfolio professionnel présentant mes projets de data science et visualisation"
   - **Visibilité**: Public (obligatoire pour GitHub Pages gratuit)
   - **Initialization**: Décochez toutes les options (README, .gitignore, license)

4. **Créer le dépôt**:
   - Cliquez sur le bouton vert "Create repository"

5. **Copier l'URL du dépôt**:
   - Après la création, vous verrez une page avec des instructions
   - Copiez l'URL HTTPS de votre dépôt qui ressemble à:
     `https://github.com/<votre-username>/portfolio.git`

### 6. Lier votre dépôt local au dépôt GitHub

1. **Retournez à votre terminal** où vous avez initialisé Git

2. **Ajouter le dépôt GitHub comme "origin"**:
   ```bash
   git remote add origin https://github.com/<votre-username>/portfolio.git
   ```
   ✔️ Remplacez `<votre-username>` par votre nom d'utilisateur GitHub réel
   ✔️ Cette commande ne produit pas de sortie si elle réussit

3. **Renommer la branche principale en "main"** (standard actuel de GitHub):
   ```bash
   git branch -M main
   ```

4. **Pousser votre code vers GitHub**:
   ```bash
   git push -u origin main
   ```
   ✔️ Vous pourriez être invité à entrer vos identifiants GitHub
   ✔️ Vous devriez voir une progression du téléversement et un message de confirmation

### 7. Configurer GitHub Pages

1. **Accéder aux paramètres du dépôt**:
   - Sur votre page de dépôt GitHub, cliquez sur "Settings" (onglet avec une roue dentée)

2. **Trouver la section GitHub Pages**:
   - Faites défiler la page vers le bas jusqu'à trouver "Pages" dans la barre latérale gauche
   - Cliquez sur "Pages"

3. **Configurer la source**:
   - Sous "Source", cliquez sur le menu déroulant "None" ou "Branch"
   - Sélectionnez "main"
   - Dans le second menu déroulant, sélectionnez "/ (root)"
   - Cliquez sur "Save"

4. **Attendre le déploiement**:
   - Un message bleu apparaîtra indiquant "Your site is being built"
   - Attendez quelques minutes que le déploiement se termine

### 8. Accéder à votre site déployé

1. **Trouver l'URL de votre site**:
   - Une fois le déploiement terminé, vous verrez un message: "Your site is published at https://..." 
   - L'URL sera généralement: `https://<votre-username>.github.io/portfolio/`
   - Si vous avez utilisé le nom `<votre-username>.github.io`, l'URL sera simplement: `https://<votre-username>.github.io/`

2. **Vérifier votre site**:
   - Cliquez sur l'URL ou copiez-la dans votre navigateur
   - Vérifiez que votre portfolio s'affiche correctement
   - Testez la navigation et toutes les fonctionnalités

## Mettre à jour votre portfolio

Chaque fois que vous apportez des modifications à votre portfolio et que vous souhaitez les publier:

1. **Sauvegarder vos modifications** dans vos fichiers locaux

2. **Ajouter les fichiers modifiés au suivi Git**:
   ```bash
   git add .
   ```

3. **Committer les changements avec un message descriptif**:
   ```bash
   git commit -m "Description précise des modifications apportées"
   ```
   ✔️ Par exemple: `git commit -m "Ajout de nouveaux projets et mise à jour du design"`

4. **Pousser les modifications vers GitHub**:
   ```bash
   git push
   ```
   ✔️ Vos changements seront automatiquement déployés sur GitHub Pages dans les minutes qui suivent

## Dépannage

Si vous rencontrez des problèmes:

1. **Les fichiers ne s'affichent pas correctement**:
   - Vérifiez que tous les chemins dans votre code sont relatifs (pas de chemins absolus comme `C:\...`)
   - Assurez-vous que les références aux images et aux fichiers CSS/JS sont correctes

2. **Erreur 404 en accédant au site**:
   - Assurez-vous que vous utilisez la bonne URL
   - Vérifiez que GitHub Pages est bien activé dans les paramètres
   - Patientez quelques minutes, le déploiement peut prendre du temps

3. **Problèmes avec git push**:
   - Vérifiez vos identifiants GitHub
   - Essayez de générer un token d'accès personnel dans les paramètres GitHub si l'authentification par mot de passe échoue

## Pour aller plus loin

- **Ajouter un nom de domaine personnalisé**:
  - Dans les paramètres GitHub Pages, vous pouvez configurer un domaine personnalisé

- **Utiliser des actions GitHub pour l'intégration continue**:
  - Créez un fichier `.github/workflows/deploy.yml` pour automatiser davantage le déploiement

- **Ajouter des analyses**:
  - Intégrez Google Analytics ou Plausible pour suivre les visites sur votre portfolio
