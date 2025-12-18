/**
 * Admin Module - Manage images for each parameter
 */

const Admin = {
    activePanel: null,

    init() {
        this.renderTabs();
        this.renderPanels();
        this.bindEvents();

        // Activate first panel
        const firstPanel = DOCS_DATA.panels[0];
        if (firstPanel) {
            this.activatePanel(firstPanel.id);
        }
    },

    renderTabs() {
        const container = document.getElementById('panel-tabs');
        container.innerHTML = DOCS_DATA.panels.map(panel => `
            <button class="tab-btn" data-panel="${panel.id}">${panel.name}</button>
        `).join('');
    },

    renderPanels() {
        const container = document.getElementById('admin-panels');

        container.innerHTML = DOCS_DATA.panels.map(panel => `
            <div class="admin-panel" id="admin-${panel.id}">
                ${panel.groups.map(group => `
                    <div class="admin-group">
                        <h3 class="admin-group-title">${group.name}</h3>
                        <div class="param-cards-admin">
                            ${group.params.map(param => {
                                const key = `${panel.id}-${group.id}-${param.id}`;
                                const images = imageData[key] || [];
                                return `
                                    <div class="param-card-admin" data-key="${key}">
                                        <div class="param-card-admin-header">
                                            <span class="param-admin-name">${param.name}</span>
                                            <span class="param-admin-count">${images.length} images</span>
                                        </div>
                                        <div class="param-card-admin-images">
                                            ${images.map((src, i) => `
                                                <div class="admin-thumb">
                                                    <img src="${src}" alt="">
                                                    <button class="delete-thumb" data-index="${i}">×</button>
                                                </div>
                                            `).join('')}
                                        </div>
                                        <div class="param-card-admin-add">
                                            <input type="text" class="url-input" placeholder="Paste image URL...">
                                            <button class="btn-add-url">Add URL</button>
                                            <span class="or-text">or</span>
                                            <label class="btn-add-file">
                                                Upload
                                                <input type="file" accept="image/*" multiple>
                                            </label>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    },

    activatePanel(panelId) {
        this.activePanel = panelId;

        // Update tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.panel === panelId);
        });

        // Update panels
        document.querySelectorAll('.admin-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `admin-${panelId}`);
        });
    },

    bindEvents() {
        // Tab clicks
        document.getElementById('panel-tabs').addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (btn) {
                this.activatePanel(btn.dataset.panel);
            }
        });

        // Add URL
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-url')) {
                const card = e.target.closest('.param-card-admin');
                const input = card.querySelector('.url-input');
                const url = input.value.trim();

                if (url) {
                    this.addImage(card.dataset.key, url);
                    input.value = '';
                }
            }
        });

        // Delete thumb
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-thumb')) {
                const card = e.target.closest('.param-card-admin');
                const index = parseInt(e.target.dataset.index);
                this.removeImage(card.dataset.key, index);
            }
        });

        // File upload
        document.addEventListener('change', (e) => {
            if (e.target.type === 'file' && e.target.closest('.btn-add-file')) {
                const card = e.target.closest('.param-card-admin');
                const files = e.target.files;

                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        this.addImage(card.dataset.key, ev.target.result);
                    };
                    reader.readAsDataURL(file);
                });

                e.target.value = '';
            }
        });

        // Import input
        document.getElementById('import-input').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const data = JSON.parse(ev.target.result);
                        Object.assign(imageData, data);
                        saveImageData();
                        this.renderPanels();
                        this.activatePanel(this.activePanel);
                        this.toast('Imported successfully!');
                    } catch (err) {
                        this.toast('Invalid JSON file', true);
                    }
                };
                reader.readAsText(file);
            }
            e.target.value = '';
        });
    },

    addImage(key, src) {
        if (!imageData[key]) {
            imageData[key] = [];
        }
        imageData[key].push(src);
        saveImageData();
        this.updateCard(key);
        this.toast('Image added!');
    },

    removeImage(key, index) {
        if (imageData[key]) {
            imageData[key].splice(index, 1);
            saveImageData();
            this.updateCard(key);
            this.toast('Image removed');
        }
    },

    updateCard(key) {
        const card = document.querySelector(`[data-key="${key}"]`);
        if (!card) return;

        const images = imageData[key] || [];

        // Update count
        card.querySelector('.param-admin-count').textContent = `${images.length} images`;

        // Update thumbnails
        card.querySelector('.param-card-admin-images').innerHTML = images.map((src, i) => `
            <div class="admin-thumb">
                <img src="${src}" alt="">
                <button class="delete-thumb" data-index="${i}">×</button>
            </div>
        `).join('');
    },

    exportData() {
        const json = JSON.stringify(imageData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'rawteous-images.json';
        a.click();

        URL.revokeObjectURL(url);
        this.toast('Exported!');
    },

    importData() {
        document.getElementById('import-input').click();
    },

    toast(message, isError = false) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show' + (isError ? ' error' : '');

        setTimeout(() => {
            toast.className = 'toast';
        }, 2500);
    }
};

document.addEventListener('DOMContentLoaded', () => Admin.init());
