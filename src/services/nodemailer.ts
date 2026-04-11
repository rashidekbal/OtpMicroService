
import nodemailer, { Transporter } from "nodemailer"
const transporter:Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
export default transporter