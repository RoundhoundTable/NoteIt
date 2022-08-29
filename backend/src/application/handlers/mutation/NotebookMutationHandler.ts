import { Notebook } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ENotebookMutationType } from "../../enumerators/EMutationTypes";
import { ApolloContext } from "../../graphql/context";
import { MutationHandler, NotebookHandlerResult } from "../../types/Handlers";
import { NotebookCreateHandler } from "./Notebook/NotebookCreateHandler";
import { NotebookDeleteHandler } from "./Notebook/NotebookDeleteHandler";
import { NotebookEditHandler } from "./Notebook/NotebookEditHandler";

export const NotebookMutationHandler = (
  _parent: any,
  { type, payload }: { type: ENotebookMutationType; payload: Notebook },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const handlers: MutationHandler<
    ENotebookMutationType,
    Notebook,
    NotebookHandlerResult
  > = {
    [ENotebookMutationType.CREATE]: NotebookCreateHandler,
    [ENotebookMutationType.EDIT]: NotebookEditHandler,
    [ENotebookMutationType.DELETE]: NotebookDeleteHandler,
  };

  return handlers[type](payload, ctx.prisma, ctx.user);
};
