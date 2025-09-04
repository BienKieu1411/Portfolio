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
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

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