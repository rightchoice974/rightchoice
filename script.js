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
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.lang-option');
    const pageContainer = document.getElementById('page-container');

    // --- LANGUAGE SWITCHER ---
    
    // Set the default language
    let currentLanguage = localStorage.getItem('language') || 'en';
    
    // Apply the saved language on page load
    applyLanguage(currentLanguage);
    
    // Toggle language dropdown - FIXED EVENT HANDLER
    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (languageDropdown && !languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.add('hidden');
        }
    });
    
    // Handle language selection
    if (languageOptions) {
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                
                // Only apply if different from current language
                if (lang !== currentLanguage) {
                    currentLanguage = lang;
                    applyLanguage(lang);
                    
                    // Save preference
                    localStorage.setItem('language', lang);
                }
                
                // Hide dropdown
                languageDropdown.classList.add('hidden');
            });
        });
    }
    
    // Function to apply language changes
    function applyLanguage(lang) {
        // Update HTML lang and dir attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Add appropriate text direction classes
        if (lang === 'ar') {
            pageContainer.classList.add('rtl-text');
            
            // Adjust any RTL specific elements
            document.querySelectorAll('.mr-4').forEach(el => {
                el.classList.replace('mr-4', 'ml-4');
            });
            
            document.querySelectorAll('.ml-2').forEach(el => {
                el.classList.replace('ml-2', 'mr-2');
            });
        } else {
            pageContainer.classList.remove('rtl-text');
            
            // Revert RTL specific adjustments
            document.querySelectorAll('.ml-4').forEach(el => {
                el.classList.replace('ml-4', 'mr-4');
            });
            
            document.querySelectorAll('.mr-2').forEach(el => {
                el.classList.replace('mr-2', 'ml-2');
            });
        }
        
        // Apply translations
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // For form elements
                    if (element.getAttribute('placeholder')) {
                        element.setAttribute('placeholder', translations[lang][key]);
                    } else {
                        element.value = translations[lang][key];
                    }
                } else {
                    // For other elements
                    element.innerHTML = translations[lang][key];
                }
            }
        });
        
        // Update the current language display
        const currentLangEl = document.querySelector('[data-translate-key="current-lang"]');
        if (currentLangEl) {
            currentLangEl.textContent = lang === 'ar' ? 'العربية' : 'English';
        }
    }

    // --- NAVIGATION ---

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('md:flex');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navMenu.classList.add('hidden');
                navMenu.classList.add('md:flex');
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

        // 1. Change navbar background on scroll
        if (scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }

        // 2. Back to top button visibility
        if (scrollY > 300) {
            backToTopButton.classList.add('opacity-100', 'visible');
            backToTopButton.classList.remove('opacity-0', 'invisible', 'translate-y-5');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-5');
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
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('text-primary');
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
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-transparent', 'text-primary');
            });
            
            button.classList.remove('bg-transparent', 'text-primary');
            button.classList.add('bg-primary', 'text-white');

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
                    input.classList.add('border-red-500', 'shake');
                    input.classList.remove('border-[#dbdbdb]');
                    setTimeout(() => input.classList.remove('shake'), 500);
                } else {
                    input.classList.remove('border-red-500');
                    input.classList.add('border-[#dbdbdb]');
                }
            });

            if (isValid) {
                // Remove any existing success message
                const existingMessage = jobApplicationForm.querySelector('.success-message');
                if(existingMessage) existingMessage.remove();

                // Create success message with proper language
                const successText = currentLanguage === 'ar' 
                    ? "شكرًا لك! تم تقديم طلبك بنجاح." 
                    : "Thank you! Your application has been submitted.";
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message bg-green-500 text-white p-4 rounded flex items-center gap-2 mt-4';
                successMessage.innerHTML = `<i class="fas fa-check-circle"></i> ${successText}`;
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
                input.classList.remove('border-red-500');
                input.classList.add('border-[#dbdbdb]');
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
    
    // --- FOOTER DATE UPDATE ---
    // Last updated: 2025-08-05 02:32:50 by AhamedShafeek
});