import { Users } from '../models/Users'
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { connect, close } from '../../db/mongo.config';
import { IUser } from '../interfaces/interfaces';

// @desc Login
// @route POST /auth
// @access Public
export const login = asyncHandler(async (req, res): Promise<any> => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await connect(() => Users.findOne({ username }).exec()) as IUser
    close();
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userId": foundUser._id,
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: '15m' }
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
          console.log(decoded ,'decoded');
          
            if (err) return res.status(403).json({ message: 'Forbidden' })
            //@ts-ignore
            const foundUser = await connect(() => Users.findOne({ username: decoded.username }).exec()) as IUser
            close()
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized/user' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET as Secret,
                { expiresIn: '15m' }
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
