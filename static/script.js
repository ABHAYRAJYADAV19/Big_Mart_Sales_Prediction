// ===== Big-mart Sales Prediction - Interactive JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('predictionForm');
  const submitBtn = document.getElementById('submitBtn');
  const resultCard = document.querySelector('.result-card');
  const inputs = document.querySelectorAll('input, select');
  
  // Add smooth scroll on page load
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Form validation
  function validateForm() {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value || field.value === '') {
        isValid = false;
        field.style.borderColor = '#f5576c';
        
        // Reset border color after animation
        setTimeout(() => {
          field.style.borderColor = '';
        }, 2000);
      }
    });
    
    return isValid;
  }
  
  // Add floating label effect
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.querySelector('label').style.color = '#667eea';
      this.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.querySelector('label').style.color = '';
      this.style.transform = '';
    });
    
    // Add change animation
    input.addEventListener('change', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = '';
      }, 10);
    });
  });
  
  // Handle form submission
  if (form) {
    form.addEventListener('submit', function(e) {
      // Validate before submission
      if (!validateForm()) {
        e.preventDefault();
        showNotification('Please fill in all required fields', 'error');
        return;
      }
      
      // Add loading state
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Predicting...';
      
      // Show loading in result card
      if (resultCard) {
        resultCard.innerHTML = '<div class="spinner show"></div>';
      }
    });
  }
  
  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'error' ? '#f5576c' : '#4facfe'};
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      animation: slideDown 0.3s ease-out;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Add result animation if prediction text exists
  const resultText = document.querySelector('.result-text');
  if (resultText && resultText.textContent.trim() !== '') {
    resultCard.classList.add('show');
    
    // Add confetti effect for successful prediction
    if (!resultText.classList.contains('empty')) {
      createConfetti();
    }
  }
  
  // Confetti animation for successful prediction
  function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random()};
        transform: rotate(${Math.random() * 360}deg);
        animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
        pointer-events: none;
        z-index: 999;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      `;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }
  }
  
  // Add CSS for confetti animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      to {
        top: 100vh;
        transform: translateY(0) rotate(${Math.random() * 720}deg);
      }
    }
    
    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add smooth scroll to result after form submission
  if (resultText && resultText.textContent.trim() !== '') {
    setTimeout(() => {
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
  
  // Add keyboard navigation enhancement
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      const formElements = Array.from(form.elements);
      const currentIndex = formElements.indexOf(e.target);
      
      if (currentIndex > -1 && currentIndex < formElements.length - 1) {
        e.preventDefault();
        formElements[currentIndex + 1].focus();
      }
    }
  });
  
  // Add input number validation
  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.value < 0) {
        this.value = 0;
      }
    });
  });
  
  // Add hover effect for form groups
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    group.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    group.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
});
