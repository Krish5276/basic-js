/**
 * ============================================================
 * RAHUL BOMBATKAR - PORTFOLIO WEBSITE
 * Main JavaScript File
 * Features: Theme toggle, scroll animations, modal viewer,
 *           mobile menu, FabLab modules rendering
 * ============================================================
 */

// ========== FABLAB MODULES DATA (Scalable - add new modules here) ==========
// To add a new module: simply add a new object to this array
// Set active: true and provide a link when the module is ready
const FABLAB_MODULES = [
    {
        id: 'web-development',
        title: 'Web Development',
        icon: '🌐',
        active: true,
        link: './web-dev-module.html',
        description: 'HTML, CSS, JavaScript fundamentals and portfolio building'
    },
    {
        id: 'networking',
        title: 'Networking',
        icon: '🔗',
        active: false,
        link: '#',
        description: 'Network fundamentals, protocols, and configuration'
    },
    {
        id: 'ui-ux',
        title: 'UI/UX Design',
        icon: '🎨',
        active: true,
        link: './uiux.html',
        description: 'User interface and user experience design principles'
    },
    {
        id: 'java-programming',
        title: 'Java Programming',
        icon: '☕',
        active: false,
        link: '#',
        description: 'Object-oriented programming with Java'
    },
    {
        id: 'fusion-360',
        title: 'Fusion 360',
        icon: '⚙️',
        active: false,
        link: '#',
        description: '3D CAD modeling and design with Fusion 360'
    },
    {
        id: 'laser-cutting',
        title: 'Laser Cutting',
        icon: '✂️',
        active: false,
        link: '#',
        description: 'Precision cutting and engraving techniques'
    },
    {
        id: '3d-printing',
        title: '3D Printing',
        icon: '🖨️',
        active: false,
        link: '#',
        description: 'Additive manufacturing and 3D printing processes'
    },
    {
        id: 'ai-ml',
        title: 'AI/ML',
        icon: '🧠',
        active: false,
        link: '#',
        description: 'Artificial Intelligence and Machine Learning basics'
    },
    {
        id: 'iot-pcb',
        title: 'IoT & PCB',
        icon: '📡',
        active: false,
        link: '#',
        description: 'Internet of Things and PCB design fundamentals'
    }
];

// ========== DOM ELEMENTS ==========
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    const themeToggle = document.getElementById('themeToggle');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modulesGrid = document.getElementById('modulesGrid');

    // ========== THEME TOGGLE ==========
    // Load saved theme from localStorage or default to dark
    function initTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Toggle between dark and light themes
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    initTheme();

    // ========== NAVBAR SCROLL EFFECT ==========
    // Add 'scrolled' class to navbar when page is scrolled
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    // Highlight the current section's nav link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector('.nav-link[href="#' + id + '"]');

            if (link && scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(function (l) {
                    l.classList.remove('active');
                });
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ========== MOBILE MENU TOGGLE ==========
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    if (navLinks) {
        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    // Intersection Observer for scroll-triggered animations
    function initScrollAnimations() {
        var animatedElements = document.querySelectorAll('.animate-on-scroll');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: show all elements immediately
            animatedElements.forEach(function (el) {
                el.classList.add('visible');
            });
        }
    }

    initScrollAnimations();

    // ========== IMAGE MODAL ==========
    // Open modal with image preview
    function openModal(imgSrc, caption) {
        if (modalImage && imageModal) {
            modalImage.src = imgSrc;
            modalCaption.textContent = caption || '';
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal
    function closeModal() {
        if (imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close modal on button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on overlay click
    if (imageModal) {
        imageModal.addEventListener('click', function (e) {
            if (e.target === imageModal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Attach click handlers to gallery items
    function initGalleryItems() {
        var galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(function (item) {
            item.addEventListener('click', function () {
                var img = item.querySelector('img');
                var caption = item.getAttribute('data-caption') || '';
                if (img) {
                    openModal(img.src, caption);
                }
            });
        });
    }

    initGalleryItems();

    // ========== FABLAB MODULES RENDERING ==========
    // Dynamically render module cards for scalability
    function renderModules() {
        if (!modulesGrid) return;

        modulesGrid.innerHTML = '';

        FABLAB_MODULES.forEach(function (mod) {
            var card = document.createElement('div');
            card.className = 'module-card animate-on-scroll ' + (mod.active ? 'active' : 'locked');
            card.setAttribute('data-module-id', mod.id);

            var statusClass = mod.active ? 'completed' : 'coming-soon';
            var statusText = mod.active ? '✅ Completed' : '🔒 Coming Soon';

            card.innerHTML =
                '<span class="module-card-icon">' + mod.icon + '</span>' +
                '<h3 class="module-card-title">' + mod.title + '</h3>' +
                '<p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px;">' + mod.description + '</p>' +
                '<span class="module-card-status ' + statusClass + '">' + statusText + '</span>';

            // Click handler
            card.addEventListener('click', function () {
                if (mod.active) {
                    window.location.href = mod.link;
                } else {
                    showComingSoonAlert(mod.title);
                }
            });

            modulesGrid.appendChild(card);
        });

        // Re-initialize scroll animations for dynamically added elements
        initScrollAnimations();
    }

    // Show "Coming Soon" alert for locked modules
    function showComingSoonAlert(moduleName) {
        // Create a custom toast notification instead of browser alert
        var existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        var toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML =
            '<span class="toast-icon">🔒</span>' +
            '<div>' +
            '<strong>' + moduleName + '</strong>' +
            '<p>This module is coming soon! Stay tuned for updates.</p>' +
            '</div>';

        // Style the toast
        toast.style.cssText =
            'position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);' +
            'background: var(--bg-card); border: 1px solid var(--warning); border-radius: 12px;' +
            'padding: 16px 24px; display: flex; align-items: center; gap: 12px; z-index: 3000;' +
            'box-shadow: 0 8px 32px rgba(0,0,0,0.3); transition: transform 0.4s ease; max-width: 400px;' +
            'font-family: Poppins, sans-serif; color: var(--text-primary);';

        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(function () {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Auto-remove after 3 seconds
        setTimeout(function () {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(function () {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 400);
        }, 3000);
    }

    renderModules();

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var offsetTop = targetEl.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Log initialization
    console.log('Portfolio website initialized successfully!');
    console.log('FabLab Modules loaded:', FABLAB_MODULES.length);
});
