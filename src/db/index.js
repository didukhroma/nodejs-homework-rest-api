const { MongoClient } = require('mongodb');
require('dotenv').config();
const uriDB = process.env.URI_DB;

// eslint-disable-next-line new-cap
const db = new MongoClient(uriDB, {
  useUnifiedTopology: true,
  poolSize: 5,
}).connect();

process.on('SIGINT', async () => {
  const client = await db;
  client.close();
  console.log('Connection for DB disconnected and app terminated');
  process.exit();
});

module.exports = db;
