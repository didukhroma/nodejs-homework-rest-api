const multer = require('multer');
const path = require('path');
// const fs = require('fs');
require('dotenv').config();

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
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true);
    }
    cb(null, false);
  },
});

module.exports = upload;
