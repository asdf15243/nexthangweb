document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('mainContent');
    
    // Smooth entry animation
    setTimeout(() => {
        container.classList.add('loaded');
    }, 300);
    
    // Initialize Vanilla Tilt.js for 3D effects
    if (typeof VanillaTilt !== 'undefined') {
        // Logo tilt effect
        const logo = document.querySelector('.logo');
        if (logo) {
            VanillaTilt.init(logo, {
                max: 5,
                speed: 300,
                glare: false,
                "max-glare": 0
            });
        }
        
        // Button tilt effect
        const buttonWrapper = document.querySelector('.buttons-wrapper');
        if (buttonWrapper) {
            VanillaTilt.init(buttonWrapper, {
                max: 10,
                speed: 300,
                glare: false
            });
        }
        
        // Cards tilt effect
        const cards = document.querySelectorAll('[data-tilt]');
        cards.forEach(card => {
            VanillaTilt.init(card, {
                max: 8,
                speed: 300,
                glare: card.hasAttribute('data-tilt-glare'),
                "max-glare": 0.2
            });
        });
    }
    
    // Interactive cursor effect
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
    
    // Interactive hover effects
    const interactiveElements = document.querySelectorAll('.store-btn, .usp-card, .guideline-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            // Add sound effect or vibration for mobile (optional)
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.usp-card, .guideline-card').forEach(card => {
        observer.observe(card);
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.particle');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.02);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add loading animation for particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Set random initial positions
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        particle.style.left = randomX + '%';
        particle.style.top = randomY + '%';
    });
    
    // Animate particles on hover
    const uspCards = document.querySelectorAll('.usp-card');
    uspCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '5s';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '20s';
            });
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.store-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .usp-card, .guideline-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .usp-card.animate-in, .guideline-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Handle page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});