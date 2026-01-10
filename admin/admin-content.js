/**
 * Admin Content Management
 * Manages company page and product content editing
 */

const AdminContent = {
    init() {
        this.renderCompanyPage();
        this.renderProducts();
    },

    renderCompanyPage() {
        const container = document.getElementById('company-sections');
        const company = SITE_CONTENT.company;

        container.innerHTML = `
            <div class="content-section-card">
                <h3>Hero Section</h3>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-input" value="${company.hero.title}" 
                           onchange="AdminContent.updateCompany('hero', 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-textarea" rows="3" 
                              onchange="AdminContent.updateCompany('hero', 'description', this.value)">${company.hero.description}</textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Primary Button Text</label>
                        <input type="text" class="form-input" value="${company.hero.primaryButton.text}" 
                               onchange="AdminContent.updateCompany('hero', 'primaryButton.text', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Primary Button Link</label>
                        <input type="text" class="form-input" value="${company.hero.primaryButton.link}" 
                               onchange="AdminContent.updateCompany('hero', 'primaryButton.link', this.value)">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Secondary Button Text</label>
                        <input type="text" class="form-input" value="${company.hero.secondaryButton.text}" 
                               onchange="AdminContent.updateCompany('hero', 'secondaryButton.text', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Secondary Button Link</label>
                        <input type="text" class="form-input" value="${company.hero.secondaryButton.link}" 
                               onchange="AdminContent.updateCompany('hero', 'secondaryButton.link', this.value)">
                    </div>
                </div>
            </div>

            <div class="content-section-card">
                <h3>Mission Section</h3>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-input" value="${company.mission.title}" 
                           onchange="AdminContent.updateCompany('mission', 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Subtitle</label>
                    <input type="text" class="form-input" value="${company.mission.subtitle}" 
                           onchange="AdminContent.updateCompany('mission', 'subtitle', this.value)">
                </div>
                <div class="form-group">
                    <label>Mission Sectors (one per line)</label>
                    <textarea class="form-textarea" rows="6" 
                              onchange="AdminContent.updateMissionSectors(this.value)">${(company.mission.sectors || []).join('\n')}</textarea>
                    <small style="color: var(--color-text-muted); font-size: var(--text-xs); margin-top: var(--space-xs); display: block;">
                        Each line becomes a separate mission card
                    </small>
                </div>
            </div>

            <div class="content-section-card">
                <h3>About Section</h3>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-input" value="${company.about.title}" 
                           onchange="AdminContent.updateCompany('about', 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Subtitle</label>
                    <input type="text" class="form-input" value="${company.about.subtitle}" 
                           onchange="AdminContent.updateCompany('about', 'subtitle', this.value)">
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <textarea class="form-textarea" rows="4" 
                              onchange="AdminContent.updateCompany('about', 'content', this.value)">${company.about.content}</textarea>
                </div>
                <div class="form-group">
                    <label>Images</label>
                    <div class="image-upload-area">
                        <label class="btn btn-secondary" style="display: inline-flex; margin-bottom: var(--space-md);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14,2 14,8 20,8"></polyline>
                                <line x1="12" y1="18" x2="12" y2="12"></line>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                            Upload Images
                            <input type="file" id="about-images-upload" accept="image/*" multiple style="display:none" 
                                   onchange="AdminContent.handleAboutImageUpload(event)">
                        </label>
                        <div class="about-images-grid" id="about-images-grid">
                            ${(company.about.images || []).map((img, idx) => `
                                <div class="about-image-item">
                                    <img src="${img.src}" alt="${img.alt || ''}">
                                    <button class="delete-image-btn" onclick="AdminContent.removeAboutImage(${idx})" title="Remove">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3,6 5,6 21,6"></polyline>
                                            <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-section-card">
                <h3>Contact Section (Homepage)</h3>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-input" value="${company.contact.title}" 
                           onchange="AdminContent.updateCompany('contact', 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Subtitle</label>
                    <input type="text" class="form-input" value="${company.contact.subtitle}" 
                           onchange="AdminContent.updateCompany('contact', 'subtitle', this.value)">
                </div>
                <div class="form-group">
                    <label>Text Content</label>
                    <textarea class="form-textarea" rows="3" 
                              onchange="AdminContent.updateCompany('contact', 'text', this.value)">${company.contact.text || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Link Text</label>
                    <input type="text" class="form-input" value="${company.contact.linkText || 'Visit our contact page →'}" 
                           onchange="AdminContent.updateCompany('contact', 'linkText', this.value)">
                </div>
                <div class="form-group">
                    <label>Link URL</label>
                    <input type="text" class="form-input" value="${company.contact.linkUrl || 'contact.html'}" 
                           onchange="AdminContent.updateCompany('contact', 'linkUrl', this.value)">
                </div>
            </div>

            <div class="content-section-card">
                <h3>Contact Page</h3>
                <div class="form-group">
                    <label>Hero Title</label>
                    <input type="text" class="form-input" value="${company.contactPage?.hero?.title || ''}" 
                           onchange="AdminContent.updateContactPage('hero', 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Hero Subtitle</label>
                    <textarea class="form-textarea" rows="2" 
                              onchange="AdminContent.updateContactPage('hero', 'subtitle', this.value)">${company.contactPage?.hero?.subtitle || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Background Image</label>
                    <div class="image-upload-area">
                        <label class="btn btn-secondary" style="display: inline-flex; margin-bottom: var(--space-md);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14,2 14,8 20,8"></polyline>
                                <line x1="12" y1="18" x2="12" y2="12"></line>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                            Upload Background Image
                            <input type="file" id="contact-bg-upload" accept="image/*" style="display:none" 
                                   onchange="AdminContent.handleContactBgUpload(event)">
                        </label>
                        ${company.contactPage?.hero?.backgroundImage ? `
                            <div class="contact-bg-preview">
                                <img src="${company.contactPage.hero.backgroundImage}" alt="Background preview" style="max-width: 200px; border-radius: var(--radius-md);">
                                <button class="btn btn-secondary" onclick="AdminContent.removeContactBg()" style="margin-top: var(--space-sm);">Remove</button>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="form-group">
                    <label>Video</label>
                    <div class="form-row">
                        <div class="form-group">
                            <label style="font-size: var(--text-xs);">Enable Video</label>
                            <input type="checkbox" ${company.contactPage?.sidebar?.video?.enabled ? 'checked' : ''} 
                                   onchange="AdminContent.updateContactPage('sidebar.video', 'enabled', this.checked)">
                        </div>
                        <div class="form-group">
                            <label style="font-size: var(--text-xs);">Video URL</label>
                            <input type="text" class="form-input" value="${company.contactPage?.sidebar?.video?.src || ''}" 
                                   onchange="AdminContent.updateContactPage('sidebar.video', 'src', this.value)">
                        </div>
                    </div>
                    <label class="btn btn-secondary" style="display: inline-flex; margin-top: var(--space-sm);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                        </svg>
                        Upload Video
                        <input type="file" id="contact-video-upload" accept="video/*" style="display:none" 
                               onchange="AdminContent.handleContactVideoUpload(event)">
                    </label>
                </div>
                <div class="form-group">
                    <label>Sidebar Cards</label>
                    <div id="contact-sidebar-cards">
                        ${(company.contactPage?.sidebar?.cards || []).map((card, idx) => `
                            <div class="sidebar-card-editor" style="border: 1px solid var(--color-border); padding: var(--space-md); margin-bottom: var(--space-md); border-radius: var(--radius-md);">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label style="font-size: var(--text-xs);">Title</label>
                                        <input type="text" class="form-input" value="${card.title || ''}" 
                                               onchange="AdminContent.updateContactCard(${idx}, 'title', this.value)">
                                    </div>
                                    <div class="form-group">
                                        <label style="font-size: var(--text-xs);">Content</label>
                                        <input type="text" class="form-input" value="${card.content || ''}" 
                                               onchange="AdminContent.updateContactCard(${idx}, 'content', this.value)">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label style="font-size: var(--text-xs);">Link (optional)</label>
                                    <input type="text" class="form-input" value="${card.link || ''}" 
                                           onchange="AdminContent.updateContactCard(${idx}, 'link', this.value)">
                                </div>
                                <button class="btn btn-secondary" onclick="AdminContent.removeContactCard(${idx})" style="margin-top: var(--space-sm);">Remove Card</button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-secondary" onclick="AdminContent.addContactCard()" style="margin-top: var(--space-sm);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Card
                    </button>
                </div>
            </div>
        `;
    },

    updateCompany(section, field, value) {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            SITE_CONTENT.company[section][parent][child] = value;
        } else {
            SITE_CONTENT.company[section][field] = value;
        }
        saveSiteContent();
        Admin.toast('Company content updated');
    },

    updateMissionSectors(value) {
        SITE_CONTENT.company.mission.sectors = value.split('\n').filter(line => line.trim());
        saveSiteContent();
        Admin.toast('Mission sectors updated');
    },

    handleAboutImageUpload(event) {
        const files = Array.from(event.target.files);
        if (!SITE_CONTENT.company.about.images) {
            SITE_CONTENT.company.about.images = [];
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                SITE_CONTENT.company.about.images.push({
                    src: e.target.result,
                    alt: file.name,
                    id: Date.now() + Math.random()
                });
                saveSiteContent();
                this.renderCompanyPage();
                Admin.toast('Image uploaded');
            };
            reader.readAsDataURL(file);
        });
    },

    removeAboutImage(index) {
        if (SITE_CONTENT.company.about.images) {
            SITE_CONTENT.company.about.images.splice(index, 1);
            saveSiteContent();
            this.renderCompanyPage();
            Admin.toast('Image removed');
        }
    },

    updateContactPage(section, field, value) {
        if (!SITE_CONTENT.company.contactPage) {
            SITE_CONTENT.company.contactPage = { hero: {}, sidebar: {}, form: {} };
        }
        
        if (section.includes('.')) {
            const [parent, child] = section.split('.');
            if (!SITE_CONTENT.company.contactPage[parent]) {
                SITE_CONTENT.company.contactPage[parent] = {};
            }
            SITE_CONTENT.company.contactPage[parent][field] = value;
        } else {
            if (!SITE_CONTENT.company.contactPage[section]) {
                SITE_CONTENT.company.contactPage[section] = {};
            }
            SITE_CONTENT.company.contactPage[section][field] = value;
        }
        saveSiteContent();
        Admin.toast('Contact page updated');
    },

    handleContactBgUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (!SITE_CONTENT.company.contactPage) {
                SITE_CONTENT.company.contactPage = { hero: {}, sidebar: {}, form: {} };
            }
            if (!SITE_CONTENT.company.contactPage.hero) {
                SITE_CONTENT.company.contactPage.hero = {};
            }
            SITE_CONTENT.company.contactPage.hero.backgroundImage = e.target.result;
            saveSiteContent();
            this.renderCompanyPage();
            Admin.toast('Background image uploaded');
        };
        reader.readAsDataURL(file);
    },

    removeContactBg() {
        if (SITE_CONTENT.company.contactPage?.hero) {
            SITE_CONTENT.company.contactPage.hero.backgroundImage = null;
            saveSiteContent();
            this.renderCompanyPage();
            Admin.toast('Background image removed');
        }
    },

    handleContactVideoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (!SITE_CONTENT.company.contactPage) {
                SITE_CONTENT.company.contactPage = { hero: {}, sidebar: {}, form: {} };
            }
            if (!SITE_CONTENT.company.contactPage.sidebar) {
                SITE_CONTENT.company.contactPage.sidebar = {};
            }
            if (!SITE_CONTENT.company.contactPage.sidebar.video) {
                SITE_CONTENT.company.contactPage.sidebar.video = {};
            }
            SITE_CONTENT.company.contactPage.sidebar.video.src = e.target.result;
            SITE_CONTENT.company.contactPage.sidebar.video.enabled = true;
            saveSiteContent();
            this.renderCompanyPage();
            Admin.toast('Video uploaded');
        };
        reader.readAsDataURL(file);
    },

    addContactCard() {
        if (!SITE_CONTENT.company.contactPage) {
            SITE_CONTENT.company.contactPage = { hero: {}, sidebar: { cards: [] }, form: {} };
        }
        if (!SITE_CONTENT.company.contactPage.sidebar) {
            SITE_CONTENT.company.contactPage.sidebar = { cards: [] };
        }
        if (!SITE_CONTENT.company.contactPage.sidebar.cards) {
            SITE_CONTENT.company.contactPage.sidebar.cards = [];
        }
        
        SITE_CONTENT.company.contactPage.sidebar.cards.push({
            icon: "info",
            title: "New Card",
            content: "",
            link: ""
        });
        saveSiteContent();
        this.renderCompanyPage();
        Admin.toast('Card added');
    },

    updateContactCard(index, field, value) {
        if (SITE_CONTENT.company.contactPage?.sidebar?.cards?.[index]) {
            SITE_CONTENT.company.contactPage.sidebar.cards[index][field] = value;
            saveSiteContent();
            Admin.toast('Card updated');
        }
    },

    removeContactCard(index) {
        if (SITE_CONTENT.company.contactPage?.sidebar?.cards) {
            SITE_CONTENT.company.contactPage.sidebar.cards.splice(index, 1);
            saveSiteContent();
            this.renderCompanyPage();
            Admin.toast('Card removed');
        }
    },

    renderProducts() {
        const container = document.getElementById('products-admin-grid');
        container.innerHTML = SITE_CONTENT.products.map(product => `
            <div class="product-admin-card">
                <div class="product-admin-header">
                    <h3>${product.name}</h3>
                    <div class="product-admin-actions">
                        <button class="btn btn-secondary" onclick="AdminContent.editProduct('${product.id}')">Edit</button>
                        <button class="btn btn-secondary" onclick="AdminContent.previewProduct('${product.id}')">Preview</button>
                    </div>
                </div>
                <div class="product-admin-pages">
                    <button class="page-btn" onclick="AdminContent.editProductPage('${product.id}', 'landing')">Landing Page</button>
                    <button class="page-btn" onclick="AdminContent.editProductPage('${product.id}', 'docs')">Docs</button>
                    <button class="page-btn" onclick="AdminContent.editProductPage('${product.id}', 'api')">API</button>
                    <button class="page-btn" onclick="AdminContent.editProductPage('${product.id}', 'tutorial')">Tutorial</button>
                </div>
            </div>
        `).join('');
    },

    editProduct(productId) {
        Admin.switchView('editor');
        const product = SITE_CONTENT.products.find(p => p.id === productId);
        if (!product) return;

        // Set up editor for product content
        Admin.currentItem = {
            id: `product-${productId}`,
            type: 'product',
            name: product.name,
            productId: productId
        };

        // Populate editor with product data
        document.getElementById('item-name').value = product.name;
        document.getElementById('item-description').value = JSON.stringify(product, null, 2);
        
        setTimeout(() => {
            if (tinymce.get('item-content')) {
                tinymce.get('item-content').setContent(JSON.stringify(product, null, 2));
            }
        }, 100);
    },

    editProductPage(productId, pageType) {
        Admin.switchView('editor');
        const product = SITE_CONTENT.products.find(p => p.id === productId);
        if (!product) return;

        Admin.currentItem = {
            id: `product-${productId}-${pageType}`,
            type: 'product-page',
            name: `${product.name} - ${pageType.charAt(0).toUpperCase() + pageType.slice(1)}`,
            productId: productId,
            pageType: pageType
        };

        const pageData = product[pageType] || {};
        document.getElementById('item-name').value = Admin.currentItem.name;
        document.getElementById('item-description').value = JSON.stringify(pageData, null, 2);
        
        setTimeout(() => {
            if (tinymce.get('item-content')) {
                tinymce.get('item-content').setContent(JSON.stringify(pageData, null, 2));
            }
        }, 100);
    },

    previewProduct(productId) {
        const product = SITE_CONTENT.products.find(p => p.id === productId);
        if (product) {
            window.open(`../${productId}/index.html`, '_blank');
        }
    },

    addNewProduct() {
        const name = prompt('Product name:');
        if (!name) return;

        const id = name.toLowerCase().replace(/\s+/g, '-');
        const newProduct = {
            id: id,
            name: name,
            logo: `images/${id}_logo.svg`,
            landing: {
                hero: {
                    description: "",
                    primaryButton: { text: "View Documentation", link: "docs.html" },
                    secondaryButton: { text: "Get Started", link: "tutorial.html" }
                },
                why: {
                    title: `Why ${name}?`,
                    subtitle: "",
                    content: []
                }
            },
            homepage: {
                description: "",
                features: []
            },
            docs: {
                hero: {
                    badge: "",
                    subtitle: ""
                }
            },
            api: {
                hero: {
                    badge: "API Reference",
                    subtitle: ""
                },
                sections: []
            },
            tutorial: {
                hero: {
                    badge: "Tutorials",
                    subtitle: ""
                },
                sections: []
            }
        };

        SITE_CONTENT.products.push(newProduct);
        saveSiteContent();
        this.renderProducts();
        Admin.toast('Product added');
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdminContent.init());
} else {
    AdminContent.init();
}
