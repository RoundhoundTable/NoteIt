import Joi from "joi";
import { joiMessages } from "./errorMessages";

export default {
  createSchema: Joi.object().keys({
    content: Joi.string().min(1).required().messages({
      "string.min": joiMessages.MIN_CHAR,
      "any.required": joiMessages.EMPTY_FIELD,
    }),
    notebookName: Joi.string().alphanum().required().messages({
      "string.min": joiMessages.MIN_CHAR,
      "string.alphanum": joiMessages.NO_ALPHANUM,
      "any.required": joiMessages.EMPTY_FIELD,
    }),
    title: Joi.string().min(1).required().messages({
      "string.min": joiMessages.MIN_CHAR,
      "any.required": joiMessages.EMPTY_FIELD,
    }),
  }),
  editSchema: Joi.object().keys({
    id: Joi.string().uuid().required(),
    content: Joi.string().min(1).required().messages({
      "string.min": joiMessages.MIN_CHAR,
      "any.required": joiMessages.EMPTY_FIELD,
    }),
  }),
  deleteSchema: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};
