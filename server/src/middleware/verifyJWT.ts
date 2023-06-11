import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { IDecoded } from "../interfaces/interfaces";

const verifyJWT = (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.headers.authorization || (req.headers.Authorization as string);
  console.log(authHeader ,'authHeader - VerifyJWT');
  

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1] as string;
  console.log(token ,'Token - VerifyJWT');

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    //@ts-ignore
    (err, decoded:IDecoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      next();
    }
  );
};

export default verifyJWT;
