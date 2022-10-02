import Joi from "joi";
import errorMessages from "./messages";

export const createSchema = Joi.object().keys({
  name: Joi.string().min(1).alphanum().required().messages({
    "string.min": errorMessages.MIN_CHAR,
    "string.alphanum": errorMessages.NO_ALPHANUM,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
  thumbnail: Joi.string(),
  description: Joi.string().max(255).messages({
    "string.max": errorMessages.DESCRIPTION_MAX_CHAR,
  }),
});

export const editSchema = Joi.object().keys({
  name: Joi.string().alphanum().required(),
  thumbnail: Joi.string(),
  description: Joi.string().max(255).messages({
    "string.max": errorMessages.DESCRIPTION_MAX_CHAR,
  }),
});
