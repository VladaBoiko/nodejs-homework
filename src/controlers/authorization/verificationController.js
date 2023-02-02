const { NotAuthorizedError } = require("../../helpers/errors");
const { verification } = require("../../services/auth");

const verificationController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new NotAuthorizedError("missing required field email");
  }

  await verification(email);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  verificationController,
};
