document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTORS ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const backToTopButton = document.getElementById('back-to-top');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const jobApplicationForm = document.getElementById('job-application');
    const sections = document.querySelectorAll('section');

    // --- NAVIGATION ---

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') {
                return;
            }
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- SCROLL-BASED BEHAVIORS ---

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const navHeight = navbar.offsetHeight;

        // 1. Change navbar background
        if (scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        // 2. Back to top button visibility
        if (scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        // 3. Add active class to navigation based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            if (scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    // Back to top button click
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- PROJECT FILTERING ---

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const shouldBeVisible = filterValue === 'all' || item.classList.contains(filterValue);
                
                if (shouldBeVisible) {
                    // Show item
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10); // Small delay to trigger transition
                } else {
                    // Hide item
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // Must match CSS transition duration
                }
            });
        });
    });

    // --- FORM VALIDATION ---

    if (jobApplicationForm) {
        jobApplicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const formInputs = jobApplicationForm.querySelectorAll('input[required], textarea[required]');

            formInputs.forEach(input => {
                const isFile = input.type === 'file';
                const hasValue = isFile ? input.files.length > 0 : input.value.trim() !== '';

                if (!hasValue) {
                    isValid = false;
                    input.style.borderColor = '#ff3860';
                    input.classList.add('shake');
                    setTimeout(() => input.classList.remove('shake'), 500);
                } else {
                    input.style.borderColor = '#dbdbdb';
                }
            });

            if (isValid) {
                // Remove any existing success message
                const existingMessage = jobApplicationForm.querySelector('.success-message');
                if(existingMessage) existingMessage.remove();

                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your application has been submitted.';
                jobApplicationForm.appendChild(successMessage);

                jobApplicationForm.reset();

                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.remove(), 500);
                }, 5000);
            }
        });

        const allInputs = jobApplicationForm.querySelectorAll('input, textarea');
        allInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '#dbdbdb';
            });
        });
    }

    // --- ANIMATION ON SCROLL (INTERSECTION OBSERVER) ---

    // Set initial states for elements to be animated
    const elementsToAnimate = document.querySelectorAll('.service-card, .stat-card, .contact-item, .project-item, .logo-slider');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.setProperty('--i', index % 5 + 1); // Stagger animation delay

        if (el.classList.contains('service-card')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('contact-item')) {
            el.style.transform = 'translateX(-30px)';
        } else if (el.classList.contains('project-item')) {
            el.style.transform = 'scale(0.9)';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const target = entry.target;
            target.style.opacity = '1';
            target.style.transform = 'translate(0, 0) scale(1)';

            if (target.classList.contains('stat-card')) {
                target.classList.add('pulse-animation');
            }
            
            observer.unobserve(target);
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        appearOnScroll.observe(el);
    });
});