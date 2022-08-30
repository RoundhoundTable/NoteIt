import Joi from "joi";

export default {
  createSchema: Joi.object().keys({
    content: Joi.string().min(1).required(),
    notebookName: Joi.string().alphanum().required(),
    title: Joi.string().min(1).required(),
  }),
  editSchema: Joi.object().keys({
    id: Joi.string().uuid().required(),
    content: Joi.string().min(1).required(),
  }),
  deleteSchema: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};
