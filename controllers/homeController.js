const BigPromise = require("../middlewares/bigPromise");

exports.home = BigPromise((req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello from the API",
  });
});

exports.homeDummy = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "this is an dummy link to test the API",
  });
};
