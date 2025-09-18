// Animación general de fade-in al cargar la página
document.documentElement.classList.add('opacity-0', 'transition-opacity', 'duration-700');
window.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.documentElement.classList.remove('opacity-0');
        document.documentElement.classList.add('opacity-100');
    }, 100);
});


// Animaciones de entrada para secciones al hacer scroll (desde abajo o arriba)
document.addEventListener('DOMContentLoaded', function () {
    let lastScrollY = window.scrollY;
    const animatedSections = document.querySelectorAll('section, main, nav, footer, .header-anim');
    animatedSections.forEach(sec => {
        sec.classList.add('opacity-0', 'transition-all', 'duration-700');
        // Por defecto, animar desde abajo
        sec.classList.add('translate-y-8');
    });

    const reveal = (el, direction) => {
        el.classList.remove('opacity-0', 'translate-y-8', 'translate-y--8');
        el.classList.add('opacity-100', 'translate-y-0');
    };

    // Animar al cargar (para lo visible)
    animatedSections.forEach(sec => {
        if (sec.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(() => reveal(sec, 'down'), 200);
        }
    });

    // Animar al hacer scroll, detectando dirección
    let prevScroll = window.scrollY;
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let direction = (window.scrollY > prevScroll) ? 'down' : 'up';
                // Si sube, animar desde arriba
                if (direction === 'up') {
                    entry.target.classList.remove('translate-y-8');
                    entry.target.classList.add('-translate-y-8');
                    setTimeout(() => reveal(entry.target, direction), 50);
                } else {
                    entry.target.classList.remove('-translate-y-8');
                    entry.target.classList.add('translate-y-8');
                    setTimeout(() => reveal(entry.target, direction), 50);
                }
                observer.unobserve(entry.target);
            }
        });
        prevScroll = window.scrollY;
    }, { threshold: 0.15 });
    animatedSections.forEach(sec => observer.observe(sec));
});

 