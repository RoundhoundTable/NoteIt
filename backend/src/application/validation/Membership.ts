import { Roles } from "@prisma/client";
import Joi from "joi";

export default {
  editSchema: Joi.object().keys({
    username: Joi.string().alphanum().required(),
    notebookName: Joi.string().alphanum().required(),
    role: Joi.string()
      .valid(...Object.values(Roles))
      .required(),
  }),
  joinSchema: Joi.object().keys({
    notebookName: Joi.string().alphanum().required(),
  }),
  leaveSchema: Joi.object().keys({
    notebookName: Joi.string().alphanum().required(),
  }),
  kickSchema: Joi.object().keys({
    username: Joi.string().alphanum().required(),
    notebookName: Joi.string().alphanum().required(),
  }),
};
