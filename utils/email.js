const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // host: process.env.EMAIL_HOST,
  // port: process.env.EMAIL_PORT,
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('SMTP server connection established');
  } catch (error) {
    console.error('SMTP server connection failed:', error);
  }
};

verifyTransporter();

const sendEmail = async options => {
  // 1) Create a transporter

  // 2) Define the email options
  const mailOptions = {
    from: 'Shreekant <shree.kant.74.sk@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
