/**
 * Admin Data Structure - Extended documentation management
 * Includes categories, rich text content, and metadata for all documentation items
 */

// Categories for organizing documentation items
const DOC_CATEGORIES = [
    { id: 'getting-started', name: 'Getting Started', color: '#4CAF50', icon: '🚀' },
    { id: 'capture-settings', name: 'Capture Settings', color: '#2196F3', icon: '📷' },
    { id: 'quality-options', name: 'Quality & Performance', color: '#FF9800', icon: '⚡' },
    { id: 'rendering', name: 'Rendering & Display', color: '#9C27B0', icon: '🎨' },
    { id: 'advanced', name: 'Advanced Features', color: '#F44336', icon: '🔧' },
    { id: 'workflow', name: 'Workflow & Tools', color: '#607D8B', icon: '⚙️' },
    { id: 'api-reference', name: 'API Reference', color: '#795548', icon: '📚' },
    { id: 'troubleshooting', name: 'Troubleshooting', color: '#FF5722', icon: '🔍' }
];

// Extended documentation data with admin capabilities
const ADMIN_DOCS_DATA = {
    categories: DOC_CATEGORIES,

    // Flatten all documentation items for easy management
    items: [],

    // Initialize from existing DOCS_DATA
    init() {
        this.items = [];

        DOCS_DATA.panels.forEach(panel => {
            // Add panel as an item
            this.items.push({
                id: `panel-${panel.id}`,
                type: 'panel',
                name: panel.name,
                description: panel.description,
                category: this.getDefaultCategoryForPanel(panel.id),
                content: panel.description,
                icon: panel.icon,
                order: this.items.length,
                metadata: {
                    originalId: panel.id,
                    paramCount: panel.groups.reduce((sum, group) => sum + group.params.length, 0),
                    groupCount: panel.groups.length
                },
                lastModified: new Date().toISOString(),
                created: new Date().toISOString()
            });

            // Add groups as items
            panel.groups.forEach(group => {
                this.items.push({
                    id: `group-${panel.id}-${group.id}`,
                    type: 'group',
                    name: group.name,
                    description: group.description,
                    category: this.getDefaultCategoryForPanel(panel.id),
                    content: group.description,
                    parentPanel: panel.id,
                    order: this.items.length,
                    metadata: {
                        originalId: group.id,
                        panelId: panel.id,
                        paramCount: group.params.length
                    },
                    lastModified: new Date().toISOString(),
                    created: new Date().toISOString()
                });

                // Add parameters as items
                group.params.forEach(param => {
                    this.items.push({
                        id: `param-${panel.id}-${group.id}-${param.id}`,
                        type: 'param',
                        name: param.name,
                        description: param.desc,
                        category: this.getDefaultCategoryForPanel(panel.id),
                        content: param.desc,
                        parentPanel: panel.id,
                        parentGroup: group.id,
                        order: this.items.length,
                        metadata: {
                            originalId: param.id,
                            panelId: panel.id,
                            groupId: group.id,
                            image: param.image,
                            imageCount: (imageData[`${panel.id}-${group.id}-${param.id}`] || []).length
                        },
                        lastModified: new Date().toISOString(),
                        created: new Date().toISOString()
                    });
                });
            });
        });

        this.loadFromStorage();
    },

    // Get default category based on panel
    getDefaultCategoryForPanel(panelId) {
        const categoryMap = {
            'impostor': 'capture-settings',
            'capture': 'capture-settings',
            'postprocess': 'quality-options',
            'billboard': 'rendering',
            'cast': 'advanced',
            'channel-packing': 'advanced',
            'workflow': 'workflow',
            'leader': 'workflow',
            'overlay-menu': 'workflow',
            'presets': 'workflow',
            'atlas-viewer': 'advanced'
        };
        return categoryMap[panelId] || 'advanced';
    },

    // Get items by category
    getItemsByCategory(categoryId) {
        return this.items.filter(item => item.category === categoryId);
    },

    // Get item by ID
    getItemById(id) {
        return this.items.find(item => item.id === id);
    },

    // Update item
    updateItem(id, updates) {
        const item = this.getItemById(id);
        if (item) {
            Object.assign(item, updates);
            item.lastModified = new Date().toISOString();
            this.saveToStorage();
            return true;
        }
        return false;
    },

    // Add new item
    addItem(item) {
        item.id = `custom-${Date.now()}`;
        item.order = this.items.length;
        item.created = new Date().toISOString();
        item.lastModified = new Date().toISOString();
        this.items.push(item);
        this.saveToStorage();
        return item;
    },

    // Delete item
    deleteItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    },

    // Search items
    searchItems(query, categoryFilter = null) {
        const lowerQuery = query.toLowerCase();
        return this.items.filter(item => {
            const matchesQuery = item.name.toLowerCase().includes(lowerQuery) ||
                               item.description.toLowerCase().includes(lowerQuery) ||
                               item.content.toLowerCase().includes(lowerQuery);
            const matchesCategory = !categoryFilter || item.category === categoryFilter;
            return matchesQuery && matchesCategory;
        });
    },

    // Export data
    exportData() {
        return {
            categories: this.categories,
            items: this.items,
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };
    },

    // Import data
    importData(data) {
        if (data.categories && data.items) {
            this.categories = data.categories;
            this.items = data.items;
            this.saveToStorage();
            return true;
        }
        return false;
    },

    // Local storage operations
    saveToStorage() {
        try {
            localStorage.setItem('admin_docs_data', JSON.stringify(this.exportData()));
        } catch (e) {
            console.warn('Failed to save admin data to localStorage:', e);
        }
    },

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('admin_docs_data');
            if (stored) {
                const data = JSON.parse(stored);
                if (data.items && data.items.length > 0) {
                    // Merge with current items, preferring stored data
                    const mergedItems = [...this.items];
                    data.items.forEach(storedItem => {
                        const existingIndex = mergedItems.findIndex(item => item.id === storedItem.id);
                        if (existingIndex !== -1) {
                            mergedItems[existingIndex] = { ...mergedItems[existingIndex], ...storedItem };
                        } else {
                            mergedItems.push(storedItem);
                        }
                    });
                    this.items = mergedItems;
                }
            }
        } catch (e) {
            console.warn('Failed to load admin data from localStorage:', e);
        }
    },

    // Get category info
    getCategoryById(id) {
        return this.categories.find(cat => cat.id === id);
    },

    // Get statistics
    getStats() {
        const stats = {
            totalItems: this.items.length,
            categories: {},
            types: { panel: 0, group: 0, param: 0, custom: 0 }
        };

        this.items.forEach(item => {
            stats.types[item.type] = (stats.types[item.type] || 0) + 1;
            stats.categories[item.category] = (stats.categories[item.category] || 0) + 1;
        });

        return stats;
    }
};

// Initialize when loaded
if (typeof DOCS_DATA !== 'undefined') {
    ADMIN_DOCS_DATA.init();
}