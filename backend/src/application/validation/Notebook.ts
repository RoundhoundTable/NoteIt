import Joi from "joi";
import { joiMessages } from "./errorMessages";

export default {
  createSchema: Joi.object().keys({
    name: Joi.string().min(1).alphanum().required().messages({
      "string.min": joiMessages.MIN_CHAR,
      "string.alphanum": joiMessages.NO_ALPHANUM,
      "any.required": joiMessages.EMPTY_FIELD,
    }),
    thumbnail: Joi.string(),
    description: Joi.string().max(255).messages({
      "string.max": joiMessages.DESCRIPTION_MAX_CHAR,
    }),
  }),
  editSchema: Joi.object().keys({
    name: Joi.string().alphanum().required(),
    thumbnail: Joi.string(),
    description: Joi.string().max(255).messages({
      "string.max": joiMessages.DESCRIPTION_MAX_CHAR,
    }),
  }),
  deleteSchema: Joi.object().keys({
    name: Joi.string().alphanum().required(),
  }),
};
