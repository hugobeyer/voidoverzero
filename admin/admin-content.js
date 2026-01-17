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
                    <label>Content</label>
                    <textarea class="form-textarea" rows="4" 
                              onchange="AdminContent.updateCompany('mission', 'content', this.value)">${company.mission.content}</textarea>
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
            </div>

            <div class="content-section-card">
                <h3>Contact Section</h3>
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
                    <label>Email</label>
                    <input type="email" class="form-input" value="${company.contact.email}" 
                           onchange="AdminContent.updateCompany('contact', 'email', this.value)">
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
