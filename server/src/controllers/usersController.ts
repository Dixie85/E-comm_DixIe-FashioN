import { Users } from '../models/Users'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import { connect, close } from '../../db/mongo.config';
import { IUser } from '../interfaces/interfaces';

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
    const duplicateUserName = await connect(() => Users.findOne({ username }).lean().exec()) as IUser
    close()
    if (duplicateUserName) {
        return res.status(409).json({ message: 'Username already exists' })
    }

    // Check for duplicate email
    const duplicateEmail = await connect(() => Users.findOne({ email }).lean().exec()) as IUser
    close()
    if (duplicateEmail) {
        return res.status(409).json({ message: 'Account with this email already exists' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, email }

    // Create and store new user 
    const user = await connect(() => Users.create(userObject)) as IUser
    close()
    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
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
