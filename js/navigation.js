/**
 * Navigation Module - Sidebar nav generation and behavior
 */

const Navigation = {
    init() {
        this.render();
        this.bindEvents();
        this.observeSections();
    },

    render() {
        const nav = document.getElementById('nav');
        const template = document.getElementById('nav-template');

        const section = template.content.cloneNode(true);
        const container = section.querySelector('.nav-section');

        DOCS_DATA.panels.forEach((panel, index) => {
            // Create panel link
            const panelLink = document.createElement('a');
            panelLink.href = `#${panel.id}`;
            panelLink.className = 'nav-panel-link';
            panelLink.dataset.target = panel.id;

            const icon = document.createElement('span');
            icon.className = 'nav-icon';
            icon.style.backgroundImage = `url('${panel.icon}')`;

            const label = document.createElement('span');
            label.className = 'nav-label';
            label.textContent = panel.name;

            // Info icon button that links to the panel section
            const infoIcon = document.createElement('a');
            infoIcon.href = `#${panel.id}`;
            infoIcon.className = 'nav-info-icon';
            infoIcon.title = `Go to ${panel.name} section`;
            infoIcon.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            `;
            infoIcon.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent panel link click
                e.preventDefault();
                const section = document.getElementById(panel.id);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, '', `#${panel.id}`);
                }
                document.querySelectorAll('.nav-panel-link').forEach(l => l.classList.remove('active'));
                panelLink.classList.add('active');

                // Trigger content highlight effect on the specific section
                if (section) {
                    Navigation.triggerContentHighlight(section);
                }
            });

            panelLink.appendChild(icon);
            panelLink.appendChild(label);
            panelLink.appendChild(infoIcon);
            container.appendChild(panelLink);

            // Add groups and their params
            panel.groups.forEach(group => {
                // Group header
                const groupHeader = document.createElement('div');
                groupHeader.className = 'nav-group-header';
                groupHeader.textContent = group.name;
                container.appendChild(groupHeader);

                // Param links
                group.params.forEach(param => {
                    const link = document.createElement('a');
                    link.href = `#${panel.id}-${group.id}-${param.id}`;
                    link.className = 'nav-param-link';
                    link.textContent = param.name;
                    link.dataset.key = `${panel.id}-${group.id}-${param.id}`;
                    container.appendChild(link);
                });
            });
        });

        nav.appendChild(section);
    },

    bindEvents() {
        // Panel links - scroll to panel section
        document.querySelectorAll('.nav-panel-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.dataset.target;
                const section = document.getElementById(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update URL hash
                    history.pushState(null, '', `#${target}`);
                }

                document.querySelectorAll('.nav-panel-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Trigger content highlight effect on the specific section
                if (section) {
                    Navigation.triggerContentHighlight(section);
                }
            });
        });

        // Param links - scroll to param card
        document.querySelectorAll('.nav-param-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const key = link.dataset.key;
                // Try to find by ID first (for hash navigation), then by data-key
                let card = document.getElementById(key);
                if (!card) {
                    card = document.querySelector(`[data-key="${key}"]`);
                }
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Update URL hash
                    history.pushState(null, '', `#${key}`);
                }

                document.querySelectorAll('.nav-param-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Trigger content highlight effect on the specific card
                if (card) {
                    Navigation.triggerContentHighlight(card);
                }
            });
        });

        // Handle hash changes (browser back/forward)
        window.addEventListener('hashchange', () => {
            this.handleHashNavigation();
        });
    },

    handleHashNavigation(retryCount = 0) {
        // Get hash from URL - handle both window.location.hash and direct hash access
        let hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
            hash = hash.substring(1); // Remove #
        }

        // Also try reading from the full URL in case hash isn't set properly
        if (!hash) {
            const urlParts = window.location.href.split('#');
            if (urlParts.length > 1) {
                hash = urlParts[1];
            }
        }

        if (!hash) return false;

        // Debug: Log what we're looking for
        if (retryCount === 0) {
            console.log('Navigating to hash:', hash);
            console.log('Full URL:', window.location.href);
        }

        // Check if content is rendered
        const contentWrapper = document.querySelector('.content-wrapper');
        if (!contentWrapper) {
            if (retryCount < 10) {
                setTimeout(() => {
                    Navigation.handleHashNavigation(retryCount + 1);
                }, 100);
            }
            return false;
        }

        // Try to find as panel section first
        let target = document.getElementById(hash);
        if (target && target.classList.contains('panel-section')) {
            console.log('Found panel section:', hash);
            // Wait a bit more for layout to settle, then scroll
            setTimeout(() => {
                // Prevent default browser scroll
                window.scrollTo(0, 0);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const panelLink = document.querySelector(`.nav-panel-link[data-target="${hash}"]`);
                if (panelLink) {
                    document.querySelectorAll('.nav-panel-link').forEach(l => l.classList.remove('active'));
                    panelLink.classList.add('active');
                }
                // Trigger highlight effect
                Navigation.triggerContentHighlight(target);
            }, 100);
            return true; // Successfully navigated
        }

        // Try to find as param card
        target = document.getElementById(hash);
        if (!target) {
            target = document.querySelector(`[data-key="${hash}"]`);
        }
        if (target && target.classList.contains('param-card')) {
            console.log('Found param card:', hash);
            setTimeout(() => {
                // Prevent default browser scroll
                window.scrollTo(0, 0);
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const paramLink = document.querySelector(`.nav-param-link[data-key="${hash}"]`);
                if (paramLink) {
                    document.querySelectorAll('.nav-param-link').forEach(l => l.classList.remove('active'));
                    paramLink.classList.add('active');
                }
                // Trigger highlight effect
                Navigation.triggerContentHighlight(target);
            }, 100);
            return true; // Successfully navigated
        }

        // Debug: List available panel IDs if not found
        if (retryCount === 0 || retryCount === 5) {
            const allPanels = document.querySelectorAll('.panel-section');
            const panelIds = Array.from(allPanels).map(p => p.id).filter(id => id);
            console.log('Available panel IDs:', panelIds);
            console.log('Looking for:', hash);
            console.log('All elements with IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id).slice(0, 20));
        }

        // If element not found and we haven't retried too many times, retry
        if (retryCount < 15) {
            setTimeout(() => {
                Navigation.handleHashNavigation(retryCount + 1);
            }, 200);
        } else {
            console.warn('Failed to find element with hash:', hash);
        }
        return false; // Element not found yet
    },

    observeSections() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const panelLink = document.querySelector(`.nav-panel-link[data-target="${id}"]`);

                    document.querySelectorAll('.nav-panel-link').forEach(l => l.classList.remove('active'));
                    if (panelLink) {
                        panelLink.classList.add('active');
                    }
                }
            });
        }, options);

        document.querySelectorAll('.panel-section').forEach(section => {
            sectionObserver.observe(section);
        });
    },

    triggerContentHighlight(targetElement) {
        if (!targetElement) return;

        // Remove any existing highlight class from all elements
        document.querySelectorAll('.panel-section.highlight, .param-card.highlight').forEach(el => {
            el.classList.remove('highlight');
        });

        // Force reflow to reset animation
        void targetElement.offsetWidth;

        // Add highlight class to trigger animation
        // The highlight will stay at 5% opacity until another element is clicked
        targetElement.classList.add('highlight');
    }
};
