import Joi from "joi";

export const voteSchema = Joi.object().keys({
  noteId: Joi.string().uuid().required(),
  value: Joi.number().min(-1).max(1).required(),
});
