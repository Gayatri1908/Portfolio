document.addEventListener('DOMContentLoaded', () => {

// 1. Preloader Dismissal
const preloader = document.getElementById('preloader');
if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 300); // Small delay for aesthetic purposes
    });
}

// 2. Theme Toggler
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Function to update icon
const updateThemeIcon = (isLight) => {
    // We're using SVG paths or class changes for the icon since we can't use emojis.
    // Assuming we'll have SVGs or innerText. "Dark Mode" / "Light Mode" or simple shapes.
    themeToggle.innerHTML = isLight
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
};

// Check Local Storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    htmlEl.setAttribute('data-theme', 'light');
    updateThemeIcon(true);
} else {
    htmlEl.removeAttribute('data-theme');
    updateThemeIcon(false);
}

themeToggle.addEventListener('click', () => {
    if (htmlEl.hasAttribute('data-theme')) {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(false);
    } else {
        htmlEl.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(true);
    }
});

// 3. Navbar Sticky & Hamburger Menu
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// 4. Scroll Progress Indicator
const scrollBar = document.getElementById('scroll-progress-bar');
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollBar.style.width = scroll;
});

// 5. Typing Animation (Hero Section)
const textToType = 'Java Backend Developer';
const typingElement = document.getElementById('typing-text');
let typingIndex = 0;

function typeText() {
    if (typingIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeText, 100); // Speed of typing
    }
}
// Start typing after a short delay
setTimeout(typeText, 1000);

// 6. Intersection Observer for Scroll Animations & Skills
const reveals = document.querySelectorAll('.reveal');
const skillFills = document.querySelectorAll('.skill-bar-fill');

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Add active class to fade in elements
        entry.target.classList.add('active');
        
        // Specially handle skill bars to trigger animation only when reaching them
        if (entry.target.classList.contains('skills-grid')) {
            skillFills.forEach(fill => {
                const percentage = fill.getAttribute('data-percentage');
                fill.style.width = percentage + '%';
            });
        }
        
        // Unobserve after animating once
        observer.unobserve(entry.target);
    });
}, observerOptions);

reveals.forEach(reveal => {
    scrollObserver.observe(reveal);
});
// Observe skill container specifically if not already included in reveals
const skillsContainer = document.querySelector('.skills-grid');
if(skillsContainer) {
    scrollObserver.observe(skillsContainer);
}

// 7. Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current) && current !== '') {
            li.classList.add('active');
        }
    });
});

// 8. Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 9. Contact Form Simulation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            btn.textContent = 'Message Sent Successfully!';
            btn.style.background = 'var(--accent-color)';
            btn.style.color = '#1a1b26';
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// 10. Tilt effect for Project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

});
