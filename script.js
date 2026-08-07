/**
 * NADER HOSSAMI PORTFOLIO - SCRIPT.JS
 * Modern, Interactive, Production-Ready JavaScript
 */

(function() {
    'use strict';

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    const themeToggle = document.getElementById('themeToggle');
    const typingText = document.getElementById('typingText');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialsDots = document.getElementById('testimonialsDots');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');

    // ============================================
    // LOADING SCREEN
    // ============================================
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800);
    });

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // THEME TOGGLE (DARK/LIGHT MODE)
    // ============================================
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ============================================
    // TYPING ANIMATION
    // ============================================
    const phrases = [
        'Mathematics Teacher',
        'American Curriculum',
        'Innovative Educator'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing animation after loading
    setTimeout(typeEffect, 1500);

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveNav() {
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .skills-category, .teaching-card, ' +
        '.resource-card, .gallery-item, .contact-card, .contact-form-wrapper, .footer-grid > div'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.getElementById('stats');
        const rect = statsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function (ease-out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);

                    stat.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);

    // ============================================
    // SKILL BARS ANIMATION
    // ============================================
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById('skills');
        const rect = skillsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            skillsAnimated = true;

            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }, index * 100);
            });
        }
    }

    window.addEventListener('scroll', animateSkillBars);

    // ============================================
    // TIMELINE ANIMATION
    // ============================================
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // ============================================
    // GALLERY FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 500);
                }
            });
        });
    });

    // Initialize gallery items as visible
    galleryItems.forEach(item => item.classList.add('visible'));

    // ============================================
    // LIGHTBOX
    // ============================================
    let currentImageIndex = 0;
    const galleryImages = [];

    // Build gallery images array
    document.querySelectorAll('.gallery-item img').forEach((img, index) => {
        galleryImages.push({
            src: img.src,
            alt: img.alt
        });

        img.closest('.gallery-item').addEventListener('click', () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        lightboxImage.src = galleryImages[currentImageIndex].src;
        lightboxImage.alt = galleryImages[currentImageIndex].alt;
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', () => goToSlide(i));
        testimonialsDots.appendChild(dot);
    }

    const dots = testimonialsDots.querySelectorAll('.dot');

    function goToSlide(index) {
        currentSlide = index;
        testimonialsTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    testimonialNext.addEventListener('click', nextSlide);
    testimonialPrev.addEventListener('click', prevSlide);

    // Auto-play testimonials
    let testimonialInterval = setInterval(nextSlide, 5000);

    testimonialsTrack.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialsTrack.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextSlide, 5000);
    });

    // Touch/swipe support for testimonials
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // ============================================
    // CONTACT FORM
    // ============================================
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--accent-primary)' : '#ef4444'};
            color: white;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Add keyframe animations for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(notificationStyles);

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', handleBackToTop);

    // ============================================
    // RESOURCE DOWNLOAD HANDLER
    // ============================================
    window.downloadResource = function(type) {
        showNotification(`Downloading ${type.replace('-', ' ')}... (Demo)`, 'success');
    };

    window.viewAllResources = function() {
        showNotification('All resources will be available soon!', 'success');
    };

    window.downloadCV = function(e) {
        e.preventDefault();
        showNotification('CV download will be available soon!', 'success');
    };

    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ============================================
    const heroShapes = document.querySelectorAll('.hero-bg-shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        heroShapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================================
    // PERFORMANCE: DEBOUNCE SCROLL EVENTS
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(() => {
        animateCounters();
        animateSkillBars();
    }, 100));

    // ============================================
    // PREFERS REDUCED MOTION
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations
        document.querySelectorAll('.hero-bg-shape, .math-symbol, .floating-card').forEach(el => {
            el.style.animation = 'none';
        });

        // Show all elements immediately
        document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
            el.classList.add('visible');
        });
    }

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c👋 Welcome to Nader Hossami\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #4ade80;');
    console.log('%cBuilt with ❤️ for modern education.', 'font-size: 14px; color: #86efac;');

})();
