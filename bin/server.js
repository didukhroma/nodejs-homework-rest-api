const app = require('../app');
const db = require('../src/db');

const { PORT = 3000 } = process.env;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not running. Error: ${err.message}`);
});
