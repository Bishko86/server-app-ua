const nodemailer = require("nodemailer");
const devMode = process.env.DEV;
const HOST = devMode ? process.env.CLIENT_URL : "137.184.2.106:8080";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationEmail(email, name, confirmationCode) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Activate account on ${process.env.CLIENT_URL} link`,
      text: "User text",
      html: `
        <div>
        <h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href="${HOST}/auth/confirm/${confirmationCode}"> Click here</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
