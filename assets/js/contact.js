// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  console.log('Contact Form Data:', data);
  
  // Show success message
  showSuccessMessage(data.name);
  
  // Reset form
  contactForm.reset();
});

function showSuccessMessage(name) {
  const message = document.createElement('div');
  message.className = 'success-message';
  message.innerHTML = `
    <div class="success-content">
      <div class="success-icon">
        <ion-icon name="checkmark-circle"></ion-icon>
      </div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you, ${name}! We've received your message and will get back to you within 24 hours.</p>
      <button class="btn btn-primary" onclick="this.closest('.success-message').remove()">
        <span>Close</span>
      </button>
    </div>
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => message.classList.add('active'), 10);
  
  setTimeout(() => {
    message.classList.remove('active');
    setTimeout(() => message.remove(), 300);
  }, 5000);
}

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all items
    faqItems.forEach(faq => faq.classList.remove('active'));
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Add styles for success message
const style = document.createElement('style');
style.textContent = `
  .success-message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .success-message.active {
    opacity: 1;
    visibility: visible;
  }
  
  .success-content {
    background: var(--white);
    padding: 5rem 4rem;
    border-radius: 20px;
    text-align: center;
    max-width: 500px;
    transform: scale(0.8);
    transition: transform 0.3s ease;
  }
  
  .success-message.active .success-content {
    transform: scale(1);
  }
  
  .success-content .success-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-1);
    border-radius: 50%;
    color: var(--white);
    font-size: 5rem;
  }
  
  .success-content h3 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: var(--black);
  }
  
  .success-content p {
    font-size: 1.6rem;
    color: var(--gray);
    margin-bottom: 3rem;
    line-height: 1.6;
  }
`;
document.head.appendChild(style);
