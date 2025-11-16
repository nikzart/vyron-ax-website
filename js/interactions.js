/**
 * Vyron AX Technologies - Interactive Features
 * Scroll animations, accordions, and floating CTA
 */

(function() {
    'use strict';

    // ================================
    // SCROLL ANIMATIONS
    // ================================

    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in classes
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .fade-in-left, .fade-in-right'
        );

        animatedElements.forEach(el => observer.observe(el));
    }


    // ================================
    // ACCORDION SYSTEM
    // ================================

    function initAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');

        // Open first accordion by default
        const firstAccordion = document.querySelector('.accordion-item');
        if (firstAccordion) {
            firstAccordion.classList.add('active');
        }

        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.closest('.accordion-item');
                const wasActive = accordionItem.classList.contains('active');

                // Close all accordions
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Toggle clicked accordion (unless it was already active)
                if (!wasActive) {
                    accordionItem.classList.add('active');
                }
            });
        });
    }


    // ================================
    // FLOATING CTA BUTTON
    // ================================

    function initFloatingCTA() {
        const floatingCTA = document.querySelector('.floating-cta');
        if (!floatingCTA) return;

        let lastScrollTop = 0;
        const scrollThreshold = 300; // Show button after scrolling 300px

        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Show button when scrolled past threshold
            if (scrollTop > scrollThreshold) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }

            lastScrollTop = scrollTop;
        }

        // Throttle scroll events for better performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(handleScroll);
        });
    }


    // ================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#home') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }


    // ================================
    // INITIALIZE ALL FEATURES
    // ================================

    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initScrollAnimations();
                initAccordions();
                initFloatingCTA();
                initSmoothScroll();
            });
        } else {
            // DOM already loaded
            initScrollAnimations();
            initAccordions();
            initFloatingCTA();
            initSmoothScroll();
        }
    }

    // Start initialization
    init();

})();
