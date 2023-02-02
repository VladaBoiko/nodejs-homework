const nodemailer = require("nodemailer");

const sendMails = async (email, subject, message) => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.MAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    const { response } = await transporter.sendMail(emailOptions);
    console.log("nodemailer", response);
  } catch (err) {
    console.log("nodemailer", err.response);
  }
};
module.exports = {
  sendMails,
};
