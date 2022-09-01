import Joi from "joi";
import { joiMessages } from "./errorMessages";

export const createSchema = Joi.object().keys({
  content: Joi.string().min(1).max(255).required().messages({
    "string.min": joiMessages.MIN_CHAR,
    "string.max": joiMessages.COMMENT_MAX_CHAR,
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
