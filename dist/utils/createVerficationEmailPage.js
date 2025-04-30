const verificationEmailPage = (link) => {
    return ` <!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>تأكيد بريدك الإلكتروني</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      direction: rtl;
    }

    .container {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 30px;
      text-align: center;
      max-width: 600px;
      width: 100%;
      box-sizing: border-box;
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

    .verify-button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #4CAF50;
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
      background-color: #3e8e41;
    }

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

    .logo {
      margin-bottom: 20px;
    }

    .logo img {
      max-width: 150px;
      height: auto;
    }

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

    <!-- شعار الشركة (اختياري) -->
    <div class="logo">
      <img src="https://i.postimg.cc/wBK5RsXH/light-logo-removebg-preview.png" alt="شعار شركتك">
    </div>

    <h1>تأكيد بريدك الإلكتروني</h1>

    <p>شكرًا لتسجيلك! يرجى النقر على الزر أدناه لتأكيد بريدك الإلكتروني وتفعيل حسابك.</p>

    <a href="${link}" class="verify-button">تأكيد البريد</a>

    <p>إذا لم يعمل الزر أعلاه، يمكنك نسخ الرابط التالي ولصقه في متصفحك:</p>
    <p>${link}</p>

    <div class="footer">
      <p>هذه رسالة بريد إلكتروني تلقائية، الرجاء عدم الرد.</p>
      <p>© 2025 دريفونا. جميع الحقوق محفوظة.</p>
    </div>
  </div>
</body>
</html>
`;
};
export default verificationEmailPage;
