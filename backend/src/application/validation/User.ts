import Joi from "joi";
import { joiMessages } from "./errorMessages";

export default {
  editSchema: Joi.object().keys({
    displayName: Joi.string().min(1).max(30).messages({
      "string.min": joiMessages.MIN_CHAR,
      "string.max": joiMessages.DISPLAY_NAME_MAX_CHAR,
    }),
    thumbnail: Joi.string(),
  }),
};
