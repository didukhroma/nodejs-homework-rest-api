const { UsersService: serviceUsers } = require('../../services');
const { HttpCode } = require('../../helpers/constants');

const verification = async (req, res, next) => {
  try {
    const result = await serviceUsers.verify(req.params);
    if (result) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification successful',
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'User not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verification;
