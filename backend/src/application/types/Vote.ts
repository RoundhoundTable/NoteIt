import { Field, InputType } from "type-graphql";

@InputType()
export class Vote {
  @Field()
  username: string;
  @Field()
  noteId: string;
}

@InputType()
export class CreateVote extends Vote {}

@InputType()
export class DeleteVote extends Vote {}
