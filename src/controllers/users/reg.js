const { nanoid } = require('nanoid');
const { UsersService: serviceUser } = require('../../services');
const { HttpCode } = require('../../helpers/constants');
const { ErrorHandler } = require('../../helpers/errorHandler');
// const EmailService = require('../../services/email');

// const emailService = new EmailService();

const reg = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await serviceUser.findByEmail(email);

    if (user) {
      return next(new ErrorHandler(HttpCode.CONFLICT, 'Email in use'));
    }

    const verifyToken = nanoid();
    /*
    try {
      await emailService.sendEmail(verifyToken, email);
    } catch (error) {
      return next(
        new ErrorHandler(
          HttpCode.SERVICE_UNAVAILABLE,
          error.message,
          'Service unavailable',
        ),
      );
    }
*/
    const newUser = await serviceUser.create({
      email,
      password,
      verifyToken,
    });

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = reg;
