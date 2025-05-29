document.addEventListener('DOMContentLoaded', function() {
    // Gérer l'effet de défilement sur l'en-tête
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');
    
    // Calculer la hauteur de la section hero pour détecter quand l'en-tête doit changer
    const heroHeight = heroSection ? heroSection.offsetHeight / 2 : 200;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Gestion des liens d'ancrage avec défilement fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtenir l'ID de la cible
            const targetId = this.getAttribute('href');
            
            // Si c'est juste #, ne rien faire (retour en haut de page)
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // Trouver l'élément cible
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Gérer les sélections d'onglets si nécessaire
                if (this.hasAttribute('data-section')) {
                    // Enlever la classe active de tous les onglets
                    document.querySelectorAll('.nav-tabs a').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    
                    // Ajouter la classe active à l'onglet cliqué
                    this.classList.add('active');
                    
                    // Cacher toutes les sections de catégorie
                    document.querySelectorAll('.category-section').forEach(section => {
                        section.style.display = 'none';
                    });
                    
                    // Afficher la section correspondante
                    const targetSection = document.querySelector(targetId + '-projects') || document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.style.display = 'block';
                    }
                }
                
                // Défiler vers la cible
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation d'apparition des éléments au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.has-animation');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Ajouter la classe 'has-animation' aux éléments à animer
    document.querySelectorAll('.category-section, .project-card, .team-member, .skill-category, .about-story, .achievements, .contact-item, .contact-form').forEach(el => {
        el.classList.add('has-animation');
    });
    
    // Déclencher l'animation au chargement et au scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Déclencher une fois au chargement initial
    setTimeout(animateOnScroll, 300);
    
    // Gestion du filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                // Obtenir la catégorie du filtre
                const filterValue = this.getAttribute('data-filter');
                
                // Afficher ou masquer les projets en fonction du filtre
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Filtrer automatiquement selon l'ancre dans l'URL au chargement
        const hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
            const categoryFilter = hash.substring(1); // Enlever le #
            const matchingFilter = document.querySelector(`.filter-btn[data-filter="${categoryFilter}"]`);
            
            if (matchingFilter) {
                matchingFilter.click();
            }
        }
    }
    // Gestion du menu déroulant pour les appareils tactiles
    const menuItems = document.querySelectorAll('.has-submenu');
    
    menuItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const submenu = item.querySelector('.submenu');
        
        // Comportement pour les appareils tactiles
        link.addEventListener('click', function(e) {
            // Vérifier si c'est un appareil tactile ou mobile
            if (window.innerWidth < 992 || 'ontouchstart' in window) {
                e.preventDefault();
                // Toggle pour ouvrir/fermer le sous-menu
                if (submenu.classList.contains('active')) {
                    submenu.classList.remove('active');
                    submenu.style.display = 'none';
                    link.classList.remove('submenu-open');
                } else {
                    // Fermer tous les autres sous-menus
                    document.querySelectorAll('.submenu').forEach(menu => {
                        menu.classList.remove('active');
                        menu.style.display = 'none';
                    });
                    document.querySelectorAll('.submenu-open').forEach(el => {
                        el.classList.remove('submenu-open');
                    });
                    
                    // Ouvrir le sous-menu actuel
                    submenu.classList.add('active');
                    submenu.style.display = 'block';
                    link.classList.add('submenu-open');
                }
            }
        });
    });
    
    // Fermer les sous-menus quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-submenu')) {
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.classList.remove('active');
                if (!submenu.parentElement.matches(':hover')) {
                    submenu.style.display = '';
                }
            });
            document.querySelectorAll('.submenu-open').forEach(el => {
                el.classList.remove('submenu-open');
            });
        }
    });
    
    // Fonctionnalité de navigation par onglets et sections
    const navTabs = document.querySelectorAll('.nav-tabs a');
    const categorySections = document.querySelectorAll('.category-section');
    
    // Optimiser la navigation et le filtrage des projets sans duplication
    const optimizeProjectsNavigation = () => {
        // Collecter les informations sur tous les projets
        const allProjects = [];
        const categories = ['dataviz', 'ml']; // Catégories principales
        
        // Obtenir tous les projets de chaque catégorie et stocker leurs informations
        categories.forEach(category => {
            const sectionId = `${category}-projects`;
            const section = document.getElementById(sectionId);
            if (section) {
                const projectCards = section.querySelectorAll('.project-card');
                projectCards.forEach(card => {
                    // Ajouter un attribut data-category pour le filtrage
                    card.setAttribute('data-category', category);
                    // Mémoriser l'emplacement d'origine pour pouvoir y revenir si nécessaire
                    allProjects.push({
                        element: card,
                        parentSection: section,
                        category: category
                    });
                });
            }
        });
        
        // Améliorer les onglets de navigation existants
        const navTabs = document.querySelectorAll('.nav-tabs a');
        
        // Ajouter des attributs de style pour indiquer l'onglet actif
        navTabs.forEach(tab => {
            tab.style.transition = 'var(--transition)';
            tab.style.padding = '10px 20px';
            tab.style.borderRadius = 'var(--border-radius-sm)';
            tab.style.position = 'relative';
            
            // Quand un onglet est actif
            if (tab.classList.contains('active')) {
                tab.style.backgroundColor = 'var(--accent-light)';
                tab.style.color = 'var(--accent)';
            }
        });
        
        // Réinitialiser les gestionnaires d'événements pour les onglets
        navTabs.forEach(tab => {
            // Supprimer les anciens gestionnaires (par précaution)
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            // Ajouter le nouveau gestionnaire d'événements
            newTab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Mettre à jour l'apparence des onglets
                navTabs.forEach(t => {
                    t.classList.remove('active');
                    t.style.backgroundColor = 'transparent';
                    t.style.color = 'var(--text-primary)';
                });
                
                this.classList.add('active');
                this.style.backgroundColor = 'var(--accent-light)';
                this.style.color = 'var(--accent)';
                
                const sectionType = this.getAttribute('data-section');
                
                // Logique de filtrage intelligente
                if (sectionType === 'all') {
                    // Afficher tous les projets dans leurs sections d'origine
                    document.querySelectorAll('.category-section').forEach(section => {
                        section.style.display = 'block';
                    });
                    
                    // Cacher la section "Tous les projets" pour éviter la redondance
                    document.getElementById('all-projects').style.display = 'none';
                    
                } else if (sectionType === 'dataviz' || sectionType === 'ml') {
                    // Cacher toutes les sections
                    document.querySelectorAll('.category-section').forEach(section => {
                        section.style.display = 'none';
                    });
                    
                    // Afficher uniquement la section correspondante
                    const targetSection = document.getElementById(`${sectionType}-projects`);
                    if (targetSection) {
                        targetSection.style.display = 'block';
                    }
                }
                
                // Faire défiler la page vers la section des projets
                window.scrollTo({
                    top: document.getElementById('projects').offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });
        
        // Simuler un clic sur l'onglet "Tous les projets" pour initialiser l'affichage
        const allProjectsTab = document.querySelector('.nav-tabs a[data-section="all"]');
        if (allProjectsTab) {
            allProjectsTab.click();
        }
    };
    
    // Remplacer l'ancienne fonction par notre approche optimisée
    const fillAllProjectsSection = optimizeProjectsNavigation;
    
    // Initialisation: remplir la section "Tous les projets"
    fillAllProjectsSection();
    
    // Navigation entre les sections
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Enlever la classe active de tous les onglets
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            const sectionType = this.getAttribute('data-section');
            
            // Cacher toutes les sections
            categorySections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Afficher la section correspondante
            if (sectionType === 'all') {
                document.getElementById('all-projects').style.display = 'block';
            } else if (sectionType === 'dataviz') {
                document.getElementById('dataviz-projects').style.display = 'block';
            } else if (sectionType === 'ml') {
                document.getElementById('ml-projects').style.display = 'block';
            } else if (sectionType === 'automation') {
                document.getElementById('automation-projects').style.display = 'block';
            } else if (sectionType === 'about' || this.getAttribute('href') === '#about') {
                // Rediriger vers la section à propos
                window.location.href = '#about';
            } else if (sectionType === 'contact' || this.getAttribute('href') === '#contact') {
                // Rediriger vers la section contact
                window.location.href = '#contact';
            }
            
            // Scroll vers le début de la section si nécessaire
            if(sectionType !== 'about' && sectionType !== 'contact') {
                window.scrollTo({
                    top: document.getElementById('projects').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gérer les liens du menu déroulant
    const submenuLinks = document.querySelectorAll('.submenu a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionType = this.getAttribute('data-section');
            
            // Trouver et cliquer sur l'onglet correspondant
            navTabs.forEach(tab => {
                if (tab.getAttribute('data-section') === sectionType) {
                    tab.click();
                }
            });
        });
    });
});