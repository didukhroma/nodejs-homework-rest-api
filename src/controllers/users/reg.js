const { UsersService: serviceUser } = require('../../services');
const { HttpCode } = require('../../helpers/constants');

const reg = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await serviceUser.findByEmail(email);

  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      message: 'Email in use',
    });
  }

  try {
    const newUser = await serviceUser.create({
      name,
      email,
      password,
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
