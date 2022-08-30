import Joi from "joi";

export default {
  createSchema: Joi.object().keys({
    content: Joi.string().alphanum().min(1).max(255).required(),
    noteId: Joi.string().uuid().required(),
  }),

  deleteSchema: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};
