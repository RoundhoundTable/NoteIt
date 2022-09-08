import Joi from "joi";
import errorMessages from "./messages";

export const createSchema = Joi.object().keys({
  content: Joi.string().min(1).required().messages({
    "string.min": errorMessages.MIN_CHAR,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
  notebookName: Joi.string().alphanum().required().messages({
    "string.min": errorMessages.MIN_CHAR,
    "string.alphanum": errorMessages.NO_ALPHANUM,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
  title: Joi.string().min(1).required().messages({
    "string.min": errorMessages.MIN_CHAR,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
});

export const editSchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
  content: Joi.string().min(1).required().messages({
    "string.min": errorMessages.MIN_CHAR,
    "any.required": errorMessages.EMPTY_FIELD,
  }),
});
