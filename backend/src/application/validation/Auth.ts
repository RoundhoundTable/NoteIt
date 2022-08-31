import Joi from "joi";
import { joiMessages } from "./errorMessages";

export const registerSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": joiMessages.INVALID_EMAIL,
      "any.required": joiMessages.EMPTY_FIELD,
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": joiMessages.PASSWORD_MIN_CHAR,
    "any.required": joiMessages.EMPTY_FIELD,
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": joiMessages.PASSWORD_MISMATCHING,
    "any.required": joiMessages.EMPTY_FIELD,
  }),
  username: Joi.string().alphanum().required().messages({
    "string.alphanum": joiMessages.NO_ALPHANUM,
    "any.required": joiMessages.EMPTY_FIELD,
  }),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": joiMessages.INVALID_EMAIL,
      "any.required": joiMessages.EMPTY_FIELD,
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": joiMessages.PASSWORD_MIN_CHAR,
    "any.required": joiMessages.EMPTY_FIELD,
  }),
});
