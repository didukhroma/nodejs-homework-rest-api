const jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');
require('dotenv').config();

class UploadAvatarService {
  constructor(folderAvatars) {
    this.folderAvatars = folderAvatars;
  }

  async transformAvatar(pathFile) {
    const pic = await jimp.read(pathFile);
    await pic
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile);
  }

  async saveAvatar({ idUser, file }) {
    await this.transformAvatar(file.path);
    const folderUserAvatar = path.join(
      process.cwd(),
      process.env.UPLOAD_DIR,
      process.env.AVATAR_OF_USERS,
    );
    await fs.rename(
      file.path,
      path.join(folderUserAvatar, `${idUser}-avatar.jpg`),
    );
    return path.normalize(
      path.join(
        process.env.UPLOAD_DIR,
        process.env.AVATAR_OF_USERS,
        `${idUser}-avatar`,
      ),
    );
  }
}

module.exports = UploadAvatarService;
