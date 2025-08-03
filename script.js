
        document.addEventListener('DOMContentLoaded', function() {
            // Form and feedback element selection
            const form = document.getElementById('registration-form');
            const feedbackDiv = document.getElementById('form-feedback');
            
            // Input field selection
            const usernameInput = document.getElementById('username');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            // Real-time validation functions
            function validateUsername(username) {
                return username.length >= 3;
            }

            function validateEmail(email) {
                // More comprehensive email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email) && email.includes('@') && email.includes('.');
            }

            function validatePassword(password) {
                return password.length >= 8;
            }

            // Visual feedback functions
            function setFieldState(input, isValid) {
                input.classList.remove('error', 'success');
                if (isValid) {
                    input.classList.add('success');
                } else {
                    input.classList.add('error');
                }
            }

            // Real-time validation event listeners
            usernameInput.addEventListener('input', function() {
                const username = this.value.trim();
                const isValid = validateUsername(username);
                setFieldState(this, isValid);
            });

            emailInput.addEventListener('input', function() {
                const email = this.value.trim();
                const isValid = validateEmail(email);
                setFieldState(this, isValid);
            });

            passwordInput.addEventListener('input', function() {
                const password = this.value.trim();
                const isValid = validatePassword(password);
                setFieldState(this, isValid);
            });

            // Form submission event listener
            form.addEventListener('submit', function(event) {
                // Prevent form from submitting to server
                event.preventDefault();

                // Retrieve and trim user inputs
                const username = document.getElementById('username').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value.trim();

                // Initialize validation variables
                let isValid = true;
                const messages = [];

                // Username validation
                if (username.length < 3) {
                    isValid = false;
                    messages.push('Username must be at least 3 characters long.');
                }

                // Email validation
                if (!email.includes('@') || !email.includes('.')) {
                    isValid = false;
                    messages.push('Please enter a valid email address.');
                }

                // Additional email format validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    isValid = false;
                    if (!messages.some(msg => msg.includes('email'))) {
                        messages.push('Please enter a valid email address format.');
                    }
                }

                // Password validation
                if (password.length < 8) {
                    isValid = false;
                    messages.push('Password must be at least 8 characters long.');
                }

                // Additional validations for better UX
                if (username === '') {
                    isValid = false;
                    messages.push('Username is required.');
                }

                if (email === '') {
                    isValid = false;
                    messages.push('Email is required.');
                }

                if (password === '') {
                    isValid = false;
                    messages.push('Password is required.');
                }

                // Display feedback
                feedbackDiv.style.display = "block";
                
                if (isValid) {
                    feedbackDiv.textContent = "Registration successful!";
                    feedbackDiv.className = "success-feedback";
                    feedbackDiv.style.color = "#28a745";
                    
                    // Reset form after successful validation
                    setTimeout(() => {
                        form.reset();
                        // Remove visual states
                        usernameInput.classList.remove('success', 'error');
                        emailInput.classList.remove('success', 'error');
                        passwordInput.classList.remove('success', 'error');
                        feedbackDiv.style.display = "none";
                    }, 3000);
                } else {
                    feedbackDiv.innerHTML = messages.join('<br>');
                    feedbackDiv.className = "error-feedback";
                    feedbackDiv.style.color = "#dc3545";
                }
            });

            // Clear feedback when user starts typing after an error
            [usernameInput, emailInput, passwordInput].forEach(input => {
                input.addEventListener('focus', function() {
                    if (feedbackDiv.classList.contains('error-feedback')) {
                        feedbackDiv.style.display = "none";
                    }
                });
            });
        });

