// Canvas Diamond Loading Animation - Recreating SVG patterns
(function() {
    const canvas = document.getElementById('diamond-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    
    // SVG path data for each frame (from the SVG files)
    const svgPaths = [
        // Frame 1 - diamond 1-1.svg
        "M86,42.9A42.38,42.38,0,0,0,73.45,13l.08-.48-.47.09A42.35,42.35,0,0,0,59.88,3.74,43.08,43.08,0,0,0,43.43.38L43.16,0l-.28.38a41.61,41.61,0,0,0-16,3.22,42.2,42.2,0,0,0-13.68,9.06l-.49-.08.08.48A42.42,42.42,0,0,0,.37,42.89L0,43.17l.37.26A42.72,42.72,0,0,0,3.78,60a42.18,42.18,0,0,0,9,13.29l-.08.48.47-.09a43.13,43.13,0,0,0,13,8.79,38.56,38.56,0,0,0,7.69,2.49H34a39.7,39.7,0,0,0,8.9,1l.25.35L43.4,86a39.9,39.9,0,0,0,8.93-1,39.27,39.27,0,0,0,7.36-2.3,41.51,41.51,0,0,0,13.67-9.18l.44.07-.07-.44A42.59,42.59,0,0,0,86,43.41l.35-.26ZM73.26,14.19a41.92,41.92,0,0,1,8.27,12.36l-11,4.66ZM59.93,4.86a41.32,41.32,0,0,1,11.91,7.93L55.05,15.72ZM43.45,63.67,29,57.93l-.08-.26L22.8,43.31l5.91-14.68,14.16-6.12.12.07,14.46,5.74,0,.14,6.26,14.23-.1.2L58,57.4Zm14.1-5-3.38,10.8-9.59-5.21ZM27.76,57.49,17.14,53.91l5.06-9.48Zm4.67-40.75,9.35,5.17L29.14,27.36Zm26.29,12L69.17,32.3l-4.83,9.27Zm5.6,15.11L69.59,54,59.2,57ZM43.15,1.7,53.47,16.18,43,21.38l-.07,0L32.87,15.85ZM31.49,16.42,28,27.84,16.61,31.1,13.89,13.77Zm-27.08,11,10.8,4.4L1.38,42.14A41.44,41.44,0,0,1,4.41,27.46Zm-3,16.69,14.06,10-10.93,5A41.58,41.58,0,0,1,1.38,44.15ZM13,72.05A40.86,40.86,0,0,1,4.9,60l10.89-5Zm13.15,9.29a42.41,42.41,0,0,1-11.74-7.89l16.85-3Zm3.24-22.2,12.87,5.12L32.4,69.14ZM43.16,84.62,32.83,70l20.89.33Zm9-.65a38.37,38.37,0,0,1-8,1L54.34,71.19l4.51,10.72A38.19,38.19,0,0,1,52.12,84Zm7.65-2.44L55.26,70.81l16.86,2.47A40.75,40.75,0,0,1,59.77,81.53Zm13.77-9.68L70.93,55.06l10.74,4.38A41,41,0,0,1,73.54,71.85ZM82,58.52,71.31,54.14,85,44.15A41.47,41.47,0,0,1,82,58.52ZM70.89,32.13l11-4.67a41.44,41.44,0,0,1,3,14.72Z",
        // Frame 2 - diamond 2-1.svg
        "M86,42.9A42.42,42.42,0,0,0,73.46,13l.07-.48-.47.09A42.35,42.35,0,0,0,59.88,3.74,43.08,43.08,0,0,0,43.43.38L43.16,0l-.28.38a41.61,41.61,0,0,0-16,3.22,42.3,42.3,0,0,0-13.68,9.06l-.48-.08.07.48A42.42,42.42,0,0,0,.37,42.89L0,43.17l.37.26A42.55,42.55,0,0,0,3.79,60a42,42,0,0,0,9,13.29l-.08.48.47-.09a43.05,43.05,0,0,0,13,8.79,38.26,38.26,0,0,0,7.68,2.49H34a39.73,39.73,0,0,0,8.91,1l.25.35.26-.35a40,40,0,0,0,8.93-1,39.17,39.17,0,0,0,7.35-2.3,41.51,41.51,0,0,0,13.67-9.18l.44.07-.07-.44A42.59,42.59,0,0,0,86,43.41l.35-.26ZM72.33,13.71,69.48,31.36,58.39,27.63l-.14-.06-3.4-10.81ZM16.93,32l10.56-3L22.22,42.09ZM27.77,57.49,17.14,53.91l5.06-9.48Zm1.15.18L22.8,43.31l5.91-14.68,14.16-6.12.12.07,14.46,5.74,0,.14,6.26,14.23-.1.2L58,57.4,43.45,63.67,29,57.93Zm29.8-28.89L69.17,32.3l-4.83,9.27Zm5.6,15.11L69.59,54,59.2,57ZM59,4.47l-4.91,10.9-10-14A42.18,42.18,0,0,1,59,4.47ZM43.15,1.7,53.47,16.18,43,21.38l-.07,0L32.87,15.85ZM41.78,21.91,29.14,27.36l3.29-10.62Zm-15-17.2,4.54,10.68L14.43,12.84A41.53,41.53,0,0,1,26.8,4.71ZM13,14.29l2.61,16.65L4.8,26.55A41.73,41.73,0,0,1,13,14.29ZM4.42,27.46l10.79,4.4L1.38,42.14A41.45,41.45,0,0,1,4.42,27.46Zm-3,16.69,14.06,10-10.93,5A41.58,41.58,0,0,1,1.38,44.15ZM13,72.05A40.86,40.86,0,0,1,4.9,60l10.89-5Zm13.15,9.29a42.41,42.41,0,0,1-11.74-7.89l16.85-3Zm3.24-22.2,12.87,5.12L32.4,69.14ZM43.16,84.62,32.84,70l10.6-5.26,10.28,5.59Zm9-.65a38.37,38.37,0,0,1-8,1L54.34,71.19l4.51,10.72A38.19,38.19,0,0,1,52.12,84Zm3-14.18L58.67,58.4l.08-.2L69.9,54.9l2.71,17.45Zm18.43,2.06L70.93,55.06l10.74,4.38A41,41,0,0,1,73.54,71.85ZM82,58.52,71.31,54.14,85,44.15A41.47,41.47,0,0,1,82,58.52ZM70.89,32.13l11-4.67a41.44,41.44,0,0,1,3,14.72Z",
        // Frame 3 - diamond 3-1.svg
        "M86,42.9A42.42,42.42,0,0,0,73.46,13l.07-.48-.47.09A42.35,42.35,0,0,0,59.88,3.74,43,43,0,0,0,43.43.38L43.16,0l-.28.38a41.61,41.61,0,0,0-16,3.22,42.41,42.41,0,0,0-13.68,9.06l-.48-.08.07.48A42.8,42.8,0,0,0,3.69,26.59,42.32,42.32,0,0,0,.38,42.89L0,43.17l.38.26a42.34,42.34,0,0,0,12.4,29.84l-.08.48.47-.09a43.17,43.17,0,0,0,13,8.79,38.35,38.35,0,0,0,7.69,2.49H34a39.79,39.79,0,0,0,8.91,1l.25.35.26-.35a40,40,0,0,0,8.93-1,39.17,39.17,0,0,0,7.35-2.3,41.66,41.66,0,0,0,13.68-9.18l.43.07-.07-.44a41.81,41.81,0,0,0,9-13.72,42.38,42.38,0,0,0,3.18-16l.35-.26ZM69.59,54,59.21,57l5.11-13.14ZM58.72,28.78,69.17,32.3l-4.83,9.27ZM65,43l-.1-.22,5.21-10L84.62,43.16,70.48,53.52Zm4.53-11.59L58.4,27.63l-.15-.06L54.86,16.76l17.47-3.05ZM59.93,4.86a41.37,41.37,0,0,1,11.92,7.93l-16.8,2.93ZM59,4.47l-4.9,10.9-10-14A42.14,42.14,0,0,1,59,4.47ZM43.15,1.7,53.47,16.18,43,21.38l-.06,0L32.87,15.85ZM41.78,21.91,29.14,27.36l3.3-10.62Zm-15-17.2,4.53,10.68L14.43,12.84A41.45,41.45,0,0,1,26.81,4.71ZM27.49,29,22.23,42.09,16.93,32ZM13,14.29l2.61,16.65L4.8,26.55A41.77,41.77,0,0,1,13,14.29ZM4.42,27.46l10.79,4.4L1.39,42.14A41.22,41.22,0,0,1,4.42,27.46ZM1.69,43.15,16,32.48l5.61,10.64.06.15L16.26,53.46ZM13,72.05A41.05,41.05,0,0,1,4.9,60l10.89-5Zm3.85-17.2,11.36,3.83,3.27,10.77L13.91,72.53Zm9.3,26.49a42.55,42.55,0,0,1-11.74-7.89l16.85-3Zm8,2.63H34a38.68,38.68,0,0,1-7-2.22l5.14-10.92L42.18,85A38.11,38.11,0,0,1,34.16,84ZM29,57.93l-.08-.26L22.8,43.31l5.91-14.68,14.17-6.12.11.07,14.46,5.74,0,.14,6.25,14.23-.1.2L58,57.4,43.45,63.67ZM52.12,84a38.36,38.36,0,0,1-8,1L54.34,71.19l4.52,10.72A38.55,38.55,0,0,1,52.12,84Zm7.65-2.44L55.26,70.81l16.87,2.47A40.8,40.8,0,0,1,59.77,81.53ZM55.11,69.79,58.67,58.4l.08-.2,11.16-3.3,2.7,17.45ZM82.05,58.52,71.32,54.14,85,44.15A41.46,41.46,0,0,1,82.05,58.52ZM70.89,32.13l11-4.67a41.43,41.43,0,0,1,3,14.72Z",
        // Frame 4 - diamond 4-1.svg
        "M86,42.9a42.34,42.34,0,0,0-3.32-16.31A42.82,42.82,0,0,0,73.46,13l.08-.48-.47.09A42.51,42.51,0,0,0,59.88,3.74,43,43,0,0,0,43.43.38L43.16,0l-.27.38a41.57,41.57,0,0,0-16,3.22,42.34,42.34,0,0,0-13.69,9.06l-.48-.08.08.48A42.42,42.42,0,0,0,.38,42.89L0,43.17l.38.26a42.34,42.34,0,0,0,12.4,29.84l-.08.48.48-.09a43,43,0,0,0,13,8.79,38.35,38.35,0,0,0,7.69,2.49H34a39.79,39.79,0,0,0,8.91,1l.25.35.26-.35a40,40,0,0,0,8.93-1,39.27,39.27,0,0,0,7.36-2.3,41.72,41.72,0,0,0,13.67-9.18l.43.07-.06-.44A42.63,42.63,0,0,0,86,43.41l.35-.26ZM73.26,14.19a41.54,41.54,0,0,1,8.27,12.36l-11,4.66ZM69.59,54,59.21,57l5.11-13.14ZM58.72,28.78,69.17,32.3l-4.83,9.27ZM65,43l-.1-.22,5.21-10L84.62,43.16,70.48,53.52Zm7.39-29.24L69.49,31.36,58.4,27.63l-.14-.06-3.4-10.81ZM59,4.47l-4.9,10.9-10-14A42.14,42.14,0,0,1,59,4.47ZM43.15,1.7,53.47,16.18,43,21.38l-.06,0-10-5.56ZM41.78,21.91,29.14,27.36l3.3-10.62Zm.37-20.52L32.26,15,27.72,4.33A40.61,40.61,0,0,1,42.15,1.39ZM26.81,4.71l4.53,10.68L14.43,12.84A41.57,41.57,0,0,1,26.81,4.71ZM1.69,43.15,16,32.48l5.61,10.64.06.15L16.26,53.46Zm20.52,1.28,5.56,13.06L17.15,53.91ZM16.94,32l10.55-3L22.23,42.09ZM13,14.29l2.61,16.65L4.8,26.55A41.77,41.77,0,0,1,13,14.29ZM4.42,27.46l10.79,4.4L1.39,42.14A41.44,41.44,0,0,1,4.42,27.46ZM13,72.05A41.05,41.05,0,0,1,4.9,60l10.89-5Zm3.85-17.2L28.2,58.68l3.26,10.77L13.91,72.53Zm9.31,26.49a42.46,42.46,0,0,1-11.75-7.89l16.85-3Zm8,2.63H34a38.68,38.68,0,0,1-7-2.22l5.15-10.92L42.18,85A37.93,37.93,0,0,1,34.17,84ZM32.4,69.14l-3-10,12.87,5.12ZM29,57.93l-.08-.26L22.8,43.31l5.91-14.68,14.17-6.12.11.07,14.46,5.74,0,.14,6.26,14.23-.11.2L58,57.4,43.45,63.67Zm28.55.74-3.38,10.8-9.59-5.21ZM52.13,84a38.54,38.54,0,0,1-8,1L54.35,71.19l4.51,10.72A38.45,38.45,0,0,1,52.13,84Zm7.64-2.44L55.26,70.81l16.87,2.47A40.8,40.8,0,0,1,59.77,81.53ZM55.11,69.79,58.68,58.4l.08-.2,11.15-3.3,2.71,17.45ZM82.05,58.52,71.32,54.14,85,44.15A41.23,41.23,0,0,1,82.05,58.52ZM70.89,32.13l11-4.67a41.43,41.43,0,0,1,3,14.72Z",
        // Frame 5 - diamond 5-1.svg
        "M86,42.9a42.15,42.15,0,0,0-3.32-16.31A42.82,42.82,0,0,0,73.46,13l.08-.48-.47.09A42.46,42.46,0,0,0,59.89,3.74,43.09,43.09,0,0,0,43.43.38L43.16,0l-.27.38a41.57,41.57,0,0,0-16,3.22A42.2,42.2,0,0,0,13.2,12.66l-.49-.08.08.48A42.42,42.42,0,0,0,.38,42.89L0,43.17l.38.26a42.34,42.34,0,0,0,12.4,29.84l-.08.48.48-.09a43.13,43.13,0,0,0,13,8.79,38.56,38.56,0,0,0,7.69,2.49H34a39.79,39.79,0,0,0,8.91,1l.25.35.26-.35a40,40,0,0,0,8.93-1,39.27,39.27,0,0,0,7.36-2.3,41.62,41.62,0,0,0,13.67-9.18l.44.07-.07-.44A42.63,42.63,0,0,0,86,43.41l.35-.26ZM73.27,14.19a41.7,41.7,0,0,1,8.26,12.36l-11,4.66ZM59.94,4.86a41.46,41.46,0,0,1,11.91,7.93l-16.8,2.93ZM69.59,54,59.21,57l5.12-13.14ZM58.72,28.78,69.18,32.3l-4.84,9.27ZM57.07,27.1,44.09,22l9.83-4.88ZM43.16,1.7,53.48,16.18,43,21.38l-.06,0-10-5.56ZM41.78,21.91,29.14,27.36l3.3-10.62Zm.37-20.52L32.26,15,27.73,4.33A40.55,40.55,0,0,1,42.15,1.39ZM26.81,4.71l4.53,10.68-16.9-2.55A41.4,41.4,0,0,1,26.81,4.71ZM27.5,29,22.23,42.09,16.94,32ZM13,14.29l2.61,16.65L4.8,26.55A41.77,41.77,0,0,1,13,14.29Zm3.07,18.19,5.6,10.64.06.15L16.26,53.46,1.69,43.15ZM1.39,44.15l14.06,10-10.93,5A41.37,41.37,0,0,1,1.39,44.15ZM13,72.05A40.82,40.82,0,0,1,4.91,60l10.88-5Zm.93.48,2.92-17.68L28.2,58.68l3.26,10.77ZM34.17,84H34a38.33,38.33,0,0,1-7-2.22l5.14-10.92L42.19,85A38,38,0,0,1,34.17,84ZM32.41,69.14l-3-10,12.88,5.12ZM29,57.93l-.07-.26L22.81,43.31l5.91-14.68,14.16-6.12.11.07,14.47,5.74,0,.14,6.26,14.23-.1.2L58,57.4,43.45,63.67ZM52.13,84a38.54,38.54,0,0,1-8,1L54.35,71.19l4.51,10.72A38.45,38.45,0,0,1,52.13,84Zm3-14.18L58.68,58.4l.08-.2,11.15-3.3,2.71,17.45Zm18.44,2.06L70.94,55.06l10.74,4.38A41,41,0,0,1,73.55,71.85Zm8.5-13.33L71.32,54.14,85,44.15A41.23,41.23,0,0,1,82.05,58.52ZM70.89,32.13l11-4.67a41.22,41.22,0,0,1,3,14.72Z"
    ];
    
    const viewBoxSize = 86.31;
    const scale = size / viewBoxSize;
    let currentFrame = 0;
    
    // Helper function to parse and draw SVG path
    function drawPath(pathData) {
        ctx.clearRect(0, 0, size, size);
        ctx.save();
        ctx.scale(scale, scale);
        ctx.fillStyle = '#b89a6a';
        
        const path = new Path2D(pathData);
        ctx.fill(path);
        ctx.restore();
    }
    
    function animateDiamond() {
        drawPath(svgPaths[currentFrame]);
        currentFrame = (currentFrame + 1) % svgPaths.length;
    }
    
    // Draw first frame immediately
    animateDiamond();
    
    // Start animation - cycle through patterns
    setInterval(animateDiamond, 200); // Change frame every 200ms
})();

// Hide loading screen when page is loaded
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    // Add loading class to body
    body.classList.add('loading');
    
    // Wait a minimum time for smooth transition (at least 1 second)
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
        body.classList.remove('loading');
        
        // Remove from DOM after transition
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link and corresponding page
            this.classList.add('active');
            document.getElementById(targetPage).classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Handle hash navigation on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetLink = document.querySelector(`[data-page="${hash}"]`);
        if (targetLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            targetLink.classList.add('active');
            document.getElementById(hash).classList.add('active');
        }
    }

    // Update active nav link on scroll (optional enhancement)
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    pages.forEach(page => {
        observer.observe(page);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add fade-in animation on scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.content-card');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    };

    // Initialize scroll animations
    animateOnScroll();

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !window.location.hash) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1) || 'home';
    const targetLink = document.querySelector(`[data-page="${hash}"]`);
    if (targetLink) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        targetLink.classList.add('active');
        document.getElementById(hash).classList.add('active');
    }
});

// Update URL hash when navigating (without scrolling)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        if (page) {
            history.pushState(null, null, `#${page}`);
        }
    });
});

