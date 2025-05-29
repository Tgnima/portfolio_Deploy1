// Script pour gérer les chemins sur GitHub Pages
(function() {
    // Détecte si nous sommes sur GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    // Configure le chemin de base en fonction de l'environnement
    window.baseUrl = isGitHubPages ? '/portfolio_Deploy1' : '';
    
    // Fonction utilitaire pour corriger les chemins d'URL
    window.getCorrectPath = function(path) {
        // Si le chemin commence déjà par http ou //, c'est une URL absolue, on ne la modifie pas
        if (path.startsWith('http') || path.startsWith('//')) {
            return path;
        }
        
        // Si le chemin commence par /, on ajoute le baseUrl
        if (path.startsWith('/')) {
            return window.baseUrl + path;
        }
        
        // Sinon, on ajoute le baseUrl et un /
        return window.baseUrl + '/' + path;
    };
    
    // Corrige tous les liens href et src après chargement de la page
    document.addEventListener('DOMContentLoaded', function() {
        // Corrige les liens
        document.querySelectorAll('a[href]').forEach(function(link) {
            const href = link.getAttribute('href');
            // Ne pas modifier les liens d'ancre, les URLs absolues ou mailto
            if (!href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:')) {
                link.setAttribute('href', getCorrectPath(href));
            }
        });
        
        // Corrige les images et scripts
        document.querySelectorAll('img[src], script[src]').forEach(function(element) {
            const src = element.getAttribute('src');
            if (!src.startsWith('http') && !src.startsWith('//')) {
                element.setAttribute('src', getCorrectPath(src));
            }
        });
    });
})();
