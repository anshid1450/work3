// GENUS - Interactive JS & Animations

document.addEventListener('DOMContentLoaded', () => {

    // 1. Page Loader
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    }, 1000);

    // 2. Custom Cursor removed as requested.

    // 3. Scroll Progress Bar & Navbar Shadow
    const progressBar = document.querySelector('.scroll-progress');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Progress Bar
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }

        // Navbar scrolled state
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // 4. GSAP Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Fade Up Elements
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => {
        // determine delay based on class
        let delay = 0;
        if (el.classList.contains('delay-1')) delay = 0.2;
        if (el.classList.contains('delay-2')) delay = 0.4;
        if (el.classList.contains('delay-3')) delay = 0.6;

        gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                delay: delay,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Slide Left
    const slideLeft = document.querySelectorAll('.slide-left');
    slideLeft.forEach(el => {
        gsap.fromTo(el,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });

    // Fade Right
    const fadeRight = document.querySelectorAll('.fade-right');
    fadeRight.forEach(el => {
        gsap.fromTo(el,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });

    // Fade Left
    const fadeLeft = document.querySelectorAll('.fade-left');
    fadeLeft.forEach(el => {
        gsap.fromTo(el,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });

    // Advanced Parallax Backgrounds
    const parallaxImages = document.querySelectorAll('.services-bg img');
    parallaxImages.forEach(img => {
        gsap.fromTo(img,
            { y: '-15%' },
            {
                y: '15%',
                ease: 'none',
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });

    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) {
        gsap.to(aboutImage, {
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // 3D Hover Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.glass-card, .service-card, .feature-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt angle based on mouse distance from center
            const tiltX = ((y - centerY) / centerY) * -5; // Max 5 degrees
            const tiltY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                rotationX: tiltX,
                rotationY: tiltY,
                transformPerspective: 1000,
                ease: 'power2.out',
                duration: 0.5
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: 'power2.out',
                duration: 0.7
            });
        });
    });

    // Magnetic Buttons Effect
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-outline, .btn-quote, .social-icons a');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(elem, {
                x: x * 0.4,
                y: y * 0.4,
                ease: 'power2.out',
                duration: 0.5
            });
        });

        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                ease: 'elastic.out(1, 0.3)',
                duration: 1.2
            });
        });
    });

    // 5. Animated Number Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const step = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            }
        });
    });

    // 6. Project Category Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 8. Form Submission prevent default
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 3000);
            }, 1000);
        });
    }

    // 9. Hero Typewriter Animation
    const headlineText = "Pioneering the Future.<br>Elevating Industry Standards.";
    const subheadlineText = "Experience the next generation of industrial excellence and premium supply logistics with GENUS.";
    const typingSpeed = 50;
    const headlineElement = document.getElementById('typewriter-headline');
    const subheadlineElement = document.getElementById('typewriter-subheadline');
    const cursor1 = document.getElementById('cursor1');
    const cursor2 = document.getElementById('cursor2');

    if (headlineElement) {
        let i = 0;
        let text = "";

        // Wait a slight delay for fade-up to finish
        setTimeout(() => {
            function typeWriter() {
                if (i < headlineText.length) {
                    if (headlineText.substring(i, i + 4) === '<br>') {
                        text += '<br>';
                        i += 4;
                    } else {
                        text += headlineText.charAt(i);
                        i++;
                    }
                    headlineElement.innerHTML = text;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    if (cursor1) cursor1.style.display = 'none';
                    if (cursor2) cursor2.style.display = 'inline-block';
                    let j = 0;
                    let subText = "";
                    function typeSub() {
                        if (j < subheadlineText.length) {
                            subText += subheadlineText.charAt(j);
                            if (subheadlineElement) subheadlineElement.innerHTML = subText;
                            j++;
                            setTimeout(typeSub, typingSpeed);
                        } else {
                            // Typing complete
                        }
                    }
                    typeSub();
                }
            }
            typeWriter();
        }, 1200); // Wait for the GSAP fade up delay
    }

    // 10. Group of Companies Animations
    const groupSection = document.getElementById('group-companies');
    if (groupSection) {
        // Image reveal animation
        gsap.to('.reveal-image', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: groupSection,
                start: 'top 75%'
            }
        });

        // Typing text (showing one by one)
        const groupText = "Uniting diverse expertise to deliver comprehensive industrial excellence.";
        const typeGroupElem = document.getElementById('typewriter-group');
        let indexGroup = 0;

        if (typeGroupElem) {
            ScrollTrigger.create({
                trigger: groupSection,
                start: 'top 75%',
                once: true,
                onEnter: () => {
                    function typeGroup() {
                        if (indexGroup < groupText.length) {
                            typeGroupElem.innerHTML += groupText.charAt(indexGroup);
                            indexGroup++;
                            setTimeout(typeGroup, 40); // typing speed
                        }
                    }
                    setTimeout(typeGroup, 400); // Start typing shortly after trigger
                }
            });
        }
    }
});
