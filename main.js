// Main JavaScript

// Update Year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close menu if open
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Stats Counter Animation
const stats = document.querySelectorAll('.counter');
let hasAnimated = false;

const animateStats = () => {
    stats.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 20);
        } else {
            counter.innerText = target + "+"; // Add plus sign
        }
    });
};

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Trigger stats animation only once
            if (entry.target.querySelector('.counter') && !hasAnimated) {
                animateStats(); // This calls it for all, but logic handles it
                hasAnimated = true;
            }
        }
    });
}, observerOptions);

// Add animation classes to elements
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Typewriter Effect (simple)
const typeText = document.querySelector('.typewriter');
if (typeText) {
    const text = typeText.innerText;
    typeText.innerText = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typeText.innerText += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    // Start after a delay
    setTimeout(typeWriter, 1000);
}
