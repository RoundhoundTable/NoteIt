import { IsEmail, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class RegisterForm {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  username: string;
}

@InputType()
export class LoginForm {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class Access {
  @Field()
  accessToken: string;
}
