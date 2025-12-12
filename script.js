// ===================================
// LANGUAGE SWITCHING FUNCTIONALITY
// ===================================

let currentLang = 'en';

// Initialize language toggle
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Language toggle click handler
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'uk' : 'en';
        updateLanguage();
    });
    
    // Individual language option click handlers
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            if (lang !== currentLang) {
                currentLang = lang;
                updateLanguage();
            }
        });
    });
    
    // Initialize with default language
    updateLanguage();
    
    // Initialize animations on scroll
    initScrollAnimations();
    
    // Add smooth scroll behavior for navigation links
    initSmoothScroll();
});

// Update all text elements based on current language
function updateLanguage() {
    // Update language toggle buttons
    document.querySelectorAll('.lang-option').forEach(option => {
        const optionLang = option.getAttribute('data-lang');
        if (optionLang === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Update all elements with data-en and data-uk attributes
    const elements = document.querySelectorAll('[data-en][data-uk]');
    elements.forEach(element => {
        const text = currentLang === 'en' 
            ? element.getAttribute('data-en') 
            : element.getAttribute('data-uk');
        
        // Update text content or innerHTML based on element type
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'OPTION') {
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Store language preference
    localStorage.setItem('avelleLanguage', currentLang);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe about section
    const aboutSection = document.querySelector('.about-content');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Don't prevent default for empty anchors
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Increase opacity and shadow on scroll
    if (currentScroll > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.65)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.4)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// GALLERY ITEM INTERACTIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't redirect if clicking on slider controls
            if (e.target.closest('.slider-btn') || e.target.closest('.slider-dot')) {
                return;
            }
            
            // Gallery items are now purely for viewing, no redirect
        });
    });
});

// ===================================
// LOAD SAVED LANGUAGE PREFERENCE
// ===================================

window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('avelleLanguage');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        updateLanguage();
    }
});

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        // Плавный параллакс для фона
        heroBackground.style.transform = `scale(1.05) translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// INSTAGRAM BUTTON RIPPLE EFFECT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-instagram-large');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===================================
// GALLERY HOVER EFFECT ENHANCEMENT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Slightly dim other gallery items
            galleryItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.opacity = '0.7';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Restore opacity to all items
            galleryItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
});

// ===================================
// GALLERY SLIDER FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.gallery-slider');
    
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const dotsContainer = slider.querySelector('.slider-dots');
        
        let currentIndex = 0;
        const totalImages = images.length;
        
        // Create dots
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        
        function goToSlide(index) {
            // Remove active class from current image and dot
            images[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            // Update index
            currentIndex = index;
            
            // Add active class to new image and dot
            images[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }
        
        function nextSlide() {
            const newIndex = (currentIndex + 1) % totalImages;
            goToSlide(newIndex);
        }
        
        function prevSlide() {
            const newIndex = (currentIndex - 1 + totalImages) % totalImages;
            goToSlide(newIndex);
        }
        
        // Event listeners
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
        
        // Auto-play (optional - uncomment if needed)
        /*
        let autoplayInterval = setInterval(nextSlide, 3000);
        
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 3000);
        });
        */
        
        // Keyboard navigation
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) nextSlide();
            if (touchEndX > touchStartX + 50) prevSlide();
        }
    });
});

// ===================================
// COLLABORATION FORM HANDLING
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const collaborationForm = document.getElementById('collaborationForm');
    const formMessage = document.getElementById('formMessage');
    
    if (collaborationForm) {
        collaborationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(collaborationForm);
            const submitBtn = collaborationForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span data-en="Sending..." data-uk="Надсилання...">Sending...</span>';
            
            try {
                const response = await fetch(collaborationForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('success');
                    collaborationForm.reset();
                } else {
                    showFormMessage('error');
                }
            } catch (error) {
                showFormMessage('error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});

function showFormMessage(type) {
    const formMessage = document.getElementById('formMessage');
    const messages = {
        success: {
            en: 'Thank you! Your message has been sent successfully. We will contact you soon.',
            uk: 'Дякуємо! Ваше повідомлення успішно надіслано. Ми зв\'яжемося з вами найближчим часом.'
        },
        error: {
            en: 'Sorry, something went wrong. Please try again or contact us directly at avelle.office@gmail.com',
            uk: 'Вибачте, щось пішло не так. Будь ласка, спробуйте ще раз або зв\'яжіться з нами напряму за адресою avelle.office@gmail.com'
        }
    };
    
    formMessage.className = 'form-message ' + type;
    formMessage.textContent = messages[type][currentLang];
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations go here
});

window.addEventListener('scroll', debouncedScroll);

