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

4. **Configurer votre authentification GitHub**:

   > **IMPORTANT**: GitHub n'accepte plus l'authentification par mot de passe pour les opérations Git. Vous devez utiliser un token d'accès personnel ou GitHub CLI.

   **Option A: Utiliser GitHub CLI sur Windows (méthode recommandée)**:
   
   1. **Installer GitHub CLI** - Choisissez UNE des méthodes suivantes :
   
      - **Méthode 1 : Avec Windows Package Manager (winget)** :
        - Ouvrez PowerShell ou l'invite de commandes
        - Exécutez cette commande :
        ```
        winget install GitHub.cli
        ```
      
      - **Méthode 2 : Téléchargement direct** :
        - Téléchargez l'installateur Windows depuis [https://cli.github.com/](https://cli.github.com/)
        - Exécutez le fichier `.msi` téléchargé
        - Suivez les instructions de l'assistant d'installation
   
   2. **Ouvrez une NOUVELLE fenêtre** PowerShell ou invite de commandes (pour que les changements soient pris en compte)
   
   3. **Vérifiez l'installation** :
      ```
      gh --version
      ```
      Vous devriez voir quelque chose comme `gh version 2.x.x`
   
   4. **Authentifiez-vous** :
      ```
      gh auth login
      ```
   
   5. **Répondez aux questions** :
      - À "What account do you want to log into?", sélectionnez `GitHub.com`
      - À "What is your preferred protocol for Git operations?", sélectionnez `HTTPS`
      - À "How would you like to authenticate?", sélectionnez `Login with a web browser`
      - Une page de navigateur s'ouvrira automatiquement, suivez les instructions pour vous connecter
      - Vous verrez un message comme "Authentication complete" dans le navigateur et "Authentication complete" dans votre terminal

   **Option B: Utiliser un token d'accès personnel**:
   - Accédez à [https://github.com/settings/tokens](https://github.com/settings/tokens)
   - Cliquez sur "Generate new token" (classic)
   - Donnez un nom au token, comme "Portfolio Deployment"
   - Sélectionnez les autorisations: au minimum `repo` pour un dépôt privé ou public
   - Copiez le token généré (il ne sera visible qu'une seule fois!)
   - Configurez Git pour stocker votre token en toute sécurité:
     ```bash
     # Pour Windows, utilisez Git Credential Manager (installé avec Git par défaut)
     git config --global credential.helper manager-core
     
     # Pour macOS
     git config --global credential.helper osxkeychain
     
     # Pour Linux
     git config --global credential.helper cache
     ```

5. **Pousser votre code vers GitHub**:
   ```bash
   git push -u origin main
   ```
   ✔️ Si vous utilisez un token, vous serez invité à entrer votre nom d'utilisateur GitHub et votre token comme mot de passe
   ✔️ Si vous utilisez GitHub CLI, l'authentification sera automatique
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

### 1. Problèmes d'authentification GitHub

- **Erreur "Support for password authentication was removed"** :
  - C'est normal! GitHub n'accepte plus l'authentification par mot de passe depuis août 2021
  - Solution: utilisez GitHub CLI (`gh auth login`) ou un token d'accès personnel comme décrit ci-dessus

- **Problème de stockage des identifiants** :
  ```bash
  # Vérifiez votre configuration de credential helper
  git config --global --list | grep credential
  
  # Sur Windows, assurez-vous que Git Credential Manager est installé
  git credential-manager --version
  
  # Réinitialiser votre cache d'identifiants si nécessaire
  git config --global --unset credential.helper
  git config --global credential.helper manager-core
  ```

- **Identifiants refusés avec un token** :
  - Vérifiez que votre token a les bonnes autorisations (au moins `repo`)
  - Assurez-vous de copier-coller le token complet sans espaces supplémentaires
  - Créez un nouveau token si nécessaire, l'ancien pourrait être expiré

### 2. Problèmes d'affichage du site

- **Les fichiers ne s'affichent pas correctement** :
  - Vérifiez que tous les chemins dans votre code sont relatifs (pas de chemins absolus comme `C:\...`)
  - Assurez-vous que les références aux images et aux fichiers CSS/JS sont correctes
  - Examinez le code HTML avec les outils de développeur de votre navigateur (F12) pour trouver les erreurs 404

- **Erreur 404 en accédant au site** :
  - Assurez-vous que vous utilisez la bonne URL (vérifiez dans les paramètres GitHub Pages)
  - Vérifiez que GitHub Pages est bien activé dans les paramètres
  - Patientez jusqu'à 10-15 minutes, le déploiement peut prendre du temps
  - Vérifiez que votre fichier d'index s'appelle bien `index.html` (sensible à la casse)

### 3. Problèmes avec les commits et push

- **Erreur "Failed to push some refs"** :
  ```bash
  # Essayez de synchroniser d'abord avec le dépôt distant
  git pull --rebase origin main
  git push origin main
  ```

- **Changements non pris en compte** :
  ```bash
  # Vérifiez l'état de vos fichiers
  git status
  
  # Assurez-vous que tous les fichiers sont bien ajoutés
  git add .
  git status  # Vérifiez encore
  
  # Committer et pousser
  git commit -m "Votre message de commit"
  git push
  ```

## Pour aller plus loin

- **Ajouter un nom de domaine personnalisé**:
  - Dans les paramètres GitHub Pages, vous pouvez configurer un domaine personnalisé

- **Utiliser des actions GitHub pour l'intégration continue**:
  - Créez un fichier `.github/workflows/deploy.yml` pour automatiser davantage le déploiement

- **Ajouter des analyses**:
  - Intégrez Google Analytics ou Plausible pour suivre les visites sur votre portfolio
