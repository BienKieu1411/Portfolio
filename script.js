document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target); // animate once
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.9)';
    }
    
    lastScroll = currentScroll;
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

const heroTitle = document.querySelector('.hero h1');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';

setTimeout(() => {
    let i = 0;
    const typeWriter = () => {
        if (i < titleText.length) {
            heroTitle.innerHTML += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    typeWriter();
}, 1000);

// removed tilt effect (no pinned cards)

// Scrollspy for nav active state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const setActive = (id) => {
    navLinks.forEach(a => {
        const href = a.getAttribute('href');
        if (href === `#${id}`) a.classList.add('active'); else a.classList.remove('active');
    });
};

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActive(entry.target.id);
        }
    });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });

sections.forEach(sec => spyObserver.observe(sec));

// Back to top button logic
const backToTop = document.getElementById('back-to-top');
const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
};
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', toggleBackToTop, { passive: true });
toggleBackToTop();

// Stagger reveal for project cards
const projectCards = document.querySelectorAll('.projects-grid .project-card');
projectCards.forEach((card, idx) => {
    card.style.transitionDelay = `${Math.min(idx * 80, 400)}ms`;
});
const cardsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
projectCards.forEach(card => cardsObserver.observe(card));

// Parallax background shapes
const shapes = document.querySelectorAll('.floating-shapes .shape');
window.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth) - 0.5;
    const my = (e.clientY / window.innerHeight) - 0.5;
    shapes.forEach((s, i) => {
        const depth = (i + 1) * 6;
        s.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
    });
});

// CTA gentle glow
document.querySelectorAll('.cta-button').forEach(btn => btn.classList.add('glow'));

// Scroll progress bar
const progressBar = document.getElementById('scroll-progress');
const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// Make entire project card clickable (except inner links/buttons)
projectCards.forEach(card => {
    const repo = card.getAttribute('data-repo');
    if (!repo) return;

    // Accessibility semantics
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    // Click anywhere on the card except interactive elements
    card.addEventListener('click', (e) => {
        const interactive = e.target.closest('a, button');
        if (interactive) return; // let the inner element handle it
        window.open(repo, '_blank');
    });

    // Keyboard support: Enter/Space to open
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            // Avoid triggering when focus is on an inner interactive element
            const isInnerInteractive = document.activeElement && (
                document.activeElement.tagName === 'A' ||
                document.activeElement.tagName === 'BUTTON' ||
                ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)
            );
            if (isInnerInteractive) return;
            e.preventDefault();
            window.open(repo, '_blank');
        }
    });
});