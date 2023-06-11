import express from "express"
const user = express.Router()
import { createNewUser, deleteUser, getAllUsers } from "../controllers/usersController"
import { cancelChanges, passwordChange, passwordResetLink, verifyPasswordResetLink } from "../controllers/passwordController"
import authCheckAdmin from "../middleware/authCheckAdmin"
import verifyJWT from "../middleware/verifyJWT"

user.route("/")
  .get(verifyJWT, authCheckAdmin, getAllUsers)
  .post(createNewUser)
  .delete(verifyJWT, authCheckAdmin, deleteUser)

user.route('/password-reset')
  .post(passwordResetLink)
  .delete(cancelChanges)

user.route('/password-reset/:id/:token')
  .get(verifyPasswordResetLink)
  .post(passwordChange)  

export default user
