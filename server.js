const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT = 3000, DB_HOST } = process.env;

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
