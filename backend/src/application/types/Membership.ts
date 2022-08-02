import { Field, InputType } from "type-graphql";
import { ERoles } from "../../domain/enumerators/ERoles";

@InputType()
export class ChangeRole {
  @Field()
  username: string;

  @Field()
  notebookName: string;

  @Field()
  role: ERoles;
}
