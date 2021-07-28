const { UsersService: serviceUsers } = require('../../services');
const { HttpCode } = require('../../helpers/constants');

const current = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const result = await serviceUsers.findById(userId);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        email: result.email,
        subscription: result.subscription,
        avatar: result.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;
