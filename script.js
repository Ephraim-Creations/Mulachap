document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.close-btn');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (mobileNavOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when close button is clicked
    closeBtn.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on overlay (outside the menu)
    mobileNavOverlay.addEventListener('click', function(e) {
        if (e.target === mobileNavOverlay) {
            hamburger.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when a nav link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        }
        
        if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
});


// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
        
        // Close other open FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
    });
});

//Contact Form script for the dates 
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('appointmentDate');
    const timeInput = document.getElementById('appointmentTime');
    const dateError = document.getElementById('dateError');
    const timeError = document.getElementById('timeError');
    const form = document.getElementById('validatedBookingForm');

    // Set minimum date to today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const minDate = yyyy + '-' + mm + '-' + dd;
    
    dateInput.min = minDate;
    dateInput.value = minDate; // Default to today

    // Validate date selection
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Compare dates only
        
        if (selectedDate < today) {
            dateError.textContent = "Please select a future date";
            this.setCustomValidity("Invalid date");
        } else if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
            dateError.textContent = "Weekend dates not available";
            this.setCustomValidity("Weekend date");
        } else {
            dateError.textContent = "";
            this.setCustomValidity("");
        }
    });

    // Validate time selection
    timeInput.addEventListener('change', function() {
        const selectedTime = this.value;
        const [hours, minutes] = selectedTime.split(':').map(Number);
        
        if (hours < 9 || hours >= 17) {
            timeError.textContent = "Please select time during business hours";
            this.setCustomValidity("Invalid time");
        } else {
            timeError.textContent = "";
            this.setCustomValidity("");
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        if (!dateInput.validity.valid || !timeInput.validity.valid) {
            e.preventDefault();
            // You could add more prominent error display here
        }
    });
});

//Sucess message
document.getElementById("validatedBookingForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Stop default redirect behavior
  
    const form = this;
    const formData = new FormData(form);
    const successMsg = document.getElementById("successMessage");
  
    // Manually post to FormSubmit
    fetch("https://formsubmit.co/mulachapventures@gmail.com", {
      method: "POST",
      body: formData
    }).then(response => {
      if (response.ok) {
        successMsg.style.display = "block";
        successMsg.textContent = "Thank you for your consultation request. We'll contact you shortly to confirm your appointment.";
        form.reset();
  
        // Optional: redirect after delay
        setTimeout(() => {
          window.location.href = "index.html"; // or your thank-you page
        }, 5000);
      } else {
        successMsg.style.display = "block";
        successMsg.style.color = "red";
        successMsg.textContent = "Oops! Something went wrong. Please try again.";
      }
    }).catch(error => {
      console.error("Submission error:", error);
    });
  });
  
  
