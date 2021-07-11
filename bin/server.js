const app = require('../app');
const db = require('../src/db');

const { PORT = 3000 } = process.env;

(async db => {
  try {
    await db;
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Server not running. Error: ${error.message}`);
  }
})(db);
