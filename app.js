const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const productsRouter = require("./routers/productsRoutes");
const { handleError } = require("./middlewares/handleError");
const { createError } = require("./helpers/errors");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use(express.static("public"));

app.use(() => {
  createError(404, "Use api on another routes, wrong route");
});

app.use(handleError);

module.exports = app;
