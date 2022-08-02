import { Field, InputType } from "type-graphql";

@InputType()
export class Settings {
  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  thumbnail?: string;
}
