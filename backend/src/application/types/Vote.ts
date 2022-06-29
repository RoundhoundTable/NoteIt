import { Field, InputType } from "type-graphql";

@InputType()
export class Vote {
  @Field()
  noteId: string;
}

@InputType()
export class CreateVote extends Vote {
  @Field()
  value: number;
}
