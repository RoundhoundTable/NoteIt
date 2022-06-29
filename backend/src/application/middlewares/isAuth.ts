import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { IContext } from "../interfaces/IContext";
import { IPayload } from "../interfaces/IPayload";

dotenv.config();

export const isAuth: MiddlewareFn<IContext> = ({ context }, next) => {
  try {
    const authorization = context.req.headers["authorization"];
    if (!authorization) console.error("Forbidden");

    const token = authorization.split(" ")[1];
    const payload = <IPayload>verify(token, process.env.ACCESS_TOKEN_SECRET);
    context.payload = payload;
  } catch (e) {
    console.error(e);
  }

  return next();
};
