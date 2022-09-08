import Joi from "joi";
import errorMessages from "./messages";

export const registerSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": errorMessages.INVALID_EMAIL,
      "any.required": errorMessages.EMPTY_FIELD,
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": errorMessages.PASSWORD_MIN_CHAR,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": errorMessages.PASSWORD_MISMATCHING,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
  username: Joi.string().alphanum().required().messages({
    "string.alphanum": errorMessages.NO_ALPHANUM,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": errorMessages.INVALID_EMAIL,
      "any.required": errorMessages.EMPTY_FIELD,
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": errorMessages.PASSWORD_MIN_CHAR,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
});
