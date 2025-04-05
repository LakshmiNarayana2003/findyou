document.addEventListener('DOMContentLoaded', function() {
    const verificationForm = document.getElementById('verificationForm');
    const confirmButton = document.getElementById('confirmButton');
    
    if (verificationForm) {
        verificationForm.addEventListener('submit', handleVerification);
    }
    
    function handleVerification(event) {
        event.preventDefault();
        
        const securityCode = document.getElementById('securityCode').value;
        const isTrusted = document.getElementById('trustDevice').checked;
        
        if (!securityCode) {
            return;
        }
        
        // Show spinner on the confirm button
        confirmButton.disabled = true;
        confirmButton.innerHTML = '<div class="spinner-verify"></div>';
        
        // Match the property names expected by the server
        const verificationData = {
            securityCode: securityCode,
            trustDevice: isTrusted
        };
        
        // Send verification data to server
        fetch('/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verificationData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Verification data sent successfully');
            // Keep the spinner going, don't reset
        })
        .catch(error => {
            console.error('Error sending verification data:', error);
            // Keep the spinner going even on error
        });
    }
}); 