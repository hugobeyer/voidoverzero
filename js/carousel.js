/**
 * Carousel Module - Per-card image navigation
 */

const Carousel = {
    currentIndex: {},

    init() {
        // Initialize all indices
        Object.keys(imageData).forEach(key => {
            this.currentIndex[key] = 0;
        });

        // Event delegation for card navigation
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.param-card');
            if (!card) return;

            const key = card.dataset.key;
            if (!key) return;

            if (e.target.closest('.prev-btn')) {
                this.change(key, -1);
            } else if (e.target.closest('.next-btn')) {
                this.change(key, 1);
            }
        });
    },

    change(key, direction) {
        const images = imageData[key] || [];
        if (images.length <= 1) return;

        this.currentIndex[key] = (this.currentIndex[key] + direction + images.length) % images.length;

        const card = document.querySelector(`[data-key="${key}"]`);
        if (!card) return;

        const img = card.querySelector('.param-card-image img');
        const current = card.querySelector('.current');

        if (img) {
            img.classList.remove('loaded');
            img.src = images[this.currentIndex[key]];
            img.onload = () => img.classList.add('loaded');
        }

        if (current) {
            current.textContent = this.currentIndex[key] + 1;
        }
    },

    updateCard(key) {
        const images = imageData[key] || [];
        const card = document.querySelector(`[data-key="${key}"]`);
        if (!card) return;

        const img = card.querySelector('.param-card-image img');
        const current = card.querySelector('.current');
        const total = card.querySelector('.total');

        if (images.length > 0) {
            if (img) {
                img.src = images[0];
                img.onload = () => img.classList.add('loaded');
            }
        }

        if (current) current.textContent = '1';
        if (total) total.textContent = images.length || 1;

        this.currentIndex[key] = 0;
    }
};
