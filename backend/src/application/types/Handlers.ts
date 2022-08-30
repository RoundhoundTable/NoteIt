import { PrismaClient, User } from "@prisma/client";
import {
  ENoteMutationType,
  ENotebookMutationType,
  EMembershipMutationType,
  ECommentMutationType,
  EUserMutationType,
} from "../enumerators/EMutationTypes";
import type Joi from "joi";

export type MutationHandlerFunc<T, R> = (
  payload: T,
  prisma: PrismaClient,
  user: User,
  validationSchema?: Joi.ObjectSchema
) => R;
export type MutationHandler<
  T extends
    | ENoteMutationType
    | ENotebookMutationType
    | EMembershipMutationType
    | ECommentMutationType
    | EUserMutationType,
  T1,
  R
> = Record<T, MutationHandlerFunc<T1, R>>;

export type CreateResult = Promise<{ created: string }>;
export type EditResult = Promise<{ edited: boolean }>;
export type DeleteResult = Promise<{ deleted: boolean }>;
export type KickResult = Promise<{ kicked: boolean }>;
export type JoinResult = Promise<{ joined: boolean }>;
export type LeaveResult = Promise<{ left: boolean }>;

export type NoteHandlerResult = CreateResult | EditResult | DeleteResult;
export type NotebookHandlerResult = CreateResult | EditResult | DeleteResult;
export type MembershipHandlerResult =
  | JoinResult
  | LeaveResult
  | KickResult
  | EditResult;
export type CommentHandlerResult = CreateResult | DeleteResult;
export type UserHandlerResult = EditResult;
