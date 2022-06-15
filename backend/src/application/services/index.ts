import { Entities } from "../../domain/entities";
import { AppDataSource } from "../../infrastructure/orm/typeorm/data-source";
import { AccountService } from "./AccountService";
import { CommentService } from "./CommentService";
import { MembershipService } from "./MembershipService";
import { NotebookService } from "./NotebookService";
import { NoteService } from "./NoteService";
import { UserService } from "./UserService";
import { VoteService } from "./VoteService";

export namespace Services {
  export const Membership = new MembershipService();
  export type Membership = MembershipService;

  export const Vote = new VoteService();
  export type Vote = VoteService;

  export const Note = new NoteService();
  export type Note = NoteService;

  export const Comment = new CommentService();
  export type Comment = MembershipService;

  export const Account = new AccountService();
  export type Account = AccountService;

  export const User = new UserService();
  export type User = UserService;

  export const Notebook = new NotebookService();
  export type Notebook = NotebookService;
}
