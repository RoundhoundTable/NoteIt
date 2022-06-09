import { Account as AccountEntity } from "./Account";
import { Membership as MembershipEntity } from "./Membership";
import { User as UserEntity } from "./User";
import { Note as NoteEntity } from "./Note";
import { Notebook as NotebookEntity } from "./Notebook";
import { Vote as VoteEntity } from "./Vote";
import { Comment as CommentEntity } from "./Comment";

export namespace Entities {
  export const Account = AccountEntity;
  export type Account = AccountEntity;

  export const User = UserEntity;
  export type User = UserEntity;

  export const Note = NoteEntity;
  export type Note = NoteEntity;

  export const Notebook = NotebookEntity;
  export type Notebook = NotebookEntity;

  export const Membership = MembershipEntity;
  export type Membership = MembershipEntity;

  export const Vote = VoteEntity;
  export type Vote = VoteEntity;

  export const Comment = CommentEntity;
  export type Comment = CommentEntity;
}
