/**
 * App Module - Main initialization and content rendering
 * Rawteous Documentation v1.0.0
 * Updated: January 2025
 */

const App = {
    init() {
        this.renderContent();
        Navigation.init();
        Carousel.init();
        this.initScrollAnimations();
        this.initImageLightbox();

        // Handle initial hash navigation after everything is rendered
        // For file:// URLs from Unity, we need multiple attempts to ensure it works
        if (window.location.hash) {
            // First attempt after a short delay
            requestAnimationFrame(() => {
                setTimeout(() => {
                    Navigation.handleHashNavigation();
                }, 200);
            });

            // Second attempt after a longer delay (for slower rendering)
            setTimeout(() => {
                Navigation.handleHashNavigation();
            }, 600);

            // Third attempt after even longer delay
            setTimeout(() => {
                Navigation.handleHashNavigation();
            }, 1000);
        }
    },

    renderContent() {
        const content = document.getElementById('content');
        const wrapper = document.createElement('div');
        wrapper.className = 'content-wrapper';

        DOCS_DATA.panels.forEach((panel, index) => {
            const section = this.createSection(panel, index);
            wrapper.appendChild(section);
        });

        content.appendChild(wrapper);
    },

    createSection(panel, index) {
        const template = document.getElementById('section-template');
        const section = template.content.cloneNode(true).querySelector('.panel-section');

        section.id = panel.id;
        section.dataset.panel = panel.id;
        section.style.animationDelay = `${index * 0.1}s`;

        const icon = section.querySelector('.panel-icon');
        icon.style.backgroundImage = `url('${panel.icon}')`;
        icon.style.backgroundSize = 'contain';
        icon.style.backgroundRepeat = 'no-repeat';

        section.querySelector('h1').textContent = panel.name;
        section.querySelector('.panel-subtitle').textContent = panel.description;

        panel.groups.forEach(group => {
            const groupEl = this.createGroup(panel.id, group);
            section.appendChild(groupEl);
        });

        // Add click handler to panel section
        section.addEventListener('click', (e) => {
            // Don't trigger if clicking on a param card (let card handle its own click)
            if (e.target.closest('.param-card')) {
                return;
            }

            // Scroll to center and highlight
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            history.pushState(null, '', `#${panel.id}`);

            // Update active nav link
            const navLink = document.querySelector(`.nav-panel-link[data-target="${panel.id}"]`);
            if (navLink) {
                document.querySelectorAll('.nav-panel-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }

            // Trigger highlight effect
            Navigation.triggerContentHighlight(section);
        });

        return section;
    },

    createGroup(panelId, group) {
        const groupEl = document.createElement('div');
        groupEl.className = 'group-section';
        groupEl.id = `${panelId}-${group.id}`;

        groupEl.innerHTML = `
            <div class="group-header">
                <div class="group-title">${group.name}</div>
                <div class="group-count">${group.params.length} parameters</div>
            </div>
            <p class="group-desc">${group.description}</p>
            <div class="param-grid"></div>
        `;

        const grid = groupEl.querySelector('.param-grid');
        group.params.forEach((param, index) => {
            const card = this.createParamCard(panelId, group.id, param, index);
            grid.appendChild(card);
        });

        return groupEl;
    },

    createParamCard(panelId, groupId, param, index) {
        const key = `${panelId}-${groupId}-${param.id}`;

        // Check for file-based image first, then localStorage
        let images = imageData[key] || [];
        if (images.length === 0 && param.image && param.image.trim() !== '') {
            images = [param.image];
        }
        // Filter out empty strings
        images = images.filter(img => img && img.trim() !== '');
        const hasImages = images.length > 0;

        const card = document.createElement('div');
        card.className = `param-card ${!hasImages ? 'no-image' : ''}`;
        card.id = key; // Add ID for hash navigation
        card.dataset.key = key;
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <div class="param-card-content">
                <div class="param-card-header">
                    <div class="param-card-name">${param.name}</div>
                    <div class="param-card-id">${param.id}</div>
                </div>
                <p class="param-card-desc">${param.desc}</p>
            </div>
            ${hasImages ? `
            <div class="param-card-image">
                <img src="${images[0]}" alt="${param.name}" class="loaded" onerror="this.classList.remove('loaded')">
                <div class="param-card-placeholder">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                    </svg>
                    <span>Visual guide</span>
                </div>
                <div class="param-card-nav ${images.length <= 1 ? 'hidden' : ''}">
                    <button class="prev-btn" aria-label="Previous image">‹</button>
                    <button class="next-btn" aria-label="Next image">›</button>
                </div>
                <div class="param-card-counter ${images.length <= 1 ? 'hidden' : ''}">
                    <span class="current">1</span>/<span class="total">${images.length || 1}</span>
                </div>
            </div>
            ` : ''}
        `;

        // Add click handler to card (excluding image and button clicks)
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on image, buttons, or navigation
            if (e.target.closest('.param-card-image img') ||
                e.target.closest('.param-card-nav') ||
                e.target.closest('button')) {
                return;
            }

            // Scroll to center and highlight
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            history.pushState(null, '', `#${key}`);

            // Update active nav link
            const navLink = document.querySelector(`.nav-param-link[data-key="${key}"]`);
            if (navLink) {
                document.querySelectorAll('.nav-param-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }

            // Trigger highlight effect
            Navigation.triggerContentHighlight(card);
        });

        return card;
    },

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.param-card, .group-section').forEach(el => {
            observer.observe(el);
        });
    },

    initImageLightbox() {
        // Create lightbox modal
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        const backdrop = lightbox.querySelector('.lightbox-backdrop');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');

        // Close handlers
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeLightbox);
        backdrop.addEventListener('click', closeLightbox);

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Attach click handlers to all param card images
        document.addEventListener('click', (e) => {
            const img = e.target.closest('.param-card-image img');
            if (img && img.classList.contains('loaded')) {
                const card = img.closest('.param-card');
                const paramName = card.querySelector('.param-card-name').textContent;
                const paramId = card.querySelector('.param-card-id').textContent;

                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                caption.textContent = `${paramName} (${paramId})`;

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());

// Also handle hash navigation on window load (for file:// URLs from Unity)
window.addEventListener('load', () => {
    if (window.location.hash) {
        // Try immediately and with delays to handle various loading scenarios
        Navigation.handleHashNavigation();
        setTimeout(() => {
            Navigation.handleHashNavigation();
        }, 200);
        setTimeout(() => {
            Navigation.handleHashNavigation();
        }, 500);
    }
});

// Handle hash changes (when clicking links or browser back/forward)
window.addEventListener('hashchange', () => {
    Navigation.handleHashNavigation();
});
