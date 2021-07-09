const mongoose = require('mongoose');

require('dotenv').config();

const uriDB = process.env.URI_DB;

const db = mongoose.connect(uriDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
  console.log(`Database connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and app terminated');
    process.exit(1);
  });
});

module.exports = db;
