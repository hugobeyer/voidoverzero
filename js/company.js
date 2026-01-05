// ========================================
// COMPANY WEBSITE JAVASCRIPT
// Void Over Zero Company Site
// ========================================

(function() {
    'use strict';

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // Account for sticky nav
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards and contact cards
    document.querySelectorAll('.product-card, .contact-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('.company-section');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Parallax scroll effect for banner (banner moves, clip stays static)
    const heroSection = document.querySelector('.company-hero');
    const bannerAfter = heroSection ? window.getComputedStyle(heroSection, '::after') : null;
    
    if (heroSection) {
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroRect = heroSection.getBoundingClientRect();
            const heroTop = heroRect.top + scrolled;
            const heroHeight = heroRect.height;
            
            // Only apply parallax when hero is in view
            if (scrolled < heroTop + heroHeight && heroRect.bottom > 0) {
                const parallaxSpeed = 0.5;
                const yPos = -(scrolled - heroTop) * parallaxSpeed;
                heroSection.style.setProperty('--parallax-y', `${yPos}px`);
            } else {
                heroSection.style.setProperty('--parallax-y', '0px');
            }
        }
        
        window.addEventListener('scroll', updateParallax);
        updateParallax(); // Initialize
    }

    // Add active state styling
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-accent);
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Automatic inspector image spawning from folder
    const inspectorContainers = document.querySelectorAll('.rawteous-inspectors-container');
    inspectorContainers.forEach(container => {
        const folder = container.getAttribute('data-image-folder') || 'rawteous_scroll';
        const imageData = []; // Store image metadata
        let imagesLoaded = false;
        const productCard = container.closest('.product-card');
        
        // Predefined list of images - supports both formats:
        // rawteous-inspector-1.png (with dash) and rawteous-inspector1.png (without dash)
        const imageNames = [
            'rawteous-inspector.png',
            'rawteous-inspector-1.png',
            'rawteous-inspector1.png',
            'rawteous-inspector-2.png',
            'rawteous-inspector2.png',
            'rawteous-inspector-3.png',
            'rawteous-inspector3.png',
            'rawteous-inspector-4.png',
            'rawteous-inspector4.png',
            'rawteous-inspector-5.png',
            'rawteous-inspector5.png',
            'rawteous-inspector-6.png',
            'rawteous-inspector6.png',
            'rawteous-inspector-7.png',
            'rawteous-inspector7.png',
            'rawteous-inspector-8.png',
            'rawteous-inspector8.png',
            'rawteous-inspector-9.png',
            'rawteous-inspector9.png',
            'rawteous-inspector-10.png',
            'rawteous-inspector10.png'
        ];
        
        // Test which images exist and get their dimensions
        function checkImageExists(imageName, callback) {
            const img = new Image();
            img.onload = () => {
                const imagePath = `images/${folder}/${imageName}`;
                callback(true, imageName, img.naturalWidth, img.naturalHeight, imagePath);
            };
            img.onerror = () => callback(false, imageName, 0, 0, null);
            img.src = `images/${folder}/${imageName}`;
        }
        
        // Create inspector element for an image with sequential timing
        function createInspectorElement(imagePath, index, totalImages) {
            const inspector = document.createElement('div');
            inspector.className = 'rawteous-inspector';
            inspector.style.backgroundImage = `url('${imagePath}')`;
            // Each image starts when the previous one finishes (8 seconds per cycle)
            // Animation duration is 8s * totalImages to create one full cycle
            const animationDuration = 8 * totalImages;
            inspector.style.animationDelay = `${index * 8}s`;
            inspector.style.animationDuration = `${animationDuration}s`;
            inspector.style.opacity = '0'; // Start invisible
            container.appendChild(inspector);
            return inspector;
        }
        
        // Load available images and spawn elements sequentially
        function loadAvailableImages() {
            let checked = 0;
            const totalImages = imageNames.length;
            let foundImages = [];
            
            imageNames.forEach((imageName) => {
                checkImageExists(imageName, (exists, name, imgWidth, imgHeight, imagePath) => {
                    if (exists) {
                        foundImages.push({
                            name: name,
                            path: imagePath,
                            width: imgWidth,
                            height: imgHeight
                        });
                    }
                    checked++;
                    
                    if (checked === totalImages) {
                        imagesLoaded = true;
                        const imageCount = foundImages.length;
                        
                        // Now spawn all elements with proper timing
                        foundImages.forEach((imgData, index) => {
                            imageData.push(imgData);
                            createInspectorElement(imgData.path, index, imageCount);
                            console.log(`Spawned inspector for image: ${imgData.name} - delay: ${index * 8}s, duration: ${imageCount * 8}s`);
                        });
                        
                        console.log(`Spawned ${imageCount} inspector elements with sequential timing`);
                    }
                });
            });
        }
        
        // Start loading images immediately
        loadAvailableImages();
    });

    console.log('Void Over Zero company site loaded');
})();
