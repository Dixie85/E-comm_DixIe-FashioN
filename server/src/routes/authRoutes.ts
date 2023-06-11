import express from 'express'
const auth = express.Router()
import { login, logout, refresh, verify } from '../controllers/authController'

auth.route('/')
    .post(login)

auth.route('/refresh')
    .get(refresh)

auth.route('/logout')
    .post(logout)

auth.route('/mail/:id/verify/:token')
    .get(verify)

export default auth