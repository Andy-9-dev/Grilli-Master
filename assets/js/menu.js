// Menu filtering functionality
const categoryTabs = document.querySelectorAll('.category-tab');
const menuCards = document.querySelectorAll('.menu-card[data-category]');

categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    categoryTabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');
    
    const category = tab.dataset.category;
    
    // Filter menu cards
    menuCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Add styles for page hero
const style = document.createElement('style');
style.textContent = `
  .page-hero {
    padding: 8rem 0 6rem;
    background: linear-gradient(135deg, var(--light-blue) 0%, var(--light-green) 100%);
    text-align: center;
  }
  
  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 1.5rem;
  }
  
  .page-subtitle {
    font-size: 1.8rem;
    color: var(--gray);
  }
  
  .menu-categories {
    padding: 6rem 0;
  }
  
  .category-tabs {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 5rem;
    flex-wrap: wrap;
  }
  
  .category-tab {
    padding: 1.2rem 3rem;
    font-size: 1.6rem;
    font-weight: 600;
    background: var(--white);
    color: var(--black);
    border: 2px solid var(--light-blue);
    border-radius: 50px;
    transition: var(--transition);
    cursor: pointer;
  }
  
  .category-tab:hover,
  .category-tab.active {
    background: var(--gradient-1);
    color: var(--white);
    border-color: transparent;
    transform: translateY(-3px);
    box-shadow: var(--shadow);
  }
  
  .menu-full-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 3rem;
  }
  
  .menu-card {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .page-title {
      font-size: 3.5rem;
    }
    
    .menu-full-grid {
      grid-template-columns: 1fr;
    }
    
    .category-tabs {
      gap: 1rem;
    }
    
    .category-tab {
      padding: 1rem 2rem;
      font-size: 1.4rem;
    }
  }
`;
document.head.appendChild(style);
