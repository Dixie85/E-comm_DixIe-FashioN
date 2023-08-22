import { NextFunction, Request, Response } from "express";
import axios from "axios";

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try { 
    const {data} = await axios('http://localhost:8080/products.json');
    res.json(data.results)
  } catch (error) {
    next(error)
  }
}
 
 
