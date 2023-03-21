import { NextFunction, Request, Response } from "express";
import { IStatusError } from "../interfaces/interfaces";

export const errorHandler = (err: IStatusError, _req: Request, res: Response, _next: NextFunction) => {
  const status = res.statusCode ? res.statusCode : 500 // server error 
  res.status(status)
  res.json({ message: err.message })
}; 