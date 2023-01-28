const Joi = require("joi");
const schemaPost = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().alphanum().min(10).max(12).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});
const schemaPut = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),

  phone: Joi.string().alphanum().min(10).max(12),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
const schemaLogin = Joi.object({
  password: Joi.string().alphanum().min(10).max(12),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
const schemaEmail = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});
module.exports = {
  schemaPost,
  schemaPut,
  schemaLogin,
  schemaEmail,
};
