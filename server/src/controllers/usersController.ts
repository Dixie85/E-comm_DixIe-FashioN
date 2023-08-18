import { Users } from '../models/Users'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import { connect, close } from '../../db/mongo.config';
import { IVerifyToken, IUser } from '../interfaces/interfaces';
import { verifyEmail } from '../utils/verifyEmail';
import { VerifyToken } from '../models/VerifyToken';
import { randomBytes } from 'crypto'

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsers = asyncHandler(async (_req, res): Promise<any> => {
    // Get all users from MongoDB
    const users = await connect(() => Users.find().select('-password').lean()) as IUser[]
    close()
    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
export const createNewUser = asyncHandler(async (req, res): Promise<any> => {
    const { username, password, email } = req.body

    // Confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicateUserName = await connect(() => Users.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()) as IUser
    close()
    if (duplicateUserName) {
        return res.status(409).json({ message: 'Username already exists' })
    }

    // Check for duplicate email
    const duplicateEmail = await connect(() => Users.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()) as IUser
    close()
    if (duplicateEmail) {
        return res.status(409).json({ message: 'Account with this email already exists' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, email }

    // Create and store new user 
    const user = await connect(() => Users.create(userObject)) as IUser
    if (!user) {
        close()
        return res.status(400).json({ message: 'Invalid user data received' })
    }

    // Create new token for verification of a users account
    const mailTokenObject = { userId: user._id, token: randomBytes(32).toString("hex"), type: 'mail' }

    const token = await connect(() => VerifyToken.create(mailTokenObject)) as IVerifyToken
    close()

    //Url address provided to the user for verification
    //this url will hit a front end route
    const url = `${process.env.BASE_URL}/mail/${user._id}/verify/${token.token}`;
 
    const emailWasSend = await verifyEmail(user.email, "Verify Email", url);

    if (emailWasSend.success) {
        return res.status(201).json({ message: `A verification email was sent to your email address`})
    } else {
        res.json({ message: emailWasSend.error })
    }
})


// @desc Delete a user
// @route DELETE /users
// @access Private
export const deleteUser = asyncHandler(async (req, res): Promise<any> => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await connect(() => Users.findById(id).exec())

    if (!user) {
      close()
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} deleted`
    close()
    res.json(reply)
})
