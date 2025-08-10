/*
    Right Choice Contracting - Main Script
    Version: 3.1 (Final with Mobile Optimizations)
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- SELECTORS ---
    const
        docElement = document.documentElement,
        body = document.body,
        navbar = document.querySelector('.navbar'),
        navToggle = document.querySelector('.nav-toggle'),
        navMenu = document.querySelector('.nav-menu'),
        navLinks = document.querySelectorAll('.nav-link'),
        langSwitchButton = document.querySelector('.lang-switch'),
        backToTopButton = document.getElementById('back-to-top'),
        filterButtons = document.querySelectorAll('.filter-btn'),
        projectItems = document.querySelectorAll('.project-item'),
        jobApplicationForm = document.getElementById('job-application-form'),
        contactForm = document.getElementById('contact-form'),
        fileInput = document.getElementById('cv'),
        fileNameDisplay = document.querySelector('.file-name'),
        browseBtn = document.querySelector('.browse-btn'),
        scrollDownBtn = document.querySelector('.scroll-down'),
        sections = document.querySelectorAll('main > section');

    // --- TRANSLATION DATA ---
    const translations = {
        en: {
            'nav-home': 'Home', 'nav-services': 'Services', 'nav-team': 'Our Team', 'nav-projects': 'Projects', 'nav-clients': 'Our Clients', 'nav-careers': 'Careers', 'nav-contact': 'Contact', 'lang-switch': 'عربي',
            'hero-title': 'Right Choice<br>Contracting', 'hero-subtitle': 'Trusted Since 2010 (Dubai) Now in Qatar', 'hero-desc': 'Excellence in Construction & Facility Management Services', 'hero-button': 'Explore Our Services',
            'gm-welcome': 'Welcome from Our General Manager', 'gm-message': '"With over a decade of experience from our main branch in Dubai (Al Bakith Contracting WLL, est. 2010), we are proud to bring the same excellence to Qatar. Right Choice is committed to quality, safety, and timely delivery of every project."',
            'services-title': 'Our Services', 'services-subtitle': 'Comprehensive solutions for all your construction and facility management needs',
            'service-construction': 'Construction', 'service-construction-desc': 'Residential & Commercial Projects', 'service-villa': 'Villa Development', 'service-villa-desc': 'Custom Villa Design & Construction', 'service-labour': 'Labour Supply', 'service-labour-desc': 'Verified & Skilled Manpower', 'service-cleaning': 'Cleaning Services', 'service-cleaning-desc': 'Office & Spider Cleaning Solutions', 'service-electrical': 'Electrical', 'service-electrical-desc': 'Complete Installation & Maintenance', 'service-mechanical': 'Mechanical', 'service-mechanical-desc': 'HVAC & Mechanical System Solutions', 'service-plumbing': 'Plumbing', 'service-plumbing-desc': 'Installation & Maintenance of Systems', 'service-fitout': 'Fit-Out Interior', 'service-fitout-desc': 'All Types of Interior Works', 'service-demolition': 'Demolition', 'service-demolition-desc': 'Safe & Controlled Demolitions', 'service-excavation': 'Excavation', 'service-excavation-desc': 'Groundwork & Earthmoving Solutions',
            'team-title': 'Our Team', 'team-subtitle': 'We are proud of our dedicated workforce, combining efficiency, skill, and a commitment to safety',
            'team-stat1': 'Skilled Workers', 'team-stat2': 'Administrative & Site Staff', 'team-stat3': 'Ongoing Projects',
            'projects-title': 'Our Projects', 'projects-subtitle': 'Showcasing our expertise and quality through completed works',
            'filter-all': 'All', 'filter-construction': 'Construction', 'filter-cleaning': 'Cleaning', 'filter-mep': 'MEP Works', 'filter-interior': 'Interior',
            'clients-title': 'Our Valued Clients', 'clients-subtitle': 'We are honored to have worked with some of the leading names in the industry',
            'careers-title': 'Careers at Right Choice', 'careers-subtitle': 'Join Our Growing Team in Qatar!',
            'careers-p1': 'We are always looking for talented professionals to join our team. If you are passionate about construction and dedicated to excellence, we invite you to submit your CV for our consideration.',
            'form-title': 'Submit Your CV', 'form-name': 'Full Name', 'form-contact': 'Contact Number', 'form-email': 'Email Address', 'form-cv': 'CV Upload (PDF, DOC, DOCX)', 'form-submit': 'Submit Application', 'form-submitting': 'Submitting...', 'form-success': 'Thank you! Your application has been submitted successfully.', 'form-error': 'An error occurred. Please try again.', 'contact-form-success': 'Thank you! Your message has been sent successfully.', 'form-validation-error': 'Please fill in all required fields.',
            'contact-title': 'Contact Us', 'contact-subtitle': 'Get in touch with our team for inquiries or project discussions',
            'contact-location': 'Location', 'contact-email': 'Email', 'contact-website': 'Website', 'contact-phone': 'Phone', 'contact-hours': 'Working Hours', 'contact-hours-p': 'Saturday to Wednesday 8am - 5pm<br>Thursday 8am - 2pm<br>Friday - Holiday',
            'footer-text': '© 2024 Right Choice Contracting & Clean Services WLL – Qatar | Powered by Al Bakith Contracting WLL – Dubai | Since 2010',
        },
        ar: {
            'nav-home': 'الرئيسية', 'nav-services': 'خدماتنا', 'nav-team': 'فريقنا', 'nav-projects': 'مشاريعنا', 'nav-clients': 'عملاؤنا', 'nav-careers': 'وظائف', 'nav-contact': 'اتصل بنا', 'lang-switch': 'English',
            'hero-title': 'رايت تشويس<br>للمقاولات', 'hero-subtitle': 'موثوقون منذ 2010 (دبي) والآن في قطر', 'hero-desc': 'التميز في خدمات البناء وإدارة المرافق', 'hero-button': 'اكتشف خدماتنا',
            'gm-welcome': 'كلمة ترحيب من مديرنا العام', 'gm-message': '"بأكثر من عقد من الخبرة من فرعنا الرئيسي في دبي (البقيث للمقاولات ذ.م.م، تأسست 2010)، نفخر بتقديم نفس التميز في قطر. تلتزم رايت تشويس بالجودة والسلامة وتسليم كل مشروع في الوقت المحدد."',
            'services-title': 'خدماتنا', 'services-subtitle': 'حلول شاملة لجميع احتياجاتكم في البناء وإدارة المرافق',
            'service-construction': 'مقاولات البناء', 'service-construction-desc': 'مشاريع سكنية وتجارية', 'service-villa': 'تطوير الفلل', 'service-villa-desc': 'تصميم وبناء الفلل المخصصة', 'service-labour': 'توريد العمالة', 'service-labour-desc': 'قوى عاملة ماهرة وموثوقة', 'service-cleaning': 'خدمات التنظيف', 'service-cleaning-desc': 'حلول تنظيف المكاتب والتنظيف العنكبوتي', 'service-electrical': 'الأعمال الكهربائية', 'service-electrical-desc': 'تركيب وصيانة كاملة', 'service-mechanical': 'الأعمال الميكانيكية', 'service-mechanical-desc': 'حلول التكييف والأنظمة الميكانيكية', 'service-plumbing': 'السباكة', 'service-plumbing-desc': 'تركيب وصيانة الأنظمة', 'service-fitout': 'التشطيبات الداخلية', 'service-fitout-desc': 'جميع أنواع الأعمال الداخلية', 'service-demolition': 'الهدم', 'service-demolition-desc': 'عمليات هدم آمنة ومدروسة', 'service-excavation': 'الحفريات', 'service-excavation-desc': 'حلول أعمال الحفر وتسوية الأراضي',
            'team-title': 'فريقنا', 'team-subtitle': 'نفخر بقوتنا العاملة المتفانية، التي تجمع بين الكفاءة والمهارة والالتزام بالسلامة',
            'team-stat1': 'عامل ماهر', 'team-stat2': 'موظف إداري وميداني', 'team-stat3': 'مشاريع قيد التنفيذ',
            'projects-title': 'مشاريعنا', 'projects-subtitle': 'نعرض خبرتنا وجودتنا من خلال أعمالنا المنجزة',
            'filter-all': 'الكل', 'filter-construction': 'بناء', 'filter-cleaning': 'تنظيف', 'filter-mep': 'كهروميكانيكية', 'filter-interior': 'داخلي',
            'clients-title': 'عملاؤنا الكرام', 'clients-subtitle': 'نتشرف بالعمل مع بعض الأسماء الرائدة في هذا المجال',
            'careers-title': 'وظائف في رايت تشويس', 'careers-subtitle': 'انضم إلى فريقنا المتنامي في قطر!',
            'careers-p1': 'نبحث دائمًا عن المحترفين الموهوبين للانضمام إلى فريقنا. إذا كنت شغوفًا بالبناء وملتزمًا بالتميز، ندعوك لتقديم سيرتك الذاتية للنظر فيها.',
            'form-title': 'قدم سيرتك الذاتية', 'form-name': 'الاسم الكامل', 'form-contact': 'رقم الاتصال', 'form-email': 'البريد الإلكتروني', 'form-cv': 'تحميل السيرة الذاتية (PDF, DOC, DOCX)', 'form-submit': 'إرسال الطلب', 'form-submitting': 'جاري الإرسال...', 'form-success': 'شكرًا لك! تم إرسال طلبك بنجاح.', 'form-error': 'حدث خطأ. يرجى المحاولة مرة أخرى.', 'contact-form-success': 'شكرًا لك! تم إرسال رسالتك بنجاح.', 'form-validation-error': 'يرجى ملء جميع الحقول المطلوبة.',
            'contact-title': 'اتصل بنا', 'contact-subtitle': 'تواصل مع فريقنا للاستفسارات أو لمناقشة المشاريع',
            'contact-location': 'الموقع', 'contact-email': 'البريد الإلكتروني', 'contact-website': 'الموقع الإلكتروني', 'contact-phone': 'الهاتف', 'contact-hours': 'ساعات العمل', 'contact-hours-p': 'السبت إلى الأربعاء 8 صباحًا - 5 مساءً<br>الخميس 8 صباحًا - 2 مساءً<br>الجمعة - عطلة',
            'footer-text': '© 2024 رايت تشويس للمقاولات وخدمات التنظيف ذ.م.م - قطر | بدعم من البقيث للمقاولات ذ.م.م - دبي | منذ 2010',
        }
    };

    // --- LANGUAGE SWITCHER ---
    const applyTranslations = (lang) => {
        docElement.lang = lang;
        docElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            const translation = translations[lang][key];
            if (translation) {
                if (key === 'hero-title' || key === 'contact-hours-p') {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    };
    
    langSwitchButton.addEventListener('click', () => {
        const newLang = docElement.lang === 'en' ? 'ar' : 'en';
        applyTranslations(newLang);
        localStorage.setItem('preferredLanguage', newLang);
    });

    // --- NAVIGATION ---
    const toggleMobileMenu = () => {
        const isMenuOpen = navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        body.classList.toggle('body-no-scroll', isMenuOpen);
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars', !isMenuOpen);
        icon.classList.toggle('fa-times', isMenuOpen);
    };

    navToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = servicesSection.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    }

    // --- SCROLL-BASED BEHAVIORS ---
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const navHeight = navbar.offsetHeight;
        navbar.classList.toggle('nav-scrolled', scrollY > 50);
        backToTopButton.classList.toggle('visible', scrollY > 300);
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 150;
            if (scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- PROJECT FILTERING ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            projectItems.forEach(item => {
                const shouldBeVisible = filterValue === 'all' || item.classList.contains(filterValue);
                if (shouldBeVisible) {
                    item.style.display = 'block';
                    setTimeout(() => { item.classList.remove('hidden'); }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // --- FILE UPLOAD HANDLING ---
    if (fileInput && fileNameDisplay && browseBtn) {
        fileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'No file selected';
            fileNameDisplay.textContent = fileName;
            fileNameDisplay.closest('.file-upload-ui').classList.toggle('has-file', e.target.files.length > 0);
        });
        browseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fileInput.click();
        });
    }

    // --- FORM HANDLING ---
    const handleFormSubmit = (form, messageArea) => {
        if (!form || !messageArea) return;
        const submitButton = form.querySelector('button[type="submit"]');
        const showFormMessage = (type, messageText) => {
            messageArea.innerHTML = `<div class="form-feedback ${type}"><i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}"></i> ${messageText}</div>`;
            messageArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };
        const clearFormErrors = () => {
            form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        };
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearFormErrors();
            messageArea.innerHTML = '';
            let isValid = true;
            const currentLang = document.documentElement.lang;
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(input => {
                const isFile = input.type === 'file';
                const hasValue = isFile ? input.files.length > 0 : input.value.trim() !== '';
                if (!hasValue) {
                    isValid = false;
                    const fieldWithError = input.closest('.form-group');
                    if (fieldWithError) {
                        fieldWithError.classList.add('error');
                    }
                    if (isFile) {
                        input.closest('.file-upload-wrapper').querySelector('.file-upload-ui').classList.add('error');
                    }
                }
            });
            if (isValid) {
                const originalButtonText = submitButton.textContent;
                const submittingText = translations[currentLang]['form-submitting'] || 'Submitting...';
                submitButton.disabled = true;
                submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${submittingText}`;
                try {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    const successKey = form.id === 'job-application-form' ? 'form-success' : 'contact-form-success';
                    const successMessage = translations[currentLang][successKey] || 'Success!';
                    showFormMessage('success', successMessage);
                    form.reset();
                    if (fileNameDisplay) {
                        fileNameDisplay.textContent = 'No file selected';
                        fileNameDisplay.closest('.file-upload-ui').classList.remove('has-file');
                    }
                } catch (error) {
                    const errorMessage = translations[currentLang]['form-error'] || 'An error occurred. Please try again.';
                    showFormMessage('error', errorMessage);
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            } else {
                const validationErrorMessage = translations[currentLang]['form-validation-error'] || 'Please fill in all required fields.';
                showFormMessage('error', validationErrorMessage);
            }
        });
        form.addEventListener('input', (e) => {
            const errorElement = e.target.closest('.error');
            if (errorElement) {
                errorElement.classList.remove('error');
            }
        });
    };
    if (jobApplicationForm) handleFormSubmit(jobApplicationForm, jobApplicationForm.querySelector('.form-message-area'));
    if (contactForm) {
        let messageArea = contactForm.querySelector('.form-message-area');
        if (!messageArea) {
            messageArea = document.createElement('div');
            messageArea.className = 'form-message-area';
            contactForm.appendChild(messageArea);
        }
        handleFormSubmit(contactForm, messageArea);
    }

    // --- ANIMATION ON SCROLL (INTERSECTION OBSERVER) ---
    const elementsToAnimate = document.querySelectorAll('.service-card, .stat-card, .contact-item, .project-item, .value-item');
    elementsToAnimate.forEach((el, index) => {
        el.style.setProperty('--i', index % 5 + 1);
        el.style.opacity = '0';
        if (el.classList.contains('service-card') || el.classList.contains('value-item')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('contact-item')) {
            el.style.transform = 'translateX(-30px)';
        } else if (el.classList.contains('project-item')) {
            el.style.transform = 'scale(0.9)';
        }
    });
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.style.opacity = '1';
                target.style.transform = 'translate(0, 0) scale(1)';
                if (target.classList.contains('stat-card')) {
                    target.classList.add('pulse-animation');
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elementsToAnimate.forEach(el => appearOnScroll.observe(el));
    
    // --- INITIALIZATION ---
    const initializePage = () => {
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        applyTranslations(savedLang);
        handleScroll();
    };
    
    initializePage();
});