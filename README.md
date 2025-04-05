# Instagram Clone Login Page

This is a simple Instagram login page clone that captures user login data and saves it to a JSON file.

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

2. Clone this repository:

```
git clone https://github.com/yourusername/instagram-clone-login-page.git
cd instagram-clone-login-page
```

3. Install the dependencies:

```
npm install
```

## Usage

1. Start the server:

```
npm start
```

2. Open your browser and go to:

```
http://localhost:3000
```

3. Enter login credentials in the form and submit.

4. The login data will be saved to a JSON file in the `data` folder. Each login attempt will add a new entry to this file.

## Where the Data is Stored

When a user enters their login information and submits the form, the data is sent to the server and stored in:

```
data/login_data.json
```

This file contains a JSON array with all login attempts, including email/username, password, and timestamp.

## Technical Details

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Data Storage: JSON file

## Note

This project is for educational purposes only. It is not affiliated with Instagram or Facebook.
