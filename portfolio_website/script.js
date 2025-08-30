// Responsive navigation menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scroll for navigation links
const links = document.querySelectorAll('.nav-links a');
for (const link of links) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
        }
    });
}

// Simple contact form validation
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });
}
