/**
 * VOZ Editor - Custom Rich Text Editor
 * A lightweight, dependency-free rich text editor
 */

class VOZEditor {
    constructor(selector, options = {}) {
        this.textarea = document.querySelector(selector);
        if (!this.textarea) {
            console.error('VOZEditor: Element not found:', selector);
            return;
        }

        this.options = {
            height: options.height || 400,
            placeholder: options.placeholder || 'Start writing...',
            onChange: options.onChange || null,
            onImageUpload: options.onImageUpload || null,
            ...options
        };

        this.id = this.textarea.id || 'voz-editor-' + Date.now();
        this.build();
        this.bindEvents();
    }

    build() {
        // Hide original textarea
        this.textarea.style.display = 'none';

        // Create editor container
        this.container = document.createElement('div');
        this.container.className = 'voz-editor';
        this.container.id = this.id + '-container';

        // Create toolbar
        this.toolbar = document.createElement('div');
        this.toolbar.className = 'voz-toolbar';
        this.toolbar.innerHTML = this.buildToolbar();

        // Create editable area
        this.editor = document.createElement('div');
        this.editor.className = 'voz-content';
        this.editor.contentEditable = true;
        this.editor.style.minHeight = this.options.height + 'px';
        this.editor.dataset.placeholder = this.options.placeholder;

        // Create status bar
        this.statusBar = document.createElement('div');
        this.statusBar.className = 'voz-status';
        this.statusBar.innerHTML = '<span class="voz-word-count">0 words</span>';

        // Assemble
        this.container.appendChild(this.toolbar);
        this.container.appendChild(this.editor);
        this.container.appendChild(this.statusBar);

        // Insert after textarea
        this.textarea.parentNode.insertBefore(this.container, this.textarea.nextSibling);
    }

    buildToolbar() {
        return `
            <div class="voz-toolbar-group">
                <button type="button" class="voz-btn" data-cmd="undo" title="Undo (Ctrl+Z)">
                    <svg viewBox="0 0 24 24"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="redo" title="Redo (Ctrl+Y)">
                    <svg viewBox="0 0 24 24"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>
                </button>
            </div>
            <div class="voz-toolbar-divider"></div>
            <div class="voz-toolbar-group">
                <select class="voz-select" data-cmd="formatBlock" title="Format">
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="blockquote">Quote</option>
                    <option value="pre">Code Block</option>
                </select>
            </div>
            <div class="voz-toolbar-divider"></div>
            <div class="voz-toolbar-group">
                <button type="button" class="voz-btn" data-cmd="bold" title="Bold (Ctrl+B)">
                    <svg viewBox="0 0 24 24"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="italic" title="Italic (Ctrl+I)">
                    <svg viewBox="0 0 24 24"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="underline" title="Underline (Ctrl+U)">
                    <svg viewBox="0 0 24 24"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="strikeThrough" title="Strikethrough">
                    <svg viewBox="0 0 24 24"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/></svg>
                </button>
            </div>
            <div class="voz-toolbar-divider"></div>
            <div class="voz-toolbar-group">
                <button type="button" class="voz-btn" data-cmd="insertUnorderedList" title="Bullet List">
                    <svg viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="insertOrderedList" title="Numbered List">
                    <svg viewBox="0 0 24 24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="indent" title="Indent">
                    <svg viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="outdent" title="Outdent">
                    <svg viewBox="0 0 24 24"><path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/></svg>
                </button>
            </div>
            <div class="voz-toolbar-divider"></div>
            <div class="voz-toolbar-group">
                <button type="button" class="voz-btn" data-cmd="justifyLeft" title="Align Left">
                    <svg viewBox="0 0 24 24"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="justifyCenter" title="Align Center">
                    <svg viewBox="0 0 24 24"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="justifyRight" title="Align Right">
                    <svg viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg>
                </button>
            </div>
            <div class="voz-toolbar-divider"></div>
            <div class="voz-toolbar-group">
                <button type="button" class="voz-btn" data-action="link" title="Insert Link (Ctrl+K)">
                    <svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-action="image" title="Insert Image">
                    <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-action="code" title="Inline Code">
                    <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-cmd="insertHorizontalRule" title="Horizontal Line">
                    <svg viewBox="0 0 24 24"><path d="M4 11h16v2H4z"/></svg>
                </button>
            </div>
            <div class="voz-toolbar-divider"></div>
            <div class="voz-toolbar-group">
                <button type="button" class="voz-btn" data-cmd="removeFormat" title="Clear Formatting">
                    <svg viewBox="0 0 24 24"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"/></svg>
                </button>
                <button type="button" class="voz-btn" data-action="source" title="View HTML Source">
                    <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                </button>
            </div>
        `;
    }

    bindEvents() {
        // Toolbar button clicks
        this.toolbar.addEventListener('click', (e) => {
            const btn = e.target.closest('.voz-btn');
            if (!btn) return;

            e.preventDefault();
            const cmd = btn.dataset.cmd;
            const action = btn.dataset.action;

            if (cmd) {
                this.execCommand(cmd);
            } else if (action) {
                this.handleAction(action);
            }
        });

        // Format select
        this.toolbar.addEventListener('change', (e) => {
            if (e.target.classList.contains('voz-select')) {
                const value = e.target.value;
                this.execCommand('formatBlock', value);
                e.target.value = 'p';
            }
        });

        // Editor input
        this.editor.addEventListener('input', () => {
            this.syncToTextarea();
            this.updateWordCount();
            if (this.options.onChange) {
                this.options.onChange(this.getContent());
            }
        });

        // Paste handling
        this.editor.addEventListener('paste', (e) => this.handlePaste(e));

        // Drag and drop
        this.editor.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.editor.classList.add('voz-dragover');
        });

        this.editor.addEventListener('dragleave', () => {
            this.editor.classList.remove('voz-dragover');
        });

        this.editor.addEventListener('drop', (e) => this.handleDrop(e));

        // Keyboard shortcuts
        this.editor.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Focus/blur for placeholder
        this.editor.addEventListener('focus', () => {
            this.container.classList.add('voz-focused');
        });

        this.editor.addEventListener('blur', () => {
            this.container.classList.remove('voz-focused');
        });
    }

    execCommand(cmd, value = null) {
        this.editor.focus();
        document.execCommand(cmd, false, value);
        this.syncToTextarea();
    }

    handleAction(action) {
        switch (action) {
            case 'link':
                this.insertLink();
                break;
            case 'image':
                this.insertImage();
                break;
            case 'code':
                this.insertInlineCode();
                break;
            case 'source':
                this.toggleSource();
                break;
        }
    }

    insertLink() {
        const selection = window.getSelection();
        const selectedText = selection.toString();
        const url = prompt('Enter URL:', 'https://');
        
        if (url) {
            if (selectedText) {
                this.execCommand('createLink', url);
            } else {
                const text = prompt('Enter link text:', 'Link');
                if (text) {
                    this.execCommand('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
                }
            }
        }
    }

    insertImage() {
        const url = prompt('Enter image URL:');
        if (url) {
            const alt = prompt('Enter alt text:', 'Image');
            this.execCommand('insertHTML', `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;">`);
        }
    }

    insertInlineCode() {
        const selection = window.getSelection();
        const selectedText = selection.toString();
        
        if (selectedText) {
            this.execCommand('insertHTML', `<code>${selectedText}</code>`);
        } else {
            this.execCommand('insertHTML', '<code>code</code>');
        }
    }

    toggleSource() {
        if (this.isSourceMode) {
            // Switch back to WYSIWYG
            this.editor.innerHTML = this.editor.textContent;
            this.editor.contentEditable = true;
            this.isSourceMode = false;
            this.container.classList.remove('voz-source-mode');
        } else {
            // Switch to source mode
            const html = this.editor.innerHTML;
            this.editor.textContent = this.formatHTML(html);
            this.editor.contentEditable = true;
            this.isSourceMode = true;
            this.container.classList.add('voz-source-mode');
        }
    }

    formatHTML(html) {
        // Simple HTML formatting
        return html
            .replace(/></g, '>\n<')
            .replace(/\n\n+/g, '\n');
    }

    handlePaste(e) {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
            if (item.type.startsWith('image/')) {
                e.preventDefault();
                const file = item.getAsFile();
                this.insertImageFile(file);
                return;
            }
        }

        // For text, let default paste happen but clean it up
        if (e.clipboardData.types.includes('text/html')) {
            e.preventDefault();
            let html = e.clipboardData.getData('text/html');
            // Clean up the HTML
            html = this.cleanPastedHTML(html);
            this.execCommand('insertHTML', html);
        }
    }

    cleanPastedHTML(html) {
        // Remove scripts and styles
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        
        // Remove comments
        html = html.replace(/<!--[\s\S]*?-->/g, '');
        
        // Remove class and style attributes (optional - keep formatting)
        // html = html.replace(/\s*(class|style)="[^"]*"/gi, '');
        
        return html;
    }

    handleDrop(e) {
        e.preventDefault();
        this.editor.classList.remove('voz-dragover');

        const files = e.dataTransfer?.files;
        if (files) {
            for (const file of files) {
                if (file.type.startsWith('image/')) {
                    this.insertImageFile(file);
                }
            }
        }
    }

    insertImageFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            this.execCommand('insertHTML', `<img src="${dataUrl}" alt="${file.name}" style="max-width: 100%; height: auto;">`);
            
            // Callback for external image handling
            if (this.options.onImageUpload) {
                this.options.onImageUpload({
                    src: dataUrl,
                    name: file.name,
                    file: file
                });
            }
        };
        reader.readAsDataURL(file);
    }

    handleKeydown(e) {
        // Keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    this.execCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    this.execCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    this.execCommand('underline');
                    break;
                case 'k':
                    e.preventDefault();
                    this.insertLink();
                    break;
                case 'z':
                    if (e.shiftKey) {
                        e.preventDefault();
                        this.execCommand('redo');
                    }
                    break;
            }
        }

        // Tab handling for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
                this.execCommand('outdent');
            } else {
                this.execCommand('indent');
            }
        }
    }

    syncToTextarea() {
        if (this.isSourceMode) {
            this.textarea.value = this.editor.textContent;
        } else {
            this.textarea.value = this.editor.innerHTML;
        }
    }

    updateWordCount() {
        const text = this.editor.textContent || '';
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const chars = text.length;
        this.statusBar.innerHTML = `<span class="voz-word-count">${words} words · ${chars} chars</span>`;
    }

    // Public API methods (compatible with TinyMCE interface)
    getContent() {
        return this.isSourceMode ? this.editor.textContent : this.editor.innerHTML;
    }

    setContent(html) {
        if (this.isSourceMode) {
            this.editor.textContent = html;
        } else {
            this.editor.innerHTML = html || '';
        }
        this.syncToTextarea();
        this.updateWordCount();
    }

    insertContent(html) {
        this.editor.focus();
        this.execCommand('insertHTML', html);
    }

    focus() {
        this.editor.focus();
    }

    destroy() {
        this.container.remove();
        this.textarea.style.display = '';
    }
}

// Static registry for getting editor instances
VOZEditor.instances = {};

VOZEditor.get = function(id) {
    return VOZEditor.instances[id] || null;
};

VOZEditor.init = function(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    const editors = [];
    
    elements.forEach(el => {
        const editor = new VOZEditor('#' + el.id, options);
        if (el.id) {
            VOZEditor.instances[el.id] = editor;
        }
        editors.push(editor);
    });
    
    return editors.length === 1 ? editors[0] : editors;
};

// Export
window.VOZEditor = VOZEditor;
