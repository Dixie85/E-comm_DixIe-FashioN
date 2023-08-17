import { Users } from '../models/Users'
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { connect, close } from '../../db/mongo.config';
import { IVerifyToken, IUser } from '../interfaces/interfaces';
import { VerifyToken } from '../models/VerifyToken';
import { randomBytes } from 'crypto'
import { verifyEmail } from '../utils/verifyEmail';

// @desc Login
// @route POST /auth
// @access Public
export const login = asyncHandler(async (req, res): Promise<any> => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await connect(() => Users.findOne({ username }).exec()) as IUser

    if (!foundUser) {
        close();
        return res.status(401).json({ message: 'Incorrect Username or Password', signUp:true })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
        close();
        return res.status(401).json({ message: 'Incorrect Username or Password', signUp:false })
    }

    if (!foundUser.verified) {
        const token = await VerifyToken.findOne({ userId: foundUser._id, type: 'mail' }) as IVerifyToken

        if (!token) {
            const mailTokenObject = { userId: foundUser._id, token: randomBytes(32).toString("hex"), type: 'mail' }
            const newToken = await VerifyToken.create(mailTokenObject) as IVerifyToken

            const url = `${process.env.BASE_URL}mail/${foundUser._id}/verify/${newToken.token}`;
            const emailWasSend = await verifyEmail(foundUser.email, "Verify Email", url);
            close()

            if (emailWasSend.success) {
                return res.status(400).json({ message: `Your account is not verified! A new verification email was sent to your email address.`})
            } else {
                res.json({ message: emailWasSend.error })
            }
        }

        const url = `${process.env.BASE_URL}mail/${token.userId}/verify/${token.token}`;
        const emailWasSend = await verifyEmail(foundUser.email, "Verify Email", url);
        close()

        if (emailWasSend.success) {
            return res.status(400).json({ message: `Your account is not verified! A new verification email was sent to your email address.`})
        } else {
            res.json({ message: emailWasSend.error })
        }
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userId": foundUser._id,
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: '1m' }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET as Secret,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        //@ts-ignore
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    close()
    // Send accessToken containing username and role
    res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
export const refresh = async (req: Request, res: Response) : Promise<any> => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized/cookie' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as Secret,
        //@ts-ignore
        asyncHandler(async (err, decoded) => {
          
            if (err) return res.status(403).json({ message: 'Forbidden' })
            //@ts-ignore
            const foundUser = await connect(() => Users.findOne({ username: decoded.username }).exec()) as IUser
            close()
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized/user' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "userId": foundUser._id,
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET as Secret,
                { expiresIn: '1m' }
            )

            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
export const logout = async (req: Request, res: Response) : Promise<any> => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    //@ts-ignore
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}


// @desc Account verifification
// @route GET /auth/mail/:id/verify/:token
// @access Public
export const verify = asyncHandler(async (req: Request, res: Response) : Promise<any> => {
  const { id, token} = req.params
  const validId = new RegExp(/^[a-fA-F0-9]{24}$/)
  const validToken = new RegExp(/^[a-fA-F0-9]{64}$/)  
    
  if(!validId.test(id!) || !validToken.test(token!)){
    return res.status(400).send({ message: "Invalid link" });
  }

  const foundUser = await connect(() => Users.findOne({ _id: id }).exec())
    foundUser
  if (!foundUser) {
    close();
    return res.status(400).send({ message: "Invalid link" });
  } 

  const foundToken = await connect(() => VerifyToken.findOne({
    userId: foundUser._id,
    token,
    type: 'mail'
  }));
  if (!foundToken) {
    close();
    return res.status(400).send({ message: "Invalid link" });
  }

  foundUser.verified = true
  await foundUser.save()
  await foundToken.remove();
  
  close();
  res.status(200).json({ message: "Email verified successfully" });
})