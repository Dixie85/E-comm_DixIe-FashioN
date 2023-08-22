import asyncHandler from 'express-async-handler'
import { connect, close } from '../../db/mongo.config';
import { Users } from "../models/Users";
import { IUser } from '../interfaces/interfaces';

const authCheckAdmin = asyncHandler(async (req, res, next): Promise<any> => {

  if(req.roles !== 'Admin') return res.status(401).json({ message: "Unauthorized" });

  const user = await connect(() => Users.findOne({ username: req.user, roles: req.roles }).lean().exec()) as IUser
  close()
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
});

export default authCheckAdmin;
