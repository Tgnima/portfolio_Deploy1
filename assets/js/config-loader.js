/**
 * Script amélioré pour charger et appliquer la configuration depuis text-config.json
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configuration par défaut au cas où le chargement échoue
    const defaultConfig = {
        general: {
            siteTitle: "Portfolio Data",
            siteSubtitle: "Projets & Réalisations",
            copyright: "© 2025 Tarzs GNIMAGNON. Tous droits réservés."
        },
        contact: {
            title: "Contactez-moi"
        }
    };

    // Fonction principale d'initialisation
    function initConfig() {
        console.log('Initialisation du chargeur de configuration...');
        
        // Création d'un indicateur visuel de chargement
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'config-loading';
        loadingIndicator.style.position = 'fixed';
        loadingIndicator.style.bottom = '10px';
        loadingIndicator.style.right = '10px';
        loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        loadingIndicator.style.color = 'white';
        loadingIndicator.style.padding = '8px 12px';
        loadingIndicator.style.borderRadius = '4px';
        loadingIndicator.style.fontSize = '12px';
        loadingIndicator.style.zIndex = '9999';
        loadingIndicator.textContent = 'Chargement de la configuration...';
        document.body.appendChild(loadingIndicator);
        
        // Chargement prioritaire depuis le fichier externe (plus facile à maintenir)
        fetch('./text-config.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(config => {
                console.log('Configuration chargée depuis le fichier externe:', config);
                applyConfig(config);
                loadingIndicator.textContent = 'Configuration appliquée';
                loadingIndicator.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
                setTimeout(() => {
                    loadingIndicator.style.opacity = '0';
                    loadingIndicator.style.transition = 'opacity 0.5s';
                    setTimeout(() => loadingIndicator.remove(), 500);
                }, 1500);
            })
            .catch(error => {
                console.error('Erreur de chargement du fichier externe:', error);
                
                // Solution de secours 1: Utiliser la configuration intégrée si disponible
                const configScript = document.getElementById('config-data');
                if (configScript) {
                    try {
                        const config = JSON.parse(configScript.textContent);
                        console.log('Configuration chargée depuis le script intégré:', config);
                        applyConfig(config);
                        loadingIndicator.textContent = 'Configuration intégrée appliquée';
                        loadingIndicator.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
                        setTimeout(() => {
                            loadingIndicator.style.opacity = '0';
                            loadingIndicator.style.transition = 'opacity 0.5s';
                            setTimeout(() => loadingIndicator.remove(), 500);
                        }, 1500);
                        return;
                    } catch (e) {
                        console.error('Erreur de parsing de la configuration intégrée:', e);
                    }
                }
                
                // Solution de secours 2: Utiliser la configuration par défaut
                console.warn('ATTENTION: Impossible de charger la configuration.');                
                console.warn('Vérifiez que le fichier text-config.json est accessible ou que la configuration est intégrée au HTML.');
                console.warn('Solution 1: Utilisez un serveur web local comme http-server, Live Server, etc.');
                console.warn('Solution 2: Intégrez votre configuration directement dans le HTML avec l\'ID "config-data".');
                
                applyConfig(defaultConfig);
                loadingIndicator.textContent = 'Configuration par défaut utilisée';
                loadingIndicator.style.backgroundColor = 'rgba(255, 165, 0, 0.7)';
                showError('Erreur: Configuration non chargée. Configuration par défaut utilisée.');
            });
    }

    // Afficher une erreur visible
    function showError(message) {
        console.error(message);
        const errorDiv = document.createElement('div');
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '10px';
        errorDiv.style.right = '10px';
        errorDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '10px';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.zIndex = '9999';
        errorDiv.innerHTML = `<strong>Erreur de configuration</strong><br>${message}`;
        document.body.appendChild(errorDiv);
        
        // Retirer l'erreur après 5 secondes
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.5s';
            setTimeout(() => errorDiv.remove(), 500);
        }, 5000);
    }
        
    // Appliquer la configuration au HTML
    function applyConfig(config) {
        console.log('Application de la configuration au HTML...');

        try {
            // Appliquer les informations générales
            if (config.general) {
                document.title = config.general.siteTitle || defaultConfig.general.siteTitle;
                
                const logoElement = document.querySelector('.logo a');
                if (logoElement) logoElement.textContent = config.general.siteTitle || defaultConfig.general.siteTitle;
                
                const subtitleElement = document.querySelector('.subtitle');
                if (subtitleElement) subtitleElement.textContent = config.general.siteSubtitle || defaultConfig.general.siteSubtitle;
                
                const copyrightElement = document.querySelector('.copyright p');
                if (copyrightElement) copyrightElement.textContent = config.general.copyright || defaultConfig.general.copyright;
            }
            
            // Mettre à jour le header/menu
            if (config.header && config.header.menuItems) {
                updateMenu(config.header.menuItems);
            }
            
            // Mettre à jour le contenu de la section hero
            if (config.hero) {
                const heroTitleElement = document.querySelector('.hero-title');
                if (heroTitleElement) heroTitleElement.innerHTML = config.hero.title;
                
                const heroSubtitleElement = document.querySelector('.hero-subtitle');
                if (heroSubtitleElement && config.hero.subtitle) {
                    heroSubtitleElement.textContent = config.hero.subtitle;
                }
                
                const ctaButtons = document.querySelectorAll('.hero-cta .btn');
                if (ctaButtons.length >= 2 && config.hero.ctaPrimary && config.hero.ctaSecondary) {
                    ctaButtons[0].textContent = config.hero.ctaPrimary;
                    ctaButtons[1].textContent = config.hero.ctaSecondary;
                }
            }
            
            // Mettre à jour la section "À propos de nous"
            if (config.team) {
                updateAboutSection(config.team);
            }
            
            // Mettre à jour la section Contact
            if (config.contact) {
                updateContactSection(config.contact);
            }
            
            console.log('Configuration appliquée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'application de la configuration:', error);
            showError('Erreur lors de l\'application: ' + error.message);
        }
    }
    
    // Mettre à jour le menu
    function updateMenu(menuItems) {
        console.log('Mise à jour du menu:', menuItems);
        const mainNav = document.querySelector('.main-nav ul');
        if (!mainNav) {
            console.warn('Navigation principale non trouvée');
            return;
        }
        
        mainNav.innerHTML = '';
        
        menuItems.forEach(item => {
            const li = document.createElement('li');
            
            // Si l'élément a un sous-menu
            if (item.submenu && item.submenu.length > 0) {
                li.classList.add('has-submenu');
                
                // Créer le lien principal
                const a = document.createElement('a');
                a.href = item.link;
                a.textContent = item.text;
                a.classList.add('nav-link');
                li.appendChild(a);
                
                // Créer le sous-menu
                const submenu = document.createElement('ul');
                submenu.classList.add('submenu');
                
                item.submenu.forEach(subItem => {
                    const subLi = document.createElement('li');
                    const subA = document.createElement('a');
                    subA.href = subItem.link;
                    subA.textContent = subItem.text;
                    if (subItem.dataSection) {
                        subA.setAttribute('data-section', subItem.dataSection);
                    }
                    subLi.appendChild(subA);
                    submenu.appendChild(subLi);
                });
                
                li.appendChild(submenu);
            } else {
                // Simple lien sans sous-menu
                const a = document.createElement('a');
                a.href = item.link;
                a.textContent = item.text;
                a.classList.add('nav-link');
                li.appendChild(a);
            }
            
            mainNav.appendChild(li);
        });
        
        console.log('Menu mis à jour avec succès');
    }
    
    // Mettre à jour la section "À propos de nous"
    function updateAboutSection(teamConfig) {
        console.log('Mise à jour de la section À propos:', teamConfig);
        // Mise à jour du titre et de la description
        const aboutSection = document.getElementById('about');
        if (!aboutSection) {
            console.warn('Section À propos non trouvée');
            return;
        }
        
        // Titre et description
        const title = aboutSection.querySelector('.section-title');
        if (title) title.textContent = teamConfig.title;
        
        const description = aboutSection.querySelector('.section-description p');
        if (description) description.textContent = teamConfig.description;
        
        // Mise à jour de l'histoire
        const storyParagraph = aboutSection.querySelector('.about-story p:first-of-type');
        if (storyParagraph && teamConfig.story) storyParagraph.textContent = teamConfig.story;
        
        // Mise à jour des statistiques d'accomplissement
        if (teamConfig.achievements) {
            const achievementItems = aboutSection.querySelectorAll('.achievement-item');
            teamConfig.achievements.forEach((achievement, index) => {
                if (achievementItems[index]) {
                    const numberSpan = achievementItems[index].querySelector('.achievement-number');
                    const labelSpan = achievementItems[index].querySelector('.achievement-label');
                    
                    if (numberSpan) numberSpan.textContent = achievement.number;
                    if (labelSpan) labelSpan.textContent = achievement.label;
                }
            });
        }
        
        // Mise à jour des membres de l'équipe
        if (teamConfig.members) {
            const teamGrid = aboutSection.querySelector('.team-grid');
            if (teamGrid) {
                teamGrid.innerHTML = '';
                
                teamConfig.members.forEach(member => {
                    // Vérifier si le membre est valide (non vide)
                    if (member && member.name) {
                        const memberDiv = document.createElement('div');
                        memberDiv.classList.add('team-member', 'has-animation');
                        
                        memberDiv.innerHTML = `
                            <div class="member-photo" style="background-image: url('${member.photo}');"></div>
                            <h4>${member.name}</h4>
                            <p class="member-role">${member.role}</p>
                            <p class="member-bio">${member.bio}</p>
                            <div class="member-social">
                                <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-github"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                            </div>
                        `;
                        
                        teamGrid.appendChild(memberDiv);
                    }
                });
            }
        }
        
        // Mise à jour des compétences
        if (teamConfig.skills) {
            const skillsGrid = aboutSection.querySelector('.skills-grid');
            if (skillsGrid) {
                skillsGrid.innerHTML = '';
                
                teamConfig.skills.forEach(skill => {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.classList.add('skill-category', 'has-animation');
                    
                    // Créer l'en-tête de la catégorie
                    const header = document.createElement('h4');
                    header.innerHTML = `<i class="${skill.icon}"></i> ${skill.category}`;
                    categoryDiv.appendChild(header);
                    
                    // Créer la liste des compétences
                    const skillsList = document.createElement('div');
                    skillsList.classList.add('skills-list');
                    
                    skill.items.forEach(item => {
                        const tag = document.createElement('span');
                        tag.classList.add('skill-tag');
                        tag.textContent = item;
                        skillsList.appendChild(tag);
                    });
                    
                    categoryDiv.appendChild(skillsList);
                    skillsGrid.appendChild(categoryDiv);
                });
            }
        }
        
        // Mettre à jour les boutons CTA
        const ctaButtons = aboutSection.querySelectorAll('.about-cta .btn');
        if (ctaButtons.length >= 2) {
            // Personnaliser les boutons (nous utilisons le texte de l'index.html qui est déjà correct)
            // Si nous avons config.team.ctaPrimary et config.team.ctaSecondary, nous pourrions les utiliser ici
        }
        
        console.log('Section À propos mise à jour avec succès');
    }
    
    // Mettre à jour la section Contact
    function updateContactSection(contactConfig) {
        console.log('Mise à jour de la section Contact:', contactConfig);
        const contactSection = document.getElementById('contact');
        if (!contactSection) {
            console.warn('Section Contact non trouvée');
            return;
        }
        
        // Titre et description
        const title = contactSection.querySelector('.section-title');
        if (title) title.textContent = contactConfig.title;
        
        const description = contactSection.querySelector('.section-description p');
        if (description && contactConfig.description) {
            description.textContent = contactConfig.description;
        }
        
        // Informations de contact
        const emailDetails = contactSection.querySelector('.contact-item:nth-child(1) .contact-details p');
        if (emailDetails && contactConfig.email) {
            emailDetails.textContent = contactConfig.email;
        }
        
        const phoneDetails = contactSection.querySelector('.contact-item:nth-child(2) .contact-details p');
        if (phoneDetails && contactConfig.phone) {
            phoneDetails.textContent = contactConfig.phone;
        }
        
        const addressDetails = contactSection.querySelector('.contact-item:nth-child(3) .contact-details p');
        if (addressDetails && contactConfig.address) {
            addressDetails.textContent = contactConfig.address;
        }
        
        // Liens sociaux
        if (contactConfig.socialLinks) {
            const socialLinks = contactSection.querySelector('.social-links');
            if (socialLinks) {
                socialLinks.innerHTML = '';
                
                contactConfig.socialLinks.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.classList.add('social-link');
                    a.innerHTML = `<i class="fab fa-${link.platform}"></i>`;
                    socialLinks.appendChild(a);
                });
            }
        }
        
        console.log('Section Contact mise à jour avec succès');
    }
    
    // Démarrer le chargement de la configuration
    initConfig();
});
