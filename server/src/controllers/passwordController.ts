import { Users } from '../models/Users'
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import { connect, close } from '../../db/mongo.config';
import { IVerifyToken, IUser } from '../interfaces/interfaces';
import { VerifyToken } from '../models/VerifyToken';
import { randomBytes } from 'crypto'
import { verifyEmail } from '../utils/verifyEmail';


export const passwordResetLink = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { username } = req.body

  if (!username) {
      return res.status(400).json({ message: 'All fields are required' })
  }

  const foundUser = await connect(() => Users.findOne({ username }).exec()) as IUser

  if (!foundUser) {
      close();
      return res.status(401).json({ message: 'Invalid Username'})
  }
  if (!foundUser.verified) {
      close();
      return res.status(401).json({ message: `This operation is not avalible for you. Pleace verify your account first`})
  }

  const token = await VerifyToken.findOne({ userId: foundUser._id, type:'password' }) as IVerifyToken

  if (!token) {
      const passwordTokenObject = { userId: foundUser._id, token: randomBytes(32).toString("hex"), type: 'password' }
      const newToken = await VerifyToken.create(passwordTokenObject) as IVerifyToken

      const url = `${process.env.BASE_URL}password-reset/${newToken.userId}/${newToken.token}`;
      const emailWasSend = await verifyEmail(foundUser.email, "Verify Email", url);
      close()

      if (emailWasSend.success) {
          return res.status(200).json({ message: `An email with reset password link was sent to your email address.`})
      } else {
          res.json({ message: emailWasSend.error })
      }
  }
  const url = `${process.env.BASE_URL}password-reset/${token.userId}/${token.token}`;
  const emailWasSend = await verifyEmail(foundUser.email, "Password Reset", url);
  close()

  if (emailWasSend.success) {
      return res.status(200).json({ message: `An email with reset password link was sent to your email address.`})
  } else {
      res.json({ message: emailWasSend.error })
  }
})


export const verifyPasswordResetLink = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { id, token} = req.params
  const validMongoOjectId = new RegExp(/^[a-fA-F0-9]{24}$/)

  if (!validMongoOjectId.test(id!)) {
    close();
    return res.status(400).send({ message: "Invalid link" });
  } 

  const foundUser = await connect(() => Users.findOne({ _id: id }).exec())
  
  if (!foundUser) {
    close();
    return res.status(400).send({ message: "Invalid link" });
  } 

  const foundToken = await connect(() => VerifyToken.findOne({
    userId: foundUser._id,
    token,
    type: 'password'
  }));
  if (!foundToken) {
    close();
    return res.status(400).send({ message: "Invalid link" });
  }
  
  close();
  res.status(200).json({ message: "Valid Url" });
})

export const passwordChange = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { password } = req.body
  const { id, token} = req.params

    const foundUser = await connect(() => Users.findOne({ _id: id }).exec())
		if (!foundUser) {
      close();
      return res.status(400).send({ message: "Invalid link" });
    } 

    const foundToken = await connect(() => VerifyToken.findOne({
			userId: foundUser._id,
			token,
      type: 'password'
		}));
		if (!foundToken) {
      close();
      return res.status(400).send({ message: "Invalid link" });
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    foundUser.password = hashedPwd
    await foundUser.save()
    await foundToken.remove();
    
    close();
    res.status(200).json({ message: "Password successfully changed" });
})

export const cancelChanges = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { token } = req.body

    const foundToken = await connect(() => VerifyToken.findOne({
			token,
      type: 'password'
		}));

    await foundToken.remove();
    
    close();
    res.status(200).json({ message: "Canceled" });
})