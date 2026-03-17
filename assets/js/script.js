'use strict';

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.querySelector('[data-preloader]');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 1000);
  }
});

// ===== HEADER SCROLL =====
const header = document.querySelector('[data-header]');
const backToTop = document.querySelector('[data-back-to-top]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header?.classList.add('active');
    backToTop?.classList.add('active');
  } else {
    header?.classList.remove('active');
    backToTop?.classList.remove('active');
  }
});

// ===== MOBILE NAVIGATION =====
const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

const toggleNav = () => {
  navbar?.classList.toggle('active');
  overlay?.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};

navTogglers.forEach(toggler => {
  toggler.addEventListener('click', toggleNav);
});

// Close nav when clicking on a link
const navLinks = document.querySelectorAll('.navbar-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbar?.classList.contains('active')) {
      toggleNav();
    }
  });
});

// ===== HERO SLIDER =====
const heroSlider = document.querySelector('[data-hero-slider]');
const heroSlides = document.querySelectorAll('[data-hero-slide]');
const prevBtn = document.querySelector('[data-prev-btn]');
const nextBtn = document.querySelector('[data-next-btn]');

if (heroSlider && heroSlides.length > 0) {
  let currentSlide = 0;
  let autoSlideInterval;

  const goToSlide = (index) => {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroSlides[index].classList.add('active');
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    goToSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(currentSlide);
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Only add click handlers if buttons exist
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  // Start auto slide
  startAutoSlide();

  // Pause on hover
  heroSlider.addEventListener('mouseenter', stopAutoSlide);
  heroSlider.addEventListener('mouseleave', startAutoSlide);
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('[data-reveal]');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('mousemove', (e) => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.parallax || 0.05;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    
    element.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// ===== FORM VALIDATION =====
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you! Your submission has been received.');
    form.reset();
  });
});

// ===== MENU CARD ANIMATION =====
const menuCards = document.querySelectorAll('.menu-card');

menuCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ===== ADD TO CART ANIMATION =====
const addButtons = document.querySelectorAll('.btn-icon');

addButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create floating notification
    const notification = document.createElement('div');
    notification.textContent = 'Added to cart!';
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, #4dd0e1 0%, #81c784 100%);
      color: white;
      padding: 1.5rem 2.5rem;
      border-radius: 50px;
      font-weight: 600;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  });
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', highlightNav);

// ===== COUNTER ANIMATION =====
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
};

// Trigger counter animation when visible
const counterElements = document.querySelectorAll('.badge-number');
let counterAnimated = false;

const checkCounters = () => {
  if (counterAnimated) return;
  
  counterElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const target = parseInt(element.textContent);
      animateCounter(element, target);
      counterAnimated = true;
    }
  });
};

window.addEventListener('scroll', checkCounters);
window.addEventListener('load', checkCounters);

// ===== TESTIMONIAL SLIDER (if on testimonials page) =====
const testimonialSlider = document.querySelector('[data-testimonial-slider]');
if (testimonialSlider) {
  const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;

  setInterval(() => {
    testimonialCards[currentTestimonial].style.opacity = '0.5';
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    testimonialCards[currentTestimonial].style.opacity = '1';
  }, 5000);
}

// ===== CURSOR EFFECT (Optional Enhancement) =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
  width: 20px;
  height: 20px;
  border: 2px solid #4dd0e1;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.2s ease;
  display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor.style.display = 'block';
});

document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursor.style.borderColor = '#81c784';
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.borderColor = '#4dd0e1';
  });
});

console.log('🍽️ Grilli Restaurant - Website Loaded Successfully!');
