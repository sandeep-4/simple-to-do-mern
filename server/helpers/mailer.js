const nodemailer = require("nodemailer");

exports.sendMail = async (emailData) => {
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EEMAIL,
      pass: process.env.EPASSWORD,
    },
  });
  return transporter
    .sendMail(emailData)
    .then((info) => console.log(`Mail send ${info.response}`))
    .catch((err) => console.log(err));
};
