import Joi from "joi";

export default {
  editSchema: Joi.object().keys({
    displayName: Joi.string().min(1).max(30),
    thumbnail: Joi.string(),
  }),
};
