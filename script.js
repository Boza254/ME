// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => nav.classList.add('open'));
closeBtn?.addEventListener('click', () => nav.classList.remove('open'));

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && e.target !== menuBtn) {
    nav.classList.remove('open');
  }
});

// Scrollspy: highlight current section link
const links = Array.from(document.querySelectorAll('.nav-link'));
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const activate = (id) => {
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activate(entry.target.id);
    }
  });
}, { 
  rootMargin: '-20% 0px -70% 0px', 
  threshold: 0 
});

sections.forEach(sec => observer.observe(sec));

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      nav.classList.remove('open');
      
      // Scroll to section
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    nav.classList.remove('open');
  }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = 1;
    });
    
    // Set initial opacity for fade-in effect
    img.style.opacity = 0;
    img.style.transition = 'opacity 0.3s ease-in-out';
  });
});

// Form submission handling
const contactForm = document.querySelector('.form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Certificate viewing functionality
function initCertificates() {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'cert-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modal-title">Certificate</h3>
        <button class="close-modal" aria-label="Close modal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="certificate-image" id="certificate-content">
        <div class="certificate-placeholder">
          <i class="fas fa-certificate"></i>
          <p>Certificate preview would appear here</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Add event listeners to all view certificate buttons
  const viewButtons = document.querySelectorAll('.view-cert');
  const closeModal = document.querySelector('.close-modal');
  const certModal = document.querySelector('.cert-modal');
  
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const certType = this.getAttribute('data-cert');
      showCertificate(certType);
    });
  });
  
  closeModal.addEventListener('click', () => {
    certModal.classList.remove('active');
  });
  
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      certModal.classList.remove('active');
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
      certModal.classList.remove('active');
    }
  });
}

function showCertificate(certType) {
  const modal = document.querySelector('.cert-modal');
  const modalTitle = document.getElementById('modal-title');
  const certContent = document.getElementById('certificate-content');
  
  // Set certificate content based on type
  let title = '';
  let imagePath = '';
  let downloadName = '';
  
  switch(certType) {
    case 'frontend-certificate':
      title = 'Front-End Development Certificate';
      imagePath = 'certificates/frontend-certificate.jpg';
      downloadName = 'Front-End-Development-Certificate';
      break;
    case 'java-certificate':
      title = 'C/C++ & Java Foundations Certificate';
      imagePath = 'certificates/java-certificate.jpg';
      downloadName = 'Java-Foundations-Certificate';
      break;
    case 'ai-certificate':
      title = 'Introduction to Modern AI';
      imagePath = 'certificates/ai-certificate.jpg';
      downloadName = 'AI-Certificate';
      break;
    case 'css-certificate':
      title = 'CSS Essentials';
      imagePath = 'certificates/css-certificate.jpg';
      downloadName = 'CSS-Certificate';
      break;
    case 'html-certificate':
      title = 'HTML Essentials';
      imagePath = 'certificates/html-certificate.jpg';
      downloadName = 'HTML-Certificate';
      break;
    case 'network-certificate':
      title = 'Network Technician Career Path';
      imagePath = 'certificates/network-certificate.jpg';
      downloadName = 'Network-Certificate';
      break;
    default:
      title = 'Certificate';
      imagePath = '';
  }
  
  modalTitle.textContent = title;
  
  // Show loading state
  certContent.innerHTML = `
    <div class="certificate-loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading certificate...</p>
    </div>
  `;
  
  modal.classList.add('active');
  
  if (imagePath) {
    const img = new Image();
    img.onload = function() {
      certContent.innerHTML = `
        <img src="${imagePath}" alt="${title}" class="loaded">
        <div class="certificate-actions">
          <a href="${imagePath}" download="${downloadName}.jpg" class="btn btn-primary">
            <i class="fas fa-download"></i> Download Certificate
          </a>
        </div>
      `;
    };
    img.onerror = function() {
      certContent.innerHTML = `
        <div class="certificate-placeholder">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Certificate Not Found</h3>
          <p>The certificate image could not be loaded.</p>
          <p>Please check the file path: ${imagePath}</p>
        </div>
      `;
    };
    img.src = imagePath;
  } else {
    certContent.innerHTML = '<p>Certificate not available.</p>';
  }
}

// Initialize certificates when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initCertificates();
});