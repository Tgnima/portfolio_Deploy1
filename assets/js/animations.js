/**
 * Script d'animation pour le portfolio
 * Anime les éléments avec la classe .has-animation au défilement
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && 
            rect.bottom >= 0
        );
    }
    
    // Fonction pour animer les éléments visibles
    function animateVisibleElements() {
        const animatedElements = document.querySelectorAll('.has-animation:not(.animated)');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
                
                // Ajouter un délai pour les éléments enfants
                const children = element.querySelectorAll('.has-animation:not(.animated)');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, 150 * (index + 1));
                });
            }
        });
    }
    
    // Ajouter la classe .has-animation aux éléments qu'on veut animer
    function setupAnimations() {
        // Ajouter aux sections principales
        const sections = ['about', 'projects', 'contact'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.querySelectorAll('.section-title, .section-description').forEach(el => {
                    el.classList.add('has-animation');
                });
            }
        });
        
        // Ajouter aux cartes de projet
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('has-animation');
        });
        
        // Ajouter aux éléments d'équipe
        document.querySelectorAll('.team-member, .skill-category, .achievement-item').forEach(el => {
            el.classList.add('has-animation');
        });
        
        // Ajouter aux éléments de contact
        document.querySelectorAll('.contact-item').forEach(item => {
            item.classList.add('has-animation');
        });
        
        // Élément social-links (doit déjà avoir cette classe)
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) {
            socialLinks.classList.add('has-animation');
        }
    }
    
    // Configurer les animations
    setupAnimations();
    
    // Déclencher l'animation initiale
    animateVisibleElements();
    
    // Écouter l'événement de défilement
    window.addEventListener('scroll', animateVisibleElements);
    
    // Animer la page d'accueil immédiatement
    document.querySelectorAll('.hero-content .has-animation').forEach(el => {
        setTimeout(() => {
            el.classList.add('animated');
        }, 300);
    });
});
