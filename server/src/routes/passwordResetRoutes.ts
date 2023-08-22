import express from 'express'
const password = express.Router()
import { cancelChanges, passwordChange, passwordResetLink } from '../controllers/passwordController'


password.route('/')
    .post(passwordResetLink)
    .delete(cancelChanges)

password.route('/:id/:token')
    .post(passwordChange)

export default password