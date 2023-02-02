const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const schema = require("../schemas/schemas");
const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  console.log(tokenType);
  if (!token) {
    next(new NotAuthorizedError("Give me a token, mazafaka!!!"));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(
      new NotAuthorizedError("Will you give me a correct token, mazafaka&&&")
    );
  }
};
const emailMiddlevare = (req, res, next) => {
 const validationResult = schema.schemaEmail.validate(req.body);
 if (validationResult.error) {
   return res.status(400).json({ status: validationResult.error });
 }
  next();
};
module.exports = {
  authMiddleware,
  emailMiddlevare,
};
