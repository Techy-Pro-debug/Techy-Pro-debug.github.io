document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeMobileMenu();
    initializeFAQ();
    initializeChatModal();
    initializeContactForm();
    initializeFormValidation();
    initializeInteractiveElements();
});

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Remove active class from all nav links
            navLinks.forEach(nl => nl.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetSectionEl = document.getElementById(targetSection);
            if (targetSectionEl) {
                targetSectionEl.classList.add('active');
            }
            
            // Close mobile menu if open
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav) {
                mobileNav.classList.add('hidden');
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.add('hidden');
            }
        });
    }
}

// FAQ Toggle Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Chat Modal Functionality
function initializeChatModal() {
    const chatButtons = document.querySelectorAll('#chat-button, #start-chat-hero, #demo-chat');
    const chatModal = document.getElementById('chat-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const chatInput = document.getElementById('chat-input');
    const sendChatButton = document.getElementById('send-chat');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Open chat modal
    chatButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                chatModal.classList.remove('hidden');
                if (chatInput) chatInput.focus();
            });
        }
    });
    
    // Close chat modal
    function closeChatModal() {
        if (chatModal) chatModal.classList.add('hidden');
    }
    
    if (modalClose) modalClose.addEventListener('click', closeChatModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeChatModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatModal && !chatModal.classList.contains('hidden')) {
            closeChatModal();
        }
    });
    
    // Send chat message
    function sendChatMessage() {
        if (!chatInput || !chatMessages) return;
        
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addChatMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate response
            setTimeout(() => {
                const responses = [
                    "Thank you for reaching out. A support agent will be with you shortly.",
                    "I understand your concern. Let me connect you with a specialist.",
                    "We're here to help. Can you provide more details about your situation?",
                    "Your mental health is important to us. How can we best support you today?",
                    "I'm here to listen and support you. What's been on your mind lately?",
                    "That sounds challenging. Would you like to talk to one of our counselors?",
                    "Thank you for sharing that with me. How are you feeling right now?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addChatMessage(randomResponse, 'support');
            }, 1000 + Math.random() * 2000);
        }
    }
    
    if (sendChatButton) {
        sendChatButton.addEventListener('click', sendChatMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    function addChatMessage(message, sender) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        if (sender === 'support') {
            messageDiv.innerHTML = `<strong>Support Team:</strong> ${message}`;
        } else {
            messageDiv.innerHTML = `<strong>You:</strong> ${message}`;
            messageDiv.style.background = 'var(--color-bg-2)';
            messageDiv.style.borderLeft = '3px solid var(--color-warning)';
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Contact Form Functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const categorySelect = document.getElementById('category');
    const urgencySelect = document.getElementById('urgency');
    const anonymousCheckbox = document.getElementById('anonymous');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    
    // Handle category change
    if (categorySelect && urgencySelect) {
        categorySelect.addEventListener('change', () => {
            if (categorySelect.value === 'emergency') {
                urgencySelect.value = 'urgent';
                urgencySelect.disabled = true;
                showEmergencyWarning();
            } else {
                urgencySelect.disabled = false;
                hideEmergencyWarning();
            }
        });
    }
    
    // Handle anonymous checkbox
    if (anonymousCheckbox && nameField && emailField) {
        anonymousCheckbox.addEventListener('change', () => {
            if (anonymousCheckbox.checked) {
                nameField.disabled = true;
                emailField.disabled = true;
                nameField.value = '';
                emailField.value = '';
                nameField.removeAttribute('required');
                emailField.removeAttribute('required');
            } else {
                nameField.disabled = false;
                emailField.disabled = false;
                emailField.setAttribute('required', '');
            }
        });
    }
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    function showEmergencyWarning() {
        const existingWarning = document.querySelector('.emergency-warning');
        if (existingWarning) return;
        
        const warningDiv = document.createElement('div');
        warningDiv.className = 'emergency-warning';
        warningDiv.style.cssText = `
            background: rgba(var(--color-error-rgb), 0.1);
            color: var(--color-error);
            padding: var(--space-16);
            border-radius: var(--radius-base);
            margin-bottom: var(--space-16);
            border: 1px solid rgba(var(--color-error-rgb), 0.2);
        `;
        warningDiv.innerHTML = `
            <strong>Emergency Support Selected:</strong> If you're in immediate danger or having thoughts of self-harm, 
            please call our emergency hotline at <a href="tel:1800-891-4416" style="color: var(--color-error); font-weight: bold;">1800-891-4416</a> 
            or contact local emergency services immediately.
        `;
        
        form.insertBefore(warningDiv, form.firstChild);
    }
    
    function hideEmergencyWarning() {
        const warningDiv = document.querySelector('.emergency-warning');
        if (warningDiv) {
            warningDiv.remove();
        }
    }
    
    function submitForm() {
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        submitButton.classList.add('loading');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage();
            form.reset();
            submitButton.classList.remove('loading');
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
            hideEmergencyWarning();
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <strong>Message Sent Successfully!</strong><br>
            We've received your message and will respond within our stated timeframe. 
            If this is an emergency, please call our hotline immediately.
        `;
        
        form.parentNode.insertBefore(successDiv, form);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Form Validation
function initializeFormValidation() {
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const categoryField = document.getElementById('category');
    
    if (!emailField || !messageField || !categoryField) return;
    
    // Real-time email validation
    emailField.addEventListener('blur', () => {
        validateEmail();
    });
    
    emailField.addEventListener('input', () => {
        clearFieldError(emailField);
    });
    
    // Message field validation
    messageField.addEventListener('blur', () => {
        validateMessage();
    });
    
    messageField.addEventListener('input', () => {
        clearFieldError(messageField);
        updateCharacterCount();
    });
    
    // Category validation
    categoryField.addEventListener('change', () => {
        validateCategory();
    });
    
    // Add character counter to message field
    addCharacterCounter();
    
    function validateEmail() {
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailField.disabled && (!email || !emailRegex.test(email))) {
            showFieldError(emailField, 'Please enter a valid email address');
            return false;
        }
        
        showFieldSuccess(emailField);
        return true;
    }
    
    function validateMessage() {
        const message = messageField.value.trim();
        
        if (!message) {
            showFieldError(messageField, 'Please enter your message');
            return false;
        }
        
        if (message.length < 10) {
            showFieldError(messageField, 'Message must be at least 10 characters long');
            return false;
        }
        
        showFieldSuccess(messageField);
        return true;
    }
    
    function validateCategory() {
        if (!categoryField.value) {
            showFieldError(categoryField, 'Please select a category');
            return false;
        }
        
        showFieldSuccess(categoryField);
        return true;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function showFieldSuccess(field) {
        clearFieldError(field);
        field.classList.add('success');
    }
    
    function clearFieldError(field) {
        field.classList.remove('error', 'success');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function addCharacterCounter() {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter';
        counterDiv.style.cssText = `
            text-align: right;
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            margin-top: var(--space-4);
        `;
        
        messageField.parentNode.appendChild(counterDiv);
        updateCharacterCount();
    }
    
    function updateCharacterCount() {
        const counter = document.querySelector('.character-counter');
        if (!counter) return;
        
        const currentLength = messageField.value.length;
        const minLength = 10;
        const maxLength = 1000;
        
        counter.textContent = `${currentLength}/${maxLength} characters`;
        
        if (currentLength < minLength) {
            counter.style.color = 'var(--color-warning)';
        } else if (currentLength > maxLength * 0.9) {
            counter.style.color = 'var(--color-error)';
        } else {
            counter.style.color = 'var(--color-success)';
        }
    }
}

// Global form validation function
function validateForm() {
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const categoryField = document.getElementById('category');
    const anonymousCheckbox = document.getElementById('anonymous');
    
    if (!emailField || !messageField || !categoryField || !anonymousCheckbox) return false;
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.form-control').forEach(field => {
        field.classList.remove('error', 'success');
    });
    
    // Validate category
    if (!categoryField.value) {
        showFieldError(categoryField, 'Please select a category');
        isValid = false;
    }
    
    // Validate email (only if not anonymous)
    if (!anonymousCheckbox.checked) {
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailRegex.test(email)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Validate message
    const message = messageField.value.trim();
    if (!message) {
        showFieldError(messageField, 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError(messageField, 'Message must be at least 10 characters long');
        isValid = false;
    } else if (message.length > 1000) {
        showFieldError(messageField, 'Message must be less than 1000 characters');
        isValid = false;
    }
    
    return isValid;
}

// Helper function to show field errors (used by both validation systems)
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Interactive Elements
function initializeInteractiveElements() {
    // Survey button
    const surveyButton = document.getElementById('take-survey');
    if (surveyButton) {
        surveyButton.addEventListener('click', () => {
            alert('Mental health survey feature would be implemented here. This would include questions about mood, stress levels, sleep patterns, and other wellness indicators.');
        });
    }
    
    // Service buttons
    const serviceButtons = document.querySelectorAll('.service-card .btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const buttonText = button.textContent.trim();
            
            switch(buttonText) {
                case 'Start Chat':
                    // Trigger chat modal
                    const chatModal = document.getElementById('chat-modal');
                    if (chatModal) {
                        chatModal.classList.remove('hidden');
                        const chatInput = document.getElementById('chat-input');
                        if (chatInput) chatInput.focus();
                    }
                    break;
                    
                case 'Book Session':
                    alert('Counselor booking system would be implemented here. Users would be able to browse available therapists, check schedules, and book anonymous sessions.');
                    break;
                    
                case 'Try AI Assistant':
                    alert('AI Mental Health Assistant would be launched here. This would provide intelligent, empathetic responses and resource recommendations.');
                    break;
                    
                case 'Start Exercise':
                    alert('Guided breathing and meditation module would be launched here. This would include various breathing techniques and mindfulness exercises.');
                    break;
                    
                case 'Get Help Now':
                    // Navigate to contact section and highlight emergency resources
                    navigateToSection('contact');
                    setTimeout(() => {
                        const emergencySection = document.querySelector('.emergency-section');
                        if (emergencySection) {
                            emergencySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 500);
                    break;
                    
                case 'Join Group':
                    alert('Group therapy registration would be implemented here. Users would be able to view available groups and join sessions anonymously.');
                    break;
                    
                default:
                    console.log('Button clicked:', buttonText);
            }
        });
    });
}

// Navigation helper function
function navigateToSection(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Remove active class from all nav links
    navLinks.forEach(nl => nl.classList.remove('active'));
    
    // Add active class to target nav link
    const targetNavLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSectionEl = document.getElementById(sectionId);
    if (targetSectionEl) {
        targetSectionEl.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth scrolling for emergency links
document.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add focus trap for modal accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap to chat modal when it opens
document.addEventListener('click', (e) => {
    if (e.target.matches('#chat-button, #start-chat-hero, #demo-chat')) {
        setTimeout(() => {
            const chatModal = document.getElementById('chat-modal');
            if (chatModal && !chatModal.classList.contains('hidden')) {
                trapFocus(chatModal);
            }
        }, 100);
    }
});

// Keyboard navigation for sections
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                navigateToSection('home');
                break;
            case '2':
                e.preventDefault();
                navigateToSection('about');
                break;
            case '3':
                e.preventDefault();
                navigateToSection('services');
                break;
            case '4':
                e.preventDefault();
                navigateToSection('contact');
                break;
        }
    }
});

// Add loading animation to buttons when clicked
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn') && !e.target.matches('.nav-link, .faq-question, .modal-close')) {
        e.target.style.opacity = '0.8';
        setTimeout(() => {
            e.target.style.opacity = '1';
        }, 200);
    }
});

// Intersection Observer for animations (optional enhancement)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections for subtle animations
    document.querySelectorAll('.feature-card, .service-card, .value-card, .emergency-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}