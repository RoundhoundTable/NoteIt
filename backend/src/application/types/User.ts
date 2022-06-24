import { Field, InputType } from "type-graphql";

@InputType()
export class UserSettingsPayload {
  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  thumbnail?: string;
}

@InputType()
export class UserSettings {
  @Field({ nullable: false })
  username: string;

  @Field()
  settings: UserSettingsPayload;
}
