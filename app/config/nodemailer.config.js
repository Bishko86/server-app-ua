const nodemailer = require("nodemailer");
const user = process.env.USER;
const pass = process.env.PASS;
const devMode = process.env.DEV;
const HOST = devMode ? "127.0.0.1:4200" : "137.184.2.106:8080";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: { user, pass },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transporter
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://${HOST}/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log("NODEMAILE_ERROR", err));
};
