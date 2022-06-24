import { Field, InputType } from "type-graphql";

@InputType()
export class CreateComment {
  @Field()
  username: string;

  @Field()
  content: string;

  @Field()
  noteId: string;
}
