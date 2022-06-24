import { Field, InputType } from "type-graphql";
import { Entities } from "../../domain/entities";

@InputType()
export class NoteInput {
  @Field({ nullable: false })
  content: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  notebookName: string;
}

export class NoteOutput {
  id: string;
  username: string;
  notebookName: string;
  content: string;
  title: string;
  createdOn: Date;
  likedByUser?: boolean;
  score?: number;
  user?: Entities.User;
  notebook?: Entities.Notebook;
  votes?: Entities.Vote[];
  comments?: Entities.Comment[];
}
