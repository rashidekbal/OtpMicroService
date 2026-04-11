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
export default sendEmailOtp