import Joi from "joi";
import errorMessages from "./messages";

export const createSchema = Joi.object().keys({
  content: Joi.string().min(1).max(255).required().messages({
    "string.min": errorMessages.MIN_CHAR,
    "string.max": errorMessages.COMMENT_MAX_CHAR,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
  noteId: Joi.string().uuid().required().messages({
    "any.required": errorMessages.EMPTY_FIELD,
  }),
});
