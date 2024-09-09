document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling for internal navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Проверяем, является ли ссылка внутренней (с якорем #)
        if (href.startsWith('#')) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Scroll animations for sections
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Navigation bar animation (shrink on scroll)
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Highlight active link on scroll
    const sectionsWithId = document.querySelectorAll('main section[id]');
    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY + 150;

        sectionsWithId.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
