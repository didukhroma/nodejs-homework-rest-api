const { UsersService: serviceUsers } = require('../../services');
const { HttpCode } = require('../../helpers/constants');

const updateSubscription = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const result = await serviceUsers.findByIdAndUpdate(userId, req.body);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { email: result.email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
