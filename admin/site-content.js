/**
 * Site Content Data Structure
 * Unified content management for company page, products, and all their pages
 */

const SITE_CONTENT = {
    company: {
        hero: {
            title: "Void Over Zero",
            description: "Creating powerful tools and solutions for game developers. Building innovative systems that push the boundaries of game development performance and workflow.",
            primaryButton: { text: "Contact", link: "contact.html" },
            secondaryButton: { text: "About", link: "#about" }
        },
        mission: {
            title: "Mission",
            subtitle: "Empowering developers to build better games",
            sectors: [
                "To empower developers with tools that enhance both workflow efficiency and runtime performance.",
                "Every product is built with attention to detail, performance, and developer experience.",
                "Combining deep technical expertise with a passion for innovation to push the boundaries of game development."
            ]
        },
        about: {
            title: "About",
            subtitle: "Dedicated to advancing game development",
            content: "Void Over Zero creates high-performance tools and systems for game developers. With 24 years of development experience, spanning from art to technical development, combining deep technical expertise with a passion for innovation.",
            images: []
        },
        contact: {
            title: "Get In Touch",
            subtitle: "Have questions or want to collaborate? I'd love to hear from you.",
            text: "Always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Reach out and let's create something amazing together.",
            linkText: "Visit the contact page →",
            linkUrl: "contact.html"
        },
        contactPage: {
            hero: {
                title: "I'd Love to Hear From You",
                subtitle: "Whether you have feedback, questions, feature requests, or just want to say hi — drop a message. Every message is read and appreciated.",
                backgroundImage: "images/contact_bg.png"
            },
            sidebar: {
                video: {
                    enabled: true,
                    src: "images/contact_video.mp4"
                },
                cards: [
                    {
                        icon: "email",
                        title: "Email",
                        content: "voidoverzero@gmail.com",
                        link: "mailto:voidoverzero@gmail.com"
                    },
                    {
                        icon: "message",
                        title: "Response Time",
                        content: "I typically respond within 24-48 hours."
                    }
                ]
            },
            form: {
                title: "Send a message",
                submitText: "Send Message",
                fields: [
                    { name: "name", label: "Name", type: "text", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "subject", label: "Subject", type: "text", required: false },
                    { name: "message", label: "Message", type: "textarea", required: true }
                ]
            }
        },
        footer: {
            copyright: "© 2025 Void Over Zero. All rights reserved."
        }
    },
    products: [
        {
            id: "rawteous",
            name: "Rawteous",
            logo: "images/rawteous_logo.svg",
            landing: {
                hero: {
                    subtitle: "Unique and quick.\nProfessional shortcuts system for Unity.",
                    description: "Create lightweight billboard representations from any 3D object with GPU acceleration and real-time preview for fast iteration and better performance.",
                    primaryButton: { text: "View Documentation", link: "docs.html" },
                    secondaryButton: { text: "Get Started", link: "tutorial.html" }
                },
                video: {
                    enabled: true,
                    src: "https://player.vimeo.com/video/1155391579?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                },
                features: {
                    title: "Key Features",
                    subtitle: "Everything you need for efficient impostor generation",
                    items: [
                        { icon: "features/feature_octahedron.svg", title: "Octahedron, Fibonacci & Grid", description: "Three capture modes - pick the perfect angle distribution for your needs." },
                        { icon: "features/feature_angles_128.svg", title: "Up to 128 Angles and 2048px Tiles", description: "More angles = better quality. You choose the complexity." },
                        { icon: "features/feature_fov.svg", title: "Adaptive FOV Control", description: "Adjust the field-of-view span to capture exactly what you need." },
                        { icon: "features/feature_snap_cast.svg", title: "Real-Time Snap Casting", description: "Your geometry automatically fits perfectly to impostor pixels during capture." },
                        { icon: "features/feature_lod_2click.svg", title: "2-Click LOD Groups", description: "Generate mesh decimation + impostor LODs instantly. Done." },
                        { icon: "features/feature_live_preview.svg", title: "Live Preview System", description: "See your impostor in real-time before you commit." },
                        { icon: "features/feature_atlas_viewer.svg", title: "Built-In Atlas Viewer", description: "Inspect all captured maps (albedo, normal, PBR) directly in the editor." },
                        { icon: "features/feature_delightful_ui.svg", title: "Delightful UI", description: "Clean, intuitive interface that makes complex workflows feel simple." },
                        { icon: "features/feature_batch_process.svg", title: "Smart Batch Processing", description: "Set it and forget it - auto-resolution handles the heavy lifting." },
                        { icon: "features/feature_leader_follower.svg", title: "Leader-Follower System", description: "One object leads, others follow. Sync parameters across multiple impostors effortlessly." },
                        { icon: "features/feature_preset_system.svg", title: "Preset Library", description: "Save and load your favorite settings. Never configure from scratch again." }
                    ]
                },
                why: {
                    title: "Why Rawteous?",
                    subtitle: "Performance without compromise",
                    content: [
                        "Impostors are the secret weapon behind stunning open worlds. Replace distant 3D meshes with lightweight billboards that look identical but render in a fraction of the time.",
                        "Rawteous makes this workflow effortless - GPU-accelerated capture, real-time preview, and seamless LOD integration. Spend less time optimizing, more time creating."
                    ]
                },
                documentation: {
                    title: "Documentation",
                    subtitle: "Get started with Rawteous",
                    items: [
                        { icon: "document", title: "Documentation", description: "Comprehensive guide covering all features, settings, and workflows. Learn about distribution, capture, and billboard configuration.", link: "docs.html" },
                        { icon: "tutorial", title: "Tutorials", description: "Step-by-step tutorials to get you started. Learn how to create impostors, optimize performance, and integrate into your workflow.", link: "tutorial.html" },
                        { icon: "api", title: "API Reference", description: "Complete API documentation for programmatic control. Access all impostor functionality through code at runtime.", link: "api.html" }
                    ]
                }
            },
            homepage: {
                description: "Advanced impostor generation system for Unity. Create lightweight billboard representations from any 3D object with GPU acceleration and real-time preview.",
                features: ["GPU Accelerated", "Real-time Preview", "Performance Optimized"]
            },
            docs: {
                hero: {
                    badge: "Unity Impostor System",
                    subtitle: "Create lightweight impostor billboards from any 3D object. Real-time preview with GPU acceleration for fast iteration and better performance."
                }
            },
            api: {
                hero: {
                    badge: "API Reference",
                    subtitle: "Complete API reference for Rawteous Impostors. Programmatic control and runtime access to all impostor functionality."
                },
                sections: [
                    {
                        id: "getting-started",
                        title: "Getting Started",
                        content: "Add the RawteousImpostors component to any GameObject and configure it programmatically.",
                        subsections: [
                            {
                                title: "Basic Setup",
                                code: `using RawteousImpostors.Runtime;
using UnityEngine;

// Add component to GameObject
RawteousImpostors impostor = gameObject.AddComponent<RawteousImpostors>();

// Set source object
impostor.sourceObject = myGameObject;

// Configure settings
impostor.textureResolution = 512;
impostor.captureAngles = 8;
impostor.captureElevations = 3;

// Generate impostor
impostor.Regenerate();`
                            },
                            {
                                title: "Generation with Progress Tracking",
                                content: "**Note:** Impostor generation is expensive and typically done at edit-time. Use this method when you need to generate impostors programmatically with progress callbacks.",
                                code: `// Generate with coroutine for progress tracking
IEnumerator GenerateWithProgress()
{
    var coroutine = impostor.RegenerateCoroutine((progress) => {
        Debug.Log($"Progress: {progress * 100}%");
    });
    yield return coroutine;
}`
                            }
                        ]
                    }
                ]
            },
            tutorial: {
                hero: {
                    badge: "Tutorials",
                    subtitle: "Step-by-step guides to get you started with Rawteous. Learn how to create impostors, optimize performance, and integrate into your workflow."
                },
                sections: []
            }
        }
    ]
};

// Load from localStorage if exists
function loadSiteContent() {
    const stored = localStorage.getItem('site_content');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Deep merge with defaults
            Object.assign(SITE_CONTENT.company, parsed.company || {});
            if (parsed.products) {
                parsed.products.forEach(storedProduct => {
                    const existingProduct = SITE_CONTENT.products.find(p => p.id === storedProduct.id);
                    if (existingProduct) {
                        Object.assign(existingProduct, storedProduct);
                    } else {
                        SITE_CONTENT.products.push(storedProduct);
                    }
                });
            }
        } catch (e) {
            console.warn('Failed to load site content:', e);
        }
    }
}

function saveSiteContent() {
    try {
        localStorage.setItem('site_content', JSON.stringify(SITE_CONTENT));
    } catch (e) {
        console.warn('Failed to save site content:', e);
    }
}

loadSiteContent();
