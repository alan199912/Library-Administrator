const errorHandler = (err, req, res, next) => {
  console.log(`Errors in my controller ${err}`);

  res.status(500).json({
    status: "fail",
    message: err.message,
  });
};

module.exports = errorHandler;
