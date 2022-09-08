import Joi from "joi";
import errorMessages from "./messages";

export const editSchema = Joi.object().keys({
  displayName: Joi.string().min(1).max(30).messages({
    "string.min": errorMessages.MIN_CHAR,
    "string.max": errorMessages.DISPLAY_NAME_MAX_CHAR,
  }),
  thumbnail: Joi.string(),
});
