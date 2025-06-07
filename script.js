document.addEventListener('DOMContentLoaded', function() {
    // Element constants
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const header = document.getElementById('header');
    const loaderTextEl = document.getElementById('loader-text');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.getElementById('nav-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const closeMenuButtonInside = document.getElementById('close-menu-button-inside'); 
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const typedTextSpan = document.querySelector(".typing");
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const skillCards = document.querySelectorAll('.skill-category-card');

    // --- Creative Loader Script ---
    const loadingMessages = [
        "Compiling code...",
        "Assembling modules...",
        "Welcome to my Portfolio."
    ];
    let msgIndex = 0;
    const loaderInterval = setInterval(() => {
        if (loaderTextEl) {
            loaderTextEl.textContent = loadingMessages[msgIndex];
            msgIndex = (msgIndex + 1) % loadingMessages.length;
        }
    }, 1000);

    window.addEventListener('load', () => {
        setTimeout(() => {
            clearInterval(loaderInterval);
            if (loader) {
                loader.style.transition = 'opacity 0.5s';
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    if (mainContent) mainContent.classList.remove('hidden');
                    AOS.init({ duration: 800, once: true, offset: 50 });
                    initParticles(body.classList.contains('dark-theme'));
                }, 500);
            }
        }, 3000); // Let spinner run for 3 seconds
    });

    // --- THEME TOGGLE ---
    function setTheme(isDark) {
        body.className = isDark ? 'dark-theme' : 'light-theme';
        document.documentElement.classList.toggle('dark', isDark);
        lightIcon.classList.toggle('hidden', !isDark);
        darkIcon.classList.toggle('hidden', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        if (window.particlesJS) {
            const pJSElement = document.querySelector('#particles-js .particles-js-canvas-el');
            if(pJSElement) {
                 pJSElement.parentElement.remove();
            }
            initParticles(isDark);
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme === 'dark' || (savedTheme !== 'light' && prefersDark));

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => setTheme(!body.classList.contains('dark-theme')));
    }

    // --- MOBILE MENU TOGGLE ---
    function toggleMenu() {
        navMenu.classList.toggle('hidden');
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
        body.style.overflow = navMenu.classList.contains('hidden') ? '' : 'hidden';
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenu);
    }
    if (closeMenuButtonInside) {
        closeMenuButtonInside.addEventListener('click', toggleMenu);
    }
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- NAVBAR UNDERLINE & SCROLLSPY ---
    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        let lastActiveId = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lastActiveId = entry.target.id;
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href')) {
                const linkHref = link.getAttribute('href').substring(1);
                // Use lastActiveId to only have one active link at a time
                const isActive = linkHref === lastActiveId;
                link.classList.toggle('active', isActive);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- HEADER SCROLL EFFECT ---
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    });

    // --- GALAXY PARTICLES (Interactive) ---
    function initParticles(isDark) {
        const color = isDark ? "#4b5563" : "#d1d5db";
        const particlesElement = document.getElementById('particles-js');
        if (particlesElement && window.particlesJS) {
            particlesJS('particles-js', {
                "particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":color},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":color,"opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":140,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true
            });
        }
    }

    // --- TYPEWRITER EFFECT ---
    if (typedTextSpan) {
        const textArray = ["Full Stack Developer", "Java EE Developer", "Angular Developer"];
        let textArrayIndex = 0, charIndex = 0;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex++);
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, --charIndex);
                setTimeout(erase, 50);
            } else {
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, 1100);
            }
        }
        setTimeout(type, 2000);
    }
    
    // --- SET CURRENT YEAR IN FOOTER ---
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    // --- SKILL CARD SPOTLIGHT EFFECT ---
    skillCards.forEach(card => {
        const spotlight = card.querySelector('.spotlight');
        if (spotlight) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                spotlight.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    });
});