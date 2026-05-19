document.addEventListener('DOMContentLoaded', function () {
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

    // --- PROJECT BADGE ICONS ---
    const techIconMap = {
        'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
        'Vue.js': 'https://img.icons8.com/color/48/vue-js.png',
        'Vue': 'https://img.icons8.com/color/48/vue-js.png',
        'Tailwind': 'https://img.icons8.com/color/48/tailwind_css.png',
        'Tailwind CSS': 'https://img.icons8.com/color/48/tailwind_css.png',
        'Docker': 'https://img.icons8.com/color/48/docker.png',
        'Angular': 'https://img.icons8.com/color/48/angularjs.png',
        'Angular 21': 'https://img.icons8.com/color/48/angularjs.png',
        'PHP': 'https://img.icons8.com/ios-filled/50/777BB3/php-logo.png',
        'MySQL': 'https://img.icons8.com/color/48/mysql-logo.png',
        'E-Commerce': 'https://img.icons8.com/fluency/48/shopping-bag.png',
        'MVC': 'https://img.icons8.com/fluency/48/layers.png',
        'Spring Boot': 'https://img.icons8.com/color/48/spring-logo.png',
        'JWT': 'https://img.icons8.com/fluency/48/lock--v1.png',
        'Java EE': 'https://img.icons8.com/color/48/java-coffee-cup-logo.png',
        'JSP': 'https://img.icons8.com/fluency/48/code.png',
        'JavaScript': 'https://img.icons8.com/color/48/javascript--v1.png',
        'Bootstrap': 'https://img.icons8.com/color/48/bootstrap.png',
        'TypeScript': 'https://img.icons8.com/color/48/typescript.png',
        'Weather API': 'https://img.icons8.com/color/48/partly-cloudy-day--v1.png',
        'OOP': 'https://img.icons8.com/fluency/48/code.png'
    };

    document.querySelectorAll('.tech-badge').forEach(badge => {
        const label = badge.textContent.trim();
        const iconUrl = techIconMap[label];

        if (iconUrl && !badge.querySelector('img')) {
            const icon = document.createElement('img');
            icon.src = iconUrl;
            icon.alt = label;
            icon.className = 'tech-badge-icon';
            badge.prepend(icon);
        }
    });

    // --- CREATIVE REVEAL ANIMATIONS ---
    const revealTargets = [
        '#about h2', '#about p', '#about a',
        '#skills .skill-category-card', '#skills .skill-item',
        '#projects .project-card', '#projects .tech-badge',
        '#education .timeline-item',
        '#contact .contact-card', '#contact .contact-terminal',
        '#home h1', '#home .typing', '.ticker-wrap'
    ];

    const uniqueRevealElements = [...new Set(revealTargets.flatMap(selector => Array.from(document.querySelectorAll(selector))))];

    uniqueRevealElements.forEach((element, index) => {
        element.classList.add('creative-reveal');
        element.classList.add('creative-stagger');
        element.style.setProperty('--reveal-delay', `${Math.min(index * 80, 560)}ms`);
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    uniqueRevealElements.forEach(element => revealObserver.observe(element));

    // --- Creative Loader Script ---
    const loadingMessages = [
        "Compiling code...",
        "Assembling modules...",
        "Welcome to Lahcen's Portfolio."
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
            if (pJSElement) {
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
        const color = isDark ? "#4b5" : "#d1d";
        const particlesElement = document.getElementById('particles-js');
        if (particlesElement && window.particlesJS) {
            particlesJS('particles-js', {
                "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": color }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": color, "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true
            });
        }
    }

    // --- TYPEWRITER EFFECT ---
    if (typedTextSpan) {
        const textArray = ["Full Stack Developer", "Web Developer", "Software Developer"];
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

    // --- CUSTOM CURSOR TRACKING ---
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    
    if (cursor && cursorBlur) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorBlur.style.left = e.clientX + 'px';
            cursorBlur.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, input, textarea, .project-card, .skill-item, .contact-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.backgroundColor = 'var(--accent-secondary)';
                cursor.style.borderColor = 'transparent';
                cursorBlur.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = 'var(--accent-primary)';
                cursorBlur.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // --- MAGNETIC BUTTONS (Telekinesis Hover) ---
    const magneticElements = document.querySelectorAll('.filter-btn, .contact-card, button[type="submit"]');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = `translate(0px, 0px) scale(1)`;
        });
    });

    // --- SCROLL PROGRESS / BACK TO TOP ---
    const scrollProgress = document.getElementById('scroll-progress');
    const progressCircle = document.getElementById('progress-circle');
    const circumference = 2 * Math.PI * 45; // r=45

    if (scrollProgress && progressCircle) {
        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = scrollTotal / height;
            
            progressCircle.style.strokeDashoffset = circumference - (scrollPercentage * circumference);

            if (scrollTotal > 300) {
                scrollProgress.style.opacity = '1';
                scrollProgress.style.pointerEvents = 'auto';
            } else {
                scrollProgress.style.opacity = '0';
                scrollProgress.style.pointerEvents = 'none';
            }
        });

        scrollProgress.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        scrollProgress.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        scrollProgress.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    // --- VANILLA TILT INITS ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
        VanillaTilt.init(document.querySelectorAll(".skill-category-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1
        });
        VanillaTilt.init(document.querySelector(".contact-terminal"), {
            max: 3,
            speed: 400,
            glare: true,
            "max-glare": 0.1
        });
    }
});