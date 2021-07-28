const path = require('path');
const { HttpCode } = require('../../helpers/constants');
require('dotenv').config();
const { UsersService: serviceUser } = require('../../services');
const { UploadAvatarService } = require('../../services');

const updateAvatar = async (req, res, next) => {
  try {
    const id = req.user.id;
    const tempAvatarUrl = path.join(process.cwd(), process.env.TEMP_DIR);
    const uploads = new UploadAvatarService(tempAvatarUrl);
    const avatarURL = await uploads.saveAvatar({ idUser: id, file: req.file });
    await serviceUser.findByIdAndUpdate(id, { avatarURL });
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarURL },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
