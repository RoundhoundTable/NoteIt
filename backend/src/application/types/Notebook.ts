import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNotebook {
  @Field()
  name: string;

  @Field({ nullable: true })
  thumbnail?: string;
}
