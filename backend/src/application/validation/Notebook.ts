import Joi from "joi";

export default {
  createSchema: Joi.object().keys({
    name: Joi.string().alphanum().required(),
    thumbnail: Joi.string(),
    description: Joi.string().max(255),
  }),
  editSchema: Joi.object().keys({
    name: Joi.string().alphanum().required(),
    thumbnail: Joi.string(),
    description: Joi.string().max(255),
  }),
  deleteSchema: Joi.object().keys({
    name: Joi.string().alphanum().required(),
  }),
};
