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

    // Parallax scroll effect for banner with smooth damping
    const heroSection = document.querySelector('.company-hero');
    
    if (heroSection) {
        let currentY = 0;
        let targetY = 0;
        let rafId = null;
        const dampingFactor = parseFloat(heroSection.dataset.parallaxDamping) || 0.15;
        const parallaxSpeed = parseFloat(heroSection.dataset.parallaxSpeed) || 0.5;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroRect = heroSection.getBoundingClientRect();
            const heroTop = heroRect.top + scrolled;
            const heroHeight = heroRect.height;
            
            // Calculate target position
            if (scrolled < heroTop + heroHeight && heroRect.bottom > 0) {
                targetY = -(scrolled - heroTop) * parallaxSpeed;
            } else {
                targetY = 0;
            }
            
            // Smooth damping animation loop
            function animate() {
                // Exponential damping
                currentY += (targetY - currentY) * dampingFactor;
                
                // Stop animation when close enough
                if (Math.abs(targetY - currentY) < 0.1) {
                    currentY = targetY;
                    heroSection.style.setProperty('--parallax-y', `${currentY}px`);
                    rafId = null;
                    return;
                }
                
                heroSection.style.setProperty('--parallax-y', `${currentY}px`);
                rafId = requestAnimationFrame(animate);
            }
            
            // Start animation if not already running
            if (!rafId) {
                rafId = requestAnimationFrame(animate);
            }
        }
        
        window.addEventListener('scroll', updateParallax, { passive: true });
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
        // For rawteous/images folder, use the rt_*.png files
        let imageNames = [];
        if (folder === 'rawteous/images') {
            imageNames = [
                'rt_cast0.png',
                'rt_decimation_0.png',
                'rt_decimation_1.png',
                'rt_horarch_pescale0.png',
                'rt_leadership_0.png',
                'rt_onthefly_mt_framing_0.png',
                'rt_ui0.png'
            ];
        } else {
            imageNames = [
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
        }
        
        // Test which images exist and get their dimensions
        function checkImageExists(imageName, callback) {
            const img = new Image();
            img.onload = () => {
                // Handle both rawteous/images (relative to rawteous folder) and rawteous_scroll (in images folder)
                let imagePath;
                if (folder === 'rawteous/images' || folder.includes('rawteous/images')) {
                    // From rawteous/index.html, path should be relative: images/filename
                    imagePath = `images/${imageName}`;
                } else {
                    imagePath = `images/${folder}/${imageName}`;
                }
                callback(true, imageName, img.naturalWidth, img.naturalHeight, imagePath);
            };
            img.onerror = () => {
                console.log(`Failed to load image: ${folder}/${imageName}`);
                callback(false, imageName, 0, 0, null);
            };
            // Handle both paths - check if we're in rawteous folder
            if (folder === 'rawteous/images' || folder.includes('rawteous/images')) {
                // From rawteous/index.html, path should be relative: images/filename
                img.src = `images/${imageName}`;
            } else {
                img.src = `images/${folder}/${imageName}`;
            }
        }
        
        // Create inspector element for an image with sequential timing
        function createInspectorElement(imagePath, index, totalImages, imgWidth, imgHeight) {
            const inspector = document.createElement('div');
            inspector.className = 'rawteous-inspector';
            
            inspector.style.backgroundImage = `url('${imagePath}')`;
            
            if (container.classList.contains('rawteous-showcase-scroll')) {
                inspector.classList.add('showcase-inspector');
                
                // Calculate scroll distance: image fits 100% width, height scales proportionally
                const containerRect = container.getBoundingClientRect();
                const containerWidth = containerRect.width || 1200;
                const containerHeight = 467;
                const aspectRatio = imgHeight / imgWidth;
                const scaledImageHeight = containerWidth * aspectRatio;
                const scrollDistance = Math.max(0, Math.round(scaledImageHeight - containerHeight));
                
                inspector.style.setProperty('--scroll-distance', `-${scrollDistance}px`);
                
                // Each image gets equal time slot
                const secondsPerImage = 8;
                const totalDuration = secondsPerImage * totalImages;
                const delay = index * secondsPerImage;
                
                inspector.style.setProperty('--anim-duration', `${totalDuration}s`);
                inspector.style.setProperty('--anim-delay', `${delay}s`);
                
                console.log(`Image ${index + 1}/${totalImages}: ${imgWidth}x${imgHeight} → scroll ${scrollDistance}px, delay ${delay}s`);
            } else {
                // Non-showcase: use old timing
                const cycleDuration = 8;
                const animationDuration = cycleDuration * totalImages;
                inspector.style.animationDelay = `${index * cycleDuration}s`;
                inspector.style.animationDuration = `${animationDuration}s`;
                inspector.style.opacity = '0';
            }
            
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
                        
                        // Now spawn all elements with proper timing and dimensions
                        foundImages.forEach((imgData, index) => {
                            imageData.push(imgData);
                            createInspectorElement(imgData.path, index, imageCount, imgData.width, imgData.height);
                            console.log(`Spawned inspector: ${imgData.name} (${imgData.width}x${imgData.height}) - scroll: ${Math.max(0, imgData.height - 467)}px`);
                        });
                        
                        console.log(`Spawned ${imageCount} intelligent inspector elements`);
                    }
                });
            });
        }
        
        // Start loading images immediately
        loadAvailableImages();
    });

    console.log('Void Over Zero company site loaded');
})();
