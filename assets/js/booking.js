// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// Form submission
const bookingForm = document.getElementById('bookingForm');

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(bookingForm);
  const data = Object.fromEntries(formData);
  
  console.log('Booking Data:', data);
  
  // Show success modal
  showSuccessModal(data);
  
  // Reset form
  bookingForm.reset();
});

function showSuccessModal(data) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'success-modal';
  modal.innerHTML = `
    <div class="success-content">
      <div class="success-icon">
        <ion-icon name="checkmark-circle"></ion-icon>
      </div>
      <h2>Reservation Confirmed!</h2>
      <p>Thank you, ${data.name}! Your table for ${data.guests} ${parseInt(data.guests) === 1 ? 'person' : 'people'} has been reserved for ${formatDate(data.date)} at ${formatTime(data.time)}.</p>
      <p>A confirmation email has been sent to ${data.email}</p>
      <button class="btn btn-primary" onclick="this.closest('.success-modal').remove()">
        <span>Close</span>
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Show modal with animation
  setTimeout(() => modal.classList.add('active'), 10);
  
  // Auto close after 8 seconds
  setTimeout(() => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }, 8000);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

// Add floating labels effect
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });
  
  // Check if input has value on load
  if (input.value) {
    input.parentElement.classList.add('focused');
  }
});

// Add input validation feedback
formInputs.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.required && !this.value) {
      this.style.borderColor = '#ff6b6b';
    } else if (this.value) {
      this.style.borderColor = var(--primary-green);
    }
  });
  
  input.addEventListener('input', function() {
    if (this.style.borderColor === 'rgb(255, 107, 107)') {
      this.style.borderColor = var(--light-blue);
    }
  });
});
