import { NextFunction, Request, Response } from "express";
import { IStatusError } from "@src/interfaces/interfaces";
import axios from "axios";


export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try { 
    const {data} = await axios('http://localhost:8080/products.json');
    res.json(data.results)
  } catch (error) {
    next(error)
  }
}
 
export const errorHandler = (err: IStatusError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      error: err.message
    }
  });
};  