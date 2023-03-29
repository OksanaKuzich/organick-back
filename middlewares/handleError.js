const handleError = (err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json(message);
  next();
};

module.exports = { handleError };
