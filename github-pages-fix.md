# Correctifs pour GitHub Pages

Pour résoudre les problèmes de CSS et d'animations sur GitHub Pages, suivez ces étapes:

## 1. Ajouter jQuery manquant

Votre site fait référence à jQuery, mais le fichier n'existe pas dans votre dépôt.

1. Créez le dossier si nécessaire:
   ```bash
   mkdir -p assets/js
   ```

2. Téléchargez jQuery:
   ```bash
   curl -o assets/js/jquery.min.js https://code.jquery.com/jquery-3.6.0.min.js
   ```
   Ou téléchargez manuellement depuis [jquery.com](https://jquery.com/download/) et placez-le dans `assets/js/`

## 2. Modifiez index.html pour utiliser CDN au lieu de fichiers locaux

Ouvrez `index.html` et remplacez la référence à jQuery locale par un CDN fiable:

```html
<!-- Remplacez cette ligne -->
<script src="assets/js/jquery.min.js"></script>

<!-- Par celle-ci -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
```

## 3. Vérifiez que main.js existe et est correctement lié

Assurez-vous que le fichier `assets/js/main.js` existe et contient tout le code JavaScript nécessaire pour les animations.

## 4. Option avancée: Ajoutez un fichier .nojekyll à la racine

GitHub Pages utilise Jekyll par défaut, ce qui peut parfois interférer avec certains fichiers. Ajoutez un fichier vide nommé `.nojekyll` à la racine de votre dépôt:

```bash
touch .nojekyll
git add .nojekyll
git commit -m "Ajout du fichier .nojekyll pour désactiver Jekyll"
git push
```

## 5. Utiliser des chemins absolus basés sur la racine du site

Si vous rencontrez toujours des problèmes, modifiez vos chemins pour qu'ils commencent par `/portfolio/` au lieu de juste `/`:

```html
<!-- Remplacez ceci -->
<script src="assets/js/main.js"></script>

<!-- Par ceci (pour le dépôt nommé 'portfolio') -->
<script src="/portfolio/assets/js/main.js"></script>
```

Après avoir appliqué ces modifications, effectuez un nouveau commit et push:

```bash
git add .
git commit -m "Correction des chemins et ajout de jQuery pour GitHub Pages"
git push
```

Attendez quelques minutes pour que GitHub Pages redéploie votre site.
