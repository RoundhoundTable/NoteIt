import { Field, InputType } from "type-graphql";

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
