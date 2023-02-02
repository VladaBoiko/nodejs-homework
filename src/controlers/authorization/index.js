const { registrationController } = require("./registration");
const { loginController } = require("./login");
const { logoutController } = require("./logout");
const { currentController } = require("./current");
const { registerVerificationController } = require("./registerVerification");

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  registerVerificationController,
};
