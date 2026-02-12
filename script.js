// ============================================
// Preloader
// ============================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1800);
  });

  // Fallback: remove after 4 seconds regardless
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 4000);
}

// Run preloader immediately (before DOMContentLoaded)
initPreloader();

// ============================================
// Stars Background Generator
// ============================================
function createStars() {
  const starsContainer = document.getElementById('stars');
  const starCount = Math.min(window.innerWidth / 4, 200);
  
  // Clear existing stars
  starsContainer.innerHTML = '';
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * 2 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const opacity = Math.random() * 0.5 + 0.3;
    const duration = Math.random() * 3 + 2;
    
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--opacity', opacity);
    star.style.setProperty('--duration', `${duration}s`);
    
    starsContainer.appendChild(star);
  }
}

// ============================================
// Mobile Navigation Toggle
// ============================================
function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.about-card, .planet-card, .milestone-card, .fact-card, .section-header'
  );
  
  revealElements.forEach(el => el.classList.add('reveal'));
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;
      
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on load
}

// ============================================
// Active Navigation Link on Scroll
// ============================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const highlightNav = () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', highlightNav);
}

// ============================================
// Planet Card Hover Effect
// ============================================
function initPlanetCards() {
  const planetCards = document.querySelectorAll('.planet-card');
  
  planetCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const visual = card.querySelector('.planet-visual');
      visual.style.animationDuration = '5s';
    });
    
    card.addEventListener('mouseleave', () => {
      const visual = card.querySelector('.planet-visual');
      visual.style.animationDuration = '20s';
    });
  });
}

// ============================================
// Header Background on Scroll
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      header.style.background = 'rgba(10, 10, 15, 0.85)';
    }
  });
}

// ============================================
// Parallax Effect for Stars
// ============================================
function initParallaxStars() {
  const stars = document.getElementById('stars');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    stars.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
}

// ============================================
// Milestones Horizontal Scroll
// ============================================
function initMilestones() {
  const track = document.querySelector('.milestones-track');
  const scroll = document.getElementById('milestonesScroll');
  const cards = document.querySelectorAll('.milestone-card');
  const leftBtn = document.getElementById('scrollLeft');
  const rightBtn = document.getElementById('scrollRight');
  const dotsContainer = document.getElementById('milestoneDots');

  if (!track || !scroll || cards.length === 0) return;

  // Create nav dots
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  // Update active dot based on scroll position
  function updateDots() {
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let closestIndex = 0;
    let closestDist = Infinity;

    cards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
  }

  track.addEventListener('scroll', updateDots);

  // Arrow buttons
  const scrollAmount = 300;
  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  createStars();
  initMobileNav();
  initSmoothScroll();
  initScrollReveal();
  initActiveNavLink();
  initPlanetCards();
  initHeaderScroll();
  initParallaxStars();
  initMilestones();
});

// Regenerate stars on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(createStars, 200);
});
