/* ================================================
   STUDIO GLAMOUR - Landing Page Scripts
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- Mobile Menu Toggle ----
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  menuOverlay.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = navMenu.querySelectorAll('a[href^="#"]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ---- Counter Animation ----
  function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat .number[data-count]');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;
      
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target.toLocaleString('pt-BR') + '+';
          counter.dataset.animated = 'true';
        } else {
          counter.textContent = Math.floor(current).toLocaleString('pt-BR');
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });
  }

  // ---- Scroll Reveal Animation ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger counter animation when hero stats become visible
        if (entry.target.classList.contains('hero-stat')) {
          animateCounters();
        }
        
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Testimonials Slider ----
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  
  let currentSlide = 0;
  let cardsPerView = 3;

  function updateCardsPerView() {
    if (window.innerWidth <= 768) {
      cardsPerView = 1;
    } else if (window.innerWidth <= 1024) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
  }

  function getMaxSlide() {
    const totalCards = track.children.length;
    return Math.max(0, totalCards - cardsPerView);
  }

  function updateSlider() {
    const cardWidth = track.children[0].offsetWidth + 20; // card width + margin
    track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentSlide < getMaxSlide()) {
      currentSlide++;
      updateSlider();
    } else {
      currentSlide = 0;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    } else {
      currentSlide = getMaxSlide();
      updateSlider();
    }
  });

  // Auto-slide every 5 seconds
  let autoSlide = setInterval(() => {
    if (currentSlide < getMaxSlide()) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateSlider();
  }, 5000);

  // Pause auto-slide on hover
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      if (currentSlide < getMaxSlide()) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateSlider();
    }, 5000);
  });

  window.addEventListener('resize', () => {
    updateCardsPerView();
    currentSlide = Math.min(currentSlide, getMaxSlide());
    updateSlider();
  });

  updateCardsPerView();

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Build WhatsApp message
    let whatsappMsg = `Olá! Meu nome é ${name}.%0A`;
    whatsappMsg += `Telefone: ${phone}%0A`;
    whatsappMsg += `E-mail: ${email}%0A`;
    if (service) {
      const serviceNames = {
        'manicure': 'Manicure',
        'esmaltacao': 'Esmaltação',
        'fibra-vidro': 'Fibra de Vidro',
        'banho-gel': 'Banho de Gel',
        'limpeza-pele': 'Limpeza de Pele',
        'podologia': 'Podologia'
      };
      whatsappMsg += `Serviço de interesse: ${serviceNames[service] || service}%0A`;
    }
    if (message) {
      whatsappMsg += `Mensagem: ${message}`;
    }

    window.open(`https://wa.me/5511999999999?text=${whatsappMsg}`, '_blank');
    
    // Show success feedback
    const btn = contactForm.querySelector('.btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      Mensagem Enviada!
    `;
    btn.style.background = '#25D366';
    
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });

  // ---- Phone Mask ----
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
      value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0,2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    
    e.target.value = value;
  });

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
