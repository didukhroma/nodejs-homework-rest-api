const nodemailer = require('nodemailer');
// const ErrorHandler = require('../helpers/errorHandler');

require('dotenv').config();

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);

class EmailService {
  async sendEmail(verifyToken, email) {
    const emailOptions = {
      from: process.env.MAIL_SENDER,
      to: email,
      subject: 'Verification',
      text: 'Привет. Для подтверждения email пожалуйста пройдите по ссылке ниже.',
      html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Нажмите для подтверждения email</a>`,
    };

    // eslint-disable-next-line no-useless-catch
    try {
      const result = await transporter.sendMail(emailOptions);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EmailService;
