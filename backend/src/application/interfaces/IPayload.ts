import { JwtPayload } from "jsonwebtoken";

export interface IPayload extends JwtPayload {
  username: string;
  accountId: string;
}
