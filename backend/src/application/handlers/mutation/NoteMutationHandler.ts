import { Note } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import { ENoteMutationType } from "../../enumerators/EMutationTypes";
import { NoteCreateHandler } from "./Note/NoteCreateHandler";
import { NoteDeleteHandler } from "./Note/NoteDeleteHandler";
import { NoteEditHandler } from "./Note/NoteEditHandler";
import { MutationHandler, NoteHandlerResult } from "../../types/Handlers";
import Joi from "joi";
import validation from "../../validation/Note";

export const NoteMutationHandler = (
  _parent: any,
  { type, payload }: { type: ENoteMutationType; payload: Note },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const handlers: MutationHandler<ENoteMutationType, Note, NoteHandlerResult> =
    {
      [ENoteMutationType.CREATE]: NoteCreateHandler,
      [ENoteMutationType.EDIT]: NoteEditHandler,
      [ENoteMutationType.DELETE]: NoteDeleteHandler,
    };

  const validationSchema: Record<ENoteMutationType, Joi.ObjectSchema> = {
    [ENoteMutationType.CREATE]: validation.createSchema,
    [ENoteMutationType.EDIT]: validation.editSchema,
    [ENoteMutationType.DELETE]: validation.deleteSchema,
  };

  return handlers[type](payload, ctx.prisma, ctx.user), validationSchema;
};
