const verificationEmailPage = (link) => {
    return ` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email Address</title>
  <style>
    /* General Styles */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 30px;
      text-align: center;
      max-width: 600px;
      width: 100%;
      box-sizing: border-box; /* Important for consistent width with padding */
    }

    h1 {
      color: #333;
      margin-bottom: 20px;
      font-size: 28px;
    }

    p {
      color: #555;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 25px;
    }

    /* Button Styles */
    .verify-button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #4CAF50; /* Green */
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 18px;
      font-weight: bold;
      transition: background-color 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .verify-button:hover {
      background-color: #3e8e41; /* Darker Green */
    }

    /* Footer Styles */
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #888;
      font-size: 12px;
    }

    .footer p {
      margin-bottom: 5px;
    }

    /* Logo (Optional) */
    .logo {
      margin-bottom: 20px;
    }

    .logo img {
      max-width: 150px; /* Adjust as needed */
      height: auto;
    }

    /* Responsive Design (Optional) */
    @media (max-width: 600px) {
      .container {
        padding: 20px;
      }

      h1 {
        font-size: 24px;
      }

      p {
        font-size: 15px;
      }

      .verify-button {
        font-size: 16px;
        padding: 10px 25px;
      }
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Optional Logo -->
    <div class="logo">
      <img src="your-logo.png" alt="Your Company Logo">
    </div>

    <h1>Verify Your Email Address</h1>

    <p>Thank you for registering!  Please click the button below to verify your email address and activate your account.</p>

    <a href="${link}" class="verify-button">Verify Email</a>

    <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
    <p>${link}</p>

    <div class="footer">
      <p>This is an automated email, please do not reply.</p>
      <p>© 2025 Drivona. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};
export default verificationEmailPage;
