import { Request, Response } from "express";
import { IPayload } from "./IPayload";

export interface IContext {
  req: Request;
  res: Response;
  payload?: IPayload;
}
