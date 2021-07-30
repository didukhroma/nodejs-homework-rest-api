const app = require('../app');
const db = require('../src/db');
const createFolderIsNotExist = require('../src/helpers/createFolder');
require('dotenv').config();

const UPLOAD_DIR = process.env.UPLOAD_DIR;
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
const TEMP_DIR = process.env.TEMP_DIR;
const { PORT = 3000 } = process.env;

(async db => {
  try {
    await db;
    app.listen(PORT, async () => {
      await createFolderIsNotExist(UPLOAD_DIR);
      await createFolderIsNotExist(`${UPLOAD_DIR}/${AVATAR_OF_USERS}`);
      await createFolderIsNotExist(TEMP_DIR);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Server not running. Error: ${error.message}`);
  }
})(db);
