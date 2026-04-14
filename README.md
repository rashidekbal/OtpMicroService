# OTP Microservice Server

This is a lightweight and secure Node.js internal microservice that handles One-Time Password (OTP) generation, email delivery, storage, and verification.

Designed to be used alongside client SDKs (like `otpMicroServiceSdk`), it acts as a centralized authentication layer providing generic OTP capabilities to any downstream application.

## Features

- **OTP Generation & Mailing:** Safely generates 6-digit OTPs and dispatches them via SMTP using HTML templates.
- **Secure Storage:** Uses `bcrypt` to hash OTPs before storing them in MongoDB so true pins are never exposed internally.
- **Short-Lived Verification:** Automatically enforces a 5-minute validity window for all generated codes.
- **API Key Guard:** All endpoints are protected by an `apiKey` query parameter to prevent unauthorized programmatic access.
- **Smart Cleanup:** On successful verification or regeneration, previous codes tied to that email are proactively deleted.

## Tech Stack

- **Framework:** Express.js + TypeScript
- **Database:** MongoDB (via Mongoose)
- **Security:** bcrypt
- **Communication:** Nodemailer

## Getting Started

### Prerequisites
- Node.js
- A running MongoDB instance (local or remote)
- An SMTP account (like a Gmail account via "App Passwords")

### Installation

1. Copy the codebase and navigate to the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root folder using the following variables:
```env
PORT=8000
API_KEY="your-secure-internal-api-key"
EMAIL="your-mailer@gmail.com"
EMAIL_PASS="your-app-password"
MONGO_URI="mongodb://127.0.0.1:27017/otp_service"
```

### Running the Server

**Development Mode** (with `nodemon` and `ts-node`):
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

---

## API Documentation

All endpoints **require** your configured internal API key. It must be provided as a query parameter (`apiKey`). If it is rejected or missing, you will receive a HTTP 403 response.

```http
?apiKey=your-secure-internal-api-key
```

### 1. Send OTP
Generates a one-time code, saves its secure hash to the database, and emails the code to the target user. Any existing unused OTPs tied to that email address are immediately invalidated.

- **URL:** `/api/v1/otp/sendOtp?apiKey=<YOUR_API_KEY>`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "company": "My Awesome App"
  }
  ```

#### Example Usage
```javascript
const response = await fetch("http://localhost:8000/api/v1/otp/sendOtp?apiKey=your-secure-internal-api-key", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "john.doe@example.com",
    company: "Acme Corp"
  })
});

const data = await response.json();
console.log(data); // { statusCode: 200, message: "success", success: true }
```

### 2. Verify OTP
Cross-checks the user-provided code against the active hashed OTP retrieved from the database. It will immediately fail if 5 minutes have elapsed since the user requested the OTP.

- **URL:** `/api/v1/otp/verify?apiKey=<YOUR_API_KEY>`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "otp": 123456
  }
  ```

#### Example Usage
```javascript
const response = await fetch("http://localhost:8000/api/v1/otp/verify?apiKey=your-secure-internal-api-key", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "john.doe@example.com",
    otp: 123456
  })
});

const data = await response.json();

if (data.statusCode === 200) {
  console.log("OTP was correct!"); // { statusCode: 200, message: true, success: true }
} else {
  console.log("OTP is invalid or expired."); // { statusCode: 401, message: false, success: false }
}
```
