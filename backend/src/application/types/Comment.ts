import { Field, InputType } from "type-graphql";

@InputType()
export class CreateComment {
  @Field()
  content: string;

  @Field()
  noteId: string;
}
