const { nanoid } = require('nanoid');
const { HttpCode } = require('../../helpers/constants');
const { UsersService: serviceUser } = require('../../services');
const EmailService = require('../../services/email');
const { ErrorHandler } = require('../../helpers/errorHandler');
const emailService = new EmailService();

const repeatVerification = async (req, res, next) => {
  const verifyToken = nanoid();

  try {
    const user = await serviceUser.findByEmail(req.body.email);

    if (user.verify) {
      return next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          'Verification has already been passed',
        ),
      );
    }

    await emailService.sendEmail(verifyToken, req.body.email);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        message: 'Verification email sent',
      },
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        HttpCode.SERVICE_UNAVAILABLE,
        error.message,
        'Service unavailable',
      ),
    );
  }
};

module.exports = repeatVerification;
