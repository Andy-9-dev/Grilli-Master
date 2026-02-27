// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active to clicked button
    button.classList.add('active');
    
    const filter = button.dataset.filter;
    
    // Filter gallery items
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Lightbox functionality
galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const imgSrc = this.querySelector('img').src;
    const title = this.querySelector('h3').textContent;
    const description = this.querySelector('p').textContent;
    
    createLightbox(imgSrc, title, description);
  });
});

function createLightbox(imgSrc, title, description) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">
        <ion-icon name="close-outline"></ion-icon>
      </button>
      <img src="${imgSrc}" alt="${title}">
      <div class="lightbox-info">
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => lightbox.classList.add('active'), 10);
  
  // Close lightbox
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    closeLightbox(lightbox);
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox(lightbox);
    }
  });
}

function closeLightbox(lightbox) {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => lightbox.remove(), 300);
}

// Add lightbox styles
const style = document.createElement('style');
style.textContent = `
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 2rem;
  }
  
  .lightbox.active {
    opacity: 1;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 1000px;
    width: 100%;
    animation: zoomIn 0.3s ease;
  }
  
  .lightbox-content img {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  
  .lightbox-close {
    position: absolute;
    top: -50px;
    right: 0;
    width: 50px;
    height: 50px;
    background: var(--gradient-1);
    border: none;
    border-radius: 50%;
    color: var(--white);
    font-size: 3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
  }
  
  .lightbox-close:hover {
    transform: rotate(90deg);
  }
  
  .lightbox-info {
    text-align: center;
    color: var(--white);
    margin-top: 2rem;
  }
  
  .lightbox-info h3 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .lightbox-info p {
    font-size: 1.6rem;
    opacity: 0.8;
  }
  
  @keyframes zoomIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    .lightbox-close {
      top: -40px;
      width: 40px;
      height: 40px;
      font-size: 2.5rem;
    }
  }
`;
document.head.appendChild(style);
