/**
 * Admin Module - Comprehensive documentation management system
 */

const Admin = {
    currentView: 'list',
    currentItem: null,
    richEditor: null,
    autoSaveTimer: null,
    autoSaveInterval: 30000, // 30 seconds

    init() {
        this.initRichEditor();
        this.bindEvents();
        this.renderCategoriesFilter();
        this.renderCategoriesGrid();
        this.renderItemList();
        this.updateStats();
        this.switchView('company');
        this.startAutoSaveTimer();
    },

    initRichEditor() {
        // Initialize TinyMCE with user's configuration
        tinymce.init({
            selector: '.rich-editor',
            height: 400,
            menubar: false,
            plugins: [
                // Core editing features
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                // Premium features trial
                'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
            ],
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; color: #e4e4e7; background: #1a1e24; }',
            skin: 'oxide-dark',
            content_css: false,
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Rawteous Admin',
            mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            uploadcare_public_key: 'eda62d1a2606065851e6',
            images_upload_handler: (blobInfo, success, failure) => {
                console.log('Starting image upload for:', blobInfo.filename());

                try {
                    // Convert blob to base64 and store in our image gallery
                    const reader = new FileReader();
                    reader.onload = () => {
                        console.log('Image file read successfully, size:', reader.result.length);

                        // Store image in the uploaded images array
                        if (!window.uploadedImages) window.uploadedImages = [];

                        const imageData = {
                            id: 'editor_' + Date.now() + '_' + Math.random(),
                            src: reader.result,
                            name: blobInfo.filename() || 'editor-image.png',
                            uploaded: new Date().toISOString(),
                            fromEditor: true
                        };

                        window.uploadedImages.push(imageData);

                        // Return the base64 data URL for TinyMCE
                        success(reader.result);

                        // Update the images gallery display
                        this.renderImagesGallery();

                        console.log('Image uploaded and stored successfully:', imageData.name);
                        this.toast('Image uploaded successfully');
                    };
                    reader.onerror = (error) => {
                        console.error('Failed to read image file:', error);
                        failure('Failed to read image file');
                        this.toast('Failed to read image file', true);
                    };
                    reader.readAsDataURL(blobInfo.blob());
                } catch (error) {
                    console.error('Image upload error:', error);
                    failure('Image upload failed: ' + error.message);
                    this.toast('Image upload failed', true);
                }
            },
            // Enable automatic uploads when images are pasted/dragged
            automatic_uploads: true,
            paste_data_images: true,
            // Allow images to be uploaded
            images_reuse_filename: true,
            // Enhanced paste settings for full copy/paste support
            paste_as_text: false,
            paste_webkit_styles: "all",
            paste_retain_style_properties: "all",
            paste_merge_formats: true,
            smart_paste: true,
            paste_postprocess: (plugin, args) => {
                console.log('Paste operation completed');
            },
            paste_preprocess: (plugin, args) => {
                console.log('Paste operation started');
            },
            // PowerPaste settings for enhanced paste functionality
            powerpaste_allow_local_images: true,
            powerpaste_word_import: 'merge',
            powerpaste_html_import: 'merge',
            powerpaste_clean_filtered_inline_css: false,
            // Additional paste settings
            paste_remove_styles_if_webkit: false,
            paste_webkit_styles: "color font-size font-family font-weight font-style text-decoration text-align",
            paste_convert_word_fake_lists: true,
            paste_tab_spaces: 4,
            // Image settings
            image_advtab: true,
            image_title: true,
            // Handle image insertion
            images_upload_base_path: '',
            // Debug logging and paste event handling
            setup: (editor) => {
                editor.on('init', () => {
                    console.log('TinyMCE editor initialized successfully');
                });
                editor.on('change', () => {
                    console.log('Editor content changed');
                });
                editor.on('paste', (e) => {
                    console.log('Paste event detected:', e);
                });
                editor.on('copy', (e) => {
                    console.log('Copy event detected');
                });
                editor.on('cut', (e) => {
                    console.log('Cut event detected');
                });
                editor.on('ObjectResized', (e) => {
                    console.log('Image resized:', e);
                });
                editor.on('keydown', (e) => {
                    // Log Ctrl+C, Ctrl+V, Ctrl+X combinations
                    if (e.ctrlKey || e.metaKey) {
                        if (e.key === 'c') console.log('Ctrl+C detected');
                        if (e.key === 'v') console.log('Ctrl+V detected');
                        if (e.key === 'x') console.log('Ctrl+X detected');
                    }
                });

                // Add custom keyboard shortcuts for copy/paste
                editor.addShortcut('ctrl+c', 'Copy', () => {
                    document.execCommand('copy');
                    console.log('Custom copy shortcut triggered');
                });
                editor.addShortcut('ctrl+v', 'Paste', () => {
                    document.execCommand('paste');
                    console.log('Custom paste shortcut triggered');
                });
                editor.addShortcut('ctrl+x', 'Cut', () => {
                    document.execCommand('cut');
                    console.log('Custom cut shortcut triggered');
                });
            }
        });
    },

    bindEvents() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Search input
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filterItems(e.target.value, document.getElementById('category-filter').value);
        });

        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filterItems(document.getElementById('search-input').value, e.target.value);
        });

        // Image upload
        document.getElementById('image-upload').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files);
        });

        // Import/Export
        document.getElementById('import-input').addEventListener('change', (e) => {
            this.handleImport(e.target.files[0]);
        });

        // Item list delegation
        document.getElementById('item-list').addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            const editBtn = e.target.closest('.edit-btn');
            const deleteBtn = e.target.closest('.delete-btn');

            if (editBtn && card) {
                e.stopPropagation();
                const itemId = card.dataset.itemId;
                this.editItem(itemId);
            } else if (deleteBtn && card) {
                e.stopPropagation();
                const itemId = card.dataset.itemId;
                this.deleteItem(itemId);
            } else if (card) {
                const itemId = card.dataset.itemId;
                this.editItem(itemId);
            }
        });

        // Categories grid delegation
        document.getElementById('categories-grid').addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-category-btn');
            const deleteBtn = e.target.closest('.delete-category-btn');

            if (editBtn) {
                const categoryId = editBtn.dataset.categoryId;
                this.editCategory(categoryId);
            } else if (deleteBtn) {
                const categoryId = deleteBtn.dataset.categoryId;
                this.deleteCategory(categoryId);
            }
        });

        // Images gallery delegation
        document.getElementById('images-gallery').addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-image-btn');
            if (deleteBtn) {
                const imageId = deleteBtn.dataset.imageId;
                this.deleteUploadedImage(imageId);
            }
        });
    },

    switchView(view) {
        // Auto-save current item if switching away from editor
        if (this.currentView === 'editor' && view !== 'editor' && this.currentItem) {
            console.log('Auto-saving before switching view');
            this.saveCurrentItem();
        }

        this.currentView = view;

        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === view);
        });

        // Update views
        document.querySelectorAll('.admin-view').forEach(viewEl => {
            viewEl.classList.toggle('active', viewEl.id === `view-${view}`);
        });

        // View-specific actions
        const autoSaveStatus = document.getElementById('auto-save-status');

        if (view === 'company' && typeof AdminContent !== 'undefined') {
            AdminContent.renderCompanyPage();
        } else if (view === 'products' && typeof AdminContent !== 'undefined') {
            AdminContent.renderProducts();
        } else if (view === 'editor' && !this.currentItem) {
            document.getElementById('editor-info').style.display = 'block';
            document.getElementById('editor-container').style.display = 'none';
            this.stopAutoSaveTimer();
            if (autoSaveStatus) autoSaveStatus.style.display = 'none';
        } else if (view === 'editor') {
            document.getElementById('editor-info').style.display = 'none';
            document.getElementById('editor-container').style.display = 'block';
            this.startAutoSaveTimer();
            if (autoSaveStatus) autoSaveStatus.style.display = 'flex';
        } else {
            this.stopAutoSaveTimer();
            if (autoSaveStatus) autoSaveStatus.style.display = 'none';
        }
    },

    renderItemList(items = null) {
        const container = document.getElementById('item-list');
        const itemList = items || ADMIN_DOCS_DATA.items;

        container.innerHTML = itemList.map(item => {
            const category = ADMIN_DOCS_DATA.getCategoryById(item.category);
            return `
                <div class="item-card" data-item-id="${item.id}">
                    <div class="item-card-header">
                        <div>
                            <div class="item-card-title">${item.name}</div>
                            <div class="item-card-type">${item.type}</div>
                        </div>
                        <div class="item-card-actions">
                            <button class="edit-btn" title="Edit">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="delete-btn delete" title="Delete">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3,6 5,6 21,6"></polyline>
                                    <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                                </polyline>
                            </button>
                        </div>
                    </div>
                    <div class="item-card-category">
                        <span class="category-icon">${category ? category.icon : '📄'}</span>
                        ${category ? category.name : 'Uncategorized'}
                    </div>
                    <div class="item-card-description">${item.description || 'No description'}</div>
                    <div class="item-card-meta">
                        <span>Last modified: ${new Date(item.lastModified).toLocaleDateString()}</span>
                        <span>ID: ${item.id}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderCategoriesFilter() {
        const select = document.getElementById('category-filter');
        select.innerHTML = `
            <option value="">All Categories</option>
            ${ADMIN_DOCS_DATA.categories.map(cat => `
                <option value="${cat.id}">${cat.icon} ${cat.name}</option>
            `).join('')}
        `;

        // Also populate category selects in forms
        const categorySelects = document.querySelectorAll('#item-category, #modal-item-category');
        categorySelects.forEach(sel => {
            sel.innerHTML = ADMIN_DOCS_DATA.categories.map(cat => `
                <option value="${cat.id}">${cat.icon} ${cat.name}</option>
            `).join('');
        });
    },

    renderCategoriesGrid() {
        const container = document.getElementById('categories-grid');
        const stats = ADMIN_DOCS_DATA.getStats();

        container.innerHTML = ADMIN_DOCS_DATA.categories.map(cat => {
            const itemCount = stats.categories[cat.id] || 0;
            return `
                <div class="category-card">
                    <div class="category-header">
                        <div class="category-icon" style="background: ${cat.color}20; color: ${cat.color}">
                            ${cat.icon}
                        </div>
                        <div class="category-info">
                            <h3>${cat.name}</h3>
                            <div class="category-stats">${itemCount} items</div>
                        </div>
                    </div>
                    <div class="category-actions">
                        <button class="btn btn-secondary edit-category-btn" data-category-id="${cat.id}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Edit
                        </button>
                        <button class="btn btn-secondary delete-category-btn" data-category-id="${cat.id}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    updateStats() {
        const stats = ADMIN_DOCS_DATA.getStats();
        const container = document.getElementById('stats-bar');

        container.innerHTML = `
            <div class="stat-item">
                <div class="stat-value">${stats.totalItems}</div>
                <div class="stat-label">Total Items</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${stats.types.panel || 0}</div>
                <div class="stat-label">Panels</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${stats.types.group || 0}</div>
                <div class="stat-label">Groups</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${stats.types.param || 0}</div>
                <div class="stat-label">Parameters</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${ADMIN_DOCS_DATA.categories.length}</div>
                <div class="stat-label">Categories</div>
            </div>
        `;
    },

    filterItems(searchQuery = '', categoryFilter = '') {
        const filtered = ADMIN_DOCS_DATA.searchItems(searchQuery, categoryFilter);
        this.renderItemList(filtered);
    },

    editItem(itemId) {
        const item = ADMIN_DOCS_DATA.getItemById(itemId);
        if (!item) return;

        // Auto-save current item if different item is being edited
        if (this.currentItem && this.currentItem.id !== itemId) {
            console.log('Auto-saving before switching to different item');
            this.saveCurrentItem();
        }

        this.currentItem = item;
        this.switchView('editor');

        // Populate form
        document.getElementById('item-name').value = item.name;
        document.getElementById('item-category').value = item.category;
        document.getElementById('item-description').value = item.description;

        // Set rich editor content
        setTimeout(() => {
            if (tinymce.get('item-content')) {
                tinymce.get('item-content').setContent(item.content || '');
            }
        }, 100);
    },

    saveCurrentItem(autoSave = false) {
        if (!this.currentItem) return;

        const content = tinymce.get('item-content') ? tinymce.get('item-content').getContent() : '';
        
        // Handle product content updates
        if (this.currentItem.type === 'product' || this.currentItem.type === 'product-page') {
            try {
                const product = SITE_CONTENT.products.find(p => p.id === this.currentItem.productId);
                if (product) {
                    if (this.currentItem.type === 'product-page') {
                        const pageData = JSON.parse(content);
                        product[this.currentItem.pageType] = pageData;
                    } else {
                        const productData = JSON.parse(content);
                        Object.assign(product, productData);
                    }
                    saveSiteContent();
                    if (typeof AdminContent !== 'undefined') {
                        AdminContent.renderProducts();
                    }
                    if (!autoSave) {
                        this.toast('Product content saved!');
                    } else {
                        this.showAutoSaveIndicator();
                    }
                    return;
                }
            } catch (e) {
                console.error('Failed to parse product content:', e);
                if (!autoSave) {
                    this.toast('Invalid JSON format', true);
                }
                return;
            }
        }

        // Handle regular docs items
        const updates = {
            name: document.getElementById('item-name').value,
            category: document.getElementById('item-category').value,
            description: document.getElementById('item-description').value,
            content: content
        };

        if (ADMIN_DOCS_DATA.updateItem(this.currentItem.id, updates)) {
            if (!autoSave) {
                this.toast('Item saved successfully!');
            } else {
                this.showAutoSaveIndicator();
            }
            this.renderItemList();
            this.updateStats();
        } else {
            if (!autoSave) {
                this.toast('Failed to save item', true);
            }
        }
    },

    deleteItem(itemId) {
        if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
            if (ADMIN_DOCS_DATA.deleteItem(itemId)) {
                this.toast('Item deleted');
                this.renderItemList();
                this.updateStats();
                if (this.currentItem && this.currentItem.id === itemId) {
                    this.currentItem = null;
                    this.switchView('list');
                }
            } else {
                this.toast('Failed to delete item', true);
            }
        }
    },

    addNewItem() {
        document.getElementById('modal-title').textContent = 'Add New Item';
        document.getElementById('modal-item-name').value = '';
        document.getElementById('modal-item-type').value = 'custom';
        document.getElementById('modal-item-description').value = '';

        // Set default category
        const defaultCat = ADMIN_DOCS_DATA.categories[0];
        if (defaultCat) {
            document.getElementById('modal-item-category').value = defaultCat.id;
        }

        document.getElementById('item-modal').classList.add('active');
    },

    saveModalItem() {
        const name = document.getElementById('modal-item-name').value.trim();
        if (!name) {
            this.toast('Name is required', true);
            return;
        }

        const newItem = {
            type: document.getElementById('modal-item-type').value,
            name: name,
            description: document.getElementById('modal-item-description').value,
            category: document.getElementById('modal-item-category').value,
            content: ''
        };

        const item = ADMIN_DOCS_DATA.addItem(newItem);
        this.toast('Item created successfully!');
        this.closeModal();
        this.renderItemList();
        this.updateStats();
        this.editItem(item.id);
    },

    closeModal() {
        document.getElementById('item-modal').classList.remove('active');
    },

    insertImageFromGallery() {
        if (!window.uploadedImages || window.uploadedImages.length === 0) {
            this.toast('No images in gallery. Upload some images first.', true);
            return;
        }

        // Create image selection modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content image-gallery-modal">
                <div class="modal-header">
                    <h3>Select Image to Insert</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="image-grid-modal">
                        ${window.uploadedImages.map(img => `
                            <div class="gallery-image-item" data-src="${img.src}" onclick="Admin.insertSelectedImage('${img.src}')">
                                <img src="${img.src}" alt="${img.name}">
                                <div class="image-overlay-modal">
                                    <span>${img.name}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    insertSelectedImage(src) {
        if (tinymce.activeEditor) {
            tinymce.activeEditor.insertContent(`<img src="${src}" alt="Inserted image" style="max-width: 100%; height: auto;">`);
            this.toast('Image inserted into editor');
        }
        // Remove the modal
        document.querySelector('.image-gallery-modal').closest('.modal').remove();
    },

    testCopyPaste() {
        const testContent = `
            <h3>Copy/Paste Test Content</h3>
            <p><strong>This is bold text</strong> and <em>this is italic text</em>.</p>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
            </ul>
            <p>You can copy this content and paste it anywhere in the editor!</p>
            <blockquote>
                <p>This is a blockquote that you can also copy and paste.</p>
            </blockquote>
        `;

        if (tinymce.activeEditor) {
            // Insert test content at cursor
            tinymce.activeEditor.insertContent(testContent);
            this.toast('Test content inserted! Try copying it and pasting elsewhere.');
        } else {
            this.toast('Editor not ready yet. Please select an item to edit first.', true);
        }
    },

    startAutoSaveTimer() {
        this.stopAutoSaveTimer(); // Clear any existing timer
        this.autoSaveTimer = setInterval(() => {
            if (this.currentView === 'editor' && this.currentItem) {
                console.log('Auto-saving due to timer');
                this.saveCurrentItem(true);
            }
        }, this.autoSaveInterval);
        console.log('Auto-save timer started');
    },

    stopAutoSaveTimer() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
            console.log('Auto-save timer stopped');
        }
    },

    showAutoSaveIndicator() {
        // Create or update auto-save indicator
        let indicator = document.getElementById('auto-save-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'auto-save-indicator';
            indicator.className = 'auto-save-indicator';
            document.body.appendChild(indicator);
        }

        indicator.textContent = 'Auto-saved';
        indicator.classList.add('show');

        // Update status text
        const statusEl = document.getElementById('auto-save-status');
        if (statusEl) {
            const timeString = new Date().toLocaleTimeString();
            statusEl.innerHTML = `
                <span class="auto-save-dot"></span>
                Last saved: ${timeString}
            `;
        }

        // Hide after 2 seconds
        setTimeout(() => {
            indicator.classList.remove('show');
            // Reset status text
            if (statusEl) {
                statusEl.innerHTML = `
                    <span class="auto-save-dot"></span>
                    Auto-saving enabled
                `;
            }
        }, 2000);
    },

    addNewCategory() {
        const name = prompt('Enter category name:');
        if (!name) return;

        const icon = prompt('Enter category icon (emoji):', '📄');
        const color = prompt('Enter category color (hex):', '#607D8B');

        ADMIN_DOCS_DATA.categories.push({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name: name,
            icon: icon,
            color: color
        });

        this.renderCategoriesFilter();
        this.renderCategoriesGrid();
        this.toast('Category added');
    },

    editCategory(categoryId) {
        const category = ADMIN_DOCS_DATA.getCategoryById(categoryId);
        if (!category) return;

        const newName = prompt('Edit category name:', category.name);
        if (!newName) return;

        const newIcon = prompt('Edit category icon:', category.icon);
        const newColor = prompt('Edit category color:', category.color);

        category.name = newName;
        category.icon = newIcon;
        category.color = newColor;
        category.id = newName.toLowerCase().replace(/\s+/g, '-');

        this.renderCategoriesFilter();
        this.renderCategoriesGrid();
        this.toast('Category updated');
    },

    deleteCategory(categoryId) {
        if (ADMIN_DOCS_DATA.categories.length <= 1) {
            this.toast('Cannot delete the last category', true);
            return;
        }

        if (confirm('Are you sure you want to delete this category? Items in this category will become uncategorized.')) {
            ADMIN_DOCS_DATA.categories = ADMIN_DOCS_DATA.categories.filter(cat => cat.id !== categoryId);

            // Update items in this category
            ADMIN_DOCS_DATA.items.forEach(item => {
                if (item.category === categoryId) {
                    item.category = '';
                }
            });

            this.renderCategoriesFilter();
            this.renderCategoriesGrid();
            this.renderItemList();
            this.toast('Category deleted');
        }
    },

    handleImageUpload(files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Store uploaded images (in a real app, these would go to a server)
                if (!window.uploadedImages) window.uploadedImages = [];
                window.uploadedImages.push({
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    name: file.name,
                    uploaded: new Date().toISOString()
                });
                this.renderImagesGallery();
                this.toast('Image uploaded');
            };
            reader.readAsDataURL(file);
        });
    },

    renderImagesGallery() {
        const container = document.getElementById('images-gallery');
        const images = window.uploadedImages || [];

        container.innerHTML = images.map(img => `
            <div class="image-item-admin">
                <img src="${img.src}" alt="${img.name}">
                <div class="image-overlay">
                    <button class="delete-image-btn" data-image-id="${img.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    },

    deleteUploadedImage(imageId) {
        if (window.uploadedImages) {
            window.uploadedImages = window.uploadedImages.filter(img => img.id != imageId);
            this.renderImagesGallery();
            this.toast('Image deleted');
        }
    },

    previewChanges() {
        // Open main documentation page in new tab to preview changes
        window.open('../rawteous.html', '_blank');
    },

    exportData() {
        const data = ADMIN_DOCS_DATA.exportData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'rawteous-admin-data.json';
        a.click();

        URL.revokeObjectURL(url);
        this.toast('Data exported!');
    },

    importData() {
        document.getElementById('import-input').click();
    },

    handleImport(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (ADMIN_DOCS_DATA.importData(data)) {
                    this.toast('Data imported successfully!');
                    this.renderItemList();
                    this.renderCategoriesFilter();
                    this.renderCategoriesGrid();
                    this.updateStats();
                } else {
                    this.toast('Invalid data format', true);
                }
            } catch (err) {
                this.toast('Invalid JSON file', true);
            }
        };
        reader.readAsText(file);
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

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Auto-save before leaving
    if (Admin.currentItem) {
        Admin.saveCurrentItem(true);
    }
    // Stop auto-save timer
    Admin.stopAutoSaveTimer();
});
