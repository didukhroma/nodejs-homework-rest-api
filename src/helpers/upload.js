const multer = require('multer');
const path = require('path');
require('dotenv').config();
const ErrorHandler = require('./errorHandler');
const { HttpCode } = require('./constants');

console.log(__dirname);
const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2 mb
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true);
    }

    cb(new ErrorHandler(HttpCode.BAD_REQUEST, 'Wrong format file for avatar'));
  },
});

module.exports = upload;
