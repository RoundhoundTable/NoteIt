import { registerEnumType } from "type-graphql";

export enum EFromOptions {
  PROFILE = "PROFILE",
  NOTEBOOK = "NOTEBOOK",
}

registerEnumType(EFromOptions, {
  name: "from options",
});
