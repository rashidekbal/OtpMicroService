import { MailOptions } from "nodemailer/lib/json-transport/index.js";
import nodemailer from "./nodemailer.js"
import { Address } from "nodemailer/lib/mailer/index.js";

async function sendEmailOtp(email:Address,companyName:string,otp:number) {
  const mailOptions:MailOptions= {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP VERIFICATION",
    html: `<div
  style="
    font-family: 'Segoe UI', sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #fefefe;
    border: 1px solid #ddd;
    border-radius: 10px;
  "
>
  <h2 style="text-align: center; color: #6c63ff">${companyName} OTP Verification</h2>
  <p style="font-size: 16px; color: #333">Hey there 👋,</p>
  <p style="font-size: 16px; color: #333">
    Use the following OTP to verify your email address in
    <strong>${companyName}</strong>. Don't share it with anyone .
  </p>
  <div style="text-align: center; margin: 30px 0">
    <span style="font-size: 32px; font-weight: bold; color: #6c63ff"
      >${otp}</span
    >
  </div>
  <p style="font-size: 14px; color: #999">
    This OTP is valid for 5 minutes. If you didn't request this, just ignore it
    ✌️.
  </p>
  <hr style="margin: 30px 0" />
  <p style="font-size: 12px; color: #aaa; text-align: center">
    &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
  </p>
</div>`,
  };
  return nodemailer.sendMail(mailOptions);
}
async function sendApiKey(email:Address,companyName:string,apikey:string){
  const mailOptions:MailOptions={
    from:process.env.EMAIL,
    to:email,
    subject:"API KEY GENERATED",
    html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your EazyOTP API Key</title>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, sans-serif; color:#e5e7eb;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a; padding:20px 0;">
    <tr>
      <td align="center">
        
        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#020617; border-radius:10px; overflow:hidden; border:1px solid #1e293b;">
          
          <!-- Header -->
          <tr>
            <td style="background:#020617; color:#38bdf8; padding:20px; text-align:center; border-bottom:1px solid #1e293b;">
              <h2 style="margin:0;">EazyOTP</h2>
              <p style="margin:5px 0 0; font-size:13px; color:#94a3b8;">Secure OTP Infrastructure</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h3 style="margin-top:0; color:#e2e8f0;">Your API Key is Ready 🚀</h3>

              <p style="color:#94a3b8; font-size:14px;">
                Your API key has been generated for:
              </p>

              <!-- Org Name -->
              <div style="margin:15px 0; padding:12px; background:#0f172a; border-left:4px solid #38bdf8; border-radius:4px;">
                <strong style="color:#e2e8f0;">${companyName}</strong>
              </div>

              <p style="color:#94a3b8; font-size:14px;">
                Use the key below to integrate EazyOTP into your application:
              </p>

              <!-- API Key Box -->
              <div style="margin:20px 0; padding:15px; background:#0f172a; border:1px dashed #334155; border-radius:6px; text-align:center;">
                <code id="apiKey" style="font-size:15px; color:#38bdf8; word-break:break-all;">
                  ${apikey}
                </code>
              </div>

              <!-- Copy Button -->
              <div style="text-align:center; margin-top:10px;">
                <button onclick="copyKey()" 
                  style="background:#38bdf8; color:#020617; border:none; padding:10px 16px; border-radius:6px; font-size:14px; cursor:pointer;">
                  Copy API Key
                </button>
              </div>

              <p style="color:#f87171; font-size:13px; margin-top:20px;">
                ⚠️ Keep this key secure. Do not expose it publicly.
              </p>

              <p style="color:#64748b; font-size:13px;">
                If you did not request this, you can ignore this email.
              </p>

              <p style="margin-top:25px; color:#94a3b8; font-size:14px;">
                — Team EazyOTP
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#020617; padding:15px; text-align:center; font-size:12px; color:#475569; border-top:1px solid #1e293b;">
              © 2026 EazyOTP
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

  <!-- Script (limited support in email clients) -->
  <script>
    function copyKey() {
      const text = document.getElementById("apiKey").innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("API Key copied!");
      });
    }
  </script>

</body>
</html>`
  }

}
export default sendEmailOtp
export {sendApiKey}