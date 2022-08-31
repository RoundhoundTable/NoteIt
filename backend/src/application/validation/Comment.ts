import Joi from "joi";
import { joiMessages } from "./errorMessages";

export const createSchema = Joi.object().keys({
  content: Joi.string().alphanum().min(1).max(255).required().messages({
    "string.min": joiMessages.MIN_CHAR,
    "string.max": joiMessages.COMMENT_MAX_CHAR,
    "string.alphanum": joiMessages.NO_ALPHANUM,
    "any.required": joiMessages.EMPTY_FIELD,
  }),
  noteId: Joi.string().uuid().required().messages({
    "any.required": joiMessages.EMPTY_FIELD,
  }),
});

export const deleteSchema = Joi.object().keys({
  id: Joi.string().uuid().required().messages({
    "any.required": joiMessages.EMPTY_FIELD,
  }),
});
