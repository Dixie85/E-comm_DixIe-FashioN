import express from 'express'
const auth = express.Router()
import { login, logout, refresh } from '../controllers/authController'

auth.route('/')
    .post(login)

auth.route('/refresh')
    .get(refresh)

auth.route('/logout')
    .post(logout)

export default auth