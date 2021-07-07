// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();
const uriDB = process.env.URI_DB2;

// eslint-disable-next-line new-cap
// const db = new MongoClient(uriDB, {
//   useUnifiedTopology: true,
//   poolSize: 5,
// }).connect();

// process.on('SIGINT', async () => {
//   const client = await db;
//   client.close();
//   console.log('Connection for DB disconnected and app terminated');
//   process.exit();
// });
const db = mongoose.connect(uriDB, {
  useUnifiedTopology: true,
  useCreateIndexes: true,
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
