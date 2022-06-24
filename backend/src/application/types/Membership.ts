import { Field, InputType } from "type-graphql";
import { ERoles } from "../../domain/enumerators/ERoles";

@InputType()
export class Membership {
  @Field()
  username: string;
  @Field()
  notebookName: string;
}

@InputType()
export class CreateMembership extends Membership {}

@InputType()
export class DeleteMembership extends Membership {}

@InputType()
export class ChangeRole extends Membership {
  @Field()
  role: ERoles;
}
