import { registerEnumType } from "type-graphql";

export enum EFromOptions {
  USER = "USER",
  NOTEBOOK = "NOTEBOOK",
  FEED = "FEED",
}

registerEnumType(EFromOptions, {
  name: "from options",
});
