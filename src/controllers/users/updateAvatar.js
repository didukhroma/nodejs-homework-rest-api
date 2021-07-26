const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();
const { UsersRepository } = require('../../repository');
const { UploadAvatarService } = require('../../services/local-upload');

const updateAvatar = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS);
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file });

    try {
      await fs.unlink(path.join(process.env.AVATAR_OF_USERS, req.user.avatar));
    } catch (e) {
      console.log(e.message);
    }

    await UsersRepository.updateAvatar(id, avatarUrl);
    res.json({ status: 'success', code: 200, data: { avatarUrl } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
