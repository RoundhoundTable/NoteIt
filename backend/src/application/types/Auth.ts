import { User } from "@prisma/client";

export type Auth = null | {
  user: User;
  iat: number;
  exp: number;
};
