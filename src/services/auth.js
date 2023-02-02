const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const { User } = require("../models/userModel");
const { sendMails } = require("../helpers/mails");
const gravatar = require("gravatar");
const {
  NotAuthorizedError,
  WrongParametersError,
} = require("../helpers/errors");

const registration = async (email, password, data) => {
  const avatarURL = gravatar.url(email, { s: "200" });
  try {
    const user = new User({
      email,
      password,
      avatarURL,
      ...data,
    });
    await user.save();
  } catch (err) {
    console.error(err);
  }
};
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotAuthorizedError(`No user with email ${email}=()`);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new WrongParametersError(`Wrong password=()`);
    }
    const token = jwt.sign(
      {
        _id: user._id,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET
    );
    console.log("user._id", user._id);
    await User.findByIdAndUpdate(user._id, { token });
    user.token = token;
    return token;
  } catch (err) {
    console.error(err);
  }
};
const logout = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotAuthorizedError(`No user with email ${email}=()`);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new WrongParametersError(`Wrong password=()`);
    }
    const token = null;
    await User.findByIdAndUpdate(user._id, { token });
    user.token = null;
    return user;
  } catch (err) {
    console.error(err);
  }
};
const current = async (userId) => {
  try {
    console.log(userId);
    const user = await User.findById(userId);

    if (!user) {
      throw new NotAuthorizedError(`No user with id ${userId}=()`);
    }
    return user;
  } catch (err) {
    console.error(err);
  }
};
const registerVerification = async (verificationToken) => {
  const user = await User.findOne({
    verificationToken,
    verify: false,
  });

  if (!user) {
    throw new NotAuthorizedError("User not found");
  }

  user.verify = true;
  user.verificationToken = "null";

  await user.save();

  const subject = "Thank you for your registration!";
  const message = "Registration successful";

  await sendMails(user.email, subject, message);
};
const verification = async (email) => {
  const user = await User.findOne({ email });
  const port = process.env.PORT;
  if (user.verify) {
    throw new NotAuthorizedError("Verification has already been passed");
  }

  const verificationToken = sha256(email + process.env.JWT_SECRET);

  user.verificationToken = verificationToken;

  await user.save();

  const subject = "Thank you for registration";
  const message = `Please, confirm your email address
      http://localhost:${port}/api/users/verify/${verificationToken}`;

  await sendMails(user.email, subject, message);
};
module.exports = {
  registration,
  login,
  logout,
  current,
  registerVerification,
  verification,
};
